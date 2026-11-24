import { useSession } from "@/features/auth/SessionProvider";
import { SITE } from "@/shared/config/site";

export function SiteFooter() {
  const { isAdmin } = useSession();
  return (
    <footer className="site-footer">
      <div className="site-container site-footer-inner">
        <span>© {new Date().getFullYear()} {SITE.owner}</span>
        <span>{isAdmin ? "站长视图：包含私密内容" : "访客视图：只显示公开的导航"}</span>
      </div>
    </footer>
  );
}
