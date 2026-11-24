import { forwardRef } from "react";
import { FolderPlus, Lock, Search, Star, X } from "lucide-react";
import type { ViewSection } from "./view";

type NavIndexProps = {
  sections: ViewSection[];
  activeKey: string | null;
  query: string;
  showPrivacy: boolean;
  editing: boolean;
  onQueryChange: (value: string) => void;
  onSelect: (key: string) => void;
  onAddGroup: () => void;
};

/** 左侧目录：搜索框 + 分类锚点。窄屏时变成横向滚动的标签。 */
export const NavIndex = forwardRef<HTMLInputElement, NavIndexProps>(function NavIndex(
  { sections, activeKey, query, showPrivacy, editing, onQueryChange, onSelect, onAddGroup },
  searchRef,
) {
  return (
    <div className="nav-index">
      <label className="nav-search">
        <Search aria-hidden="true" />
        <span className="sr-only">搜索站点</span>
        <input ref={searchRef} id="nav-search" type="search" value={query} placeholder="搜索名称、介绍或网址" autoComplete="off"
          onChange={(event) => onQueryChange(event.target.value)}
          onKeyDown={(event) => { if (event.key === "Escape" && query) { event.preventDefault(); onQueryChange(""); } }} />
        {query
          ? <button type="button" className="nav-search-clear" aria-label="清空搜索" onClick={() => onQueryChange("")}><X /></button>
          : <kbd aria-hidden="true">/</kbd>}
      </label>
      {sections.length > 0 && (
        <nav className="nav-toc" aria-label="分类目录">
          <span className="nav-toc-label">目录</span>
          {sections.map((section) => (
            <a key={section.key} href={`#${section.key}`} className={activeKey === section.key ? "is-active" : undefined} aria-current={activeKey === section.key ? "true" : undefined}
              onClick={() => onSelect(section.key)}>
              {section.kind === "favorites" && <Star aria-hidden="true" />}
              <span className="nav-toc-name">{section.title}</span>
              {showPrivacy && !section.isPublic && <Lock aria-label="私密分类" />}
              <span className="count">{section.sites.length}</span>
            </a>
          ))}
        </nav>
      )}
      {editing && <button type="button" className="nav-toc-add" onClick={onAddGroup}><FolderPlus />新建分类</button>}
    </div>
  );
});
