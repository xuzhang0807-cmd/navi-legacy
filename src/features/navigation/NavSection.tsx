import { useState, type DragEvent } from "react";
import { ChevronDown, ChevronUp, Lock, Pencil, Plus } from "lucide-react";
import { NavCard } from "./NavCard";
import { isPrivateSite, moveId, type ViewSection } from "./view";
import type { NavGroup, NavSite } from "./types";

type NavSectionProps = {
  section: ViewSection;
  /** 每个站点所属的分类，用来判断是否私密（收藏区块里的站点来自不同分类） */
  groupOf: (site: NavSite) => NavGroup | undefined;
  showPrivacy: boolean;
  editing: boolean;
  favorites: Set<number>;
  /** 搜索中或收藏区块不能排序 */
  canReorder: boolean;
  isFirstGroup?: boolean;
  isLastGroup?: boolean;
  onEditSite: (site: NavSite) => void;
  onAddSite: (groupId: number) => void;
  onEditGroup: (group: NavGroup) => void;
  onMoveGroup: (groupId: number, delta: number) => void;
  onToggleFavorite: (siteId: number) => void;
  onReorder: (groupId: number, ids: number[]) => void;
};

export function NavSection({ section, groupOf, showPrivacy, editing, favorites, canReorder, isFirstGroup, isLastGroup, onEditSite, onAddSite, onEditGroup, onMoveGroup, onToggleFavorite, onReorder }: NavSectionProps) {
  const [dragId, setDragId] = useState<number | null>(null);
  const [overId, setOverId] = useState<number | null>(null);
  const group = section.group;
  const sortable = editing && canReorder && Boolean(group);
  const ids = section.sites.map((site) => site.id);

  function reorder(siteId: number, to: number) {
    if (!group) return;
    const next = moveId(ids, siteId, to);
    if (next !== ids) onReorder(group.id, next);
  }

  function dragProps(site: NavSite) {
    if (!sortable) return undefined;
    const reset = () => { setDragId(null); setOverId(null); };
    return {
      draggable: true,
      onDragStart: (event: DragEvent<HTMLDivElement>) => {
        setDragId(site.id);
        event.dataTransfer.effectAllowed = "move";
        event.dataTransfer.setData("text/plain", String(site.id));
      },
      onDragOver: (event: DragEvent<HTMLDivElement>) => {
        if (dragId === null || dragId === site.id) return;
        event.preventDefault();
        event.dataTransfer.dropEffect = "move";
        if (overId !== site.id) setOverId(site.id);
      },
      onDragLeave: () => setOverId((current) => (current === site.id ? null : current)),
      onDrop: (event: DragEvent<HTMLDivElement>) => {
        event.preventDefault();
        if (dragId !== null && dragId !== site.id) reorder(dragId, ids.indexOf(site.id));
        reset();
      },
      onDragEnd: reset,
    };
  }

  const titleId = `${section.key}-title`;
  return (
    <section className={`nav-section${section.kind === "favorites" ? " is-favorites" : ""}`} id={section.key} aria-labelledby={titleId}>
      <header className="nav-section-head">
        <h2 id={titleId}>{section.title}</h2>
        <span className="count">{section.sites.length} 个站点</span>
        {showPrivacy && !section.isPublic && <span className="private-chip"><Lock />整个分类仅站长可见</span>}
        {editing && group && (
          <div className="nav-section-tools">
            <button type="button" onClick={() => onAddSite(group.id)}><Plus />添加站点</button>
            <button type="button" onClick={() => onEditGroup(group)}><Pencil />编辑分类</button>
            <button type="button" className="is-icon" aria-label={`上移分类 ${group.name}`} title="上移分类" disabled={isFirstGroup} onClick={() => onMoveGroup(group.id, -1)}><ChevronUp /></button>
            <button type="button" className="is-icon" aria-label={`下移分类 ${group.name}`} title="下移分类" disabled={isLastGroup} onClick={() => onMoveGroup(group.id, 1)}><ChevronDown /></button>
          </div>
        )}
      </header>
      {section.sites.length > 0 || (editing && group) ? (
        <div className="nav-grid">
          {section.sites.map((site, index) => {
            const owner = groupOf(site);
            return (
              <NavCard
                key={site.id}
                site={site}
                isPrivate={owner ? isPrivateSite(site, owner) : !site.isPublic}
                showPrivacy={showPrivacy}
                editing={editing}
                favorite={favorites.has(site.id)}
                dragState={dragId === site.id ? "dragging" : overId === site.id ? "over" : null}
                dragProps={dragProps(site)}
                onEdit={() => onEditSite(site)}
                onToggleFavorite={() => onToggleFavorite(site.id)}
                onMove={sortable ? (delta) => reorder(site.id, index + delta) : undefined}
              />
            );
          })}
          {editing && group && (
            <button className="nav-add" type="button" onClick={() => onAddSite(group.id)}><Plus />添加站点</button>
          )}
        </div>
      ) : (
        <p className="nav-section-empty">这个分类还没有站点。</p>
      )}
    </section>
  );
}
