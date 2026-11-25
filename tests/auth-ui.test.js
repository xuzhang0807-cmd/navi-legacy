import test from 'node:test';
import assert from 'node:assert/strict';
import { readFile } from 'node:fs/promises';
import { blogStartUrl, safeExternalUrl, safeReturnTo } from '../src/features/auth/urls.ts';

test('auth URL helpers build safe Blog start URLs and validate external logout URLs', () => {
  assert.equal(safeReturnTo('/folder?q=1'), '/folder?q=1');
  assert.equal(safeReturnTo('//evil.example'), '/');
  assert.equal(safeReturnTo('/\\evil.example'), '/');
  assert.equal(safeReturnTo('https://evil.example'), '/');
  assert.equal(blogStartUrl('/folder?q=1'), '/api/v1/auth/blog/start?returnTo=%2Ffolder%3Fq%3D1');
  assert.equal(blogStartUrl('/folder', 'manage'), '/api/v1/auth/blog/start?returnTo=%2Ffolder&scope=manage');
  assert.equal(blogStartUrl('//evil.example'), '/api/v1/auth/blog/start?returnTo=%2F');
  assert.equal(
    safeExternalUrl('https://zxublog.com/logout?return_to=https%3A%2F%2Fdh.kazerush.xyz'),
    'https://zxublog.com/logout?return_to=https%3A%2F%2Fdh.kazerush.xyz',
  );
  assert.equal(safeExternalUrl('javascript:alert(1)'), null);
  assert.equal(safeExternalUrl('/logout'), null);
});

test('LoginDialog and auth API exclude password login and render only Xublog login and invite registration', async () => {
  const [dialog, api] = await Promise.all([
    readFile(new URL('../src/features/auth/LoginDialog.tsx', import.meta.url), 'utf8'),
    readFile(new URL('../src/features/auth/api.ts', import.meta.url), 'utf8'),
  ]);
  assert.match(dialog, /使用 Xublog 账号登录/);
  assert.match(dialog, /凭邀请码注册/);
  assert.match(dialog, /blogStartUrl\(returnTo\)/);
  assert.equal(/type=["']password["']|autoComplete=["']current-password["']|loginWithPassword|onPasswordLogin/.test(dialog), false);
  assert.equal(/loginWithPassword|\/auth\/login/.test(api), false);
});

test('sign-out offers 同时退出 Xublog via the server-provided blogLogoutUrl', async () => {
  const [provider, layout] = await Promise.all([
    readFile(new URL('../src/features/auth/SessionProvider.tsx', import.meta.url), 'utf8'),
    readFile(new URL('../src/app/layout/SiteLayout.tsx', import.meta.url), 'utf8'),
  ]);
  assert.match(provider, /safeExternalUrl\(session\?\.blogLogoutUrl\)/);
  assert.match(provider, /setBlogLogoutOffer\(logoutUrl\)/);
  assert.match(layout, /href=\{blogLogoutOffer\}>同时退出 Xublog<\/a>/);
});
