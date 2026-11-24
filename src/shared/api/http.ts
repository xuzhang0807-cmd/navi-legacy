/** /api/v1 的唯一请求入口。错误格式见 docs/architecture.md 第 4 节。 */

export const DEMO_MODE = import.meta.env.VITE_DEMO_MODE === "true";

export type HttpMethod = "GET" | "POST" | "PUT" | "PATCH" | "DELETE";

export class ApiError extends Error {
  readonly status: number;
  readonly code: string;

  constructor(status: number, code: string, message: string) {
    super(message);
    this.name = "ApiError";
    this.status = status;
    this.code = code;
  }
}

const STATUS_MESSAGES: Record<number, string> = {
  400: "提交的内容有误，请检查后重试。",
  401: "登录已失效，请重新登录。",
  403: "没有权限执行这个操作。",
  404: "要找的内容不存在，可能已被删除。",
  409: "内容已被修改，请刷新后重试。",
  413: "内容太大了，请缩小图标或文字后重试。",
  429: "操作太频繁了，请稍后再试。",
  503: "暂时连不上博客，请稍后再试。",
};

function fallbackMessage(status: number): string {
  return STATUS_MESSAGES[status] ?? (status >= 500 ? "服务器暂时出错了，请稍后再试。" : "请求失败，请稍后再试。");
}

function readError(status: number, body: unknown): ApiError {
  const error = body && typeof body === "object" && "error" in body ? (body as { error: unknown }).error : null;
  if (error && typeof error === "object") {
    const { code, message } = error as { code?: unknown; message?: unknown };
    return new ApiError(status, typeof code === "string" ? code : `HTTP_${status}`, typeof message === "string" && message ? message : fallbackMessage(status));
  }
  return new ApiError(status, `HTTP_${status}`, fallbackMessage(status));
}

export async function request<T>(method: HttpMethod, path: string, body?: unknown): Promise<T> {
  if (DEMO_MODE) {
    const { handleDemoRequest } = await import("@/demo/server");
    return handleDemoRequest(method, path, body) as Promise<T>;
  }
  let response: Response;
  try {
    response = await fetch(`/api/v1${path}`, {
      method,
      credentials: "same-origin",
      cache: "no-store",
      headers: body === undefined ? { Accept: "application/json" } : { Accept: "application/json", "Content-Type": "application/json" },
      body: body === undefined ? undefined : JSON.stringify(body),
    });
  } catch {
    throw new ApiError(0, "NETWORK_ERROR", "网络连接失败，请检查网络后重试。");
  }
  if (response.status === 204) return undefined as T;
  let data: unknown = null;
  try { data = await response.json(); } catch { /* 非 JSON 响应按状态码处理 */ }
  if (!response.ok) throw readError(response.status, data);
  return data as T;
}

export function errorMessage(reason: unknown, fallback = "操作失败，请稍后再试。"): string {
  if (reason instanceof ApiError) return reason.message;
  if (reason instanceof Error && reason.message) return reason.message;
  return fallback;
}

export function isUnauthorized(reason: unknown): boolean {
  return reason instanceof ApiError && reason.status === 401;
}
