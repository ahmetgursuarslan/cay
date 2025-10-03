# Mobile App Boot Fix Runbook (Android)

This runbook documents the exact steps to clean, verify, and run the Android app after the GPT5 auto-fix. Commands are for Windows PowerShell.

## Pre-flight

```
node -v
npm -v
npx expo --version
```

## Install deps and verify

```
# From apps/mobile
npm install
npx expo doctor --fix
```

## Start development with a clean Metro cache

```
# Optional: close any running Metro or Android build
npx expo start -c
```

- Press "a" in the Expo CLI to open Android, or run the command below:

```
# Launch in Android (Expo Go or Dev Client if installed)
npx expo start --android
```

## Native Android build (optional, creates/uses android project)

```
# Full native build (may take a while)
npx expo run:android
```

## Deep link sanity check (optional)

If `adb` is installed and a device/emulator is running:

```
adb shell am start -W -a android.intent.action.VIEW -d "createxyz://"
```

---

Notes
- Expo Router is configured to use `src/app` via `EXPO_ROUTER_APP_ROOT` and `app.json > extra.router.appDir`.  // GPT5-AUTO-FIX
- Global ErrorBoundary and BootScreen added to reduce white-screen during boot.  // GPT5-AUTO-FIX
