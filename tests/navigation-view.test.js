import test from "node:test";
import assert from "node:assert/strict";
import { applyGroupOrder, applySiteOrder, buildNavigationView, moveId, normalizeQuery } from "../src/features/navigation/view.ts";

const site = (id, groupId, name, extra = {}) => ({ id, groupId, name, url: `https://${name.toLowerCase()}.example/`, icon: null, description: "", isPublic: true, order: id, ...extra });

function sample() {
  return {
    visibility: "private",
    favorites: [12, 21],
    groups: [
      { id: 2, name: "私密后台", isPublic: false, order: 2, sites: [site(21, 2, "Panel", { notes: "限 IP" })] },
      { id: 1, name: "常用", isPublic: true, order: 1, sites: [site(12, 1, "Notion", { order: 2, description: "笔记" }), site(11, 1, "GitHub", { order: 1 }), site(13, 1, "Secret", { isPublic: false, order: 3, notes: "账号在密码库" })] },
      { id: 3, name: "空分类", isPublic: true, order: 3, sites: [] },
    ],
  };
}

test("guest preview drops private groups, private sites and favorites", () => {
  const view = buildNavigationView(sample(), { asGuest: true, query: "", includeEmptyGroups: false });
  assert.deepEqual(view.sections.map((section) => section.key), ["group-1"]);
  assert.deepEqual(view.sections[0].sites.map((item) => item.name), ["GitHub", "Notion"]);
  assert.deepEqual(view.totals, { groups: 2, sites: 2, privateSites: 0 });
});

test("owner view sorts by order, counts private sites and puts favorites first", () => {
  const view = buildNavigationView(sample(), { asGuest: false, query: "", includeEmptyGroups: false });
  assert.deepEqual(view.sections.map((section) => section.key), ["favorites", "group-1", "group-2"]);
  assert.deepEqual(view.sections[0].sites.map((item) => item.id), [12, 21]);
  assert.deepEqual(view.sections[1].sites.map((item) => item.name), ["GitHub", "Notion", "Secret"]);
  assert.deepEqual(view.totals, { groups: 3, sites: 4, privateSites: 2 });
});

test("empty groups appear only while editing without a search", () => {
  assert.ok(buildNavigationView(sample(), { asGuest: false, query: "", includeEmptyGroups: true }).sections.some((section) => section.key === "group-3"));
  assert.ok(!buildNavigationView(sample(), { asGuest: false, query: "git", includeEmptyGroups: true }).sections.some((section) => section.key === "group-3"));
});

test("search matches every term across name, description and url, and notes only for the owner", () => {
  const owner = buildNavigationView(sample(), { asGuest: false, query: "  密码库 ", includeEmptyGroups: false });
  assert.equal(owner.matched, 1);
  assert.ok(!owner.sections.some((section) => section.kind === "favorites"));
  assert.equal(buildNavigationView(sample(), { asGuest: true, query: "密码库", includeEmptyGroups: false }).matched, 0);
  assert.equal(buildNavigationView(sample(), { asGuest: true, query: "notion 笔记", includeEmptyGroups: false }).matched, 1);
  assert.equal(buildNavigationView(sample(), { asGuest: true, query: "notion github", includeEmptyGroups: false }).matched, 0);
  assert.equal(buildNavigationView(sample(), { asGuest: true, query: "常用 git", includeEmptyGroups: false }).matched, 1);
  assert.equal(buildNavigationView(sample(), { asGuest: false, query: "私密后台", includeEmptyGroups: false }).matched, 1);
  assert.equal(buildNavigationView(sample(), { asGuest: true, query: "私密后台", includeEmptyGroups: false }).matched, 0);
  assert.equal(normalizeQuery("  A   b "), "a b");
});

test("ordering helpers move ids and renumber orders", () => {
  assert.deepEqual(moveId([1, 2, 3], 1, 2), [2, 3, 1]);
  assert.deepEqual(moveId([1, 2, 3], 3, -5), [3, 1, 2]);
  const same = [1, 2, 3];
  assert.equal(moveId(same, 2, 1), same);
  const reordered = applySiteOrder(sample(), 1, [13, 11, 12]);
  assert.deepEqual(reordered.groups.find((group) => group.id === 1).sites.map((item) => [item.id, item.order]), [[13, 1], [11, 2], [12, 3]]);
  assert.deepEqual(applyGroupOrder(sample(), [3, 1, 2]).groups.map((group) => [group.id, group.order]), [[2, 3], [1, 2], [3, 1]]);
});
