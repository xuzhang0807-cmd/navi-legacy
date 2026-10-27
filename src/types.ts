export type PublicFlag = 0 | 1;

export interface Site {
  id: number;
  group_id: number;
  name: string;
  url: string;
  icon?: string;
  description?: string;
  /** 管理员备注；访客 API 响应不应包含此字段。 */
  notes?: string;
  order_num: number;
  is_public: PublicFlag;
}

export interface NavGroup {
  id: number;
  name: string;
  order_num: number;
  is_public: PublicFlag;
  sites: Site[];
}

export interface SiteDraft {
  group_id: number;
  name: string;
  url: string;
  icon: string;
  description: string;
  notes: string;
  order_num: number;
  is_public: PublicFlag;
}

export interface GroupDraft {
  name: string;
  order_num: number;
  is_public: PublicFlag;
}

export interface InitialData {
  groups: NavGroup[];
  favorites: number[];
  recent: number[];
  authenticated: boolean;
}

export type ContentFilter = "all" | "favorites" | "recent";
