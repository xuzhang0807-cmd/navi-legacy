import { demoFavorites, demoGroups, demoRecent } from "./demo-data";
import type {
  GroupDraft,
  InitialData,
  NavGroup,
  PublicFlag,
  Site,
  SiteDraft,
} from "./types";

export const DEMO_MODE = import.meta.env.VITE_DEMO_MODE === "true";
const STORAGE_KEY = "navi.local-preview.v1";
const DEVICE_KEY = "navi.device-id";

type DemoState = {
  groups: NavGroup[];
  favorites: number[];
  recent: number[];
};

function clone<T>(value: T): T {
  return JSON.parse(JSON.stringify(value)) as T;
}

function readDemoState(): DemoState {
  const raw = localStorage.getItem(STORAGE_KEY);
  if (raw) {
    try {
      return JSON.parse(raw) as DemoState;
    } catch {
      localStorage.removeItem(STORAGE_KEY);
    }
  }
  const initial = {
    groups: clone(demoGroups),
    favorites: [...demoFavorites],
    recent: [...demoRecent],
  };
  localStorage.setItem(STORAGE_KEY, JSON.stringify(initial));
  return initial;
}

function writeDemoState(state: DemoState): void {
  localStorage.setItem(STORAGE_KEY, JSON.stringify(state));
}

function getDeviceId(): string {
  let value = localStorage.getItem(DEVICE_KEY);
  if (!value) {
    value = typeof crypto.randomUUID === "function"
      ? crypto.randomUUID()
      : `guest-${Date.now()}-${Math.random().toString(36).slice(2)}`;
    localStorage.setItem(DEVICE_KEY, value);
  }
  return value;
}

async function request<T>(
  path: string,
  options: RequestInit = {},
): Promise<T> {
  const headers = new Headers(options.headers);
  headers.set("X-Device-ID", getDeviceId());
  if (options.body && !headers.has("Content-Type")) {
    headers.set("Content-Type", "application/json");
  }
  const response = await fetch(`/api/${path}`, {
    ...options,
    headers,
    credentials: "same-origin",
  });
  const text = await response.text();
  let payload: unknown = null;
  try {
    payload = text ? JSON.parse(text) : null;
  } catch {
    payload = text;
  }
  if (!response.ok) {
    const message = typeof payload === "object" && payload !== null && "message" in payload
      ? String((payload as { message: unknown }).message)
      : typeof payload === "string" && payload.length > 0
        ? payload
        : `请求失败（${response.status}）`;
    throw new Error(message);
  }
  return payload as T;
}

function normalizeFlag(value: unknown): PublicFlag {
  return Number(value) === 0 ? 0 : 1;
}

function normalizeGroups(groups: NavGroup[]): NavGroup[] {
  return groups.map((group) => ({
    ...group,
    is_public: normalizeFlag(group.is_public),
    sites: (group.sites ?? []).map((site) => ({
      ...site,
      is_public: normalizeFlag(site.is_public),
    })),
  }));
}

function idsFromRecords(records: unknown): number[] {
  if (!Array.isArray(records)) return [];
  return records
    .map((record) => {
      if (typeof record === "number") return record;
      if (typeof record !== "object" || record === null) return NaN;
      const row = record as Record<string, unknown>;
      return Number(row.site_id ?? row.siteId ?? row.id);
    })
    .filter((id) => Number.isInteger(id) && id > 0);
}

export async function loadVisitorCity(): Promise<string | null> {
  if (DEMO_MODE) return null;
  try {
    const response = await fetch("/api/visitor-location", {
      credentials: "same-origin",
      cache: "no-store",
      headers: { Accept: "application/json" },
    });
    if (!response.ok) return null;
    const payload: unknown = await response.json();
    if (typeof payload !== "object" || payload === null) return null;
    const rawCity = (payload as { city?: unknown }).city;
    if (typeof rawCity !== "string") return null;
    return rawCity.trim().replace(/[\u0000-\u001f\u007f]/g, "").slice(0, 64) || null;
  } catch {
    return null;
  }
}

export async function loadInitialData(): Promise<InitialData> {
  if (DEMO_MODE) {
    const state = readDemoState();
    const previewAdmin = new URLSearchParams(window.location.search).get("preview") === "admin";
    return {
      groups: clone(state.groups),
      favorites: [...state.favorites],
      recent: [...state.recent],
      authenticated: previewAdmin,
    };
  }

  const [groups, authStatus, favoritesResult, recentResult] = await Promise.all([
    request<NavGroup[]>("groups-with-sites"),
    request<{ authenticated?: boolean }>("auth/status").catch(() => ({ authenticated: false })),
    request<{ favorites?: unknown[] }>("preferences/favorites").catch(() => ({ favorites: [] })),
    request<{ visits?: unknown[] }>("preferences/visits?limit=20").catch(() => ({ visits: [] })),
  ]);
  return {
    groups: normalizeGroups(groups),
    favorites: idsFromRecords(favoritesResult.favorites),
    recent: idsFromRecords(recentResult.visits),
    authenticated: Boolean(authStatus.authenticated),
  };
}

export async function login(username: string, password: string, rememberMe: boolean): Promise<void> {
  if (DEMO_MODE) return;
  const result = await request<{ success?: boolean; message?: string }>("login", {
    method: "POST",
    body: JSON.stringify({ username, password, rememberMe }),
  });
  if (!result.success) throw new Error(result.message || "登录失败，请检查账号信息。");
}

export async function logout(): Promise<void> {
  if (!DEMO_MODE) {
    await request("logout", { method: "POST" });
  }
}

export async function toggleFavorite(siteId: number, currentlyFavorite: boolean): Promise<number[]> {
  if (DEMO_MODE) {
    const state = readDemoState();
    const favorites = currentlyFavorite
      ? state.favorites.filter((id) => id !== siteId)
      : [...new Set([...state.favorites, siteId])];
    writeDemoState({ ...state, favorites });
    return favorites;
  }
  await request(`preferences/favorites/${siteId}`, {
    method: currentlyFavorite ? "DELETE" : "POST",
  });
  const result = await request<{ favorites?: unknown[] }>("preferences/favorites");
  return idsFromRecords(result.favorites);
}

export async function recordVisit(siteId: number): Promise<number[]> {
  if (DEMO_MODE) {
    const state = readDemoState();
    const recent = [siteId, ...state.recent.filter((id) => id !== siteId)].slice(0, 20);
    writeDemoState({ ...state, recent });
    return recent;
  }
  await request(`preferences/visits/${siteId}`, { method: "POST" });
  const result = await request<{ visits?: unknown[] }>("preferences/visits?limit=20");
  return idsFromRecords(result.visits);
}

export async function saveGroup(groupId: number | null, draft: GroupDraft): Promise<void> {
  if (DEMO_MODE) {
    const state = readDemoState();
    const groups = groupId === null
      ? [...state.groups, { id: Date.now(), ...draft, sites: [] }]
      : state.groups.map((group) => group.id === groupId ? { ...group, ...draft } : group);
    writeDemoState({ ...state, groups });
    return;
  }
  await request(groupId === null ? "groups" : `groups/${groupId}`, {
    method: groupId === null ? "POST" : "PUT",
    body: JSON.stringify({ ...draft, ...(groupId === null ? { order_num: draft.order_num } : {}) }),
  });
}

export async function deleteGroup(groupId: number): Promise<void> {
  if (DEMO_MODE) {
    const state = readDemoState();
    const group = state.groups.find((item) => item.id === groupId);
    const removedIds = new Set(group?.sites.map((site) => site.id) ?? []);
    writeDemoState({
      groups: state.groups.filter((item) => item.id !== groupId),
      favorites: state.favorites.filter((id) => !removedIds.has(id)),
      recent: state.recent.filter((id) => !removedIds.has(id)),
    });
    return;
  }
  await request(`groups/${groupId}`, { method: "DELETE" });
}

export async function saveSite(siteId: number | null, draft: SiteDraft): Promise<void> {
  if (DEMO_MODE) {
    const state = readDemoState();
    const groups = state.groups.map((group) => ({
      ...group,
      sites: group.sites.filter((site) => site.id !== siteId),
    }));
    const target = groups.find((group) => group.id === draft.group_id);
    if (!target) throw new Error("请先选择有效的分类。");
    const site: Site = {
      id: siteId ?? Date.now(),
      ...draft,
    };
    target.sites = siteId === null ? [...target.sites, site] : [...target.sites, site];
    writeDemoState({ ...state, groups });
    return;
  }
  await request(siteId === null ? "sites" : `sites/${siteId}`, {
    method: siteId === null ? "POST" : "PUT",
    body: JSON.stringify(draft),
  });
}

export async function deleteSite(siteId: number): Promise<void> {
  if (DEMO_MODE) {
    const state = readDemoState();
    writeDemoState({
      groups: state.groups.map((group) => ({
        ...group,
        sites: group.sites.filter((site) => site.id !== siteId),
      })),
      favorites: state.favorites.filter((id) => id !== siteId),
      recent: state.recent.filter((id) => id !== siteId),
    });
    return;
  }
  await request(`sites/${siteId}`, { method: "DELETE" });
}

export function isPublic(value: unknown): boolean {
  return Number(value) !== 0;
}
