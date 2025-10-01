const { existsSync, unlinkSync, readdirSync, readFileSync, writeFileSync, statSync } = require('fs');
const { join, resolve } = require('path');
const { spawnSync } = require('child_process');

const mobileRoot = join(__dirname, '..');
const patchesDir = join(mobileRoot, 'patches');
const legacyPatch = join(patchesDir, '@expo+metro-runtime+5.0.4.patch');
const badExpoRuntimePatch = join(patchesDir, '@expo+metro-runtime+6.1.2.patch');

try {
  if (existsSync(legacyPatch)) {
    unlinkSync(legacyPatch);
    console.log(`[postinstall] Removed legacy patch: ${legacyPatch}`);
  }
  if (existsSync(badExpoRuntimePatch)) {
    unlinkSync(badExpoRuntimePatch);
    console.log(`[postinstall] Removed invalid patch: ${badExpoRuntimePatch}`);
  }
} catch (e) {
  console.warn('[postinstall] Could not remove legacy patch:', e && e.message);
}

// Normalize EOL for all *.patch files to LF to avoid parse issues on Linux CI
function normalizePatchEOLs(dir) {
  if (!existsSync(dir)) return;
  const entries = readdirSync(dir);
  for (const name of entries) {
    const p = join(dir, name);
    const st = statSync(p);
    if (st.isDirectory()) {
      normalizePatchEOLs(p);
      continue;
    }
    if (name.endsWith('.patch')) {
      try {
        const content = readFileSync(p, 'utf8');
        const normalized = content.includes('\r\n') ? content.replace(/\r\n/g, '\n') : content;
        if (normalized !== content) {
          writeFileSync(p, normalized, 'utf8');
          console.log(`[postinstall] Normalized LF line endings: ${resolve(p)}`);
        }
      } catch (e) {
        console.warn('[postinstall] Failed to normalize patch file:', p, e && e.message);
      }
    }
  }
}

normalizePatchEOLs(patchesDir);

// Remove stale patches for packages not installed in node_modules to avoid patch-package errors
function patchFileToPackageName(fileName) {
  // Remove trailing .patch
  const base = fileName.replace(/\.patch$/, '');
  // Strip version suffix: everything after the last '+' is usually the version
  const lastPlus = base.lastIndexOf('+');
  const pkgSegment = lastPlus > 0 ? base.substring(0, lastPlus) : base;
  // Handle scoped packages encoded as '@scope+name'
  if (pkgSegment.startsWith('@')) {
    const parts = pkgSegment.split('+');
    if (parts.length >= 2) {
      return `${parts[0]}/${parts[1]}`; // @scope/name
    }
  }
  // Unscoped packages use '-' and are not transformed
  return pkgSegment;
}

try {
  const patchFiles = readdirSync(patchesDir).filter((f) => f.endsWith('.patch'));
  for (const pf of patchFiles) {
    const pkg = patchFileToPackageName(pf);
    const pkgPath = join(mobileRoot, 'node_modules', pkg);
    if (!existsSync(pkgPath)) {
      const abs = join(patchesDir, pf);
      unlinkSync(abs);
      console.log(`[postinstall] Removed stale patch (pkg not installed): ${abs}`);
    }
  }
} catch (e) {
  console.warn('[postinstall] Failed to prune stale patches:', e && e.message);
}

// If no patches directory or no patch files after pruning, skip
if (!existsSync(patchesDir) || readdirSync(patchesDir).filter((f) => f.endsWith('.patch')).length === 0) {
  console.log('[postinstall] No patch files to apply. Skipping.');
  process.exit(0);
}

// Try running patch-package JS entrypoint via Node for reliable behavior on Windows
let result;
const beforeRun = readdirSync(patchesDir).filter((f) => f.endsWith('.patch'));
console.log(`[postinstall] Applying patches: ${beforeRun.join(', ')}`);
let entry = null;
try {
  entry = require.resolve('patch-package/dist/index.js', { paths: [mobileRoot] });
} catch (_) {}
if (entry) {
  console.log(`[postinstall] Running node ${entry}`);
  result = spawnSync(process.execPath, [entry], { stdio: 'inherit', cwd: mobileRoot });
} else {
  const cmd = process.platform === 'win32' ? 'npx.cmd' : 'npx';
  console.log('[postinstall] Running via npx patch-package');
  result = spawnSync(cmd, ['patch-package'], { stdio: 'inherit', cwd: mobileRoot });
}
console.log(`[postinstall] patch-package exited with code: ${result && typeof result.status !== 'undefined' ? result.status : 'unknown'}`);

if (result.status === 0) {
  process.exit(0);
}

// Fallback: try GNU patch (useful when patch-package fails to parse but unified diffs are valid)
function hasGNUPatch() {
  const probe = spawnSync('patch', ['--version'], { stdio: 'ignore' });
  return probe.status === 0;
}

if (hasGNUPatch()) {
  console.warn('[postinstall] patch-package failed; attempting GNU patch fallback...');
  const patchFiles = readdirSync(patchesDir).filter((f) => f.endsWith('.patch'));
  let failed = false;
  for (const file of patchFiles) {
    const abs = join(patchesDir, file);
    const apply = spawnSync('patch', ['-p1', '-i', abs, '--forward', '--batch'], {
      stdio: 'inherit',
      cwd: mobileRoot,
    });
    if (apply.status !== 0) {
      console.error(`[postinstall] GNU patch failed for ${file}`);
      failed = true;
    } else {
      console.log(`[postinstall] Applied ${file} with GNU patch`);
    }
  }
  process.exit(failed ? 1 : 0);
}

// If no GNU patch, return original failure code
process.exit(result.status || 1);
