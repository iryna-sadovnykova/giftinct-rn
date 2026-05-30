module.exports = {
  presets: ['module:@react-native/babel-preset'],
  plugins: ['react-native-worklets/plugin'],
  env: {
    development: {
      plugins: [
        [
          '@babel/plugin-transform-react-jsx',
          {
            runtime: 'automatic',
            development: true,
            importSource: '@welldone-software/why-did-you-render',
          },
        ],
      ],
    },
  },
};
