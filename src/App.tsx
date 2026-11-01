import { useEffect, useMemo, useState, type ChangeEvent, type FormEvent, type ReactNode } from "react";
import {
  Camera,
  Check,
  ChevronRight,
  Clock3,
  Compass,
  ExternalLink,
  Folder,
  Globe,
  Languages,
  KeyRound,
  LayoutGrid,
  LockKeyhole,
  LogIn,
  LogOut,
  Moon,
  Pencil,
  Plus,
  Search,
  ShieldCheck,
  Star,
  Sun,
  UserRound,
  X,
} from "lucide-react";
import {
  DEMO_MODE,
  deleteGroup,
  deleteSite,
  isPublic,
  loadInitialData,
  loadVisitorCity,
  login,
  logout,
  recordVisit,
  saveGroup,
  saveSite,
  toggleFavorite,
} from "./api";
import type { ContentFilter, GroupDraft, InitialData, NavGroup, PublicFlag, Site, SiteDraft } from "./types";
import { faviconUrl, isImageIcon, normalizeIconInput, normalizeWebsiteUrl } from "./site-icons";
import { PosterCarousel } from "./PosterCarousel";

type DialogState =
  | { kind: "login" }
  | { kind: "profile" }
  | { kind: "group"; group?: NavGroup }
  | { kind: "site"; site?: Site; groupId?: number }
  | null;

type ProfileSettings = { displayName: string; avatar: string };

function collectQueryValue(formData: FormData, key: string): string {
  return String(formData.get(key) ?? "").trim();
}

function SiteAvatar({ site, onImageLoad, onImageError }: { site: Pick<Site, "name" | "icon">; onImageLoad?: () => void; onImageError?: () => void }) {
  const icon = site.icon?.trim() ?? "";
  const [failedIcon, setFailedIcon] = useState("");
  const image = isImageIcon(icon);
  if (image && failedIcon !== icon) {
    return <span className="site-avatar has-image"><img key={icon} src={icon} alt="" loading="lazy" referrerPolicy="no-referrer" onLoad={onImageLoad} onError={() => { setFailedIcon(icon); onImageError?.(); }} /></span>;
  }
  const fallback = [...site.name.trim()].slice(0, 2).join("").toUpperCase() || "N";
  return <span className="site-avatar has-fallback"><span className="site-avatar-mark">{!image && icon ? icon : fallback}</span></span>;
}

function PrivacyBadge({ value }: { value: PublicFlag }) {
  return isPublic(value)
    ? <span className="privacy-mini"><Globe />公开</span>
    : <span className="privacy-mini private"><LockKeyhole />私密</span>;
}

function SiteCard({
  site,
  favorite,
  admin,
  onFavorite,
  onVisit,
  onEdit,
}: {
  site: Site;
  favorite: boolean;
  admin: boolean;
  onFavorite: (siteId: number) => void;
  onVisit: (siteId: number) => void;
  onEdit: (site: Site) => void;
}) {
  return (
    <article className="site-card">
      <a
        className="site-card-main"
        href={site.url}
        target="_blank"
        rel="noreferrer"
        onClick={() => onVisit(site.id)}
        aria-label={`打开 ${site.name}`}
      >
        <SiteAvatar site={site} />
        <span className="site-copy">
          <h4><span>{site.name}</span></h4>
          <span className="site-domain">{site.url.replace(/^https?:\/\//, "").replace(/\/$/, "")}</span>
          {site.description && <p>{site.description}</p>}
        </span>
      </a>
      <span className="site-card-tools">
        {admin && (
          <button type="button" aria-label={`编辑 ${site.name}`} title="编辑站点" onClick={() => onEdit(site)}>
            <Pencil />
          </button>
        )}
        <button
          type="button"
          className={favorite ? "favorited" : ""}
          aria-label={favorite ? `取消收藏 ${site.name}` : `收藏 ${site.name}`}
          title={favorite ? "取消收藏" : "收藏"}
          onClick={() => onFavorite(site.id)}
        >
          <Star fill={favorite ? "currentColor" : "none"} />
        </button>
      </span>
      {admin && <span className="site-admin-visibility">{isPublic(site.is_public) ? <Globe /> : <LockKeyhole />}{isPublic(site.is_public) ? "公开" : "私密"}</span>}
      {admin && <span className="external-mark"><ExternalLink /></span>}
    </article>
  );
}

function VisibilityChoice({ value, onChange }: { value: PublicFlag; onChange: (value: PublicFlag) => void }) {
  return (
    <div className="visibility-choice" role="group" aria-label="可见范围">
      <button type="button" className={value === 1 ? "selected" : ""} onClick={() => onChange(1)}>
        <Globe /><span><strong>公开</strong><small>访客也可以看到</small></span>
      </button>
      <button type="button" className={value === 0 ? "selected" : ""} onClick={() => onChange(0)}>
        <LockKeyhole /><span><strong>私密</strong><small>仅登录后可见</small></span>
      </button>
    </div>
  );
}

function ModalFrame({ title, subtitle, onClose, children }: { title: string; subtitle: string; onClose: () => void; children: ReactNode }) {
  return (
    <div className="modal-backdrop" onMouseDown={(event) => { if (event.target === event.currentTarget) onClose(); }}>
      <section className="modal" role="dialog" aria-modal="true" aria-label={title}>
        <header className="modal-header">
          <div className="modal-title"><h2>{title}</h2><p>{subtitle}</p></div>
          <button className="modal-close" type="button" aria-label="关闭" onClick={onClose}><X /></button>
        </header>
        {children}
      </section>
    </div>
  );
}

function LoginDialog({ onClose, onLogin }: { onClose: () => void; onLogin: (username: string, password: string, rememberMe: boolean) => Promise<void> }) {
  const [error, setError] = useState("");
  const [busy, setBusy] = useState(false);
  async function submit(event: FormEvent<HTMLFormElement>) {
    event.preventDefault();
    setError("");
    setBusy(true);
    const form = new FormData(event.currentTarget);
    try {
      await onLogin(collectQueryValue(form, "username"), String(form.get("password") ?? ""), form.get("remember") === "on");
      onClose();
    } catch (reason) {
      setError(reason instanceof Error ? reason.message : "登录失败，请稍后重试。");
    } finally {
      setBusy(false);
    }
  }
  return (
    <ModalFrame title="登录管理空间" subtitle="登录后可查看私密分类，并编辑你的导航内容。" onClose={onClose}>
      <form className="modal-content" onSubmit={submit}>
        <div className="login-brand"><Compass /></div>
        <label className="form-field"><span>管理员账号</span><input name="username" autoComplete="username" placeholder="输入账号" required /></label>
        <label className="form-field"><span>密码</span><input name="password" type="password" autoComplete="current-password" placeholder="输入密码" required /></label>
        <label className="checkbox-row"><input type="checkbox" name="remember" />保持登录</label>
        <div className="login-helper"><ShieldCheck />登录态只用于解锁站长的私密导航和管理功能。</div>
        {error && <div className="form-error" role="alert">{error}</div>}
        <div className="modal-footer">
          <span />
          <div className="modal-footer-right"><button className="ghost-button" type="button" onClick={onClose}>取消</button><button className="login-button" type="submit" disabled={busy}>{busy ? "正在登录…" : "登录"}<LogIn /></button></div>
        </div>
      </form>
    </ModalFrame>
  );
}

function ProfileDialog({ profile, theme, language, onClose, onSave, onThemeChange, onLanguageChange }: {
  profile: ProfileSettings;
  theme: ThemeMode;
  language: UiLanguage;
  onClose: () => void;
  onSave: (profile: ProfileSettings) => void;
  onThemeChange: (theme: ThemeMode) => void;
  onLanguageChange: (language: UiLanguage) => void;
}) {
  const [displayName, setDisplayName] = useState(profile.displayName);
  const [avatar, setAvatar] = useState(profile.avatar);
  const [selectedTheme, setSelectedTheme] = useState(theme);
  const [selectedLanguage, setSelectedLanguage] = useState(language);
  const [error, setError] = useState("");

  function chooseAvatar(event: ChangeEvent<HTMLInputElement>) {
    const file = event.currentTarget.files?.[0];
    if (!file) return;
    setError("");
    if (!["image/png", "image/jpeg", "image/webp", "image/gif"].includes(file.type)) {
      setError("请选择图片文件。");
      return;
    }
    if (file.size > 2 * 1024 * 1024) {
      setError("头像文件请控制在 2 MB 以内。");
      return;
    }
    const reader = new FileReader();
    reader.onload = () => {
      if (typeof reader.result === "string") setAvatar(reader.result);
      else setError("图片读取失败，请重试。");
    };
    reader.onerror = () => setError("图片读取失败，请重试。");
    reader.readAsDataURL(file);
  }

  function submit(event: FormEvent<HTMLFormElement>) {
    event.preventDefault();
    onSave({ displayName: displayName.trim() || "站长", avatar });
    onThemeChange(selectedTheme);
    onLanguageChange(selectedLanguage);
    onClose();
  }

  return (
    <ModalFrame title="个人配置" subtitle="管理你的头像、显示名称和界面偏好。" onClose={onClose}>
      <form className="modal-content profile-settings-form" onSubmit={submit}>
        <div className="profile-settings-identity">
          <span className="profile-avatar-preview">{avatar ? <img src={avatar} alt="头像预览" /> : <UserRound />}</span>
          <div className="profile-upload-copy">
            <label className="profile-upload-button"><Camera />上传头像<input type="file" accept="image/png,image/jpeg,image/webp,image/gif" onChange={chooseAvatar} /></label>
            <p>支持常见图片格式，最大 2 MB。</p>
          </div>
        </div>
        <label className="form-field"><span>显示名称</span><input value={displayName} onChange={(event) => setDisplayName(event.target.value)} placeholder="例如：KazeRush" maxLength={40} /></label>
        <div className="profile-preferences-grid">
          <div className="profile-preference"><span>主题</span><div className="profile-option-row">
            <button type="button" className={selectedTheme === "light" ? "selected" : ""} onClick={() => setSelectedTheme("light")}><Sun />亮色</button>
            <button type="button" className={selectedTheme === "dark" ? "selected" : ""} onClick={() => setSelectedTheme("dark")}><Moon />星空暗色</button>
          </div></div>
          <div className="profile-preference"><span>语言</span><div className="profile-option-row">
            <button type="button" className={selectedLanguage === "zh" ? "selected" : ""} onClick={() => setSelectedLanguage("zh")}>中文</button>
            <button type="button" className={selectedLanguage === "en" ? "selected" : ""} onClick={() => setSelectedLanguage("en")}>English</button>
          </div></div>
        </div>
        <div className="profile-security-card"><KeyRound /><div><strong>管理员账号与密码</strong><p>当前管理员用户名和密码由服务器安全配置管理，网页端尚未提供安全修改入口。</p></div></div>
        <p className="profile-local-note">头像和显示名称保存在当前浏览器；要同步到其他设备，需要配套的服务端个人资料接口。</p>
        {error && <div className="form-error" role="alert">{error}</div>}
        <div className="modal-footer"><span /><div className="modal-footer-right"><button className="ghost-button" type="button" onClick={onClose}>取消</button><button className="primary-button" type="submit">保存配置<Check /></button></div></div>
      </form>
    </ModalFrame>
  );
}

function GroupDialog({ group, nextOrder, onClose, onSave, onDelete }: {
  group?: NavGroup;
  nextOrder: number;
  onClose: () => void;
  onSave: (id: number | null, draft: GroupDraft) => Promise<void>;
  onDelete: (group: NavGroup) => Promise<void>;
}) {
  const [name, setName] = useState(group?.name ?? "");
  const [visibility, setVisibility] = useState<PublicFlag>(group?.is_public ?? 1);
  const [error, setError] = useState("");
  const [busy, setBusy] = useState(false);
  async function submit(event: FormEvent<HTMLFormElement>) {
    event.preventDefault();
    if (!name.trim()) return setError("请填写分类名称。");
    setError("");
    setBusy(true);
    try {
      await onSave(group?.id ?? null, { name: name.trim(), order_num: group?.order_num ?? nextOrder, is_public: visibility });
      onClose();
    } catch (reason) {
      setError(reason instanceof Error ? reason.message : "保存失败。");
    } finally {
      setBusy(false);
    }
  }
  async function remove() {
    if (!group || !window.confirm(`删除“${group.name}”？分类下的站点也会一并删除。`)) return;
    setBusy(true);
    try { await onDelete(group); onClose(); } catch (reason) { setError(reason instanceof Error ? reason.message : "删除失败。"); setBusy(false); }
  }
  return (
    <ModalFrame title={group ? "编辑分类" : "新建分类"} subtitle="分类是你的导航一级结构，可单独设置公开或私密。" onClose={onClose}>
      <form className="modal-content" onSubmit={submit}>
        <label className="form-field"><span>分类名称</span><input value={name} onChange={(event) => setName(event.target.value)} placeholder="例如：设计灵感" maxLength={40} autoFocus /></label>
        <div className="form-field"><label>可见范围</label><VisibilityChoice value={visibility} onChange={setVisibility} /></div>
        {error && <div className="form-error" role="alert">{error}</div>}
        <div className="modal-footer">
          <div className="modal-footer-left">{group && <button className="danger-button" type="button" onClick={() => void remove()} disabled={busy}>删除分类</button>}</div>
          <div className="modal-footer-right"><button className="ghost-button" type="button" onClick={onClose}>取消</button><button className="primary-button" type="submit" disabled={busy}>{busy ? "保存中…" : "保存分类"}<Check /></button></div>
        </div>
      </form>
    </ModalFrame>
  );
}

function SiteDialog({ site, groups, defaultGroupId, onClose, onSave, onDelete }: {
  site?: Site;
  groups: NavGroup[];
  defaultGroupId?: number;
  onClose: () => void;
  onSave: (id: number | null, draft: SiteDraft) => Promise<void>;
  onDelete: (site: Site) => Promise<void>;
}) {
  const [name, setName] = useState(site?.name ?? "");
  const [url, setUrl] = useState(site?.url ?? "https://");
  const [description, setDescription] = useState(site?.description ?? "");
  const [notes, setNotes] = useState(site?.notes ?? "");
  const [icon, setIcon] = useState(site?.icon ?? "");
  const [iconNotice, setIconNotice] = useState("");
  const [groupId, setGroupId] = useState(site?.group_id ?? defaultGroupId ?? groups[0]?.id ?? 0);
  const [visibility, setVisibility] = useState<PublicFlag>(site?.is_public ?? 1);
  const [error, setError] = useState("");
  const [busy, setBusy] = useState(false);
  async function submit(event: FormEvent<HTMLFormElement>) {
    event.preventDefault();
    if (!name.trim()) return setError("请填写网站名称。");
    let websiteUrl: string;
    let normalizedIcon: string;
    try { websiteUrl = normalizeWebsiteUrl(url); normalizedIcon = normalizeIconInput(icon); }
    catch (reason) { return setError(reason instanceof Error ? reason.message : "请检查网址或图标。"); }
    if (!groupId) return setError("请先创建一个分类。");
    setError("");
    setBusy(true);
    const draft: SiteDraft = {
      group_id: Number(groupId),
      name: name.trim(),
      url: websiteUrl,
      icon: normalizedIcon,
      description: description.trim(),
      notes: notes.trim(),
      order_num: site?.order_num ?? Math.max(0, ...groups.flatMap((group) => group.sites.map((item) => item.order_num))) + 1,
      is_public: visibility,
    };
    try { await onSave(site?.id ?? null, draft); onClose(); } catch (reason) { setError(reason instanceof Error ? reason.message : "保存失败。"); } finally { setBusy(false); }
  }
  async function remove() {
    if (!site || !window.confirm(`删除“${site.name}”？`)) return;
    setBusy(true);
    try { await onDelete(site); onClose(); } catch (reason) { setError(reason instanceof Error ? reason.message : "删除失败。"); setBusy(false); }
  }
  let previewIcon = "";
  try { previewIcon = normalizeIconInput(icon); } catch { /* Invalid draft icons use the name until corrected. */ }
  function getWebsiteIcon() {
    try {
      const website = normalizeWebsiteUrl(url);
      setIcon(faviconUrl(website));
      setUrl(website);
      setIconNotice("正在加载网站图标…");
      setError("");
    } catch (reason) {
      setError(reason instanceof Error ? reason.message : "请先填写有效的网站地址。");
    }
  }
  function chooseSiteIcon(event: ChangeEvent<HTMLInputElement>) {
    const file = event.currentTarget.files?.[0];
    event.currentTarget.value = "";
    if (!file) return;
    if (!["image/png", "image/jpeg", "image/gif", "image/webp", "image/avif", "image/x-icon", "image/vnd.microsoft.icon"].includes(file.type) || file.size > 256 * 1024) {
      setError("请选择 PNG、JPEG、GIF、WebP、AVIF 或 ICO 图标，最大 256 KB。");
      return;
    }
    const reader = new FileReader();
    reader.onload = () => {
      if (typeof reader.result !== "string") return setError("图标读取失败，请重试。");
      setIcon(reader.result);
      setIconNotice("已选择自己的图标");
      setError("");
    };
    reader.onerror = () => setError("图标读取失败，请重试。");
    reader.readAsDataURL(file);
  }
  return (
    <ModalFrame title={site ? "编辑网站" : "添加网站"} subtitle="公开介绍会展示给访客；私密备注仅管理员可见。" onClose={onClose}>
      <form className="modal-content" onSubmit={submit}>
        <label className="form-field"><span>网站名称</span><input value={name} onChange={(event) => setName(event.target.value)} placeholder="例如：Figma" maxLength={60} autoFocus /></label>
        <label className="form-field"><span>网址</span><input value={url} onChange={(event) => setUrl(event.target.value)} placeholder="https://example.com" inputMode="url" /></label>
        <label className="form-field"><span>所属分类</span><select value={groupId} onChange={(event) => setGroupId(Number(event.target.value))}>{groups.map((group) => <option key={group.id} value={group.id}>{group.name}{isPublic(group.is_public) ? " · 公开" : " · 私密"}</option>)}</select></label>
        <label className="form-field"><span>一句介绍 <span className="form-hint">可公开显示</span></span><textarea value={description} onChange={(event) => setDescription(event.target.value)} placeholder="这是什么？为什么值得收藏？" maxLength={180} /></label>
        <label className="form-field"><span>私密备注</span><textarea value={notes} onChange={(event) => setNotes(event.target.value)} placeholder="只有登录管理后才能查看" maxLength={500} /></label>
        <div className="site-icon-field">
          <label className="form-field" htmlFor="site-icon-input"><span>图标文字或图片地址 <span className="form-hint">可留空</span></span></label>
          <div className="site-icon-input-row"><input id="site-icon-input" value={icon} onChange={(event) => { setIcon(event.target.value); setIconNotice(""); }} placeholder="例如：GH 或 https://…/icon.png" /><button className="ghost-button" type="button" onClick={getWebsiteIcon}><Globe />一键获取</button></div>
          <div className="site-icon-preview-row"><SiteAvatar site={{ name: name || "网站", icon: previewIcon }} onImageLoad={() => setIconNotice("图标已加载")} onImageError={() => setIconNotice("图标加载失败，已使用名称缩写。可填写其他图片地址，或上传自己的图标。")} /><div><span className="site-icon-preview-caption">图标预览</span><p className="site-icon-help">根据网站域名获取图标，也可输入文字、图片地址或上传图片。</p><label className="site-icon-upload"><Camera />上传图标<input type="file" accept="image/png,image/jpeg,image/gif,image/webp,image/avif,image/x-icon,image/vnd.microsoft.icon" onChange={chooseSiteIcon} /></label></div></div>
          {iconNotice && <p className="site-icon-notice" role="status">{iconNotice}</p>}
        </div>
        <div className="form-field"><label>可见范围</label><VisibilityChoice value={visibility} onChange={setVisibility} /></div>
        {error && <div className="form-error" role="alert">{error}</div>}
        <div className="modal-footer">
          <div className="modal-footer-left">{site && <button className="danger-button" type="button" onClick={() => void remove()} disabled={busy}>删除网站</button>}</div>
          <div className="modal-footer-right"><button className="ghost-button" type="button" onClick={onClose}>取消</button><button className="primary-button" type="submit" disabled={busy}>{busy ? "保存中…" : "保存网站"}<Check /></button></div>
        </div>
      </form>
    </ModalFrame>
  );
}

type ThemeMode = "light" | "dark";
const THEME_KEY = "navi.theme.v1";
type UiLanguage = "zh" | "en";
const LANGUAGE_KEY = "navi.language.v1";
const PROFILE_KEY = "navi.profile.v1";

function getInitialProfile(): ProfileSettings {
  const fallback = { displayName: "站长", avatar: "" };
  try {
    const raw = localStorage.getItem(PROFILE_KEY);
    if (!raw) return fallback;
    const value = JSON.parse(raw) as Record<string, unknown>;
    return {
      displayName: typeof value.displayName === "string" ? value.displayName.slice(0, 40) : fallback.displayName,
      avatar: typeof value.avatar === "string" && /^data:image\/(png|jpeg|webp|gif);base64,/i.test(value.avatar) ? value.avatar : "",
    };
  } catch {
    return fallback;
  }
}

const UI_TEXT = {
  zh: {
    allSites: "所有网站", favorites: "收藏", recent: "最近", categories: "分类", allCategories: "全部分类",
    search: "搜索网站、简介或网址", searchLabel: "搜索网站", all: "全部", favoriteHint: "你收藏的网站会出现在这里。",
    recentHint: "最近打开过的网站会显示在这里。", allHint: "公开精选，按类别轻松浏览。", login: "登录", logout: "退出",
    statsCategories: "个分类", statsSites: "个网站", wish: "愿你今天灵感常在，也能轻松找到所需的网站。",
    emptySearch: "没有找到匹配的网站", emptyFavorites: "还没有收藏", emptyRecent: "还没有最近访问", empty: "这里暂时还没有内容",
    searchAgain: "试试更短的关键词，或清除搜索条件。", privateEmpty: "站长还没有公开这个分类中的内容。登录后可查看完整导航。",
    publicFooter: "只展示公开内容", adminFooter: "完整空间，仅管理员可管理", loading: "正在整理导航内容…",
  },
  en: {
    allSites: "All websites", favorites: "Favorites", recent: "Recent", categories: "Categories", allCategories: "All categories",
    search: "Search sites, descriptions or URLs", searchLabel: "Search websites", all: "All", favoriteHint: "Your starred websites will appear here.",
    recentHint: "Websites you opened recently will appear here.", allHint: "A hand-picked collection, easy to browse by category.", login: "Log in", logout: "Log out",
    statsCategories: "categories", statsSites: "websites", wish: "May good ideas find you, and the right sites be close at hand.",
    emptySearch: "No matching websites", emptyFavorites: "No favorites yet", emptyRecent: "No recent visits yet", empty: "Nothing here yet",
    searchAgain: "Try a shorter keyword or clear your search.", privateEmpty: "The owner has not shared anything in this category. Log in to see the full collection.",
    publicFooter: "Only public links are shown", adminFooter: "Full space · Admin only", loading: "Gathering your links…",
  },
} as const;

function getInitialTheme(): ThemeMode {
  try { return localStorage.getItem(THEME_KEY) === "dark" ? "dark" : "light"; }
  catch { return "light"; }
}

function getInitialLanguage(): UiLanguage {
  try { return localStorage.getItem(LANGUAGE_KEY) === "en" ? "en" : "zh"; }
  catch { return "zh"; }
}

function App() {
  const [groups, setGroups] = useState<NavGroup[]>([]);
  const [favorites, setFavorites] = useState<number[]>([]);
  const [recent, setRecent] = useState<number[]>([]);
  const [authenticated, setAuthenticated] = useState(false);
  const [previewAdmin, setPreviewAdmin] = useState(DEMO_MODE && new URLSearchParams(window.location.search).get("preview") === "admin");
  const [loading, setLoading] = useState(true);
  const [loadError, setLoadError] = useState("");
  const [activeGroup, setActiveGroup] = useState<number | null>(null);
  const [activeFilter, setActiveFilter] = useState<ContentFilter>("all");
  const [search, setSearch] = useState("");
  const [dialog, setDialog] = useState<DialogState>(null);
  const [toast, setToast] = useState("");
  const [profile, setProfile] = useState<ProfileSettings>(getInitialProfile);
  const [theme, setTheme] = useState<ThemeMode>(getInitialTheme);
  const [language, setLanguage] = useState<UiLanguage>(getInitialLanguage);
  const [visitorCity, setVisitorCity] = useState<string | null>(null);
  const isAdmin = DEMO_MODE ? previewAdmin : authenticated;
  const text = UI_TEXT[language];

  async function refresh(showSpinner = false) {
    if (showSpinner) setLoading(true);
    setLoadError("");
    try {
      const data: InitialData = await loadInitialData();
      setGroups(data.groups);
      setFavorites(data.favorites);
      setRecent(data.recent);
      setAuthenticated(data.authenticated);
    } catch (reason) {
      setLoadError(reason instanceof Error ? reason.message : "导航暂时无法加载。");
    } finally {
      setLoading(false);
    }
  }

  useEffect(() => { void refresh(true); }, []);
  useEffect(() => {
    document.documentElement.dataset.theme = theme;
    try { localStorage.setItem(THEME_KEY, theme); } catch { /* 主题仍可在当前页面切换 */ }
  }, [theme]);
  useEffect(() => {
    try { localStorage.setItem(LANGUAGE_KEY, language); } catch { /* 语言仍可在当前页面切换 */ }
  }, [language]);
  useEffect(() => {
    try { localStorage.setItem(PROFILE_KEY, JSON.stringify(profile)); } catch { /* 配置仍可在当前页面使用 */ }
  }, [profile]);
  useEffect(() => {
    if (DEMO_MODE || isAdmin || loading) return;
    let current = true;
    void loadVisitorCity().then((city) => { if (current) setVisitorCity(city); });
    return () => { current = false; };
  }, [isAdmin, loading]);
  useEffect(() => {
    if (!toast) return;
    const timer = window.setTimeout(() => setToast(""), 2400);
    return () => window.clearTimeout(timer);
  }, [toast]);

  const availableGroups = useMemo(() => groups.filter((group) => isAdmin || isPublic(group.is_public)), [groups, isAdmin]);
  const visibleGroups = useMemo(() => availableGroups
    .map((group) => ({
      ...group,
      sites: group.sites.filter((site) => (isAdmin || isPublic(site.is_public))
        && (activeFilter === "all" || (activeFilter === "favorites" ? favorites.includes(site.id) : recent.includes(site.id)))
        && (!search.trim() || `${site.name} ${site.description ?? ""} ${site.url}`.toLowerCase().includes(search.trim().toLowerCase())),
      ),
    }))
    .filter((group) => activeGroup === null || group.id === activeGroup)
    .filter((group) => group.sites.length > 0 || (isAdmin && activeFilter === "all" && !search.trim())),
  [availableGroups, isAdmin, activeFilter, favorites, recent, search, activeGroup]);
  const visibleCount = visibleGroups.reduce((sum, group) => sum + group.sites.length, 0);
  const publicCategoryCount = groups.filter((group) => isPublic(group.is_public)).length;
  const publicSiteCount = groups.filter((group) => isPublic(group.is_public)).reduce((sum, group) => sum + group.sites.filter((site) => isPublic(site.is_public)).length, 0);
  const hour = new Date().getHours();
  const greeting = hour < 5
    ? (language === "zh" ? "夜深了" : "Up late")
    : hour < 12
      ? (language === "zh" ? "早上好" : "Good morning")
      : hour < 18
        ? (language === "zh" ? "下午好" : "Good afternoon")
        : (language === "zh" ? "晚上好" : "Good evening");
  const welcomeTitle = language === "zh"
    ? visitorCity ? `${greeting}，来自${visitorCity}的朋友` : `${greeting}，欢迎来访`
    : visitorCity ? `${greeting}, friend from ${visitorCity}` : `${greeting}, welcome`;
  const activeTitle = activeFilter === "favorites" ? text.favorites : activeFilter === "recent" ? text.recent : activeGroup === null ? text.allSites : groups.find((group) => group.id === activeGroup)?.name ?? text.allSites;

  async function handleFavorite(siteId: number) {
    const exists = favorites.includes(siteId);
    try {
      const next = await toggleFavorite(siteId, exists);
      setFavorites(next);
      setToast(exists ? "已取消收藏" : "已加入收藏");
    } catch (reason) { setToast(reason instanceof Error ? reason.message : "收藏操作失败"); }
  }

  async function handleVisit(siteId: number) {
    try { const next = await recordVisit(siteId); setRecent(next); } catch { /* 跳转不应被偏好记录阻断 */ }
  }

  async function handleLogin(username: string, password: string, remember: boolean) {
    await login(username, password, remember);
    if (DEMO_MODE) {
      setPreviewAdmin(true);
      setToast("已进入本地完整视图");
      return;
    }
    const data = await loadInitialData();
    setGroups(data.groups);
    setFavorites(data.favorites);
    setRecent(data.recent);
    setAuthenticated(true);
    setToast("登录成功，已解锁管理空间");
  }

  async function handleLogout() {
    if (DEMO_MODE) {
      setPreviewAdmin(false);
      setActiveGroup(null);
      setActiveFilter("all");
      setToast("已返回公开预览");
      return;
    }
    await logout();
    setAuthenticated(false);
    setActiveGroup(null);
    setActiveFilter("all");
    await refresh(true);
    setToast("已退出管理空间");
  }

  async function handleSaveGroup(id: number | null, draft: GroupDraft) {
    await saveGroup(id, draft);
    await refresh();
    setToast(id === null ? "分类已创建" : "分类已更新");
  }
  async function handleDeleteGroup(group: NavGroup) {
    await deleteGroup(group.id);
    setActiveGroup(null);
    await refresh();
    setToast("分类已删除");
  }
  async function handleSaveSite(id: number | null, draft: SiteDraft) {
    await saveSite(id, draft);
    await refresh();
    setToast(id === null ? "网站已添加" : "网站已更新");
  }
  async function handleDeleteSite(site: Site) {
    await deleteSite(site.id);
    await refresh();
    setToast("网站已删除");
  }

  function selectGroup(id: number | null) {
    setActiveGroup(id);
    setActiveFilter("all");
    if (!isAdmin) window.requestAnimationFrame(() => document.getElementById("navigation-results")?.scrollIntoView({ behavior: "smooth", block: "start" }));
  }
  function setFilter(filter: ContentFilter) { setActiveFilter(filter); setActiveGroup(null); }
  function openLogin() { setDialog({ kind: "login" }); }

  const categoryList = availableGroups.filter((group) => isAdmin || isPublic(group.is_public));

  return (
    <div className={`app-shell ${isAdmin ? "admin-mode" : "visitor-mode"}`}>
      <main className={`main-shell ${isAdmin ? "admin-shell" : "visitor-shell"}`}>
        <header className={`topbar ${isAdmin ? "admin-topbar" : "visitor-topbar"}`}>
          <div className="topbar-left">
            {isAdmin ? <>
              <div className="visitor-brand admin-topbar-brand"><span className="brand-mark"><Compass /></span><span><span className="brand-name">navi</span><span className="brand-caption">A PERSONAL SPACE</span></span></div>
              <span className="topbar-divider" />
              <div className="breadcrumb"><span>导航空间</span><ChevronRight /><strong>{activeTitle}</strong></div>
            </> : <div className="visitor-brand"><span className="brand-mark"><Compass /></span><span><span className="brand-name">navi</span><span className="brand-caption">A PERSONAL SPACE</span></span></div>}
          </div>
          <div className="topbar-actions">
            <button className="theme-toggle" type="button" onClick={() => setTheme((current) => current === "light" ? "dark" : "light")} aria-label={theme === "light" ? (language === "zh" ? "切换到星空暗色主题" : "Switch to midnight theme") : (language === "zh" ? "切换到柔和亮色主题" : "Switch to soft light theme")} title={theme === "light" ? (language === "zh" ? "切换暗色主题" : "Switch theme") : (language === "zh" ? "切换亮色主题" : "Switch theme")}>{theme === "light" ? <Moon /> : <Sun />}</button>
            <button className="language-toggle" type="button" onClick={() => setLanguage((current) => current === "zh" ? "en" : "zh")} aria-label={language === "zh" ? "Switch to English" : "切换到中文"} title={language === "zh" ? "Switch to English" : "切换到中文"}><Languages /><span>{language === "zh" ? "EN" : "中文"}</span></button>
            {isAdmin && <button className="profile-button" type="button" onClick={() => setDialog({ kind: "profile" })} aria-label="个人配置" title="个人配置"><span className="profile-button-avatar">{profile.avatar ? <img src={profile.avatar} alt="" /> : <UserRound />}</span><span>个人配置</span></button>}
            {isAdmin
              ? <button className="manage-button" type="button" onClick={() => void handleLogout()}><LogOut />{text.logout}</button>
              : <button className="login-button" type="button" onClick={DEMO_MODE ? () => setPreviewAdmin(true) : openLogin}><LogIn />{text.login}</button>}
          </div>
        </header>

        {isAdmin && (
          <div className="manage-notice"><ShieldCheck /><span><strong>{DEMO_MODE ? "本地完整视图" : "管理模式已开启"}</strong> · 私密分类和链接仅在当前登录态下加载，公开介绍与私密备注分开管理。</span></div>
        )}
        {loadError && !DEMO_MODE && <div className="form-error" role="alert">{loadError} <button type="button" onClick={() => void refresh(true)}>重试</button></div>}

        {!isAdmin && (
          <section className="visitor-welcome" aria-label={language === "zh" ? "访客问候" : "A welcome for visitors"}>
            <span className="welcome-mark">{hour < 5 || hour >= 18 ? <Moon /> : <Sun />}</span>
            <div className="welcome-copy"><p className="welcome-eyebrow">{language === "zh" ? "给来访的你，一句问候" : "A LITTLE HELLO FOR YOU"}</p><h1>{welcomeTitle}</h1><p>{text.wish}</p></div>
            <div className="welcome-stats"><span><strong>{publicCategoryCount}</strong><small>{text.statsCategories}</small></span><i /><span><strong>{publicSiteCount}</strong><small>{text.statsSites}</small></span></div>
          </section>
        )}

        <PosterCarousel language={language} />

        <section className={`content-toolbar ${!isAdmin ? "visitor-sticky-toolbar" : ""}`} id={!isAdmin ? "visitor-categories" : undefined}>
          {!isAdmin ? (
            <div className="visitor-toolbar-row">
              <div className="visitor-toolbar-topline">
                <div className="section-title"><h2>{activeTitle}</h2></div>
                <div className="filter-tabs" role="group" aria-label={language === "zh" ? "筛选内容" : "Filter links"}>
                  <button className={activeFilter === "all" ? "active" : ""} onClick={() => setFilter("all")}><LayoutGrid />{text.all}</button>
                  <button className={activeFilter === "favorites" ? "active" : ""} onClick={() => setFilter("favorites")}><Star />{text.favorites}</button>
                  <button className={activeFilter === "recent" ? "active" : ""} onClick={() => setFilter("recent")}><Clock3 />{text.recent}</button>
                </div>
              </div>
              <div className="visitor-toolbar-bottomline">
                <nav className="visitor-category-strip" aria-label={language === "zh" ? "按分类筛选网站" : "Filter by category"}>
                  <span className="category-strip-label"><Folder />{text.categories}</span>
                  <button className={`category-chip ${activeGroup === null && activeFilter === "all" ? "active" : ""}`} type="button" onClick={() => selectGroup(null)}>{text.allCategories}</button>
                  {categoryList.map((group, index) => <button key={group.id} className={`category-chip ${activeGroup === group.id ? "active" : ""}`} type="button" onClick={() => selectGroup(group.id)}><span className={`category-chip-dot tone-${index % 4}`} />{group.name}<span className="category-chip-count">{group.sites.filter((site) => isPublic(site.is_public)).length}</span></button>)}
                </nav>
                <label className="search-box"><Search /><input value={search} onChange={(event) => setSearch(event.target.value)} placeholder={text.search} aria-label={text.searchLabel} />{search && <button type="button" className="clear-search" aria-label={language === "zh" ? "清除搜索" : "Clear search"} onClick={() => setSearch("")}><X /></button>}</label>
              </div>
            </div>
          ) : (
            <div className="admin-toolbar">
              <div className="admin-toolbar-topline">
                <div className="section-title"><h2>{activeTitle}</h2><p>{activeFilter === "favorites" ? text.favoriteHint : activeFilter === "recent" ? text.recentHint : "在一个地方整理你的常用链接。"}</p></div>
                <div className="admin-toolbar-controls">
                <div className="filter-tabs" role="group" aria-label={language === "zh" ? "筛选内容" : "Filter links"}>
                  <button className={activeFilter === "all" ? "active" : ""} onClick={() => setFilter("all")}><LayoutGrid />{text.all}</button>
                  <button className={activeFilter === "favorites" ? "active" : ""} onClick={() => setFilter("favorites")}><Star />{text.favorites}</button>
                  <button className={activeFilter === "recent" ? "active" : ""} onClick={() => setFilter("recent")}><Clock3 />{text.recent}</button>
                </div>
                <label className="search-box"><Search /><input value={search} onChange={(event) => setSearch(event.target.value)} placeholder={text.search} aria-label={text.searchLabel} />{search && <button type="button" className="clear-search" aria-label={language === "zh" ? "清除搜索" : "Clear search"} onClick={() => setSearch("")}><X /></button>}</label>
                <button className="primary-button" type="button" onClick={() => setDialog({ kind: "site", groupId: activeGroup ?? groups[0]?.id })}><Plus />添加网站</button>
                </div>
              </div>
              <nav className={`visitor-category-strip admin-category-strip ${categoryList.length <= 4 ? "category-fit" : "category-scroll"}`} style={{ gridTemplateColumns: `repeat(${Math.min(categoryList.length + 1, 5)}, minmax(0, 1fr))` }} aria-label="管理分类">
                <span className="category-strip-label"><Folder />分类</span>
                <button className={`category-chip ${activeGroup === null && activeFilter === "all" ? "active" : ""}`} type="button" onClick={() => selectGroup(null)}>全部分类</button>
                {categoryList.map((group, index) => <button key={group.id} className={`category-chip ${activeGroup === group.id ? "active" : ""}`} type="button" onClick={() => selectGroup(group.id)}><span className={`category-chip-dot tone-${index % 4}`} />{group.name}<span className="category-chip-count">{group.sites.length}</span></button>)}
                <button className="admin-add-category-chip" type="button" onClick={() => setDialog({ kind: "group" })}><Plus />新建分类</button>
              </nav>
            </div>
          )}
        </section>

        <div id="navigation-results" className={!isAdmin ? "visitor-results" : ""}>
          {loading ? (
            <div className="loading-state"><span className="loading-spinner" />{text.loading}</div>
          ) : visibleGroups.length === 0 ? (
            <div className="empty-state"><Compass /><strong>{search ? text.emptySearch : activeFilter === "favorites" ? text.emptyFavorites : activeFilter === "recent" ? text.emptyRecent : text.empty}</strong><p>{search ? text.searchAgain : isAdmin ? "添加一个分类或网站，让你的导航空间开始成形。" : text.privateEmpty}</p>{isAdmin && <button className="primary-button" type="button" onClick={() => setDialog({ kind: "site", groupId: groups[0]?.id })}><Plus />添加网站</button>}</div>
          ) : (
            visibleGroups.map((group) => (
              <section className="group-section" key={group.id}>
                <div className="group-heading">
                  <div className="group-heading-left"><span className="group-icon"><Folder /></span><h3>{group.name}</h3><span className="group-meta">{group.sites.length} {language === "zh" ? "个网站" : "sites"}</span>{isAdmin && <PrivacyBadge value={group.is_public} />}</div>
                  {isAdmin && <div className="group-heading-actions"><button type="button" onClick={() => setDialog({ kind: "site", groupId: group.id })}><Plus />添加</button><button type="button" onClick={() => setDialog({ kind: "group", group })}><Pencil />编辑分类</button></div>}
                </div>
                <div className="site-grid">
                  {group.sites.map((site) => <SiteCard key={site.id} site={site} favorite={favorites.includes(site.id)} admin={isAdmin} onFavorite={(id) => void handleFavorite(id)} onVisit={(id) => void handleVisit(id)} onEdit={(item) => setDialog({ kind: "site", site: item, groupId: group.id })} />)}
                </div>
              </section>
            ))
          )}
        </div>

        <footer className="page-footer"><span>{language === "zh" ? `已显示 ${visibleCount} 个网站` : `Showing ${visibleCount} websites`}</span><span className="footer-separator">·</span><span>{isAdmin ? text.adminFooter : text.publicFooter}</span><span className="footer-spacer" />{isAdmin && groups.length > 0 && <button type="button" onClick={() => setDialog({ kind: "group" })}><Plus />新增分类</button>}</footer>
        {!isAdmin && <nav className="visitor-mobile-dock" aria-label={language === "zh" ? "快速选择分类" : "Quick category selector"}>
          <button className={`dock-item ${activeGroup === null && activeFilter === "all" ? "active" : ""}`} type="button" onClick={() => selectGroup(null)} aria-pressed={activeGroup === null && activeFilter === "all"}><span className="dock-icon"><LayoutGrid /></span><span>{text.all}</span></button>
          {categoryList.map((group, index) => <button key={group.id} className={`dock-item ${activeGroup === group.id ? "active" : ""}`} type="button" onClick={() => selectGroup(group.id)} aria-pressed={activeGroup === group.id}><span className={`dock-icon tone-${index % 4}`}><Folder /></span><span>{group.name}</span></button>)}
        </nav>}
      </main>

      {dialog?.kind === "login" && <LoginDialog onClose={() => setDialog(null)} onLogin={handleLogin} />}
      {dialog?.kind === "profile" && <ProfileDialog profile={profile} theme={theme} language={language} onClose={() => setDialog(null)} onSave={(next) => { setProfile(next); setToast("个人配置已保存在此浏览器"); }} onThemeChange={setTheme} onLanguageChange={setLanguage} />}
      {dialog?.kind === "group" && <GroupDialog group={dialog.group} nextOrder={groups.length + 1} onClose={() => setDialog(null)} onSave={handleSaveGroup} onDelete={handleDeleteGroup} />}
      {dialog?.kind === "site" && <SiteDialog site={dialog.site} groups={groups} defaultGroupId={dialog.groupId} onClose={() => setDialog(null)} onSave={handleSaveSite} onDelete={handleDeleteSite} />}
      {toast && <div className="toast" role="status"><Check />{toast}</div>}
    </div>
  );
}

export default App;
