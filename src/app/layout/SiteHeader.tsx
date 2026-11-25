import { Link, NavLink, useLocation } from "react-router";
import { ArrowUpRight, LogIn, Moon, Pencil, Sun } from "lucide-react";
import { useSession } from "@/features/auth/SessionProvider";
import { useEditMode } from "@/features/navigation/EditModeContext";
import { useTheme } from "@/shared/theme/ThemeProvider";
import { APP_ROUTES } from "../routes";
import { SITE } from "@/shared/config/site";
import { AccountMenu } from "./AccountMenu";

export function SiteHeader() {
  const { session, isAuthenticated, isOwner, isAdmin, canEnableEdit, isBlogOwner, openLogin, enableEdit } = useSession();
  const { editing, setEditing } = useEditMode();
  const { theme, toggleTheme } = useTheme();
  const { pathname } = useLocation();

  return (
    <header className="site-header">
      <div className="site-container site-header-inner">
        <Link to="/" className="site-brand">{SITE.owner}</Link>
        <nav className="site-nav" aria-label="站点">
          <a className="site-nav-link is-external" href={SITE.blogUrl}>博客<ArrowUpRight aria-hidden="true" /></a>
          {APP_ROUTES.filter((route) => route.inHeader).map((route) => route.status === "live"
            ? <NavLink key={route.path} to={route.path} end className={({ isActive }) => `site-nav-link${isActive ? " is-active" : ""}`}>{route.label}</NavLink>
            : <span key={route.path} className="site-nav-link is-planned" aria-disabled="true" title="规划中">{route.label}<span className="tag-planned">规划</span></span>)}
        </nav>
        <div className="site-actions">
          {isAdmin && pathname === "/" && (
            <button className="btn" type="button" aria-pressed={editing} onClick={() => setEditing(!editing)}>
              <Pencil /><span className="site-action-label">{editing ? "完成编辑" : "编辑"}</span>
            </button>
          )}
          {!isOwner && canEnableEdit && isBlogOwner && pathname === "/" && (
            <button className="btn" type="button" onClick={() => void enableEdit()}>
              <Pencil /><span className="site-action-label">启用编辑</span>
            </button>
          )}
          <button className="icon-btn" type="button" onClick={toggleTheme} aria-label={theme === "dark" ? "切换到亮色" : "切换到暗色"} title={theme === "dark" ? "切换到亮色" : "切换到暗色"}>
            {theme === "dark" ? <Sun /> : <Moon />}
          </button>
          {isAuthenticated
            ? <AccountMenu />
            : <button className="btn" type="button" onClick={openLogin} disabled={!session}><LogIn /><span className="site-action-label">登录</span></button>}
        </div>
      </div>
    </header>
  );
}
