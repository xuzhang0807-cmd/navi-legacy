import { useState } from "react";
import { Globe, Lock, Trash2 } from "lucide-react";
import { errorMessage, isUnauthorized } from "@/shared/api/http";
import { Overlay } from "@/shared/ui/Overlay";
import { createGroup, deleteGroup, updateGroup } from "./api";
import { LIMITS, type NavGroup } from "./types";
import "./editor.css";

type GroupEditorProps = {
  group?: NavGroup;
  onClose: () => void;
  onDone: (message: string) => void;
  onUnauthorized: () => void;
};

export function GroupEditor({ group, onClose, onDone, onUnauthorized }: GroupEditorProps) {
  const [name, setName] = useState(group?.name ?? "");
  const [isPublic, setIsPublic] = useState(group?.isPublic ?? true);
  const [error, setError] = useState("");
  const [busy, setBusy] = useState(false);
  const [confirmDelete, setConfirmDelete] = useState(false);
  const siteCount = group?.sites.length ?? 0;

  async function run(action: () => Promise<unknown>, message: string) {
    setBusy(true);
    try { await action(); onDone(message); }
    catch (reason) {
      if (isUnauthorized(reason)) { onUnauthorized(); onClose(); return; }
      setError(errorMessage(reason, "保存失败，请重试。"));
    } finally { setBusy(false); }
  }

  function save() {
    const value = name.trim();
    if (!value) { setError("请填写分类名称。"); return; }
    if ([...value].length > LIMITS.groupName) { setError(`分类名称请控制在 ${LIMITS.groupName} 个字以内。`); return; }
    void run(() => (group ? updateGroup(group.id, { name: value, isPublic }) : createGroup({ name: value, isPublic })), group ? "分类已保存" : "已新建分类");
  }

  function remove() {
    if (!group) return;
    if (!confirmDelete) { setConfirmDelete(true); return; }
    void run(() => deleteGroup(group.id), `已删除分类「${group.name}」`);
  }

  const footer = (
    <>
      {group && (
        <button className={confirmDelete ? "btn-danger" : "btn"} type="button" disabled={busy} onClick={remove}>
          <Trash2 />{confirmDelete ? (siteCount ? `确认删除，连同 ${siteCount} 个站点` : "再点一次，确认删除") : "删除分类"}
        </button>
      )}
      <div className="overlay-foot-actions">
        <button className="btn" type="button" onClick={onClose}>取消</button>
        <button className="btn-primary" type="submit" disabled={busy}>{busy ? "正在保存…" : "保存"}</button>
      </div>
    </>
  );

  return (
    <Overlay title={group ? "编辑分类" : "新建分类"} description="分类是导航的一级结构，可以整组设为私密。" onClose={onClose} onSubmit={save} footer={footer}>
      <label className="field">
        <span className="field-label">分类名称</span>
        <input className="input" data-autofocus value={name} maxLength={LIMITS.groupName} placeholder="例如：自建服务" onChange={(event) => { setName(event.target.value); setError(""); }} />
      </label>
      <div className="field">
        <span className="field-label">谁能看到</span>
        <div className="editor-visibility" role="radiogroup" aria-label="可见范围">
          <button type="button" role="radio" aria-checked={isPublic} onClick={() => setIsPublic(true)}>
            <Globe /><strong>公开</strong><small>公开站点对访客可见</small>
          </button>
          <button type="button" role="radio" aria-checked={!isPublic} onClick={() => setIsPublic(false)}>
            <Lock /><strong>私密</strong><small>整组只有站长可见</small>
          </button>
        </div>
      </div>
      {error && <div className="form-error" role="alert">{error}</div>}
    </Overlay>
  );
}
