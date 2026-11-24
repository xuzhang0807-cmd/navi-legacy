import { normalizeIconInput, normalizeWebsiteUrl } from '../../src/shared/lib/site-icons.ts';
import { HttpError } from '../http/errors.js';

const invalid = message => new HttpError(400, 'INVALID_INPUT', message);
const groupFields = ['name', 'isPublic'];
const siteFields = ['groupId', 'name', 'url', 'icon', 'description', 'notes', 'isPublic'];

export function object(value, message = '请求体必须是 JSON 对象') {
  if (!value || typeof value !== 'object' || Array.isArray(value)) throw invalid(message);
  return value;
}

function fields(body, allowed, patch) {
  object(body);
  const keys = Object.keys(body);
  if (patch && !keys.length) throw invalid('请至少提供一个更新字段');
  if (keys.some(key => !allowed.includes(key))) throw invalid('请求中包含未知字段');
}

function text(value, label, max, required = false) {
  if (value === null && !required) return null;
  if (typeof value !== 'string') throw invalid(`${label}必须是文字`);
  const result = value.trim();
  if (required && !result) throw invalid(`${label}不能为空`);
  if ([...result].length > max) throw invalid(`${label}最多 ${max} 个字符`);
  return result;
}

function visibility(value) {
  if (typeof value !== 'boolean') throw invalid('isPublic 必须是布尔值');
  return value;
}

export function positiveId(value) {
  if (!Number.isSafeInteger(value) || value < 1) throw invalid('ID 必须是正整数');
  return value;
}

function website(value) {
  if (typeof value !== 'string') throw invalid('网址必须是文字');
  try {
    return normalizeWebsiteUrl(value);
  } catch (error) {
    throw invalid(error.message);
  }
}

function icon(value) {
  if (value === null) return null;
  if (typeof value !== 'string') throw invalid('图标必须是文字或图片地址');
  let result;
  try {
    result = normalizeIconInput(value);
  } catch (error) {
    throw invalid(error.message);
  }
  if (/^data:/i.test(result)) {
    const encoded = result.slice(result.indexOf(',') + 1).replace(/[\r\n]/g, '');
    const unpadded = encoded.replace(/={1,2}$/, '');
    if (!unpadded || unpadded.includes('=') || unpadded.length % 4 === 1
      || (unpadded !== encoded && encoded.length % 4 !== 0)) {
      throw invalid('图标的 Base64 数据无效');
    }
    if (Math.floor(unpadded.length * 3 / 4) > 256 * 1024) throw invalid('图标最大为 256 KiB');
  }
  return result || null;
}

export function groupInput(body, patch = false) {
  fields(body, groupFields, patch);
  const result = {};
  if (!patch || Object.hasOwn(body, 'name')) result.name = text(body.name, '分类名', 40, true);
  if (!patch || Object.hasOwn(body, 'isPublic')) result.isPublic = visibility(body.isPublic);
  return result;
}

export function siteInput(body, patch = false) {
  fields(body, siteFields, patch);
  const result = {};
  if (!patch || Object.hasOwn(body, 'groupId')) result.groupId = positiveId(body.groupId);
  if (!patch || Object.hasOwn(body, 'name')) result.name = text(body.name, '站点名', 60, true);
  if (!patch || Object.hasOwn(body, 'url')) result.url = website(body.url);
  if (!patch || Object.hasOwn(body, 'isPublic')) result.isPublic = visibility(body.isPublic);
  if (Object.hasOwn(body, 'icon')) result.icon = icon(body.icon);
  if (Object.hasOwn(body, 'description')) result.description = text(body.description, '介绍', 180);
  if (Object.hasOwn(body, 'notes')) result.notes = text(body.notes, '备注', 500);
  return result;
}

function uniqueIds(input) {
  if (!Array.isArray(input)) throw invalid('ID 列表必须是数组');
  const ids = input.map(positiveId);
  if (new Set(ids).size !== ids.length) throw invalid('ID 列表不能包含重复项');
  return ids;
}

export function orderInput(body) {
  fields(body, ['ids'], false);
  return uniqueIds(body.ids);
}

function position(value) {
  if (!Number.isFinite(value) || Math.abs(value) > Number.MAX_SAFE_INTEGER) throw invalid('排序号必须是有效数字');
  return value;
}

function legacyVisibility(value) {
  if (value === undefined || value === 0 || value === 1) return value === 1;
  throw invalid('旧版备份的 is_public 必须为 0 或 1');
}

export function backupInput(body) {
  object(body);
  const legacy = ['1', '1.0'].includes(body.version);
  if ((!legacy && body.version !== 2) || !Array.isArray(body.groups) || !Array.isArray(body.sites)) {
    throw invalid('备份版本或结构无效');
  }
  const groups = body.groups.map(group => {
    object(group, '备份中的分类必须是对象');
    const isPublic = legacy ? legacyVisibility(group.is_public) : group.isPublic;
    return {
      id: positiveId(group.id),
      order: position(legacy ? group.order_num : group.order),
      ...groupInput({ name: group.name, isPublic }),
    };
  });
  const groupIds = new Set(uniqueIds(groups.map(group => group.id)));
  const sites = body.sites.map(site => {
    object(site, '备份中的站点必须是对象');
    const draft = {
      groupId: legacy ? site.group_id : site.groupId,
      name: site.name,
      url: site.url,
      isPublic: legacy ? legacyVisibility(site.is_public) : site.isPublic,
    };
    for (const key of ['icon', 'description', 'notes']) {
      if (Object.hasOwn(site, key)) draft[key] = site[key];
    }
    const normalized = siteInput(draft);
    if (!groupIds.has(normalized.groupId)) throw invalid('备份中的站点引用了不存在的分类');
    const id = legacy && site.id === undefined ? undefined : positiveId(site.id);
    return { id, order: position(legacy ? site.order_num : site.order), ...normalized };
  });
  const siteIds = new Set(uniqueIds(sites.map(site => site.id).filter(id => id !== undefined)));
  let nextId = 1;
  for (const site of sites) {
    if (site.id !== undefined) continue;
    while (siteIds.has(nextId)) nextId++;
    site.id = nextId++;
    siteIds.add(site.id);
  }
  const favorites = legacy ? [] : uniqueIds(body.favorites);
  if (favorites.some(id => !siteIds.has(id))) throw invalid('备份中的收藏引用了不存在的站点');
  return { groups, sites, favorites };
}
