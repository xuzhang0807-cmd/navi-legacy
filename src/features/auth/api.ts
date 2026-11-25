import { DEMO_MODE, request } from "@/shared/api/http";
import { blogStartUrl, LOGIN_ERRORS, safeExternalUrl, safeReturnTo, type BlogScopePreset } from "./urls";

export { blogStartUrl, LOGIN_ERRORS, safeExternalUrl, safeReturnTo, type BlogScopePreset };

export type LoginMethod = "blog" | "password";
export type Role = "admin" | "viewer" | "guest";

export type Session = {
  authenticated: boolean;
  role: Role;
  user: { name: string; method: LoginMethod } | null;
  loginMethods: { blog: boolean; password: boolean };
  blogRole?: "owner" | "member" | null;
  blogLogoutUrl?: string | null;
};

export const getSession = () => request<Session>("GET", "/session");

export const logout = () => request<void>("POST", "/auth/logout");

/** 博客登录是整页跳转；演示模式下直接模拟成功。 */
export async function startBlogLogin(returnTo: string, scope: BlogScopePreset = "use"): Promise<Session | null> {
  if (DEMO_MODE) return request<Session>("POST", scope === "manage" ? "/auth/demo-blog-manage" : "/auth/demo-blog");
  window.location.assign(blogStartUrl(returnTo, scope));
  return null;
}
