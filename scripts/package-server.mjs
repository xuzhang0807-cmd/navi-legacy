import { execFile as execFileCallback } from 'node:child_process';
import { createHash, randomUUID } from 'node:crypto';
import { DatabaseSync, backup } from 'node:sqlite';
import { chmod, link, mkdir, mkdtemp, readFile, rm, stat, writeFile } from 'node:fs/promises';
import { dirname, join, relative, resolve } from 'node:path';
import { fileURLToPath, pathToFileURL } from 'node:url';
import { promisify } from 'node:util';

const execFile = promisify(execFileCallback);
const root = resolve(dirname(fileURLToPath(import.meta.url)), '..');
const tables = ['groups', 'sites', 'configs', 'user_favorites', 'user_preferences', 'user_recent_visits'];
const sensitivePart = /^(?:node_modules|\.git|\.wrangler[^/]*|\.local-data|\.dev\.vars(?:\..*)?)$/;
const exampleEnv = /^\.env(?:\.[\w-]+)*\.example$/;

function rejectSensitiveArchive(paths) {
  for (const path of paths) {
    if (path.split('/').some(part => sensitivePart.test(part) || (part.startsWith('.env') && !exampleEnv.test(part))) || /^(?:tmp|output)\/imagegen\//.test(path)) {
      throw new Error(`Refusing a committed runtime/secret path in the release: ${path}`);
    }
  }
}

/** Bundle a committed source revision and one consistent live SQLite snapshot. */
export async function packageServer(databaseFile = join(root, '.local-data/navi.sqlite')) {
  const git = async (...args) => (await execFile('git', args, { cwd: root, maxBuffer: 8 * 1024 * 1024 })).stdout.trim();
  if (await git('status', '--porcelain', '--untracked-files=no')) {
    throw new Error('Tracked source changes are not committed. Run pnpm check and commit them before packaging.');
  }
  const commit = await git('rev-parse', 'HEAD');
  const paths = (await git('ls-tree', '-r', '--name-only', '-z', commit)).split('\0').filter(Boolean);
  rejectSensitiveArchive(paths);
  const sourceFile = resolve(root, databaseFile);
  if (!(await stat(sourceFile)).isFile()) throw new Error('The SQLite source must be an existing regular file.');

  const releases = join(root, '.local-data/releases');
  await mkdir(releases, { recursive: true, mode: 0o700 });
  await chmod(releases, 0o700);
  const staging = await mkdtemp(join(releases, '.pack-'));
  await chmod(staging, 0o700);
  const createdAt = new Date().toISOString();
  const stamp = createdAt.replace(/[:.]/g, '-');
  const output = join(releases, `navi-server-${stamp}-${randomUUID().slice(0, 8)}.tar.gz`);
  try {
    const sourceTar = join(staging, 'source.tar');
    await execFile('git', ['archive', '--format=tar', `--output=${sourceTar}`, commit], { cwd: root });
    const bundle = join(staging, 'navi-server');
    await mkdir(bundle, { mode: 0o700 });
    await execFile('tar', ['-xf', sourceTar, '-C', bundle], { cwd: root });
    const dataDirectory = join(bundle, '.local-data');
    await mkdir(dataDirectory, { mode: 0o700 });
    const snapshotFile = join(dataDirectory, 'imported.sqlite');
    const source = new DatabaseSync(sourceFile, { readOnly: true });
    try { await backup(source, snapshotFile); } finally { source.close(); }
    await chmod(snapshotFile, 0o600);
    const snapshot = new DatabaseSync(snapshotFile);
    let counts;
    try {
      snapshot.exec('PRAGMA journal_mode = DELETE;');
      if (snapshot.prepare('PRAGMA integrity_check').all().some(row => row.integrity_check !== 'ok')) throw new Error('Snapshot integrity check failed.');
      if (snapshot.prepare('PRAGMA foreign_key_check').all().length) throw new Error('Snapshot foreign key check failed.');
      for (const table of ['groups', 'sites']) {
        const invalid = snapshot.prepare(`SELECT COUNT(*) AS n FROM ${table} WHERE is_public IS NULL OR is_public NOT IN (0, 1)`).get().n;
        if (invalid) throw new Error(`Snapshot has invalid ${table} visibility values.`);
      }
      counts = Object.fromEntries(tables.map(table => [table, Number(snapshot.prepare(`SELECT COUNT(*) AS n FROM ${table}`).get().n)]));
    } finally { snapshot.close(); }
    const databaseSha256 = createHash('sha256').update(await readFile(snapshotFile)).digest('hex');
    const manifest = { format: 1, createdAt, commit, database: '.local-data/imported.sqlite', counts, databaseSha256 };
    await writeFile(join(bundle, 'release-manifest.json'), JSON.stringify(manifest, null, 2) + '\n', { mode: 0o600, flag: 'wx' });
    const archive = join(staging, 'package.tar.gz');
    await execFile('tar', ['-czf', archive, '-C', staging, 'navi-server'], { cwd: root });
    await chmod(archive, 0o600);
    // Publish exclusively: even a concurrently created output is never overwritten.
    await link(archive, output);
    return { file: relative(root, output), commit, counts, databaseSha256, archiveSha256: createHash('sha256').update(await readFile(output)).digest('hex') };
  } finally {
    // mkdtemp created this private child inside the project's ignored releases directory.
    await rm(staging, { recursive: true, force: true });
  }
}

if (process.argv[1] && import.meta.url === pathToFileURL(resolve(process.argv[1])).href) {
  try { console.log(JSON.stringify(await packageServer(process.argv[2]), null, 2)); }
  catch (error) { console.error(`Packaging failed: ${error.message}`); process.exitCode = 1; }
}
