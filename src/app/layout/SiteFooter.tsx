import { useSession } from "@/features/auth/SessionProvider";
import { SITE } from "@/shared/config/site";

export function SiteFooter() {
  const { isAdmin, canViewPrivate } = useSession();
  const mode = isAdmin
    ? "站长视图：包含私密内容"
    : canViewPrivate
      ? "成员视图：包含私密内容（只读）"
      : "访客视图：只显示公开的导航";
  return (
    <footer className="site-footer">
      <div className="site-container site-footer-inner">
        <span>© {new Date().getFullYear()} {SITE.owner}</span>
        <span>{mode}</span>
      </div>
    </footer>
  );
}
