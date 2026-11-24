import { useState, type ChangeEvent } from "react";
import { Globe, ImageUp, Lock, Trash2, WandSparkles } from "lucide-react";
import { errorMessage, isUnauthorized } from "@/shared/api/http";
import { faviconUrl, normalizeIconInput, normalizeWebsiteUrl } from "@/shared/lib/site-icons";
import { Overlay } from "@/shared/ui/Overlay";
import { createSite, deleteSite, updateSite } from "./api";
import { NavCard } from "./NavCard";
import { LIMITS, type NavGroup, type NavSite, type SiteInput } from "./types";
import "./editor.css";

type SiteEditorProps = {
  site?: NavSite;
  groups: NavGroup[];
  defaultGroupId?: number;
  onClose: () => void;
  onDone: (message: string) => void;
  onUnauthorized: () => void;
};

const ICON_TYPES = ["image/png", "image/jpeg", "image/gif", "image/webp", "image/avif", "image/x-icon", "image/vnd.microsoft.icon"];
const ICON_MAX_BYTES = 256 * 1024;

export function SiteEditor({ site, groups, defaultGroupId, onClose, onDone, onUnauthorized }: SiteEditorProps) {
  const [draft, setDraft] = useState({
    name: site?.name ?? "",
    url: site?.url ?? "",
    icon: site?.icon ?? "",
    description: site?.description ?? "",
    notes: site?.notes ?? "",
    groupId: site?.groupId ?? defaultGroupId ?? groups[0]?.id ?? 0,
    isPublic: site?.isPublic ?? true,
  });
  const [error, setError] = useState("");
  const [busy, setBusy] = useState(false);
  const [confirmDelete, setConfirmDelete] = useState(false);
  const group = groups.find((item) => item.id === draft.groupId);
  const set = <K extends keyof typeof draft>(key: K, value: (typeof draft)[K]) => { setDraft((current) => ({ ...current, [key]: value })); setError(""); };

  let previewIcon: string | null = null;
  try { previewIcon = normalizeIconInput(draft.icon) || null; } catch { /* 图标有误时预览先用名称首字 */ }
  let previewUrl = draft.url;
  try { previewUrl = normalizeWebsiteUrl(draft.url); } catch { /* 网址有误时预览不显示域名 */ }

  function fetchIcon() {
    try { set("icon", faviconUrl(draft.url)); }
    catch (reason) { setError(errorMessage(reason, "请先填写有效的网址。")); }
  }

  function uploadIcon(event: ChangeEvent<HTMLInputElement>) {
    const file = event.currentTarget.files?.[0];
    event.currentTarget.value = "";
    if (!file) return;
    if (!ICON_TYPES.includes(file.type) || file.size > ICON_MAX_BYTES) {
      setError("请选择 PNG、JPEG、GIF、WebP、AVIF 或 ICO 图片，最大 256 KB。");
      return;
    }
    const reader = new FileReader();
    reader.onload = () => { if (typeof reader.result === "string") set("icon", reader.result); };
    reader.onerror = () => setError("图片读取失败，请重试。");
    reader.readAsDataURL(file);
  }

  function validate(): SiteInput | null {
    const name = draft.name.trim();
    if (!name) { setError("请填写网站名称。"); return null; }
    if ([...name].length > LIMITS.siteName) { setError(`网站名称请控制在 ${LIMITS.siteName} 个字以内。`); return null; }
    if (!group) { setError("请先选择一个分类。"); return null; }
    let url: string;
    let icon: string;
    try { url = normalizeWebsiteUrl(draft.url); icon = normalizeIconInput(draft.icon); }
    catch (reason) { setError(errorMessage(reason)); return null; }
    if ([...draft.description.trim()].length > LIMITS.description) { setError(`介绍请控制在 ${LIMITS.description} 个字以内。`); return null; }
    if ([...draft.notes.trim()].length > LIMITS.notes) { setError(`备注请控制在 ${LIMITS.notes} 个字以内。`); return null; }
    return { groupId: group.id, name, url, icon: icon || null, description: draft.description.trim(), notes: draft.notes.trim(), isPublic: draft.isPublic };
  }

  async function run(action: () => Promise<unknown>, message: string) {
    setBusy(true);
    try { await action(); onDone(message); }
    catch (reason) {
      if (isUnauthorized(reason)) { onUnauthorized(); onClose(); return; }
      setError(errorMessage(reason, "保存失败，请重试。"));
    } finally { setBusy(false); }
  }

  function save() {
    const input = validate();
    if (!input) return;
    void run(() => (site ? updateSite(site.id, input) : createSite(input)), site ? "已保存" : "已添加站点");
  }

  function remove() {
    if (!site) return;
    if (!confirmDelete) { setConfirmDelete(true); return; }
    void run(() => deleteSite(site.id), `已删除「${site.name}」`);
  }

  const footer = (
    <>
      {site && (
        <button className={confirmDelete ? "btn-danger" : "btn"} type="button" disabled={busy} onClick={remove}>
          <Trash2 />{confirmDelete ? "再点一次，确认删除" : "删除"}
        </button>
      )}
      <div className="overlay-foot-actions">
        <button className="btn" type="button" onClick={onClose}>取消</button>
        <button className="btn-primary" type="submit" disabled={busy}>{busy ? "正在保存…" : "保存"}</button>
      </div>
    </>
  );

  return (
    <Overlay variant="drawer" title={site ? "编辑站点" : "添加站点"} description="介绍会公开显示；备注只有站长能看到，也不会发给博客。" onClose={onClose} onSubmit={save} footer={footer}>
      <label className="field">
        <span className="field-label">名称</span>
        <input className="input" data-autofocus value={draft.name} maxLength={LIMITS.siteName} placeholder="例如：GitHub" onChange={(event) => set("name", event.target.value)} />
      </label>
      <label className="field">
        <span className="field-label">网址 <span className="field-hint">可以省略 https://</span></span>
        <input className="input" value={draft.url} inputMode="url" autoComplete="off" placeholder="github.com" onChange={(event) => set("url", event.target.value)} />
      </label>
      <label className="field">
        <span className="field-label">分类</span>
        <select className="select" value={draft.groupId} onChange={(event) => set("groupId", Number(event.target.value))}>
          {groups.map((item) => <option key={item.id} value={item.id}>{item.name}{item.isPublic ? "" : "（私密分类）"}</option>)}
        </select>
      </label>
      <label className="field">
        <span className="field-label">一句介绍 <span className="field-hint">公开</span></span>
        <textarea className="textarea" rows={2} value={draft.description} maxLength={LIMITS.description} placeholder="这是什么，为什么值得收藏" onChange={(event) => set("description", event.target.value)} />
      </label>
      <label className="field">
        <span className="field-label">备注 <span className="field-hint is-private">仅站长</span></span>
        <textarea className="textarea" rows={2} value={draft.notes} maxLength={LIMITS.notes} placeholder="账号提示、到期时间之类" onChange={(event) => set("notes", event.target.value)} />
      </label>
      <div className="field">
        <span className="field-label">图标 <span className="field-hint">可以留空，显示名称首字</span></span>
        <div className="editor-icon-row">
          <input className="input" value={draft.icon} placeholder="图片地址或 8 个字以内的文字" aria-label="图标" onChange={(event) => set("icon", event.target.value)} />
          <button className="btn" type="button" onClick={fetchIcon} title="按网址自动获取网站图标"><WandSparkles />获取</button>
          <label className="btn editor-upload" title="上传自己的图标">
            <ImageUp />上传
            <input type="file" accept={ICON_TYPES.join(",")} onChange={uploadIcon} />
          </label>
        </div>
      </div>
      <div className="field">
        <span className="field-label">谁能看到</span>
        <div className="editor-visibility" role="radiogroup" aria-label="可见范围">
          <button type="button" role="radio" aria-checked={draft.isPublic} onClick={() => set("isPublic", true)}>
            <Globe /><strong>公开</strong><small>访客和博客首页都能看到</small>
          </button>
          <button type="button" role="radio" aria-checked={!draft.isPublic} onClick={() => set("isPublic", false)}>
            <Lock /><strong>私密</strong><small>只有站长登录后可见</small>
          </button>
        </div>
        {group && !group.isPublic && draft.isPublic && <p className="editor-warn">所在分类是私密的，所以访客仍然看不到这个站点。</p>}
      </div>
      <div className="field">
        <span className="field-label">卡片预览 <span className="field-hint">博客首页显示同一张卡片</span></span>
        <div className="editor-preview">
          <NavCard preview site={{ name: draft.name, url: previewUrl, icon: previewIcon, description: draft.description.trim() }} isPrivate={!draft.isPublic || Boolean(group && !group.isPublic)} showPrivacy />
        </div>
      </div>
      {error && <div className="form-error" role="alert">{error}</div>}
    </Overlay>
  );
}
