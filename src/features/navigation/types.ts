/** 与 GET /api/v1/navigation 一致，见 docs/architecture.md 第 4.2 节。 */

export type NavSite = {
  id: number;
  groupId: number;
  name: string;
  url: string;
  icon: string | null;
  description: string;
  isPublic: boolean;
  order: number;
  /** 只在站长视图里出现 */
  notes?: string;
};

export type NavGroup = {
  id: number;
  name: string;
  isPublic: boolean;
  order: number;
  sites: NavSite[];
};

export type NavigationData = {
  visibility: "public" | "private";
  groups: NavGroup[];
  favorites: number[];
};

export type SiteInput = {
  groupId: number;
  name: string;
  url: string;
  icon: string | null;
  description: string;
  notes: string;
  isPublic: boolean;
};

export type GroupInput = { name: string; isPublic: boolean };

/** 前后端共用的长度上限 */
export const LIMITS = { groupName: 40, siteName: 60, description: 180, notes: 500 } as const;
