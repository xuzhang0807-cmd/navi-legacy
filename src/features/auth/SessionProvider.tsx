import { createContext, useCallback, useContext, useEffect, useMemo, useRef, useState, type ReactNode } from "react";
import { errorMessage } from "@/shared/api/http";
import { useToast } from "@/shared/ui/Toast";
import { LOGIN_ERRORS, getSession, loginWithPassword, logout as logoutRequest, startBlogLogin, type Session } from "./api";
import { LoginDialog } from "./LoginDialog";

type SessionContextValue = {
  /** null 表示还在加载 */
  session: Session | null;
  /** 已作为站长登录（不论是否在预览访客视图） */
  isOwner: boolean;
  /** 当前按站长视图展示：已登录且没有开启访客预览 */
  isAdmin: boolean;
  previewAsGuest: boolean;
  setPreviewAsGuest: (value: boolean) => void;
  /** 身份变化时变化，用来让数据重新加载并丢弃旧的私密数据 */
  identityKey: string;
  refresh: () => Promise<void>;
  openLogin: () => void;
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
  const seq = useRef(0);

  const refresh = useCallback(async () => {
    const id = ++seq.current;
    try {
      const next = await getSession();
      if (id === seq.current) setSession(next);
    } catch {
      // 拿不到会话时按访客处理，绝不沿用旧的站长身份
      if (id === seq.current) setSession((current) => ({ ...GUEST, loginMethods: current?.loginMethods ?? GUEST.loginMethods }));
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

  const isOwner = session?.role === "admin";
  useEffect(() => { if (!isOwner) setPreviewAsGuest(false); }, [isOwner]);

  const logout = useCallback(async () => {
    try {
      await logoutRequest();
      toast("已退出，现在是访客视图");
    } catch (reason) {
      toast(errorMessage(reason, "退出失败，请重试。"), "error");
    } finally {
      await refresh();
    }
  }, [refresh, toast]);

  const handleUnauthorized = useCallback(() => {
    toast("登录已失效，请重新登录。", "error");
    void refresh();
  }, [refresh, toast]);

  const value = useMemo<SessionContextValue>(() => ({
    session,
    isOwner,
    isAdmin: isOwner && !previewAsGuest,
    previewAsGuest: isOwner && previewAsGuest,
    setPreviewAsGuest,
    identityKey: session ? `${session.role}:${session.user?.method ?? ""}:${session.user?.name ?? ""}` : "loading",
    refresh,
    openLogin: () => setLoginOpen(true),
    logout,
    handleUnauthorized,
  }), [session, isOwner, previewAsGuest, refresh, logout, handleUnauthorized]);

  return (
    <SessionContext.Provider value={value}>
      {children}
      {loginOpen && (
        <LoginDialog
          methods={session?.loginMethods ?? GUEST.loginMethods}
          onClose={() => setLoginOpen(false)}
          onBlogLogin={async () => {
            const next = await startBlogLogin(window.location.pathname + window.location.search);
            if (next) { setSession(next); setLoginOpen(false); toast("已登录，私密分类和编辑功能已打开"); }
          }}
          onPasswordLogin={async (username, password, remember) => {
            const next = await loginWithPassword(username, password, remember);
            setSession(next);
            setLoginOpen(false);
            toast("已登录，私密分类和编辑功能已打开");
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
