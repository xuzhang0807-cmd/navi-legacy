import type { HTMLAttributes, KeyboardEvent } from "react";
import { GripVertical, Lock, Star } from "lucide-react";
import { SiteIcon } from "./SiteIcon";
import type { NavSite } from "./types";

type NavCardProps = {
  site: Pick<NavSite, "name" | "url" | "icon" | "description">;
  isPrivate: boolean;
  /** 站长视图里显示私密标记 */
  showPrivacy: boolean;
  editing?: boolean;
  favorite?: boolean;
  /** 表单里的预览：不可点击 */
  preview?: boolean;
  dragState?: "dragging" | "over" | null;
  dragProps?: HTMLAttributes<HTMLDivElement> & { draggable?: boolean };
  onEdit?: () => void;
  onToggleFavorite?: () => void;
  /** 方向键调整顺序；不能排序时不传 */
  onMove?: (delta: number) => void;
};

function displayHost(url: string): string {
  try { return new URL(url).host; } catch { return url; }
}

/**
 * 导航卡片。规格与博客首页 .fh-navi-card 一致（见 docs/architecture.md 第 6 节）：
 * 图标 + 名称一行，介绍最多两行。
 */
export function NavCard({ site, isPrivate, showPrivacy, editing = false, favorite = false, preview = false, dragState = null, dragProps, onEdit, onToggleFavorite, onMove }: NavCardProps) {
  const name = site.name.trim() || "网站名称";
  const classes = ["nav-card", showPrivacy && isPrivate && "is-private", editing && "is-editing", dragState && `is-${dragState}`].filter(Boolean).join(" ");

  function onGripKey(event: KeyboardEvent<HTMLButtonElement>) {
    if (!onMove) return;
    const delta = { ArrowLeft: -1, ArrowUp: -1, ArrowRight: 1, ArrowDown: 1 }[event.key];
    if (delta) { event.preventDefault(); onMove(delta); }
  }

  return (
    <div className={classes} {...dragProps}>
      {!preview && (editing
        ? <button className="nav-card-hit" type="button" aria-label={`编辑 ${name}`} onClick={onEdit} />
        : <a className="nav-card-hit" href={site.url} target="_blank" rel="noopener noreferrer" aria-label={`${name}（${displayHost(site.url)}）`} title={site.description || displayHost(site.url)} />)}
      <div className="nav-card-head">
        <SiteIcon icon={site.icon} name={name} />
        <h3>{name}</h3>
        {showPrivacy && isPrivate && <span className="nav-card-lock" title="私密：只有站长能看到"><Lock /><span>私密</span></span>}
      </div>
      {site.description && <p className="nav-card-note">{site.description}</p>}
      {editing && !preview && (
        <div className="nav-card-tools">
          {onMove && (
            <button type="button" className="is-grip" aria-label={`调整 ${name} 的顺序，用方向键移动`} title="拖动或用方向键调整顺序" onKeyDown={onGripKey}>
              <GripVertical />
            </button>
          )}
          <button type="button" className={favorite ? "is-on" : ""} aria-pressed={favorite} aria-label={favorite ? `取消收藏 ${name}` : `收藏 ${name}`} title={favorite ? "取消收藏" : "收藏"} onClick={onToggleFavorite}>
            <Star fill={favorite ? "currentColor" : "none"} />
          </button>
        </div>
      )}
    </div>
  );
}
