## Create mobile app

React Native + Expo app (web support via Metro). This repo is cleaned up and ready for GitHub.

### Requirements
- Node.js LTS
- pnpm or npm
- Expo CLI (optional for local dev)

### Install
```
npm install
```

### Run (web)
```
npm run web
```

### Run (native)
```
npm start
```

### Build
EAS configs are included (`eas.json`). Build with EAS or local build tools.

### Notes
- Patches in `patches/` are applied automatically after install via `patch-package`.
- Large build caches and OS/editor files are ignored via `.gitignore`.
