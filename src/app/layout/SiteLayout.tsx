import { Outlet } from "react-router";
import { Eye } from "lucide-react";
import { useSession } from "@/features/auth/SessionProvider";
import { SiteFooter } from "./SiteFooter";
import { SiteHeader } from "./SiteHeader";
import "./layout.css";

export function SiteLayout() {
  const { previewAsGuest, setPreviewAsGuest } = useSession();
  return (
    <>
      <a className="skip-link" href="#main">跳到正文</a>
      <SiteHeader />
      {previewAsGuest && (
        <div className="preview-banner" role="status">
          <div className="site-container">
            <Eye aria-hidden="true" />
            <span>正在以访客身份预览：私密分类、私密站点和备注都不会显示。</span>
            <button type="button" onClick={() => setPreviewAsGuest(false)}>返回站长视图</button>
          </div>
        </div>
      )}
      <main id="main" className="site-main">
        <Outlet />
      </main>
      <SiteFooter />
    </>
  );
}
