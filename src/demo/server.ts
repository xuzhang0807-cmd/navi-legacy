/*
 * pnpm dev:demo 用的浏览器内假后端：按 /api/v1 的约定返回数据，状态只在内存里。
 * 生产构建中 DEMO_MODE 为 false，这个模块不会被加载。
 */
import type { Role, Session } from "@/features/auth/api";
import type { NavGroup, NavSite, NavigationData } from "@/features/navigation/types";
import { ApiError, type HttpMethod } from "@/shared/api/http";
import { SITE } from "@/shared/config/site";
import { DEMO_FAVORITES, createDemoGroups } from "./data";

const state = {
  groups: createDemoGroups(),
  favorites: [...DEMO_FAVORITES],
  session: null as { user: NonNullable<Session["user"]>; role: Exclude<Role, "guest">; blogRole?: "owner" | "member" } | null,
  nextId: 1000,
};

const methods = { blog: true, password: false };

function blogLogoutUrl(): string {
  return `${SITE.blogUrl}/logout?${new URLSearchParams({ return_to: window.location.origin })}`;
}

function sessionBody(): Session {
  return state.session
    ? { authenticated: true, role: state.session.role, user: state.session.user, blogRole: state.session.blogRole, loginMethods: methods, blogLogoutUrl: blogLogoutUrl() }
    : { authenticated: false, role: "guest", user: null, loginMethods: methods, blogLogoutUrl: blogLogoutUrl() };
}

function requireAdmin() {
  if (!state.session) throw new ApiError(401, "UNAUTHORIZED", "请先登录。");
  if (state.session.role !== "admin") throw new ApiError(403, "FORBIDDEN", "需要管理权限才能执行此操作。");
}

function navigation(): NavigationData {
  const canSeePrivate = Boolean(state.session);
  const admin = state.session?.role === "admin";
  const groups = state.groups
    .filter((group) => canSeePrivate || group.isPublic)
    .sort((a, b) => a.order - b.order)
    .map((group) => ({
      ...group,
      sites: group.sites
        .filter((site) => canSeePrivate || site.isPublic)
        .sort((a, b) => a.order - b.order)
        .map((site) => (admin ? { ...site } : (({ notes: _notes, ...rest }) => rest)(site))),
    }));
  return { visibility: canSeePrivate ? "private" : "public", groups, favorites: admin ? [...state.favorites] : [] };
}

function findGroup(id: number): NavGroup {
  const group = state.groups.find((item) => item.id === id);
  if (!group) throw new ApiError(404, "NOT_FOUND", "分类不存在。");
  return group;
}

function findSite(id: number): { group: NavGroup; site: NavSite } {
  for (const group of state.groups) {
    const site = group.sites.find((item) => item.id === id);
    if (site) return { group, site };
  }
  throw new ApiError(404, "NOT_FOUND", "站点不存在。");
}

const wait = () => new Promise((resolve) => setTimeout(resolve, 160));

export async function handleDemoRequest(method: HttpMethod, path: string, body: unknown): Promise<unknown> {
  await wait();
  const input = (body ?? {}) as Record<string, unknown>;
  const route = `${method} ${path.replace(/\/\d+/g, "/:id")}`;
  const ids = [...path.matchAll(/\/(\d+)/g)].map((match) => Number(match[1]));

  switch (route) {
    case "GET /session": return sessionBody();
    case "POST /auth/login":
      throw new ApiError(403, "PASSWORD_LOGIN_DISABLED", "密码登录未启用。");
    case "POST /auth/demo-blog":
      state.session = { user: { name: "KazeRush", method: "blog" }, role: "viewer", blogRole: "owner" };
      return sessionBody();
    case "POST /auth/demo-blog-manage":
      state.session = { user: { name: "KazeRush", method: "blog" }, role: "admin", blogRole: "owner" };
      return sessionBody();
    case "POST /auth/logout": state.session = null; return undefined;
    case "GET /navigation": return navigation();
  }

  requireAdmin();
  switch (route) {
    case "POST /groups": {
      const group: NavGroup = { id: ++state.nextId, name: String(input.name), isPublic: Boolean(input.isPublic), order: state.groups.length + 1, sites: [] };
      state.groups.push(group);
      return { ...group, sites: undefined };
    }
    case "PATCH /groups/:id": {
      const group = findGroup(ids[0]);
      if (typeof input.name === "string") group.name = input.name;
      if (typeof input.isPublic === "boolean") group.isPublic = input.isPublic;
      return { ...group, sites: undefined };
    }
    case "DELETE /groups/:id": {
      const group = findGroup(ids[0]);
      const removed = new Set(group.sites.map((site) => site.id));
      state.groups = state.groups.filter((item) => item !== group);
      state.favorites = state.favorites.filter((id) => !removed.has(id));
      return undefined;
    }
    case "PUT /groups/order": {
      (input.ids as number[]).forEach((id, index) => { findGroup(id).order = index + 1; });
      return undefined;
    }
    case "POST /sites": {
      const group = findGroup(Number(input.groupId));
      const site: NavSite = { id: ++state.nextId, groupId: group.id, name: String(input.name), url: String(input.url), icon: (input.icon as string | null) ?? null, description: String(input.description ?? ""), notes: String(input.notes ?? ""), isPublic: Boolean(input.isPublic), order: group.sites.length + 1 };
      group.sites.push(site);
      return site;
    }
    case "PATCH /sites/:id": {
      const { group, site } = findSite(ids[0]);
      Object.assign(site, input);
      if (typeof input.groupId === "number" && input.groupId !== group.id) {
        const target = findGroup(input.groupId);
        group.sites = group.sites.filter((item) => item !== site);
        site.order = target.sites.length + 1;
        target.sites.push(site);
      }
      return site;
    }
    case "DELETE /sites/:id": {
      const { group, site } = findSite(ids[0]);
      group.sites = group.sites.filter((item) => item !== site);
      state.favorites = state.favorites.filter((id) => id !== site.id);
      return undefined;
    }
    case "PUT /groups/:id/sites/order": {
      const group = findGroup(ids[0]);
      (input.ids as number[]).forEach((id, index) => { const site = group.sites.find((item) => item.id === id); if (site) site.order = index + 1; });
      return undefined;
    }
    case "PUT /favorites/:id":
      if (!state.favorites.includes(ids[0])) state.favorites.push(ids[0]);
      return undefined;
    case "DELETE /favorites/:id":
      state.favorites = state.favorites.filter((id) => id !== ids[0]);
      return undefined;
  }
  throw new ApiError(404, "NOT_FOUND", `演示模式没有实现 ${method} ${path}`);
}
