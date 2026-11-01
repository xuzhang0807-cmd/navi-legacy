# Navi

个人导航站，React + TypeScript 前端，Node.js 24 + SQLite 后端。可和 blog 在 bero 同机托管；Cloudflare Worker 入口暂保留，用于兼容检查与数据迁移，不再是服务器版的运行依赖。

## 本地开发

需要 Node.js 24、pnpm 10。数据、凭据和生成图片的临时文件放在被忽略的 `.local-data/`。

```bash
pnpm install --frozen-lockfile
cp .env.example .dev.vars
# 编辑 .dev.vars，填写 AUTH_USERNAME、AUTH_PASSWORD、随机 AUTH_SECRET。
# 本地请删除 PUBLIC_ORIGIN，使用 NODE_ENV=development。
pnpm dev:server  # http://localhost:8787，自动初始化 .local-data/navi.sqlite
pnpm dev         # http://localhost:5173，/api 代理到 8787
pnpm test
pnpm build
```

`pnpm start` 用于已经构建的服务器运行环境，读取 `.env`；`pnpm dev:server` 读取 `.dev.vars` 和 `.env.local`，使用 Node watch。只有生产反代才设置公开 HTTPS `PUBLIC_ORIGIN`。`pnpm dev:demo` 可独立预览浏览器演示数据；真实登录请使用 `pnpm dev`。本地 SQLite 独立于线上 D1。

网站编辑支持按网址“一键获取” faviconextractor 图标，也可以输入图片 URL、短文字或上传图片；图片加载失败时显示名称缩写。网站网址可省略 `https://`。三张横幅海报可在桌面与手机自适应裁剪，每 6.5 秒自动轮转且不显示切换按钮；页面切到后台或系统要求减少动画时暂停。

海报通过用户指定的 `muse-mcp` 生成，包含晚装、海岸和城市夜色三张成年女性时尚海报；提示词保存于 [`docs/poster-prompts.json`](docs/poster-prompts.json)。页面按屏幕选择 800 / 1600 像素 WebP，等比完整展示人物，并以柔焦背景填充宽屏空白，资产随项目部署。

## Blog 首页导航与登录

Navi 是导航内容的唯一来源。blog 的 `/api/navigation` 验证 blog 自有会话后调用服务端接口：

```text
GET /api/integrations/blog/navigation
```

- 无服务端凭据：只返回公开分类中的公开网站。
- `Authorization: Bearer <BLOG_NAVIGATION_TOKEN>`：返回公开及私密分类／网站。
- 错误凭据返回 401；这个凭据没有 Navi 管理或写入权限。
- 响应不含管理员 `notes`，并禁止缓存。

blog 设置 `NAVI_INTERNAL_URL=http://navi:8787`、`NAVI_INTEGRATION_TOKEN`；Navi 设置同一个值到 `BLOG_NAVIGATION_TOKEN`。令牌只存在服务端，不得写入 `VITE_*` / `NEXT_PUBLIC_*` 变量。blog 有效登录会话可看到全部私密导航；此版本是单站共享目录，不是每个账号独立的数据空间。Navi 管理员登录和 blog 登录分别管理，blog 登录只解锁阅读，不赋予 Navi 编辑权限。

本地对接时，blog 的开发进程设置 `NAVI_INTERNAL_URL=http://127.0.0.1:8787`。生产两个 Compose 通过 `navi-blog-link` 外部网络互通；可用双方一致的 `NAVI_NETWORK` 覆盖名称。相对图标路径通过 blog 的 `NAVI_PUBLIC_ORIGIN` 指定公开 Navi 域名，避免把内部容器地址暴露给浏览器。

## bero 部署

以下为切换步骤，执行前先检查本地页面与迁移快照。代码在 GitHub 的 `navi-legacy` 仓库维护，不直接在服务器修改源码。

1. 在 bero 检出审核后的提交到 `/home/docker/navi`，保留现有 Worker 以便切换失败时回退。
2. 创建共享网络：`docker network create navi-blog-link`（已存在无需重复）；blog 的 `make net` 也会创建该网络。
3. 复制 `.env.example` 到 `.env`。设置 `PUBLIC_ORIGIN=https://dh.kazerush.xyz`、管理员账号密码、至少 32 字符的随机 `AUTH_SECRET`，以及独立的 `BLOG_NAVIGATION_TOKEN`。blog `.env` 的 `NAVI_INTEGRATION_TOKEN` 与之相同；Compose 自动设置生产运行环境。
4. 按下方流程将 D1 快照迁入 SQLite；空站可跳过。数据库卷永久保存于 `/app/data`。
5. `docker compose up -d --build --wait`。检查 `http://127.0.0.1:8787/healthz`、管理登录和可见范围，再将 Nginx 从 Worker 改向本机端口。示例见 `deploy/nginx-navi.conf.example`，证书路径沿用实际环境。
6. blog 的 Compose 加入共享网络后，使用其既有 `make deploy` 流程重新构建。确认匿名与已登录两种首页视图，再切换域名解析。

容器只在 `127.0.0.1:8787` 发布 HTTP，TLS 由现有 Nginx 终止；准确设置 `PUBLIC_ORIGIN`，生产 Cookie 自动使用 Secure。保留卷和迁移 SQL 备份。不要 `docker compose down -v`。回滚使用上一个镜像和同批数据库备份，不直接复制正在写入的 SQLite 主文件。

默认后端不信任客户端转发头。部署时确认容器看到的反代地址（例如 `docker network inspect navi-blog-link` 的网关），设置 `TRUST_PROXY=true`、`TRUSTED_PROXY_CIDRS=<反代精确地址>/32`，由 Nginx 覆盖 `X-Real-IP`，确保登录限流按真实 IP 区分。不要填写整个不受控网段，也不要让公众绕过 Nginx 直连后端。

## 从 Cloudflare D1 迁移数据

旧线上 `/api/export` 没有完整导出 `is_public`，不能将旧 JSON 直接作为安全迁移来源。使用 D1 完整 SQL 只读导出，保留可见范围、收藏、最近访问和偏好全部表：

```bash
mkdir -p .local-data
pnpm exec wrangler d1 export navigation-db --remote --output .local-data/d1-export.sql
node scripts/import-d1.mjs .local-data/d1-export.sql .local-data/imported.sqlite
```

`--remote` 仅用于上面的只读导出；不要对线上运行 migrations apply、execute 或 deploy。脚本只创建新 SQLite 文件，目标已存在时拒绝覆盖；检查两级 `is_public`、数据库完整性和外键。缺少可见范围时中止，避免私密数据变公开。

首次启动前，创建未运行容器和数据卷，再复制确认过的 `imported.sqlite`。容器用户为 `node`（UID 1000）。已有数据卷应先备份，并使用全新卷切换；不要覆盖使用中的数据库。

```bash
docker compose create navi
docker compose run --rm --no-deps --user 0 --cap-add DAC_OVERRIDE --cap-add CHOWN --entrypoint sh \
  -v "$PWD/.local-data/imported.sqlite:/migration/navi.sqlite:ro" navi \
  -c 'test ! -e /app/data/navi.sqlite && cp /migration/navi.sqlite /app/data/navi.sqlite && chmod 600 /app/data/navi.sqlite && chown node:node /app/data/navi.sqlite'
docker compose up -d --build --wait
```

上面的能力仅授予首次复制数据库的一次性容器，用于写入数据卷和设置所有者；常驻服务仍移除全部 Linux capabilities。

复制后对比分组、网站、收藏等计数，以及匿名接口中不存在私密分类、站点和备注。D1 SQL / SQLite 含私密内容，只保存在忽略目录或受保护备份，不提交 GitHub。本地 Wrangler 演示库可用 `node:sqlite` 的 `backup()` 生成一致快照，避免漏掉未刷入主文件的 WAL。

## 结构与验证

```text
src/                  React 前端和海报轮播
src/public/posters/   本地海报资产
server/               Node HTTP 服务与 D1/SQLite 兼容层
worker/index.js       共享 API 实现及原 Worker 入口
migrations/           SQLite / D1 本地建表基线
scripts/import-d1.mjs 完整 SQL 快照导入（拒绝覆盖）
tests/                API、隐私、图标、迁移回归
frontend/             Vite 构建产物
compose.yaml          bero/本地服务器容器配置
deploy/               Nginx 示例
```

`pnpm check` 执行测试、类型检查和构建。`frontend/` 继续随提交入库，Docker 也会从源码重新构建，避免旧 Worker 静态产物滞后。私密数据和凭据不进入版本管理。历史 `.local-archive/` 只供阅读，不是维护源码。
