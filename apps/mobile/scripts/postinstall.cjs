const { existsSync, unlinkSync } = require('fs');
const { join } = require('path');
const { spawnSync } = require('child_process');

const mobileRoot = join(__dirname, '..');
const patchesDir = join(mobileRoot, 'patches');
const legacyPatch = join(patchesDir, '@expo+metro-runtime+5.0.4.patch');

try {
  if (existsSync(legacyPatch)) {
    unlinkSync(legacyPatch);
    console.log(`[postinstall] Removed legacy patch: ${legacyPatch}`);
  }
} catch (e) {
  console.warn('[postinstall] Could not remove legacy patch:', e && e.message);
}

const cmd = process.platform === 'win32' ? 'npx.cmd' : 'npx';
const result = spawnSync(cmd, ['patch-package'], { stdio: 'inherit', cwd: mobileRoot });
process.exit(result.status || 0);
