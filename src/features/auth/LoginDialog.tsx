import { useState } from "react";
import { errorMessage } from "@/shared/api/http";
import { Overlay } from "@/shared/ui/Overlay";
import { blogStartUrl, type Session } from "./api";
import "./auth.css";

type Props = {
  methods: Session["loginMethods"];
  returnTo: string;
  onClose: () => void;
  onBlogLogin: () => Promise<void>;
};

export function LoginDialog({ methods, returnTo, onClose, onBlogLogin }: Props) {
  const [busy, setBusy] = useState(false);
  const [error, setError] = useState("");
  const startHref = blogStartUrl(returnTo);

  async function start() {
    setError("");
    setBusy(true);
    try { await onBlogLogin(); }
    catch (reason) { setError(errorMessage(reason, "登录失败，请重试。")); }
    finally { setBusy(false); }
  }

  return (
    <Overlay title="登录 Navi" description="使用 Xublog 账号登录后可查看私密导航；拥有管理权限的账号还可启用编辑。" onClose={onClose}>
      {methods.blog ? (
        <div className="login-blog">
          <button className="btn-primary btn-wide" type="button" data-autofocus disabled={busy} onClick={() => void start()}>
            {busy ? "正在跳转到 Xublog…" : "使用 Xublog 账号登录"}
          </button>
          <a
            className="login-register-link"
            href={startHref}
            onClick={(event) => {
              event.preventDefault();
              if (!busy) void start();
            }}
          >
            凭邀请码注册
          </a>
          <p className="form-note">将跳转到 Xublog 完成登录或邀请码注册，不会在 Navi 输入密码。</p>
        </div>
      ) : (
        <p className="form-note">服务器还没有配置 Xublog 登录，请联系管理员。</p>
      )}
      {error && <div className="form-error" role="alert">{error}</div>}
      <p className="form-note">访客不用登录，也能浏览公开的导航。</p>
    </Overlay>
  );
}
