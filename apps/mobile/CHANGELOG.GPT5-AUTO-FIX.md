# CHANGELOG (GPT5-AUTO-FIX)

- index.tsx
  - Set `process.env.EXPO_ROUTER_APP_ROOT = './src/app'` so expo-router finds routes outside the default `app/` folder. // GPT5-AUTO-FIX
- src/components/ErrorBoundary.tsx
  - New global error boundary to prevent silent white-screen on runtime errors. // GPT5-AUTO-FIX
- src/components/BootScreen.tsx
  - New boot screen displayed while fonts/auth initialize. // GPT5-AUTO-FIX
- src/app/_layout.jsx
  - Wrapped the router `Stack` with `ErrorBoundary`, added `BootScreen`, and only hide splash when ready. // GPT5-AUTO-FIX
- app.json
  - Added global `scheme: "createxyz"` and `extra.router.appDir: "src/app"` to persist non-standard routes directory and deep-link scheme. // GPT5-AUTO-FIX
- MOBILE_NAV_FIX_RUNBOOK.md
  - Added runbook with exact commands for Android.
