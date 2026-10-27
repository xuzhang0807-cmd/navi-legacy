import test from "node:test";
import assert from "node:assert/strict";
import worker from "../worker/index.js";

const secret = "local-test-secret-not-for-production";

const joinedRows = [
  {
    group_id: 7,
    group_name: "公开分类",
    group_order: 1,
    group_is_public: 1,
    group_created_at: "2026-01-01",
    group_updated_at: "2026-01-01",
    site_id: 70,
    site_name: "公开站点",
    site_url: "https://public.example",
    site_icon: "P",
    site_description: "公开介绍",
    site_notes: "管理员私密备注",
    site_order: 1,
    site_is_public: 1,
    site_created_at: "2026-01-01",
    site_updated_at: "2026-01-01",
  },
  {
    group_id: 7,
    group_name: "公开分类",
    group_order: 1,
    group_is_public: 1,
    group_created_at: "2026-01-01",
    group_updated_at: "2026-01-01",
    site_id: 71,
    site_name: "私密站点",
    site_url: "https://private.example",
    site_icon: "S",
    site_description: "不应对访客显示",
    site_notes: "私密链接备注",
    site_order: 2,
    site_is_public: 0,
    site_created_at: "2026-01-01",
    site_updated_at: "2026-01-01",
  },
  {
    group_id: 8,
    group_name: "私密分类",
    group_order: 2,
    group_is_public: 0,
    group_created_at: "2026-01-01",
    group_updated_at: "2026-01-01",
    site_id: 80,
    site_name: "分类内站点",
    site_url: "https://private-group.example",
    site_icon: "X",
    site_description: "不应对访客显示",
    site_notes: "分类私密备注",
    site_order: 1,
    site_is_public: 1,
    site_created_at: "2026-01-01",
    site_updated_at: "2026-01-01",
  },
];

function mockDb() {
  return {
    prepare(query) {
      if (query.includes("LEFT JOIN sites s")) {
        return { all: async () => ({ results: joinedRows }) };
      }
      return {
        bind() { return this; },
        all: async () => ({
          results: [{
            id: 70,
            group_id: 7,
            name: "公开站点",
            url: "https://public.example",
            icon: "P",
            description: "公开介绍",
            notes: "管理员私密备注",
            order_num: 1,
            is_public: 1,
          }],
        }),
      };
    },
  };
}

function localEnv() {
  return {
    DB: mockDb(),
    AUTH_ENABLED: "true",
    AUTH_REQUIRED_FOR_READ: "false",
    AUTH_SECRET: secret,
  };
}

async function signToken(username = "owner") {
  const encode = (value) => Buffer.from(value).toString("base64url");
  const header = encode(JSON.stringify({ alg: "HS256", typ: "JWT" }));
  const payload = encode(JSON.stringify({ username, exp: Math.floor(Date.now() / 1000) + 3600 }));
  const data = new TextEncoder().encode(`${header}.${payload}`);
  const key = await crypto.subtle.importKey(
    "raw",
    new TextEncoder().encode(secret),
    { name: "HMAC", hash: "SHA-256" },
    false,
    ["sign"],
  );
  const signature = Buffer.from(await crypto.subtle.sign("HMAC", key, data)).toString("base64url");
  return `${header}.${payload}.${signature}`;
}

async function getJson(path, headers = {}) {
  const request = new Request(`https://navi.local/api/${path}`, { headers });
  const response = await worker.fetch(request, localEnv());
  assert.equal(response.status, 200);
  return response.json();
}

test("guest combined list excludes private groups, private sites and private notes", async () => {
  const groups = await getJson("groups-with-sites");
  assert.equal(groups.length, 1);
  assert.equal(groups[0].name, "公开分类");
  assert.equal(groups[0].sites.length, 1);
  assert.equal(groups[0].sites[0].name, "公开站点");
  assert.equal(groups[0].sites[0].description, "公开介绍");
  assert.equal(Object.hasOwn(groups[0].sites[0], "notes"), false);
});

test("guest sites list omits notes even for a public site", async () => {
  const sites = await getJson("sites");
  assert.equal(sites.length, 1);
  assert.equal(sites[0].name, "公开站点");
  assert.equal(Object.hasOwn(sites[0], "notes"), false);
});

test("visitor greeting returns only a sanitized city without retaining or echoing the IP", async () => {
  const request = new Request("https://navi.local/api/visitor-location", {
    headers: { "CF-Connecting-IP": "198.51.100.42" },
  });
  Object.defineProperty(request, "cf", { value: { city: "  Jakarta\n", country: "ID" } });
  const response = await worker.fetch(request, localEnv());
  assert.equal(response.status, 200);
  assert.equal(response.headers.get("Cache-Control"), "private, no-store");
  const payload = await response.json();
  assert.deepEqual(payload, { city: "Jakarta" });
  assert.equal(JSON.stringify(payload).includes("198.51.100.42"), false);
});

test("authenticated combined list retains private content and notes", async () => {
  const token = await signToken();
  const groups = await getJson("groups-with-sites", { Authorization: `Bearer ${token}` });
  assert.equal(groups.length, 2);
  assert.equal(groups[0].sites[0].notes, "管理员私密备注");
  assert.equal(groups[0].sites.some((site) => site.is_public === 0), true);
  assert.equal(groups[1].is_public, 0);
});
