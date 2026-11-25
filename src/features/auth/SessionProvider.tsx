import { createContext, useCallback, useContext, useEffect, useMemo, useRef, useState, type ReactNode } from "react";
import { errorMessage } from "@/shared/api/http";
import { useToast } from "@/shared/ui/Toast";
import { LOGIN_ERRORS, getSession, logout as logoutRequest, safeExternalUrl, startBlogLogin, type Session } from "./api";
import { LoginDialog } from "./LoginDialog";

type SessionContextValue = {
  /** null 表示还在加载 */
  session: Session | null;
  /** 已登录（navi:use 成员或 navi:manage 站长，不论是否在预览访客视图） */
  isAuthenticated: boolean;
  /** 已作为站长/编辑登录（拥有 navi:manage 或紧急密码会话，不论是否在预览访客视图） */
  isOwner: boolean;
  /** 当前展示私密内容：已登录且没有开启访客预览 */
  canViewPrivate: boolean;
  /** 当前按站长视图展示：有编辑权限且没有开启访客预览 */
  isAdmin: boolean;
  /** 当前为博客只读登录，可发起二次授权以启用编辑 */
  canEnableEdit: boolean;
  /** 博客返回 owner 角色时作为界面提示（权限仍严格由 navi:manage scope 决定） */
  isBlogOwner: boolean;
  previewAsGuest: boolean;
  setPreviewAsGuest: (value: boolean) => void;
  /** 退出 Navi 后提供的 Xublog 退出链接 */
  blogLogoutOffer: string | null;
  dismissBlogLogoutOffer: () => void;
  /** 身份变化时变化，用来让数据重新加载并丢弃旧的私密数据 */
  identityKey: string;
  refresh: () => Promise<void>;
  openLogin: () => void;
  enableEdit: () => Promise<void>;
  logout: () => Promise<void>;
  /** 接口返回 401 时调用：刷新会话并提示重新登录 */
  handleUnauthorized: () => void;
};

const GUEST: Session = { authenticated: false, role: "guest", user: null, loginMethods: { blog: false, password: false } };

const SessionContext = createContext<SessionContextValue | null>(null);

function takeLoginError(): string | null {
  const url = new URL(window.location.href);
  const code = url.searchParams.get("loginError");
  if (!code) return null;
  url.searchParams.delete("loginError");
  window.history.replaceState(window.history.state, "", url.pathname + url.search + url.hash);
  return LOGIN_ERRORS[code] ?? LOGIN_ERRORS.LOGIN_FAILED;
}

export function SessionProvider({ children }: { children: ReactNode }) {
  const toast = useToast();
  const [session, setSession] = useState<Session | null>(null);
  const [previewAsGuest, setPreviewAsGuest] = useState(false);
  const [loginOpen, setLoginOpen] = useState(false);
  const [blogLogoutOffer, setBlogLogoutOffer] = useState<string | null>(null);
  const seq = useRef(0);

  const refresh = useCallback(async () => {
    const id = ++seq.current;
    try {
      const next = await getSession();
      if (id === seq.current) setSession(next);
    } catch {
      // 拿不到会话时按访客处理，绝不沿用旧的登录身份
      if (id === seq.current) {
        setSession((current) => ({
          ...GUEST,
          loginMethods: current?.loginMethods ?? GUEST.loginMethods,
          blogLogoutUrl: current?.blogLogoutUrl,
        }));
      }
    }
  }, []);

  useEffect(() => {
    const message = takeLoginError();
    if (message) toast(message, "error");
    void refresh();
    // 回到页面时复核一次，博客端撤销授权后能及时退回访客视图
    const onFocus = () => { if (!document.hidden) void refresh(); };
    window.addEventListener("focus", onFocus);
    document.addEventListener("visibilitychange", onFocus);
    return () => {
      window.removeEventListener("focus", onFocus);
      document.removeEventListener("visibilitychange", onFocus);
    };
  }, [refresh, toast]);

  const isAuthenticated = session?.role === "admin" || session?.role === "viewer";
  const isOwner = session?.role === "admin";
  const canEnableEdit = session?.role === "viewer" && session.user?.method === "blog" && Boolean(session.loginMethods.blog);
  const isBlogOwner = session?.blogRole === "owner";

  useEffect(() => {
    if (!isAuthenticated) setPreviewAsGuest(false);
    else setBlogLogoutOffer(null);
  }, [isAuthenticated]);

  const enableEdit = useCallback(async () => {
    try {
      const next = await startBlogLogin(window.location.pathname + window.location.search, "manage");
      if (next) {
        setSession(next);
        toast("已启用编辑权限");
      }
    } catch (reason) {
      toast(errorMessage(reason, "无法启用编辑，请重试。"), "error");
    }
  }, [toast]);

  const logout = useCallback(async () => {
    const wasBlog = session?.user?.method === "blog";
    const logoutUrl = safeExternalUrl(session?.blogLogoutUrl);
    try {
      await logoutRequest();
      if (wasBlog && logoutUrl) {
        setBlogLogoutOffer(logoutUrl);
        toast("已退出 Navi，可选择同时退出 Xublog");
      } else {
        setBlogLogoutOffer(null);
        toast("已退出，现在是访客视图");
      }
    } catch (reason) {
      toast(errorMessage(reason, "退出失败，请重试。"), "error");
    } finally {
      await refresh();
    }
  }, [session, refresh, toast]);

  const handleUnauthorized = useCallback(() => {
    toast("登录已失效，请重新登录。", "error");
    void refresh();
  }, [refresh, toast]);

  const dismissBlogLogoutOffer = useCallback(() => setBlogLogoutOffer(null), []);

  const value = useMemo<SessionContextValue>(() => ({
    session,
    isAuthenticated,
    isOwner,
    canViewPrivate: isAuthenticated && !previewAsGuest,
    isAdmin: isOwner && !previewAsGuest,
    canEnableEdit,
    isBlogOwner,
    previewAsGuest: isAuthenticated && previewAsGuest,
    setPreviewAsGuest,
    blogLogoutOffer,
    dismissBlogLogoutOffer,
    identityKey: session ? `${session.role}:${session.user?.method ?? ""}:${session.user?.name ?? ""}` : "loading",
    refresh,
    openLogin: () => setLoginOpen(true),
    enableEdit,
    logout,
    handleUnauthorized,
  }), [session, isAuthenticated, isOwner, canEnableEdit, isBlogOwner, previewAsGuest, blogLogoutOffer, dismissBlogLogoutOffer, refresh, enableEdit, logout, handleUnauthorized]);

  return (
    <SessionContext.Provider value={value}>
      {children}
      {loginOpen && (
        <LoginDialog
          methods={session?.loginMethods ?? GUEST.loginMethods}
          returnTo={window.location.pathname + window.location.search}
          onClose={() => setLoginOpen(false)}
          onBlogLogin={async () => {
            const next = await startBlogLogin(window.location.pathname + window.location.search);
            if (next) {
              setSession(next);
              setLoginOpen(false);
              toast(next.role === "admin" ? "已登录，私密分类和编辑功能已打开" : "已登录，私密分类已打开");
            }
          }}
        />
      )}
    </SessionContext.Provider>
  );
}

export function useSession(): SessionContextValue {
  const value = useContext(SessionContext);
  if (!value) throw new Error("useSession must be used inside SessionProvider");
  return value;
}
