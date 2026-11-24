import { useState } from "react";
import { LogIn } from "lucide-react";
import { errorMessage } from "@/shared/api/http";
import { Overlay } from "@/shared/ui/Overlay";
import type { Session } from "./api";
import "./auth.css";

type Props = {
  methods: Session["loginMethods"];
  onClose: () => void;
  onBlogLogin: () => Promise<void>;
  onPasswordLogin: (username: string, password: string, remember: boolean) => Promise<void>;
};

export function LoginDialog({ methods, onClose, onBlogLogin, onPasswordLogin }: Props) {
  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");
  const [remember, setRemember] = useState(false);
  const [busy, setBusy] = useState<"blog" | "password" | null>(null);
  const [error, setError] = useState("");

  async function run(kind: "blog" | "password", action: () => Promise<void>) {
    setError("");
    setBusy(kind);
    try { await action(); }
    catch (reason) { setError(errorMessage(reason, "登录失败，请重试。")); }
    finally { setBusy(null); }
  }

  function submitPassword() {
    if (!username.trim() || !password) { setError("请填写账号和密码。"); return; }
    void run("password", () => onPasswordLogin(username.trim(), password, remember));
  }

  const none = !methods.blog && !methods.password;

  return (
    <Overlay title="登录 Navi" description="登录后显示私密分类，并可以编辑导航。" onClose={onClose} onSubmit={methods.password ? submitPassword : undefined}>
      {methods.blog && (
        <div className="login-blog">
          <button className="btn-primary btn-wide" type="button" data-autofocus disabled={busy !== null} onClick={() => void run("blog", onBlogLogin)}>
            {busy === "blog" ? "正在跳转到博客…" : "用博客账号登录"}
          </button>
          <p className="form-note">会跳转到博客确认身份。已经在博客登录过，就不用再输密码。</p>
        </div>
      )}
      {methods.blog && methods.password && <div className="login-or">或者用站长密码</div>}
      {methods.password && (
        <>
          <label className="field">
            <span className="field-label">账号</span>
            <input className="input" name="username" autoComplete="username" value={username} onChange={(event) => setUsername(event.target.value)} />
          </label>
          <label className="field">
            <span className="field-label">密码</span>
            <input className="input" name="password" type="password" autoComplete="current-password" value={password} onChange={(event) => setPassword(event.target.value)} />
          </label>
          <label className="checkbox"><input type="checkbox" checked={remember} onChange={(event) => setRemember(event.target.checked)} />保持登录 30 天</label>
          <button className={methods.blog ? "btn btn-wide" : "btn-primary btn-wide"} type="submit" disabled={busy !== null}>
            <LogIn />{busy === "password" ? "正在登录…" : "登录"}
          </button>
        </>
      )}
      {none && <p className="form-note">服务器还没有开启任何登录方式。请在服务器配置里开启博客登录或站长密码。</p>}
      {error && <div className="form-error" role="alert">{error}</div>}
      <p className="form-note">访客不用登录，也能浏览公开的导航。</p>
    </Overlay>
  );
}
