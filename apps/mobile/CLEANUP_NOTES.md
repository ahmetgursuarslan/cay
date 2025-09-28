This app has been cleaned and prepared for GitHub.

Removed:
- fontawesome.css (unused, heavy)

Kept:
- patches/ (applied at postinstall)
- __create/ (used for error boundaries and runtime glue)
- polyfills/ (used via metro.config.js)
- public/canvaskit.wasm (Skia web runtime)

Git settings:
- .gitattributes normalizes line endings and marks binaries
- .gitignore updated for Expo/React Native

If you need Font Awesome on web, prefer installing `@fortawesome/fontawesome-free` and importing from node_modules.
