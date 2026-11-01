import test from 'node:test';
import assert from 'node:assert/strict';
import { mkdtemp, mkdir, readFile, rm, writeFile, access } from 'node:fs/promises';
import { join } from 'node:path';
import { DatabaseSync } from 'node:sqlite';
import { importD1Sql } from '../scripts/import-d1.mjs';

const baseline = await readFile(new URL('../migrations/0001_local_schema.sql', import.meta.url), 'utf8');
async function fixture(t, sql) {
  await mkdir(new URL('../.local-data/', import.meta.url), {recursive:true});
  const directory = await mkdtemp(new URL('../.local-data/import-test-', import.meta.url).pathname);
  t.after(() => rm(directory, {recursive:true,force:true}));
  const input=join(directory,'export.sql');
  await writeFile(input,sql);
  return {input,output:join(directory,'navi.sqlite')};
}
test('D1 SQL migration preserves private flags, notes, preferences and never overwrites a database', async t => {
  const {input,output}=await fixture(t,`${baseline}\nINSERT INTO groups(id,name,order_num,is_public) VALUES(1,'Private',1,0); INSERT INTO sites(id,group_id,name,url,notes,order_num,is_public) VALUES(2,1,'Secret','https://example.com','owner note',1,0); INSERT INTO user_favorites(user_id,site_id) VALUES('owner',2);`);
  const stats=await importD1Sql(input,output);
  assert.equal(stats.user_favorites,1);
  const database=new DatabaseSync(output,{readOnly:true});
  assert.equal(database.prepare('SELECT is_public FROM groups').get().is_public,0);
  assert.equal(database.prepare('SELECT notes FROM sites').get().notes,'owner note');
  database.close();
  await assert.rejects(importD1Sql(input,output),{code:'EEXIST'});
});
test('D1 migration rejects missing visibility flags and leaves no destination',async t=>{
  const {input,output}=await fixture(t,"CREATE TABLE groups(id INTEGER PRIMARY KEY,name TEXT,order_num INTEGER); CREATE TABLE sites(id INTEGER PRIMARY KEY,group_id INTEGER,name TEXT,url TEXT,order_num INTEGER);");
  await assert.rejects(importD1Sql(input,output),/is_public is missing/);
  await assert.rejects(access(output),{code:'ENOENT'});
});
test('D1 migration rejects an export that opens an external database',async t=>{
  const {input,output}=await fixture(t,"ATTACH DATABASE '/etc/navi.sqlite' AS external;");
  await assert.rejects(importD1Sql(input,output),/external databases/);
});
test('D1 migration rejects an uncommitted export and accepts a complete transaction',async t=>{
  const transaction = `BEGIN;\n${baseline}\nINSERT INTO groups(id,name,order_num,is_public) VALUES(1,'Private transaction',1,0);`;
  const incomplete = await fixture(t, transaction);
  await assert.rejects(importD1Sql(incomplete.input,incomplete.output),/uncommitted transaction/);
  await assert.rejects(access(incomplete.output),{code:'ENOENT'});

  const complete = await fixture(t, `${transaction}\nCOMMIT;`);
  const stats = await importD1Sql(complete.input,complete.output);
  assert.equal(stats.groups,1);
  const database = new DatabaseSync(complete.output,{readOnly:true});
  assert.equal(database.prepare('SELECT is_public FROM groups').get().is_public,0);
  database.close();
});
