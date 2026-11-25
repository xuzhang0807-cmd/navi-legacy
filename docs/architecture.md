# Navi 架构与接口约定

本文件是前端、后端和博客对接的唯一约定来源。改接口、路由或鉴权规则时，先改这里，再改代码和测试。

## 1. 目标与边界

- Navi 是站长一个人的导航站：一份分类与站点数据，按身份决定能看到多少。不是多租户系统；若以后要多人各自拥有导航，必须另加归属字段和逐查询授权。
- **访客**：只看到「分类公开 且 站点公开」的站点，没有备注、收藏等站长数据。
- **成员（`navi:use`）**：已通过博客登录的只读用户，看到公开及私密分类与站点，没有备注、收藏，不能修改导航。
- **站长 / 编辑（`navi:manage`）**：看到全部内容（含备注与收藏），可以增删改、排序、收藏、导入导出。
- 公开或私密由服务端过滤。前端隐藏、路由守卫都不能代替 API 授权；访客请求的响应里根本不应出现私密数据。
- 博客首页的导航读的是同一份数据，卡片字段和样式与 Navi 保持一致（见第 6 节）。
- 后端只跑 Node.js 24（`node:http` + `node:sqlite`），旧 Cloudflare Worker 入口已退役；`wrangler` 只保留给 D1 数据的只读导出。

## 2. 目录结构

```text
src/                         前端（Vite root）
  main.tsx                   入口，只挂载 <App />
  app/                       应用骨架：Providers、路由表、站点外壳（页头、页脚）
  pages/                     每个路由一个目录：home/、not-found/；以后 search/、news/
  features/                  按业务拆分：navigation/（卡片、分类、编辑器）、auth/（会话、登录）
  shared/                    与业务无关的公共层
    api/                     fetch 封装、错误类型、演示模式适配
    ui/                      按钮、抽屉、对话框、提示条等基础组件
    theme/                   设计令牌（与博客 theme.css 同源）、基础样式、亮暗主题
    lib/                     纯函数（网址、图标规范化等），可被 node --test 直接导入
  demo/                      仅 pnpm dev:demo 使用的浏览器内假后端与示例数据，生产构建不包含
  public/                    原样复制的静态资源
server/                      后端
  index.js                   进程入口：读取环境、启动 HTTP、优雅退出
  app.js                     createNaviServer()：组装中间件与路由，测试直接调用
  config.js                  环境变量解析与校验（缺失或不安全配置直接启动失败）
  http/                      请求读取、JSON 响应、错误、来源校验、安全头、静态文件与 SPA 回退
  routes/                    v1/、integrations/、legacy/，只做参数解析和权限声明
  services/                  业务逻辑：navigation、auth（会话、密码登录、博客 OAuth）
  db/                        SQLite 连接与版本化迁移
    migrations/              后端 SQL 迁移
migrations/                  SQLite 基线及既有迁移，两处迁移统一按编号执行一次
scripts/                     D1 快照导入、服务器打包
tests/                       node --test 回归测试（后端为主，也覆盖 src/shared/lib 纯函数）
frontend/                    Vite 构建产物（随提交入库，Docker 内会重新构建）
```

约定：

- 前端用 `@/` 别名指向 `src/`，不写跨层级的 `../../..`。
- `pages/` 只组合 `features/` 和 `shared/`；`features/` 之间不互相引用内部文件，需要共享的东西下沉到 `shared/`。
- 后端 `routes/` 不直接写 SQL，`services/` 不读 HTTP 头；鉴权结果以 `context.viewer` 传入服务层。
- 运行时数据只写 `.local-data/`（开发）或 `/app/data`（容器），临时文件写 `.tmp/`。

## 3. 前端路由

使用 `react-router` 的浏览器路径路由。服务端对没有扩展名的未知路径返回 `index.html`，所以刷新任何子页面都不会 404。

| 路径 | 页面 | 状态 |
|---|---|---|
| `/` | 导航首页（刊物式：页头 + 简介 + 目录 + 分类区块） | 本期 |
| `/search` | 搜索页 | 预留，页头显示「规划」标记，不可点击 |
| `/news` | 资讯页 | 预留，同上 |
| 其他 | 404 页面 | 本期 |

新增模块时：在 `src/app/routes.tsx` 的路由表加一项（路径、页头标签、是否启用），在 `src/pages/<名称>/` 新建页面。`/api/`、`/healthz`、`/assets/` 是保留前缀，页面路由不得使用。

主题：`<html data-theme="light|dark">`，未设置时跟随系统。颜色只通过 `shared/theme/tokens.css` 的变量使用，以后新增主题就是新增一组令牌。

## 4. API v1

所有新接口在 `/api/v1/` 下。通用规则：

- 请求和响应都是 JSON，字段用 camelCase。响应头 `Cache-Control: private, no-store`。
- 错误统一为 `{"error":{"code":"大写下划线代码","message":"中文说明"}}`，配合正确的 HTTP 状态码（400 参数错误、401 未登录、403 无权限或来源不受信任、404 不存在、409 冲突、413 请求体过大、415 内容类型不受支持、429 过于频繁、5xx 服务端错误）。
- 写操作（POST / PUT / PATCH / DELETE）要求 `Origin` 与站点来源一致，有请求体时要求 `Content-Type: application/json`。导航写操作还要求有效的站长会话。登录用于创建会话，退出可重复调用，并在博客不可达时照常撤销本地会话。
- 请求体上限 1 MiB（含 data URI 图标）。

### 4.1 会话与登录

| 方法 | 路径 | 说明 |
|---|---|---|
| GET | `/api/v1/session` | 返回当前身份、可用登录方式及博客退出地址 |
| POST | `/api/v1/auth/login` | 服务端紧急密码登录，`{"username","password","remember"}`（默认关闭，需 `AUTH_PASSWORD_LOGIN=true`，不在前端 UI 展示） |
| POST | `/api/v1/auth/logout` | 退出，撤销服务端会话；博客登录的会话同时尽力撤销博客端令牌。返回 204；前端随后提供 `blogLogoutUrl`（「同时退出 Xublog」） |
| GET | `/api/v1/auth/blog/start?returnTo=/路径[&scope=use\|manage]` | 302 跳到博客授权页。`returnTo` 只接受以单个 `/` 开头的站内路径，否则用 `/`；`scope` 默认 `use`（请求 `navi:use`），`manage` 请求 `navi:use navi:manage` |
| GET | `/api/v1/auth/blog/callback` | 博客回跳。成功 302 到 `returnTo`；失败 302 到 `/?loginError=<代码>` |

`GET /api/v1/session` 响应：

```json
{
  "authenticated": true,
  "role": "viewer",
  "user": { "name": "KazeRush", "method": "blog" },
  "blogRole": "owner",
  "loginMethods": { "blog": true, "password": false },
  "blogLogoutUrl": "https://zxublog.com/logout?return_to=https%3A%2F%2Fdh.kazerush.xyz"
}
```

`role` 为 `"guest"`（匿名访客）、`"viewer"`（持有 `navi:use`，私密只读）或 `"admin"`（持有 `navi:manage` 或紧急密码会话，可编辑）。访客为 `{"authenticated":false,"role":"guest","user":null,"loginMethods":{...}}`。`loginMethods.blog` 只在博客 OAuth 配置完整时为 true；`loginMethods.password` 由 `AUTH_PASSWORD_LOGIN` 控制（默认 false）。配置了博客 OAuth 时返回 `blogLogoutUrl`（`<BLOG_OAUTH_ISSUER>/logout?return_to=<PUBLIC_ORIGIN>`）。`blogRole`（`"owner" | "member"`）仅作界面提示，权限完全由 OAuth `scopes` 决定。

`loginError` 代码：`STATE_MISMATCH`、`ACCESS_DENIED`、`MISSING_PERMISSION`、`BLOG_UNAVAILABLE`、`LOGIN_FAILED`。

### 4.2 导航数据

`GET /api/v1/navigation`：

```json
{
  "visibility": "private",
  "groups": [
    {
      "id": 1, "name": "常用", "isPublic": true, "order": 1,
      "sites": [
        {
          "id": 10, "groupId": 1, "name": "GitHub", "url": "https://github.com/",
          "icon": "https://www.faviconextractor.com/favicon/github.com?larger=true",
          "description": "代码托管", "isPublic": true, "order": 1,
          "notes": "仅站长可见的备注"
        }
      ]
    }
  ],
  "favorites": [10]
}
```

- 访客：`visibility` 为 `"public"`，私密分类整组不出现，私密站点不出现，所有站点都没有 `notes` 字段，`favorites` 为 `[]`。
- 成员（`viewer`）：`visibility` 为 `"private"`，返回公开与私密分类／站点，但所有站点都没有 `notes` 字段，`favorites` 为 `[]`；调用站长写接口或导出接口返回 `403 FORBIDDEN`。
- 站长（`admin`）：`visibility` 为 `"private"`，返回全部数据和 `notes`、`favorites`。
- `groups` 按 `order` 升序，组内 `sites` 按 `order` 升序。`icon` 为 `null`、短文字（≤8 字符）、`http(s)://` 图片地址、站内相对路径（以单个 `/` 开头）或 `data:image/...;base64,...`，规则以 `src/shared/lib/site-icons.ts` 为准。

### 4.3 站长写接口

| 方法 | 路径 | 请求体 | 成功 |
|---|---|---|---|
| POST | `/api/v1/groups` | `{"name","isPublic"}` | 201，新分类（排在最后） |
| PATCH | `/api/v1/groups/:id` | `{"name"?,"isPublic"?}` | 200，更新后的分类（不含 sites） |
| DELETE | `/api/v1/groups/:id` | — | 204，分类下站点一并删除 |
| PUT | `/api/v1/groups/order` | `{"ids":[...]}`，必须恰好是全部分类 id | 204 |
| POST | `/api/v1/sites` | `{"groupId","name","url","icon"?,"description"?,"notes"?,"isPublic"}` | 201，新站点（排在该分类最后） |
| PATCH | `/api/v1/sites/:id` | 上述字段任选；改 `groupId` 时排到新分类最后 | 200，更新后的站点 |
| DELETE | `/api/v1/sites/:id` | — | 204 |
| PUT | `/api/v1/groups/:id/sites/order` | `{"ids":[...]}`，必须恰好是该分类的全部站点 id | 204 |
| PUT | `/api/v1/favorites/:siteId` | — | 204，收藏 |
| DELETE | `/api/v1/favorites/:siteId` | — | 204，取消收藏 |
| GET | `/api/v1/export` | — | 200，完整备份 JSON（含私密数据与备注） |
| POST | `/api/v1/import` | 备份 JSON | 200，`{"groups":n,"sites":n}`；整体替换，事务内完成 |

校验规则（前后端一致，前端只做提示，以服务端为准）：

- 分类名 1–40 字符；站点名 1–60 字符；介绍 ≤180；备注 ≤500。
- 网址只接受 http / https，可省略协议（补 `https://`），不允许用户名密码。
- 图标规则同 `src/shared/lib/site-icons.ts`；data URI 仅限 PNG/JPEG/GIF/WebP/AVIF/ICO，≤256 KiB。
- 收藏属于站长本人（单一站长），不区分是密码登录还是博客登录。

### 4.4 保留的旧接口

| 路径 | 用途 |
|---|---|
| `GET /api/integrations/blog/navigation` | 博客服务端读取导航，见第 6 节。**字段和行为不变** |
| `GET /healthz` | 健康检查，`{"ok":true}` |
| `GET /api/groups-with-sites`、`GET /api/auth/status` | 旧前端兼容，只读，过渡一个版本后删除 |

旧版其余 `/api/*` 写接口、访客设备收藏、最近访问、访客城市问候已移除。

## 5. 鉴权

### 5.1 会话

- 服务端会话存 SQLite `sessions` 表；Cookie `navi_session` 只放随机 ID（库里存其 SHA-256）。属性：`HttpOnly`、`SameSite=Lax`、`Path=/`，生产环境 `Secure`。
- 用 `Lax` 而不是 `Strict`，是因为博客 OAuth 回跳是跨站顶层跳转，`Strict` 会让回跳后的首个请求丢失会话。CSRF 由「写操作校验 Origin + 只收 JSON」防护。
- 密码会话：默认 12 小时，勾选「保持登录」为 30 天。博客会话：最长 30 天，并受第 5.3 节的复核约束。
- 登录接口按客户端 IP 限流（真实 IP 规则见 README 的 `TRUST_PROXY` 说明）。

### 5.2 站长密码登录（紧急服务端备用）

沿用 `AUTH_USERNAME` / `AUTH_PASSWORD`，由 `AUTH_PASSWORD_LOGIN` 控制且**默认关闭（`false`）**。前端登录对话框永远不显示密码表单，用户只在博客域名输入凭据。仅在紧急排障时可在服务端显式设置 `AUTH_PASSWORD_LOGIN=true` 启用 `POST /api/v1/auth/login`。生产环境必须至少开启一种登录方式。

修改站长用户名、密码或 `AUTH_SECRET` 会使所有密码登录会话失效。

### 5.3 博客账号登录（OAuth 2.1 授权码 + PKCE）

Navi 是博客 OAuth 的机密客户端（`client_secret_post`），通过博客已有的动态注册接口注册一次并在博客后台绑定为第一方客户端，凭据写入 Navi 的 `.env`。

```text
浏览器 → GET /api/v1/auth/blog/start?returnTo=…（常规登录）
       ← 302 {BLOG_OAUTH_ISSUER}/oauth/authorize
           ?response_type=code&client_id=…&redirect_uri={PUBLIC_ORIGIN}/api/v1/auth/blog/callback
           &scope=navi:use&resource={BLOG_OAUTH_ISSUER}/api/identity
           &code_challenge=…&code_challenge_method=S256&state=…
         （state、code_verifier、requestedScope、returnTo 存在 10 分钟有效的签名 Cookie navi_oauth，HttpOnly，SameSite=Lax）
博客   → 登录或邀请码注册（如未登录）→ 第一方跳过同意页 → 302 回 redirect_uri?code=…&state=…
Navi   → 校验 state → POST {BLOG_OAUTH_INTERNAL_URL}/oauth/token（换取 access_token + refresh_token）
       → GET  {BLOG_OAUTH_INTERNAL_URL}/api/identity/me（Bearer access_token）
       → 按返回 scopes 映射角色：含 navi:manage → admin，仅含 navi:use → viewer，均无 → loginError=MISSING_PERMISSION

启用编辑（已登录 viewer 按需发起二次授权）：
浏览器 → GET /api/v1/auth/blog/start?scope=manage&returnTo=…
       ← 302 {BLOG_OAUTH_ISSUER}/oauth/authorize?...&scope=navi:use+navi:manage&...
       → 回调要求 scopes 含 navi:manage，否则 loginError=MISSING_PERMISSION 且保留原 viewer 会话
```

博客端约定（博客仓库实现）：

- 应用目录登记 `navi:use`（「使用导航」，登录并查看私密导航）和 `navi:manage`（「管理导航」，编辑导航），管理员自动拥有，成员逐项勾选。
- OAuth 资源 `{博客公开来源}/api/identity`。博客在请求包含账号未持有的 scope 时会拒绝整次授权（且 `optionalScopes` 仅用于博客内置网关客户端），因此 Navi 首次登录只申请 `navi:use`，需要编辑时再通过 `?scope=manage` 申请 `navi:use navi:manage`。
- `GET /api/identity/me`，`Authorization: Bearer <access_token>`：
  - 200 `{"sub":"<博客账号 id>","name":"<昵称或用户名>","username":"<用户名>","role":"owner|member","scopes":["navi:use", ...]}`；
  - 令牌无效、过期、授权已撤销或账号 epoch 变化 → 401；
  - `Cache-Control: no-store`。
- 令牌、刷新轮换、重放检测、撤销沿用博客现有实现（access 15 分钟，refresh 30 天，刷新即轮换）。
- 博客提供 `GET /logout?return_to=<Navi 精确公开源>` 确认页；Navi 退出本地会话并撤销 grant 后向用户提供「同时退出 Xublog」链接。

Navi 端复核：

- `refresh_token` 用 AES-256-GCM 加密后存在会话行里，密钥由 `AUTH_SECRET` 派生；会话行同时记录 `role`（`viewer` / `admin`）与 `blog_role`。
- 携带博客会话请求时，若距上次复核超过 5 分钟：用 refresh_token 换新令牌并再次调用 `/api/identity/me`。同一会话的刷新必须串行（避免两次并发刷新触发博客的重放检测）。
- 复核得到 `invalid_grant`、401、403，或原会话所需能力被撤销（`admin` 失去 `navi:manage`，或 `viewer` 失去 `navi:use`）→ 删除会话，本次请求按访客处理。博客暂时不可达 → 保留会话但本次请求按访客处理（导航读接口返回公开数据，导航写接口 503），不放行。
- 博客端修改密码、角色、权限或撤销授权后，最迟 5 分钟内 Navi 结束会话。

`redirect_uri` 只由配置推导（`PUBLIC_ORIGIN`，开发环境缺省 `http://localhost:5173`），不得取自请求头。

## 6. 与博客的数据对接

```text
博客浏览器 → 博客 /api/navigation（博客自己的会话判断是否已登录）
博客服务端 → Navi GET /api/integrations/blog/navigation
              无凭据：只返回公开分类中的公开站点
              Authorization: Bearer <BLOG_NAVIGATION_TOKEN>：返回全部分类与站点
```

- 响应：`{"visibility":"public|private","groups":[{"id","name","order_num","is_public","sites":[{"id","group_id","name","url","icon","description","order_num","is_public"}]}]}`，不含 `notes`，按排序返回。字段名保持 snake_case，是与博客 `app/lib/navigation-model.ts` 的稳定约定，不随 v1 改名。无效的凭据返回 401，响应为 `{"error":"无效的导航集成凭据"}`。
- `BLOG_NAVIGATION_TOKEN` 只读，没有任何写入或管理权限；它与 OAuth 客户端密钥是两个独立的值。
- 卡片规格（两边一致）：高 92px、内边距 12px、圆角 8px、1px 边框；第一行 24px 图标 + 14px/600 名称（单行省略），第二行 12px 介绍（最多两行）；悬停边框变强调色并上浮 3px。站长视图里私密卡片加虚线边框和锁标记。

## 7. 部署（bero）

```text
浏览器 ──HTTPS──> Nginx (dh.kazerush.xyz) ──> 127.0.0.1:8787 navi 容器
博客容器 xublog ──navi-blog-link 网络──> http://navi:8787    （读导航）
navi 容器 ──navi-blog-link 网络──> http://xublog:3100        （OAuth 换令牌、身份复核）
浏览器 ──HTTPS──> zxublog.com/oauth/authorize                （授权页走公网）
```

- 生产必须设置：`PUBLIC_ORIGIN`、`AUTH_SECRET`（≥32 字符）、`BLOG_NAVIGATION_TOKEN`；启用博客登录还需 `BLOG_OAUTH_ISSUER`、`BLOG_OAUTH_CLIENT_ID`、`BLOG_OAUTH_CLIENT_SECRET`，可选 `BLOG_OAUTH_INTERNAL_URL`（不设时用 `BLOG_OAUTH_ISSUER`）。
- 前端部署在域名根路径 `/`，不使用子路径；静态资源 `/assets/*` 长缓存，`index.html` 不缓存。
- 数据库卷 `/app/data`，迁移在启动时自动执行；升级前先备份卷。

## 8. 开发与检查

```bash
pnpm dev:server   # 后端 http://127.0.0.1:8787
pnpm dev          # 前端 http://localhost:5173，/api 代理到 8787
pnpm dev:demo     # 纯前端演示数据，不调用 /api
pnpm check        # 测试 + 类型检查 + 构建
```

本地 SQLite 与线上完全隔离。对接本地博客时，博客设置 `NAVI_INTERNAL_URL=http://127.0.0.1:8787`，Navi 设置 `BLOG_OAUTH_ISSUER=<本地博客地址>`。
