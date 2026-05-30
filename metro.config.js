const path = require('path');
const { getDefaultConfig, mergeConfig } = require('@react-native/metro-config');

const mergeWithShim = path.resolve(__dirname, 'src/shims/lodashMergewith.js');

/**
 * Metro configuration
 * https://reactnative.dev/docs/metro
 *
 * @type {import('@react-native/metro-config').MetroConfig}
 */
const config = {
  resolver: {
    resolveRequest(context, moduleName, platform) {
      if (moduleName === 'lodash.mergewith') {
        return {
          filePath: mergeWithShim,
          type: 'sourceFile',
        };
      }

      return context.resolveRequest(context, moduleName, platform);
    },
  },
};

module.exports = mergeConfig(getDefaultConfig(__dirname), config);
