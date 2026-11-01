# Navi 本地开发规范

## 项目边界

仓库结构：`src/` 放 React + TypeScript 页面，`worker/` 放 Cloudflare Worker API，`migrations/` 放 D1 schema，`tests/` 放自动化回归测试，`frontend/` 是 Wrangler `assets.directory` 指向的静态构建产物（随提交入库，因为仓库没有 CI 重建）。原 `decompiled/` 与 `legacy-build/` 是历史阅读副本与旧版备份，已移出 Git 跟踪，只在本地 `.local-archive/` 或 `faee7fc` 及更早的提交里查阅。

默认后端改为 `pnpm dev:server`（Node 24 + 项目内 SQLite），配合 `pnpm dev` 使用真实本地 API；`pnpm dev:demo` 仍只写浏览器演示数据。`wrangler.jsonc` 暂保留旧 D1 绑定，`pnpm dev:worker` 仅用于兼容检查；勿与 Node 服务占用相同 8787 端口。开发数据与线上完全隔离。只有 README 描述的 D1 完整 SQL 导出使用 `--remote`，该操作只读；不对生产执行数据库迁移或部署。

## 导航数据模型

- `groups` 是一级导航分类，按 `order_num` 排序，并带有 `is_public`（1 公开、0 私密）。
- `sites` 通过 `group_id` 属于一个分类，按 `order_num` 排序，也带有独立的 `is_public`。公开展示要求分类和站点两级都标记为公开；私密分类会整体从游客视图消失。
- `sites.notes` 是管理员备注，不属于公开介绍。游客 API 不应返回该字段；公开内容仅用 `description`。
- 收藏、最近访问和界面偏好按用户标识保存：管理员以登录用户名区分，游客以浏览器设备 ID 区分。前端必须对访客 `X-Device-ID` 使用稳定值，不能每个请求重新生成。

## 认证与读写边界

旧 Worker 使用单管理员用户名/密码（`AUTH_USERNAME` / `AUTH_PASSWORD`）和签名 Cookie。公开列表读取走 `/api/groups-with-sites`，其余写接口要求登录。此版本是“一个站长的公开/私密导航”，不是多租户用户系统；如果将来需要多人拥有各自独立导航，必须另加用户身份、归属字段及服务端逐查询授权，不能只在前端隐藏内容。

公开/私密必须由服务端按 `groups.is_public` 与 `sites.is_public` 过滤。前端筛选、卡片隐藏或路由守卫都不能代替 API 授权。管理操作仅在 Worker 验证会话后执行。

## 本地开发与检查

```bash
pnpm install
pnpm dev:demo       # 本地演示 UI，不调用 /api，也不读取线上数据
pnpm test           # Worker 公开字段边界测试
pnpm build          # TypeScript 检查 + 静态构建到 frontend/

```

依赖需 pnpm 10.x（`pnpm-lock.yaml` 为 `lockfileVersion: '9.0'`）。若系统 pnpm 版本不符，用 `corepack prepare pnpm@10.18.3 --activate` 固定版本，不要改动 lockfile。

本地默认使用 `pnpm dev:server` 与 `pnpm dev`；服务首次启动自动初始化 `.local-data/navi.sqlite`。旧 Worker 的本地迁移命令必须显式加 `--local`。服务器构建与部署步骤见 README；先检查本地与迁移快照，确认切换目标再变更线上反代。`frontend/` 随源码重新构建，避免版本滞后。

## 已知待审查项

旧版 `GET /api/groups-with-sites` 与 `GET /api/sites` 会将 `notes` 随公开站点一起返回，本分支将其视为私密备注并修复为只在已认证响应中出现。旧仓库的 D1 schema 原先内嵌于 Worker，收藏/偏好表缺少可追踪迁移定义；新 migration 只作为新建本地 D1 的基线，不应直接应用到线上既有数据库。上线前需要单独复核生产 D1 当前 schema 与迁移计划。
