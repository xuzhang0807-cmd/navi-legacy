# Navi

个人导航站，React + TypeScript 前端，Node.js 24 + SQLite 后端。可和博客在 bero 同机托管。Wrangler 用于从历史 D1 库导出数据。

## 本地开发

需要 Node.js 24、pnpm 10。开发数据库存放在 `.local-data/`，临时验证文件存放在 `.tmp/`。两处均被 Git 忽略。

```bash
pnpm install --frozen-lockfile
cp .env.example .dev.vars
# 编辑 .dev.vars，填写随机 AUTH_SECRET 与博客 OAuth 配置（或紧急调试时设置 AUTH_PASSWORD_LOGIN=true 及 AUTH_USERNAME/AUTH_PASSWORD）。
# 本地使用 PUBLIC_ORIGIN=http://localhost:5173 和 NODE_ENV=development。
pnpm dev:server  # http://localhost:8787，自动初始化 .local-data/navi.sqlite
pnpm dev         # http://localhost:5173，/api 代理到 8787
pnpm test
```

`pnpm start` 用于已构建的服务器运行环境，读取 `.env`。`pnpm dev:server` 读取 `.dev.vars` 和 `.env.local`，使用 Node watch。开发来源默认是 `http://localhost:5173`。验证本地登录时从 `pnpm dev` 打开的地址访问。本地 SQLite 独立于历史 D1。

`pnpm dev:demo` 只启动前端，用 `src/demo/` 里的浏览器内假后端和示例数据，不调用 `/api`。点「登录 → 使用 Xublog 账号登录」可切到只读成员视图，再点「启用编辑」切到站长视图，适合单独改页面。

### 页面

首页是刊物式布局：页头（博客外链、导航、规划中的资讯），简介和统计，左侧目录与搜索（按 `/` 聚焦，匹配分类名、站点名、介绍、网址，站长视图还匹配备注），右侧按分类展示卡片。卡片规格与博客首页导航卡片一致（见 [架构约定第 6 节](docs/architecture.md)）。

- 访客：只看到公开分类里的公开站点，由服务端过滤。
- 成员（`navi:use`）：看到公开及私密分类与站点（只读，不含站长备注与收藏），头像菜单可切到「以访客身份预览」。
- 站长（`navi:manage`）：在成员基础上查看备注、收藏并启用编辑模式，可点卡片在右侧抽屉里修改、拖动或用方向键排序、收藏、增删分类。
- 站点图标可以按网址自动获取、填图片地址或短文字、上传图片（≤256 KB），加载失败时显示名称首字。网址可省略 `https://`。
- 亮色和暗色跟随系统，也可在页头切换。

新增页面（例如搜索、资讯）按 [架构约定第 2、3 节](docs/architecture.md) 在路由表加一项并新建 `src/pages/<名称>/`。

## 后端与博客首页导航

`GET /api/v1/session` 返回可用登录方式和当前身份。`GET /api/v1/navigation` 按身份过滤分类、站点和备注。登录、管理、排序、收藏及备份接口见 [架构与接口约定](docs/architecture.md)。生产写请求的 `Origin` 必须等于 `PUBLIC_ORIGIN`，`ALLOWED_ORIGINS` 可指定额外的跨域读取来源。

Navi 是导航内容的唯一来源。blog 的 `/api/navigation` 验证 blog 自有会话后调用服务端接口：

```text
GET /api/integrations/blog/navigation
```

- 无服务端凭据：只返回公开分类中的公开网站。
- `Authorization: Bearer <BLOG_NAVIGATION_TOKEN>`：返回公开及私密分类／网站。
- 错误凭据返回 401；这个凭据没有 Navi 管理或写入权限。
- 响应不含管理员 `notes`，并禁止缓存。

博客设置 `NAVI_INTERNAL_URL=http://navi:8787` 和 `NAVI_INTEGRATION_TOKEN`，Navi 的 `BLOG_NAVIGATION_TOKEN` 使用同一个值。令牌只写入服务端环境。博客首页的可见范围由博客会话决定。Navi 通过博客 OAuth 统一登录：`navi:use` 授予私密导航只读查看权限，`navi:manage` 授予编辑与管理权限。

本地对接时，博客开发进程设置 `NAVI_INTERNAL_URL=http://127.0.0.1:8787`。生产两个 Compose 通过 `navi-blog-link` 外部网络互通，可用双方一致的 `NAVI_NETWORK` 覆盖名称。博客用 `NAVI_PUBLIC_ORIGIN=https://dh.kazerush.xyz` 解析站内图标路径。

## 配置博客 OAuth 登录

Navi 仅通过博客（Xublog）登录，前端不提供账号密码表单，凭据只在博客域名输入。在博客启用 `navi:use`、`navi:manage` 和 `/api/identity/me` 后，向现有 `POST /oauth/register` 注册一次客户端（并在博客后台「应用接入 → 导航 Navi」绑定该 `client_id` 与公开地址，以便第一方客户端跳过同意页）。以下命令将注册响应写入受限文件。

```bash
umask 077
mkdir -p .tmp
curl --fail --silent --show-error \
  --output .tmp/blog-oauth-registration.json \
  --header 'Content-Type: application/json' \
  --data '{
    "client_name": "Navi",
    "token_endpoint_auth_method": "client_secret_post",
    "grant_types": ["authorization_code", "refresh_token"],
    "response_types": ["code"],
    "redirect_uris": [
      "https://dh.kazerush.xyz/api/v1/auth/blog/callback",
      "http://localhost:5173/api/v1/auth/blog/callback"
    ]
  }' https://zxublog.com/oauth/register
```

把注册响应中的 `client_id` 和 `client_secret` 写入 Navi 服务器的 `.env` 中的 `BLOG_OAUTH_CLIENT_ID` 与 `BLOG_OAUTH_CLIENT_SECRET`。设置 `BLOG_OAUTH_ISSUER=https://zxublog.com`、`BLOG_OAUTH_INTERNAL_URL=http://xublog:3100`，以及 `PUBLIC_ORIGIN=https://dh.kazerush.xyz`。浏览器访问公开授权页，Navi 容器通过共享网络向 `xublog` 换令牌、复核身份和撤销授权。妥善保存客户端密钥与随机 `AUTH_SECRET`，清理临时注册响应。

- **Scope 策略**：常规登录（`/api/v1/auth/blog/start`）只申请 `navi:use`，登录后可查看私密导航（只读）；需要编辑时再点「启用编辑」（`/api/v1/auth/blog/start?scope=manage`）申请 `navi:use navi:manage`。博客在请求包含账号未持有的 scope 时会拒绝整次授权，因此分两步申请可保证仅持有 `navi:use` 的成员顺利登录。
- **退出登录**：在 Navi 点「退出登录」会先结束 Navi 会话并撤销当前 OAuth 授权，随后提供「同时退出 Xublog」链接（`<BLOG_OAUTH_ISSUER>/logout?return_to=<PUBLIC_ORIGIN>`）。
- **紧急密码备用开关**：`AUTH_PASSWORD_LOGIN` 默认为 `false`（关闭），且正常 UI 永不渲染密码表单。仅在紧急运维需要直接调用 `POST /api/v1/auth/login` 时才临时设置 `AUTH_PASSWORD_LOGIN=true` 并填写 `AUTH_USERNAME` 和 `AUTH_PASSWORD`。升级旧数据库时，即使关闭密码登录，首次启动仍可用 `AUTH_USERNAME` 指定原站长用户名以迁移收藏。

本地对接开发博客时，在 `.dev.vars` 或 `.env.local` 填写该环境的 OAuth 配置，从登记过的 `http://localhost:5173` 发起登录。若省略 `BLOG_OAUTH_INTERNAL_URL`，后端调用配置的公开发行方。

本地博客要用生产构建运行（`npm run build` 后 `node --env-file=.env.local dist/standalone/server.js`，并设 `XUBLOG_SESSION_COOKIE_SECURE=true`）。`vinext dev` 在 workerd 里写不了审计日志，客户端注册和授权会返回 500。浏览器把 `http://localhost` 视为安全上下文，Secure Cookie 在本地可用。

## bero 部署

以下为切换步骤，执行前先检查本地页面与迁移快照。代码在 GitHub 的 `navi-legacy` 仓库维护，不直接在服务器修改源码。

1. 在 bero 的 `/home/docker/navi` 检出审核后的提交，保留上一版运行环境与数据库备份用于回滚。
2. 使用 `docker network create navi-blog-link` 创建共享网络。已有网络可复用。让 Navi 和博客容器 `xublog` 加入该网络。
3. 复制 `.env.example` 到 `.env`。设置生产来源和至少一种登录方式。独立生成至少 32 字符的 `AUTH_SECRET` 和 `BLOG_NAVIGATION_TOKEN`，博客的 `NAVI_INTEGRATION_TOKEN` 与后者相同。按上一节填入 OAuth 凭据。
4. 已有 SQLite 卷先做一致备份，启动时自动按编号迁移。首次从 D1 切换时，按下节将 D1 快照导入新卷。空站可直接初始化。数据库卷挂载到 `/app/data`。
5. 使用 `docker compose up -d --build --wait` 启动。检查 `http://127.0.0.1:8787/healthz`、访客导航及博客集成的可见范围。将 Nginx 指向 Navi 后，用登记的公开域名验证站长登录、私密数据及退出。反代示例见 `deploy/nginx-navi.conf.example`。

容器在 `127.0.0.1:8787` 发布 HTTP，TLS 由 Nginx 终止。生产 Cookie 使用 Secure。常驻容器使用只读根文件系统并移除所有 Linux capabilities。保留卷与迁移 SQL 备份，回滚时使用上一版镜像与对应的数据库快照。

默认后端不信任客户端转发头。部署时确认容器看到的反代地址（例如 `docker network inspect navi-blog-link` 的网关），设置 `TRUST_PROXY=true`、`TRUSTED_PROXY_CIDRS=<反代精确地址>/32`，由 Nginx 覆盖 `X-Real-IP`，确保登录限流按真实 IP 区分。不要填写整个不受控网段，也不要让公众绕过 Nginx 直连后端。

## 从 Cloudflare D1 迁移数据

从 D1 切换时，使用完整 SQL 的只读导出保留两级可见范围、备注和全部旧表。旧 JSON 的可见范围可能缺失。

```bash
mkdir -p .local-data
pnpm exec wrangler d1 export navigation-db --remote --output .local-data/d1-export.sql
node scripts/import-d1.mjs .local-data/d1-export.sql .local-data/imported.sqlite
```

`--remote` 用于上述只读导出。导入脚本检查两级 `is_public`、数据库完整性和外键，目标已存在时拒绝覆盖。缺少可见范围时中止，避免私密数据变公开。

首次启动前，创建未运行容器和数据卷，再复制确认过的 `imported.sqlite`。容器用户为 `node`（UID 1000）。已有数据卷应先备份，并使用全新卷切换；不要覆盖使用中的数据库。

```bash
docker compose create navi
docker compose run --rm --no-deps --user 0 --cap-add DAC_OVERRIDE --cap-add CHOWN --entrypoint sh \
  -v "$PWD/.local-data/imported.sqlite:/migration/navi.sqlite:ro" navi \
  -c 'test ! -e /app/data/navi.sqlite && cp /migration/navi.sqlite /app/data/navi.sqlite && chmod 600 /app/data/navi.sqlite && chown node:node /app/data/navi.sqlite'
docker compose up -d --build --wait
```

上面的能力仅授予首次复制数据库的一次性容器，用于写入数据卷和设置所有者；常驻服务仍移除全部 Linux capabilities。

迁移按编号记录在 `schema_migrations`。首次升级按 `AUTH_USERNAME` 将旧站长收藏复制到 `owner_favorites`。旧偏好、设备收藏及访问记录保留在 SQLite 中。用升级前后的副本对比分组、站点和收藏计数，并验证匿名接口的可见范围。D1 SQL 与 SQLite 快照含私密内容，保存在忽略目录或受保护备份。本地 SQLite 可通过 `node:sqlite` 的 `backup()` 生成包含 WAL 数据的一致快照。

API v1 导出的 JSON 包含 `version`、`exportDate`、`groups`、`sites` 和 `favorites`。导入在事务内替换导航和收藏，旧 JSON 缺少可见标记的条目按私密处理。API 导入受 1 MiB 限制。数据较大或旧字段超出当前校验范围时，用 SQLite 快照迁移。

## 打包代码与本地站点数据

在 WSL 安装 Node.js 24、Git 和 tar，先验证并提交源码，再运行：

```bash
pnpm test
# 提交审核过的源码与 frontend/ 构建产物后：
pnpm package:server
# 可选：指定另一个数据库文件
# pnpm package:server /absolute/path/to/navi.sqlite
```

命令要求所有已跟踪源码没有未提交改动，使用 `git archive HEAD` 收集对应提交的文件，再通过 `node:sqlite` 的 `backup()` 读取本地数据库的一致快照，无需停止服务。输出为 `.local-data/releases/navi-server-<时间戳>-<编号>.tar.gz`；不会覆盖已有包。源码归档拒绝运行时数据、凭据和依赖目录，真实 `.env`、`.dev.vars` 不会进入包；服务器需按 `.env.example` 单独配置凭据。

包中包含 `navi-server/` 源码、`.local-data/imported.sqlite` 和 `release-manifest.json`，SQLite 副本会清理运行时会话。清单记录提交、表计数和快照 SHA-256。快照及归档权限为 `600`。包可能包含私密分类、站点和备注，应作为受保护的服务器迁移文件保存。

将包传到 bero 后，解压进入 `navi-server/`，按上方「bero 部署」设置环境变量和共享网络，再使用「从 Cloudflare D1 迁移数据」中的一次性容器复制命令，把包内 `.local-data/imported.sqlite` 导入全新数据卷。核对清单计数、公开/私密接口后启动；已有卷先备份，不覆盖正在运行的数据库。重复打包会从当前本地数据库生成新快照，包含之后在本地保存的站点改动。

## 结构与验证

```text
src/app/              应用骨架：Providers、路由表、页头页脚
src/pages/            每个路由一个目录（home、not-found）
src/features/         导航（卡片、目录、编辑器）与登录会话
src/shared/           接口封装、基础组件、设计令牌、纯函数、站点配置
src/demo/             pnpm dev:demo 的浏览器内假后端
server/               Node HTTP、API 路由、导航与鉴权服务、SQLite
migrations/           SQLite 基线与版本化迁移
scripts/import-d1.mjs 完整 SQL 快照导入（拒绝覆盖）
scripts/package-server.mjs 提交源码与一致数据库快照打包
tests/                API、隐私、图标、迁移回归
frontend/             Vite 构建产物
compose.yaml          bero/本地服务器容器配置
deploy/               Nginx 示例
```

`pnpm test` 运行 Node API、OAuth、SQLite 迁移、共享图标校验和首页筛选逻辑测试；`pnpm check` 再加类型检查和构建。Docker 在构建阶段生成 `frontend/`，运行镜像启动 Node 服务。私密数据和凭据存放在运行环境。
