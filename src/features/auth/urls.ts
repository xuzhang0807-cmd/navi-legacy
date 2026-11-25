/*
 * 认证相关的纯函数与文案，不依赖 React 或路径别名，
 * tests/auth-ui.test.js 可直接用 node --test 导入验证。
 */

export type BlogScopePreset = "use" | "manage";

/** 只允许站内路径作为回跳地址，与服务端规则一致。 */
export function safeReturnTo(value: string): string {
  return value.startsWith("/") && !value.startsWith("//") && !value.startsWith("/\\") ? value : "/";
}

/** 仅允许 HTTP/HTTPS 外链（用于博客退出地址）。 */
export function safeExternalUrl(value: string | null | undefined): string | null {
  if (!value) return null;
  try {
    const url = new URL(value);
    return url.protocol === "https:" || url.protocol === "http:" ? url.href : null;
  } catch {
    return null;
  }
}

export function blogStartUrl(returnTo: string, scope: BlogScopePreset = "use"): string {
  const query = new URLSearchParams({ returnTo: safeReturnTo(returnTo) });
  if (scope === "manage") query.set("scope", "manage");
  return `/api/v1/auth/blog/start?${query.toString()}`;
}

export const LOGIN_ERRORS: Record<string, string> = {
  STATE_MISMATCH: "登录请求已过期，或者不是从这个页面发起的，请重新登录。",
  ACCESS_DENIED: "你在博客取消了授权，没有登录。",
  MISSING_PERMISSION: "这个博客账号没有访问或编辑 Navi 的权限。",
  BLOG_UNAVAILABLE: "暂时连不上博客，请稍后再试。",
  LOGIN_FAILED: "登录没有成功，请重试。",
};
