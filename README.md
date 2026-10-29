# Navi

个人导航站。默认分支为 `master`；本地开发在功能分支上进行，改动经 PR 合并。仓库本身不包含发布动作。

## 结构

```text
src/                    React + TypeScript 源码
worker/index.js         Cloudflare Worker API
migrations/             D1 本地 schema 基线
frontend/               Vite 静态构建输出（Worker assets，随提交入库）
tests/                  Worker API 回归测试
docs/architecture.md    数据可见性与本地开发约定
wrangler.jsonc          既有 Worker / D1 配置（仍含原有数据库绑定）
```

历史阅读副本与旧版静态备份（原 `decompiled/`、`legacy-build/`）已移出跟踪，见下文「历史产物」。

## 本地预览

```bash
pnpm install
pnpm dev:demo       # 只使用虚构演示内容与浏览器 localStorage
pnpm test
pnpm build
```

`pnpm dev:demo` 不请求 `/api`，不读取线上数据；页面内的编辑、收藏与公开/私密切换仅写入当前浏览器的演示存储。通过 `?preview=admin` 可查看完整管理模式，例如：`http://localhost:5173/?preview=admin`。

若需验证 Worker，请另开终端运行 `pnpm dev:worker`，Wrangler 会在本地模拟 Worker 与 D1；不要加 `--remote`。脚本未提供部署命令。`wrangler.jsonc` 保留既有 D1 绑定，任何迁移、配置变更或上线均需在 UI 截图通过后单独审查和确认。

## 可见性与分类

导航分组就是一级分类；站点通过 `group_id` 归属分类，二者均以 `is_public`（1 公开、0 私密）控制可见性。访客只会得到公开分类中的公开站点，登录管理员可以查看完整列表并编辑。`description` 是可公开介绍，`notes` 是管理员私密备注，不应出现在游客接口响应中。

本版本依旧是单管理员导航站，不是多租户产品。收藏和最近访问通过 `X-Device-ID` 为访客保持设备级归属，登录状态则按管理员用户名归属。

## 后端 API

- `GET /api/groups-with-sites`：公开或认证后的分组 + 站点列表。
- `POST /api/login`、`POST /api/logout`、`GET /api/auth/status`：管理登录与状态。
- `/api/groups`、`/api/sites`：分类/站点 CRUD；写入操作需要管理员认证。
- `/api/preferences/favorites`：用户收藏。
- `/api/preferences/visits`、`/api/preferences/settings`：最近访问与显示偏好。

公开接口的安全边界必须由 Worker 实施，不能只依赖前端隐藏私密内容。本分支增加了公开响应不返回 `notes` 的修正和 API 回归测试。

## 生产数据库注意事项

新加的 `migrations/0001_local_schema.sql` 是本地/新建 D1 的基线，不适合直接套到既有生产库；上线前必须先确认现有 schema 与历史迁移状态。旧配置的 `wrangler.jsonc` 仍绑定原有 Cloudflare D1，开发时只能使用 Wrangler 默认本地模拟，不得使用 `--remote`。部署暂不在本分支执行。

本地 Worker 若要验证收藏/最近访问接口，先运行 `pnpm db:migrate:local`；该脚本显式使用 `--local` 和 `.wrangler-local/`。

## 历史产物

`decompiled/`（反编译阅读副本，约 894 KB）与 `legacy-build/`（旧版静态备份，约 661 KB）已移出 Git 跟踪，共减少约 1.55 MB 跟踪体积（2.18 MB → 0.63 MB）。这两份目录自述即为「历史阅读副本」「只作对照/回滚」，不属于可维护或部署源码。

- 查阅：`git show faee7fc:decompiled/worker.pretty.js`，或查看 `faee7fc` 及更早提交的树。
- 本地对照：已移至 `.local-archive/`（被 `.gitignore` 忽略，不随仓库分发）。
- 修改以 `src/` 与 `worker/index.js` 为准，不要把归档内容重新提交。

`frontend/` 是例外：它是 Wrangler `assets.directory` 指向的部署产物，仓库没有 CI 重建，因此继续随提交入库。本地执行 `pnpm build` 后如产生新的 hash 文件名，请用 `git checkout -- frontend/` 还原，避免把无关产物变更混入功能提交。
