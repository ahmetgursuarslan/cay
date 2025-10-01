const { existsSync, unlinkSync, readdirSync, readFileSync, writeFileSync, statSync } = require('fs');
const { join, resolve } = require('path');
const { spawnSync } = require('child_process');

const mobileRoot = join(__dirname, '..');
const patchesDir = join(mobileRoot, 'patches');
const legacyPatch = join(patchesDir, '@expo+metro-runtime+5.0.4.patch');
const badExpoRuntimePatch = join(patchesDir, '@expo+metro-runtime+6.1.2.patch');
const badMetroPatch0832 = join(patchesDir, 'metro-runtime+0.83.2.patch');

try {
  if (existsSync(legacyPatch)) {
    unlinkSync(legacyPatch);
    console.log(`[postinstall] Removed legacy patch: ${legacyPatch}`);
  }
  if (existsSync(badExpoRuntimePatch)) {
    unlinkSync(badExpoRuntimePatch);
    console.log(`[postinstall] Removed invalid patch: ${badExpoRuntimePatch}`);
  }
  if (existsSync(badMetroPatch0832)) {
    unlinkSync(badMetroPatch0832);
    console.log(`[postinstall] Removed invalid patch: ${badMetroPatch0832}`);
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

// If no patches directory or no patch files, skip
if (!existsSync(patchesDir) || readdirSync(patchesDir).filter((f) => f.endsWith('.patch')).length === 0) {
  process.exit(0);
}

// Try patch-package first
const cmd = process.platform === 'win32' ? 'npx.cmd' : 'npx';
let result = spawnSync(cmd, ['patch-package'], { stdio: 'inherit', cwd: mobileRoot });

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
