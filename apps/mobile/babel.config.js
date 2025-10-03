module.exports = function (api) {
  api.cache(true);
  return {
    presets: [
      // Expo preset includes react-native/metro defaults
      'babel-preset-expo',
    ],
    plugins: [
      [
        'module-resolver',
        {
          root: ['.'],
          alias: {
            '@': './src',
          },
          extensions: [
            '.ios.ts', '.android.ts', '.ts', '.ios.tsx', '.android.tsx', '.tsx',
            '.ios.js', '.android.js', '.js', '.jsx', '.json'
          ],
        },
      ],
      // Keep Reanimated plugin LAST
      'react-native-reanimated/plugin',
    ],
    env: {
      production: {
        // Remove console.* calls in production to reduce JS thread overhead
        plugins: [[
          'transform-remove-console',
          { exclude: ['error', 'warn'] }
        ]],
      },
    },
  };
};