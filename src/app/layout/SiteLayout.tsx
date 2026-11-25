import { Outlet } from "react-router";
import { Eye, LogOut } from "lucide-react";
import { useSession } from "@/features/auth/SessionProvider";
import { SiteFooter } from "./SiteFooter";
import { SiteHeader } from "./SiteHeader";
import "./layout.css";

export function SiteLayout() {
  const { isOwner, previewAsGuest, setPreviewAsGuest, blogLogoutOffer, dismissBlogLogoutOffer } = useSession();
  return (
    <>
      <a className="skip-link" href="#main">跳到正文</a>
      <SiteHeader />
      {previewAsGuest && (
        <div className="preview-banner" role="status">
          <div className="site-container">
            <Eye aria-hidden="true" />
            <span>正在以访客身份预览：私密分类{isOwner ? "、私密站点和备注" : "和私密站点"}都不会显示。</span>
            <button type="button" onClick={() => setPreviewAsGuest(false)}>{isOwner ? "返回站长视图" : "返回成员视图"}</button>
          </div>
        </div>
      )}
      {blogLogoutOffer && (
        <div className="preview-banner logout-banner" role="status">
          <div className="site-container">
            <LogOut aria-hidden="true" />
            <span>已退出 Navi，当前为访客视图。</span>
            <div className="banner-actions">
              <a className="banner-link" href={blogLogoutOffer}>同时退出 Xublog</a>
              <button type="button" onClick={dismissBlogLogoutOffer}>关闭</button>
            </div>
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
