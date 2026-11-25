import { HttpError } from '../http/errors.js';
import { backupInput, groupInput, siteInput, orderInput } from './navigation-validation.js';

function groupJson(row) {
  return { id: row.id, name: row.name, isPublic: row.is_public === 1, order: row.order_num };
}

function siteJson(row, withNotes) {
  return {
    id: row.id,
    groupId: row.group_id,
    name: row.name,
    url: row.url,
    icon: row.icon || null,
    description: row.description ?? '',
    isPublic: row.is_public === 1,
    order: row.order_num,
    ...(withNotes ? { notes: row.notes ?? '' } : {}),
  };
}

function combine({ groups, sites }, mapGroup, mapSite) {
  const byId = new Map(groups.map(group => [group.id, { ...mapGroup(group), sites: [] }]));
  for (const site of sites) byId.get(site.group_id)?.sites.push(mapSite(site));
  return [...byId.values()];
}

function requireGroup(group) {
  if (!group) throw new HttpError(404, 'GROUP_NOT_FOUND', '分类不存在');
  return group;
}

function requireSite(site) {
  if (!site) throw new HttpError(404, 'SITE_NOT_FOUND', '站点不存在');
  return site;
}

function requireCompleteOrder(ids, existing) {
  const allowed = new Set(existing);
  if (ids.length !== allowed.size || ids.some(id => !allowed.has(id))) {
    throw new HttpError(409, 'ORDER_MISMATCH', '排序必须包含当前范围内的全部 ID');
  }
}

export function createNavigationService(store, now) {
  return {
    navigation(viewer) {
      const canSeePrivate = viewer.role === 'admin' || viewer.role === 'viewer';
      const admin = viewer.role === 'admin';
      return {
        visibility: canSeePrivate ? 'private' : 'public',
        groups: combine(store.list(canSeePrivate, admin), groupJson, site => siteJson(site, admin)),
        favorites: admin ? store.favorites() : [],
      };
    },
    legacy(viewer) {
      const canSeePrivate = viewer.role === 'admin' || viewer.role === 'viewer';
      const admin = viewer.role === 'admin';
      return combine(store.list(canSeePrivate, admin), group => group, site => ({
        ...site,
        icon: site.icon || '',
        description: site.description || '',
        ...(admin ? { notes: site.notes || '' } : {}),
      }));
    },
    integration(viewer) {
      const privateAccess = viewer.role === 'blog-integration';
      const data = store.list(privateAccess, false);
      const groups = combine(data, ({ id, name, order_num, is_public }) => ({ id, name, order_num, is_public }),
        ({ id, group_id, name, url, icon, description, order_num, is_public }) => ({
          id, group_id, name, url, icon, description, order_num, is_public,
        }));
      return { groups, visibility: privateAccess ? 'private' : 'public' };
    },
    createGroup: body => groupJson(store.createGroup(groupInput(body))),
    updateGroup: (id, body) => groupJson(requireGroup(store.updateGroup(id, groupInput(body, true)))),
    deleteGroup: id => requireGroup(store.deleteGroup(id)),
    orderGroups(body) {
      const ids = orderInput(body);
      store.transaction(() => {
        requireCompleteOrder(ids, store.groupIds());
        store.setGroupOrder(ids);
      });
    },
    createSite(body) {
      const site = siteInput(body);
      return store.transaction(() => {
        requireGroup(store.group(site.groupId));
        return siteJson(store.createSite(site), true);
      });
    },
    updateSite(id, body) {
      const patch = siteInput(body, true);
      return store.transaction(() => {
        const current = requireSite(store.site(id));
        const move = patch.groupId !== undefined && patch.groupId !== current.group_id;
        if (move) requireGroup(store.group(patch.groupId));
        return siteJson(store.updateSite(id, patch, move), true);
      });
    },
    deleteSite: id => requireSite(store.deleteSite(id)),
    orderSites(groupId, body) {
      const ids = orderInput(body);
      store.transaction(() => {
        requireGroup(store.group(groupId));
        requireCompleteOrder(ids, store.siteIds(groupId));
        store.setSiteOrder(ids);
      });
    },
    favorite(id) {
      store.transaction(() => {
        requireSite(store.site(id));
        store.favorite(id);
      });
    },
    unfavorite: id => store.unfavorite(id),
    export() {
      const { groups, sites } = store.list(true, true);
      return {
        version: 2,
        exportDate: new Date(now()).toISOString(),
        groups: groups.map(groupJson),
        sites: sites.map(site => siteJson(site, true)),
        favorites: store.favorites(),
      };
    },
    import(body) {
      const backup = backupInput(body);
      store.replace(backup);
      return { groups: backup.groups.length, sites: backup.sites.length };
    },
  };
}
