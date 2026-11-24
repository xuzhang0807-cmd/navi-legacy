import { request } from "@/shared/api/http";
import type { GroupInput, NavGroup, NavSite, NavigationData, SiteInput } from "./types";

export const fetchNavigation = () => request<NavigationData>("GET", "/navigation");

export const createGroup = (input: GroupInput) => request<Omit<NavGroup, "sites">>("POST", "/groups", input);
export const updateGroup = (id: number, input: Partial<GroupInput>) => request<Omit<NavGroup, "sites">>("PATCH", `/groups/${id}`, input);
export const deleteGroup = (id: number) => request<void>("DELETE", `/groups/${id}`);
export const reorderGroups = (ids: number[]) => request<void>("PUT", "/groups/order", { ids });

export const createSite = (input: SiteInput) => request<NavSite>("POST", "/sites", input);
export const updateSite = (id: number, input: Partial<SiteInput>) => request<NavSite>("PATCH", `/sites/${id}`, input);
export const deleteSite = (id: number) => request<void>("DELETE", `/sites/${id}`);
export const reorderSites = (groupId: number, ids: number[]) => request<void>("PUT", `/groups/${groupId}/sites/order`, { ids });

export const setFavorite = (siteId: number, favorite: boolean) => request<void>(favorite ? "PUT" : "DELETE", `/favorites/${siteId}`);
