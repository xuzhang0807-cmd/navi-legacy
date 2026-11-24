import { transaction } from './index.js';

const groupFields = { name: 'name', isPublic: 'is_public' };
const siteFields = {
  groupId: 'group_id', name: 'name', url: 'url', icon: 'icon',
  description: 'description', notes: 'notes', isPublic: 'is_public',
};

export function createNavigationStore(database) {
  const group = database.prepare('SELECT * FROM groups WHERE id = ?');
  const site = database.prepare('SELECT * FROM sites WHERE id = ?');
  const lastSiteOrder = database.prepare('SELECT COALESCE(MAX(order_num), 0) + 1 AS position FROM sites WHERE group_id = ?');
  const addGroup = database.prepare(`
    INSERT INTO groups (name, is_public, order_num)
    VALUES (?, ?, (SELECT COALESCE(MAX(order_num), 0) + 1 FROM groups)) RETURNING *
  `);
  const addSite = database.prepare(`
    INSERT INTO sites (group_id, name, url, icon, description, notes, is_public, order_num)
    VALUES (?, ?, ?, ?, ?, ?, ?, ?) RETURNING *
  `);
  const deleteGroup = database.prepare('DELETE FROM groups WHERE id = ?');
  const deleteSite = database.prepare('DELETE FROM sites WHERE id = ?');
  const groupIds = database.prepare('SELECT id FROM groups');
  const siteIds = database.prepare('SELECT id FROM sites WHERE group_id = ?');
  const updateGroupOrder = database.prepare('UPDATE groups SET order_num = ?, updated_at = CURRENT_TIMESTAMP WHERE id = ?');
  const updateSiteOrder = database.prepare('UPDATE sites SET order_num = ?, updated_at = CURRENT_TIMESTAMP WHERE id = ?');
  const favorites = database.prepare('SELECT site_id FROM owner_favorites ORDER BY created_at DESC, site_id');
  const favorite = database.prepare('INSERT INTO owner_favorites (site_id) VALUES (?) ON CONFLICT (site_id) DO NOTHING');
  const unfavorite = database.prepare('DELETE FROM owner_favorites WHERE site_id = ?');

  function update(table, columns, id, patch, position) {
    const assignments = [];
    const values = [];
    for (const [field, column] of Object.entries(columns)) {
      if (!Object.hasOwn(patch, field)) continue;
      assignments.push(`${column} = ?`);
      values.push(field === 'isPublic' ? Number(patch[field]) : patch[field]);
    }
    if (position !== undefined) {
      assignments.push('order_num = ?');
      values.push(position);
    }
    assignments.push('updated_at = CURRENT_TIMESTAMP');
    return database.prepare(`UPDATE ${table} SET ${assignments.join(', ')} WHERE id = ? RETURNING *`).get(...values, id);
  }

  return {
    transaction: operation => transaction(database, operation),
    list(privateAccess, withNotes) {
      const groups = database.prepare(`
        SELECT * FROM groups ${privateAccess ? '' : 'WHERE is_public = 1'} ORDER BY order_num, id
      `).all();
      const sites = database.prepare(`
        SELECT s.id, s.group_id, s.name, s.url, s.icon, s.description, s.order_num,
               s.is_public, s.created_at, s.updated_at${withNotes ? ', s.notes' : ''}
        FROM sites s JOIN groups g ON g.id = s.group_id
        ${privateAccess ? '' : 'WHERE g.is_public = 1 AND s.is_public = 1'}
        ORDER BY s.order_num, s.id
      `).all();
      return { groups, sites };
    },
    group: id => group.get(id),
    site: id => site.get(id),
    createGroup: ({ name, isPublic }) => addGroup.get(name, isPublic ? 1 : 0),
    updateGroup: (id, patch) => update('groups', groupFields, id, patch),
    deleteGroup: id => deleteGroup.run(id).changes > 0,
    groupIds: () => groupIds.all().map(row => row.id),
    setGroupOrder: ids => ids.forEach((id, index) => updateGroupOrder.run(index + 1, id)),
    createSite({ groupId, name, url, icon = null, description = null, notes = null, isPublic }) {
      return addSite.get(groupId, name, url, icon, description, notes, isPublic ? 1 : 0, lastSiteOrder.get(groupId).position);
    },
    updateSite(id, patch, append) {
      return update('sites', siteFields, id, patch, append ? lastSiteOrder.get(patch.groupId).position : undefined);
    },
    deleteSite: id => deleteSite.run(id).changes > 0,
    siteIds: groupId => siteIds.all(groupId).map(row => row.id),
    setSiteOrder: ids => ids.forEach((id, index) => updateSiteOrder.run(index + 1, id)),
    favorites: () => favorites.all().map(row => row.site_id),
    favorite: id => favorite.run(id),
    unfavorite: id => unfavorite.run(id),
    replace({ groups, sites, favorites }) {
      transaction(database, () => {
        database.exec('DELETE FROM sites; DELETE FROM groups;');
        const insertGroup = database.prepare('INSERT INTO groups (id, name, is_public, order_num) VALUES (?, ?, ?, ?)');
        const insertSite = database.prepare(`
          INSERT INTO sites (id, group_id, name, url, icon, description, notes, is_public, order_num)
          VALUES (?, ?, ?, ?, ?, ?, ?, ?, ?)
        `);
        for (const group of groups) insertGroup.run(group.id, group.name, group.isPublic ? 1 : 0, group.order);
        for (const { id, groupId, name, url, icon = null, description = null, notes = null, isPublic, order } of sites) {
          insertSite.run(id, groupId, name, url, icon, description, notes, isPublic ? 1 : 0, order);
        }
        for (const id of favorites) favorite.run(id);
      });
    },
  };
}
