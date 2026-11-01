import test from "node:test";
import assert from "node:assert/strict";
import { faviconUrl, isImageIcon, normalizeIconInput, normalizeWebsiteUrl } from "../src/site-icons.ts";

test("favicon extraction uses the hostname without leaking paths, queries or credentials", () => {
  assert.equal(faviconUrl("komari.xublog.de/dashboard?private=value"), "https://www.faviconextractor.com/favicon/komari.xublog.de?larger=true");
  assert.equal(faviconUrl("https://example.com:8443/private#notes"), "https://www.faviconextractor.com/favicon/example.com?larger=true");
  assert.throws(() => faviconUrl("https://user:password@example.com"));
});

test("website URLs support a bare host and port while rejecting executable or malformed URLs", () => {
  assert.equal(normalizeWebsiteUrl(" example.com/path "), "https://example.com/path");
  assert.equal(normalizeWebsiteUrl("localhost:8787"), "https://localhost:8787/");
  assert.equal(normalizeWebsiteUrl("http://localhost:8787"), "http://localhost:8787/");
  for (const value of ["", "https://", "javascript:alert(1)", "ftp://example.com", "https://bad host.com"]) assert.throws(() => normalizeWebsiteUrl(value));
});

test("custom icon text remains text, image addresses normalize and dangerous sources are rejected", () => {
  assert.equal(normalizeIconInput(" GH "), "GH");
  assert.equal(normalizeIconInput("⭐"), "⭐");
  assert.equal(normalizeIconInput("icons.example.com/logo.png"), "https://icons.example.com/logo.png");
  assert.equal(normalizeIconInput("/posters/logo.png"), "/posters/logo.png");
  assert.equal(normalizeIconInput("//icons.example.com/logo.png"), "https://icons.example.com/logo.png");
  const image = "data:image/png;base64,iVBORw0KGgo=";
  assert.equal(normalizeIconInput(image), image);
  assert.equal(isImageIcon(image), true);
  assert.equal(isImageIcon("GH"), false);
  for (const value of ["javascript:alert(1)", "file:///secret", "data:text/html;base64,PHNjcmlwdD4=", "data:image/svg+xml;base64,PHN2Zz4=", "WAYTOOLONGTEXT"]) assert.throws(() => normalizeIconInput(value));
});