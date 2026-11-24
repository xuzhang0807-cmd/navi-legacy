/*
 * 把导航数据整理成页面要显示的区块。纯函数，不依赖 React 或别名导入，
 * tests/navigation-view.test.js 直接用 node --test 测它。
 */
import type { NavGroup, NavSite, NavigationData } from "./types";

export type ViewSection = {
  /** 也是页面锚点 id */
  key: string;
  kind: "favorites" | "group";
  title: string;
  isPublic: boolean;
  /** 分类区块才有；收藏区块为 undefined */
  group?: NavGroup;
  sites: NavSite[];
};

export type NavigationView = {
  sections: ViewSection[];
  totals: { groups: number; sites: number; privateSites: number };
  query: string;
  /** 有搜索词时，命中的站点总数 */
  matched: number;
};

export type ViewOptions = {
  /** 以访客身份查看：去掉私密分类和私密站点（站长「访客预览」用；真正的访客由服务端过滤） */
  asGuest: boolean;
  query: string;
  /** 编辑时也显示空分类，方便往里加站点 */
  includeEmptyGroups: boolean;
};

const byOrder = <T extends { order: number; id: number }>(a: T, b: T) => a.order - b.order || a.id - b.id;

export function normalizeQuery(value: string): string {
  return value.trim().toLowerCase().replace(/\s+/g, " ");
}

export function sectionKey(groupId: number): string {
  return `group-${groupId}`;
}

export const FAVORITES_KEY = "favorites";

export function isPrivateSite(site: NavSite, group: NavGroup): boolean {
  return !group.isPublic || !site.isPublic;
}

/** 每个搜索词都要命中：分类名、站点名、介绍、网址，站长视图还包括备注。 */
function matches(site: NavSite, groupName: string, terms: string[], includeNotes: boolean): boolean {
  if (!terms.length) return true;
  const haystack = `${groupName} ${site.name} ${site.description} ${site.url} ${includeNotes ? site.notes ?? "" : ""}`.toLowerCase();
  return terms.every((term) => haystack.includes(term));
}

export function buildNavigationView(data: NavigationData, options: ViewOptions): NavigationView {
  const groups = [...data.groups].sort(byOrder)
    .filter((group) => !options.asGuest || group.isPublic)
    .map((group) => ({ ...group, sites: [...group.sites].sort(byOrder).filter((site) => !options.asGuest || site.isPublic) }));

  const totals = {
    groups: groups.length,
    sites: groups.reduce((sum, group) => sum + group.sites.length, 0),
    privateSites: options.asGuest ? 0 : groups.reduce((sum, group) => sum + group.sites.filter((site) => isPrivateSite(site, group)).length, 0),
  };

  const query = normalizeQuery(options.query);
  const terms = query ? query.split(" ") : [];
  const sections: ViewSection[] = [];

  if (!options.asGuest && !terms.length && data.favorites.length) {
    const siteById = new Map(groups.flatMap((group) => group.sites.map((site) => [site.id, site] as const)));
    const favorites = data.favorites.map((id) => siteById.get(id)).filter((site): site is NavSite => Boolean(site));
    if (favorites.length) sections.push({ key: FAVORITES_KEY, kind: "favorites", title: "收藏", isPublic: true, sites: favorites });
  }

  let matched = 0;
  for (const group of groups) {
    const sites = group.sites.filter((site) => matches(site, group.name, terms, !options.asGuest));
    matched += sites.length;
    if (sites.length || (options.includeEmptyGroups && !terms.length)) {
      sections.push({ key: sectionKey(group.id), kind: "group", title: group.name, isPublic: group.isPublic, group, sites });
    }
  }

  return { sections, totals, query, matched };
}

/** 把 id 从 from 位置移动到 to 位置，返回新数组。 */
export function moveId(ids: number[], id: number, to: number): number[] {
  const from = ids.indexOf(id);
  if (from < 0) return ids;
  const target = Math.max(0, Math.min(ids.length - 1, to));
  if (from === target) return ids;
  const next = ids.slice();
  next.splice(from, 1);
  next.splice(target, 0, id);
  return next;
}

/** 按新的 id 顺序重排分类内站点，并同步 order 字段（乐观更新用）。 */
export function applySiteOrder(data: NavigationData, groupId: number, ids: number[]): NavigationData {
  return {
    ...data,
    groups: data.groups.map((group) => {
      if (group.id !== groupId) return group;
      const byId = new Map(group.sites.map((site) => [site.id, site]));
      const sites = ids.map((id) => byId.get(id)).filter((site): site is NavSite => Boolean(site));
      return { ...group, sites: sites.map((site, index) => ({ ...site, order: index + 1 })) };
    }),
  };
}

export function applyGroupOrder(data: NavigationData, ids: number[]): NavigationData {
  const order = new Map(ids.map((id, index) => [id, index + 1]));
  return { ...data, groups: data.groups.map((group) => ({ ...group, order: order.get(group.id) ?? group.order })) };
}
