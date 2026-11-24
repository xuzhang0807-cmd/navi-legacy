import { DEMO_MODE, request } from "@/shared/api/http";

export type LoginMethod = "blog" | "password";

export type Session = {
  authenticated: boolean;
  role: "admin" | "guest";
  user: { name: string; method: LoginMethod } | null;
  loginMethods: { blog: boolean; password: boolean };
};

export const getSession = () => request<Session>("GET", "/session");

export const loginWithPassword = (username: string, password: string, remember: boolean) =>
  request<Session>("POST", "/auth/login", { username, password, remember });

export const logout = () => request<void>("POST", "/auth/logout");

/** 只允许站内路径作为回跳地址，与服务端规则一致。 */
export function safeReturnTo(value: string): string {
  return value.startsWith("/") && !value.startsWith("//") && !value.startsWith("/\\") ? value : "/";
}

/** 博客登录是整页跳转；演示模式下直接模拟成功。 */
export async function startBlogLogin(returnTo: string): Promise<Session | null> {
  if (DEMO_MODE) return request<Session>("POST", "/auth/demo-blog");
  window.location.assign(`/api/v1/auth/blog/start?returnTo=${encodeURIComponent(safeReturnTo(returnTo))}`);
  return null;
}

export const LOGIN_ERRORS: Record<string, string> = {
  STATE_MISMATCH: "登录请求已过期，或者不是从这个页面发起的，请重新登录。",
  ACCESS_DENIED: "你在博客取消了授权，没有登录。",
  MISSING_PERMISSION: "这个博客账号没有管理 Navi 的权限。",
  BLOG_UNAVAILABLE: "暂时连不上博客，请稍后再试。",
  LOGIN_FAILED: "登录没有成功，请重试。",
};
