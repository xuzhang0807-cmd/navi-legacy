import { useCallback, useEffect, useMemo, useRef, useState } from "react";
import { Compass, FolderPlus, LogIn, RotateCw, SearchX } from "lucide-react";
import { SITE } from "@/shared/config/site";
import { useSession } from "@/features/auth/SessionProvider";
import { reorderGroups, reorderSites, setFavorite } from "@/features/navigation/api";
import { useEditMode } from "@/features/navigation/EditModeContext";
import { GroupEditor } from "@/features/navigation/GroupEditor";
import { NavIndex } from "@/features/navigation/NavIndex";
import { NavSection } from "@/features/navigation/NavSection";
import { SiteEditor } from "@/features/navigation/SiteEditor";
import type { NavGroup, NavSite } from "@/features/navigation/types";
import { useNavigation } from "@/features/navigation/useNavigation";
import { applyGroupOrder, applySiteOrder, buildNavigationView, moveId } from "@/features/navigation/view";
import { errorMessage, isUnauthorized } from "@/shared/api/http";
import { useToast } from "@/shared/ui/Toast";
import "@/features/navigation/nav.css";
import "./home.css";

type EditorState =
  | { kind: "site"; site?: NavSite; groupId?: number }
  | { kind: "group"; group?: NavGroup }
  | null;

const byOrder = (a: NavGroup, b: NavGroup) => a.order - b.order || a.id - b.id;

/** 跟踪当前滚动到的分类，用于目录高亮。 */
function useActiveSection(keys: string[]): [string | null, (key: string) => void] {
  const [active, setActive] = useState<string | null>(null);
  const joined = keys.join("|");
  useEffect(() => {
    const list = joined ? joined.split("|") : [];
    setActive((current) => (current && list.includes(current) ? current : list[0] ?? null));
    if (!list.length || typeof IntersectionObserver === "undefined") return;
    const visible = new Set<string>();
    const observer = new IntersectionObserver((entries) => {
      for (const entry of entries) {
        if (entry.isIntersecting) visible.add(entry.target.id);
        else visible.delete(entry.target.id);
      }
      const first = list.find((key) => visible.has(key));
      if (first) setActive(first);
    }, { rootMargin: "-8% 0px -55% 0px" });
    for (const key of list) {
      const element = document.getElementById(key);
      if (element) observer.observe(element);
    }
    return () => observer.disconnect();
  }, [joined]);
  return [active, setActive];
}

export function HomePage() {
  const toast = useToast();
  const { session, isAdmin, canViewPrivate, identityKey, openLogin, handleUnauthorized } = useSession();
  const { editing } = useEditMode();
  const { state, reload, update } = useNavigation(identityKey);
  const [query, setQuery] = useState("");
  const [editor, setEditor] = useState<EditorState>(null);
  const searchRef = useRef<HTMLInputElement>(null);

  const data = state.status === "ready" ? state.data : null;
  const view = useMemo(() => (data ? buildNavigationView(data, { asGuest: !canViewPrivate, query, includeEmptyGroups: editing }) : null), [data, canViewPrivate, query, editing]);
  const favorites = useMemo(() => new Set(data?.favorites ?? []), [data]);
  const groups = useMemo(() => [...(data?.groups ?? [])].sort(byOrder), [data]);
  const groupById = useMemo(() => new Map(groups.map((group) => [group.id, group])), [groups]);
  const groupOf = useCallback((site: NavSite) => groupById.get(site.groupId), [groupById]);
  const [activeKey, setActiveKey] = useActiveSection(view?.sections.map((section) => section.key) ?? []);

  useEffect(() => {
    function onKeyDown(event: KeyboardEvent) {
      if (event.key !== "/" || event.metaKey || event.ctrlKey || event.altKey) return;
      const target = event.target as HTMLElement | null;
      if (target?.closest("input, textarea, select, [contenteditable='true']") || document.querySelector("[role='dialog']")) return;
      event.preventDefault();
      searchRef.current?.focus();
    }
    document.addEventListener("keydown", onKeyDown);
    return () => document.removeEventListener("keydown", onKeyDown);
  }, []);

  /** 乐观更新后提交；失败时提示并以服务端数据为准重新加载。 */
  async function commit(action: () => Promise<unknown>, success?: string) {
    try {
      await action();
      if (success) toast(success);
    } catch (reason) {
      if (isUnauthorized(reason)) handleUnauthorized();
      else toast(errorMessage(reason), "error");
      await reload({ silent: true }).catch(() => undefined);
    }
  }

  function toggleFavorite(siteId: number) {
    const next = !favorites.has(siteId);
    update((current) => ({ ...current, favorites: next ? [...current.favorites, siteId] : current.favorites.filter((id) => id !== siteId) }));
    void commit(() => setFavorite(siteId, next), next ? "已收藏" : "已取消收藏");
  }

  function reorder(groupId: number, ids: number[]) {
    update((current) => applySiteOrder(current, groupId, ids));
    void commit(() => reorderSites(groupId, ids));
  }

  function moveGroup(groupId: number, delta: number) {
    const ids = groups.map((group) => group.id);
    const next = moveId(ids, groupId, ids.indexOf(groupId) + delta);
    if (next === ids) return;
    update((current) => applyGroupOrder(current, next));
    void commit(() => reorderGroups(next));
  }

  function editorDone(message: string) {
    setEditor(null);
    toast(message);
    void reload({ silent: true }).catch(() => toast("已保存，但刷新列表失败，请手动刷新页面。", "error"));
  }

  const groupSections = view?.sections.filter((section) => section.kind === "group") ?? [];
  const firstGroupId = groups[0]?.id;
  const lastGroupId = groups[groups.length - 1]?.id;

  let content;
  if (state.status === "loading" || !session) {
    content = (
      <div className="home-skeleton" aria-busy="true" aria-label="正在加载导航">
        <div className="home-skeleton-title" />
        <div className="nav-grid">{Array.from({ length: 8 }, (_, index) => <div key={index} className="home-skeleton-card" />)}</div>
      </div>
    );
  } else if (state.status === "error") {
    content = (
      <div className="home-empty" role="alert">
        <Compass aria-hidden="true" />
        <strong>导航暂时无法加载</strong>
        <p>{state.message}</p>
        <button className="btn" type="button" onClick={() => void reload()}><RotateCw />重试</button>
      </div>
    );
  } else if (view && view.sections.length === 0) {
    content = view.query ? (
      <div className="home-empty">
        <SearchX aria-hidden="true" />
        <strong>没有找到和「{query.trim()}」有关的站点</strong>
        <p>换个短一点的关键词，或者清空搜索。</p>
        <button className="btn" type="button" onClick={() => setQuery("")}>清空搜索</button>
      </div>
    ) : isAdmin ? (
      <div className="home-empty">
        <FolderPlus aria-hidden="true" />
        <strong>还没有分类</strong>
        <p>先新建一个分类，再往里添加站点。</p>
        <button className="btn-primary" type="button" onClick={() => setEditor({ kind: "group" })}><FolderPlus />新建分类</button>
      </div>
    ) : (
      <div className="home-empty">
        <Compass aria-hidden="true" />
        <strong>还没有公开的导航</strong>
        <p>站长还没有公开任何站点。</p>
        {!session.authenticated && <button className="btn" type="button" onClick={openLogin}><LogIn />登录</button>}
      </div>
    );
  } else if (view) {
    content = (
      <>
        {view.query && <p className="home-result" role="status">找到 {view.matched} 个站点</p>}
        {view.sections.map((section) => (
          <NavSection
            key={section.key}
            section={section}
            groupOf={groupOf}
            showPrivacy={canViewPrivate}
            editing={editing}
            favorites={favorites}
            canReorder={!view.query && section.kind === "group"}
            isFirstGroup={section.group?.id === firstGroupId}
            isLastGroup={section.group?.id === lastGroupId}
            onEditSite={(site) => setEditor({ kind: "site", site })}
            onAddSite={(groupId) => setEditor({ kind: "site", groupId })}
            onEditGroup={(group) => setEditor({ kind: "group", group })}
            onMoveGroup={moveGroup}
            onToggleFavorite={toggleFavorite}
            onReorder={reorder}
          />
        ))}
        {editing && !view.query && (
          <button className="home-add-group" type="button" onClick={() => setEditor({ kind: "group" })}><FolderPlus />新建分类</button>
        )}
      </>
    );
  }

  return (
    <div className={`home${editing ? " is-editing-page" : ""}`}>
      <section className="site-container home-intro">
        <div className="home-intro-copy">
          <p className="home-eyebrow">{window.location.host}</p>
          <h1>{SITE.title}</h1>
          <p className="home-lede">{SITE.lede}</p>
        </div>
        {view && (
          <dl className="home-stats">
            <div><dt>站点</dt><dd>{view.totals.sites}</dd></div>
            <div><dt>分类</dt><dd>{view.totals.groups}</dd></div>
            {canViewPrivate && <div><dt>私密</dt><dd>{view.totals.privateSites}</dd></div>}
          </dl>
        )}
      </section>
      {editing && (
        <p className="site-container home-edit-hint">编辑中：点卡片修改内容，拖动卡片或用方向键调整顺序，点星标收藏。改动会立即保存。</p>
      )}
      <div className="site-container home-layout">
        <aside className="home-index">
          <NavIndex
            ref={searchRef}
            sections={view?.sections ?? []}
            activeKey={activeKey}
            query={query}
            showPrivacy={canViewPrivate}
            editing={editing}
            onQueryChange={setQuery}
            onSelect={setActiveKey}
            onAddGroup={() => setEditor({ kind: "group" })}
          />
        </aside>
        <div className="home-sections">{content}</div>
      </div>

      {editor?.kind === "site" && (
        <SiteEditor site={editor.site} groups={groups} defaultGroupId={editor.groupId ?? groupSections[0]?.group?.id}
          onClose={() => setEditor(null)} onDone={editorDone} onUnauthorized={handleUnauthorized} />
      )}
      {editor?.kind === "group" && (
        <GroupEditor group={editor.group} onClose={() => setEditor(null)} onDone={editorDone} onUnauthorized={handleUnauthorized} />
      )}
    </div>
  );
}
