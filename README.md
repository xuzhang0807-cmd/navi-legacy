# navi

个人导航站（`https://dh.kazerush.xyz`）。本仓库是**从线上产物反编译恢复**的可部署版本，由 xuzhang0807-cmd 自行维护。

## 目录

```
worker/index.js            线上 Worker 原样代码（可直接部署）
decompiled/worker.pretty.js  同上，格式化后便于阅读（约 3600 行）
frontend/                  线上前端构建产物（Vite + React + MUI，SPA）
decompiled/frontend.pretty.js 前端 bundle 的格式化版本，仅供阅读/搜索
wrangler.jsonc             部署配置（D1、静态资源、非敏感变量）
```

## 部署

```bash
export CLOUDFLARE_API_TOKEN=***
export CLOUDFLARE_ACCOUNT_ID=fd9b33852a00a5909b8b15745426e3fe
npx wrangler@4 deploy
```

敏感变量（不进仓库）：

```bash
npx wrangler secret put AUTH_USERNAME
npx wrangler secret put AUTH_PASSWORD   # 明文或 bcrypt 均可
npx wrangler secret put AUTH_SECRET
```

## 后端接口（Worker 内实现，前缀 `/api/`）

| 方法 | 路径 | 说明 |
| --- | --- | --- |
| POST | `/api/login` | 用户名密码换 token |
| POST | `/api/logout` | 注销 |
| GET | `/api/auth/status` | 登录态检查 |
| GET | `/api/init` | 首次初始化建表 |
| GET/POST/PUT/DELETE | `/api/groups`、`/api/groups/{id}` | 分组 CRUD |
| GET | `/api/groups-with-sites` | 分组+站点聚合（首页用） |
| PUT | `/api/group-orders` | 分组排序 |
| GET/POST/PUT/DELETE | `/api/sites`、`/api/sites/{id}` | 站点 CRUD |
| PUT | `/api/site-orders` | 站点排序 |
| GET/POST/PUT/DELETE | `/api/configs`、`/api/configs/{key}` | 站点配置 |
| GET | `/api/export` | 导出 `navhive-data.json` |
| POST | `/api/import` | 导入数据 |
| GET/POST/DELETE | `/api/preferences/favorites` | 收藏（按 user 标识） |
| GET/POST | `/api/preferences/settings` | 偏好设置 |
| GET/POST | `/api/preferences/visits` | 最近访问 |
| POST | `/api/preferences/migrate` | 本地偏好迁移 |

鉴权：`Authorization: Bearer <token>`；`AUTH_ENABLED=true` 时非登录接口需要 token。

## 数据结构（D1 `navigation-db`）

- `groups(id, name, order_num, created_at, updated_at)`
- `sites(id, group_id, name, url, icon, description, notes, order_num, created_at, updated_at)`
- `configs(key, value, created_at, updated_at)`

## 说明

- 前端是压缩后的构建产物，没有原始 TSX 源码；改 UI 需要重写对应部分，或直接换前端。
- `decompiled/*.pretty.js` 只用于阅读，不要用来部署。
- 旧版没有 `is_public` / 收藏 / 偏好等新特性，接口契约见上表。
