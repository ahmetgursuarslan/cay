const { getDefaultConfig } = require('expo/metro-config');
const path = require('node:path');
const fs = require('node:fs');
const { FileStore } = require('metro-cache');
const { reportErrorToRemote } = require('./__create/report-error-to-remote');
const {
  handleResolveRequestError,
  VIRTUAL_ROOT,
  VIRTUAL_ROOT_UNRESOLVED,
} = require('./__create/handle-resolve-request-error');

/** @type {import('expo/metro-config').MetroConfig} */
const projectRoot = __dirname;
const workspaceRoot = path.resolve(projectRoot, '..', '..');

const config = getDefaultConfig(projectRoot);

function esc(p) {
  return p.replace(/[-/\\^$*+?.()|[\]{}]/g, '\\$&');
}

const NATIVE_ALIASES = {
  './Libraries/Components/TextInput/TextInput': path.resolve(
    __dirname,
    './polyfills/native/texinput.native.jsx'
  ),
};
const SHARED_ALIASES = {
  'expo-image': path.resolve(__dirname, './polyfills/shared/expo-image.tsx'),
};
fs.mkdirSync(VIRTUAL_ROOT_UNRESOLVED, { recursive: true });

// Restrict watch folders to speed up crawling on Windows; include virtual roots
const watchFolders = [projectRoot, VIRTUAL_ROOT, VIRTUAL_ROOT_UNRESOLVED];
// Ensure the root node_modules is watched for monorepo support
const rootNodeModules = path.resolve(workspaceRoot, 'node_modules');
if (fs.existsSync(rootNodeModules)) {
  watchFolders.push(rootNodeModules);
}
config.watchFolders = watchFolders;

// Exclude heavy/unrelated folders entirely from resolution
const blockListPaths = [
  path.join(projectRoot, 'android', 'app', 'build'),
  path.join(projectRoot, 'android', 'build'),
  path.join(projectRoot, 'android', '.gradle'),
  path.join(projectRoot, 'caches'),
  path.join(workspaceRoot, 'apps', 'web'),
];
const blockListRegex = new RegExp(blockListPaths.map((p) => `^${esc(p)}\\/.*`).join('|'));

config.resolver = {
  ...config.resolver,
  blockList: blockListRegex,
};

// Add web-specific alias configuration through resolveRequest
config.resolver.resolveRequest = (context, moduleName, platform) => {
  try {
    // Let Metro/Expo handle the special virtual entry module
    if (moduleName === './.expo/_virtual-metro-entry') {
      return context.resolveRequest(context, moduleName, platform);
    }

    // Apply native-only aliases first
    if (platform !== 'web' && NATIVE_ALIASES[moduleName]) {
      return context.resolveRequest(context, NATIVE_ALIASES[moduleName], platform);
    }

    // Apply shared aliases
    if (SHARED_ALIASES[moduleName]) {
      return context.resolveRequest(context, SHARED_ALIASES[moduleName], platform);
    }

    // Polyfills are not resolved by Metro, let them pass through
    if (
      typeof context.originModulePath === 'string' &&
      context.originModulePath.startsWith(path.join(__dirname, 'polyfills'))
    ) {
      return context.resolveRequest(context, moduleName, platform);
    }

    // Wildcard alias for Expo Google Fonts
    if (moduleName.startsWith('@expo-google-fonts/') && moduleName !== '@expo-google-fonts/dev') {
      return context.resolveRequest(context, '@expo-google-fonts/dev', platform);
    }

    // Default resolution
    return context.resolveRequest(context, moduleName, platform);
  } catch (error) {
    return handleResolveRequestError({ error, context, platform, moduleName });
  }
};

const cacheDir = path.join(projectRoot, 'caches');

config.cacheStores = [
  new FileStore({
    root: path.join(cacheDir, 'metro'),
  }),
];
// Avoid forcing a cache reset on every start; use `--reset-cache` only when needed.
config.resetCache = false;
const baseReporter = config.reporter;
config.reporter = {
  ...baseReporter,
  update: (event) => {
    baseReporter?.update?.(event);
    const reportableErrors = [
      'error',
      'bundling_error',
      'cache_read_error',
      'hmr_client_error',
      'transformer_load_failed',
    ];
    for (const errorType of reportableErrors) {
      if (event.type === errorType) {
        reportErrorToRemote({ error: event.error }).catch((reportError) => {
          // no-op
        });
      }
    }
    // The return value of update is not used, but it's good practice to return the event.
    // The type definition for Reporter.update is `(event: ReportableEvent) => void;`
    // so we should not return anything.
  },
};

// Speed up initial render; keeps bundling reasonable while runtime gets faster
config.transformer = {
  ...config.transformer,
  getTransformOptions: async () => ({
    transform: {
      experimentalImportSupport: false,
      inlineRequires: true,
    },
  }),
};

// Use default Metro port (let Expo manage the port, typically 8081)
// config.server = { port: 8081 };

// On Windows, too many workers can cause CPU contention and stutter during dev
// Keep it conservative; adjust if your machine has more headroom
config.maxWorkers = Math.max(1, Math.min(4, require('os').cpus()?.length || 1));

module.exports = config;
