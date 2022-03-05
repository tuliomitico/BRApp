module.exports = function (api) {
  api.cache(true);
  return {
    presets: ['babel-preset-expo'],
    plugins: [
      [
        'module-resolver',
        {
          root: ['./'],
          extensions: ['.ts', '.tsx', '.js', '.jsx', '.json'],
          alias: {
            '@screens': './src/screens',
            '@routes': './src/routes',
            '@services': './src/services',
            '@components': './src/components',
            '@styles': './src/styles',
            '@interface': './src/interface',
            '@hooks': './src/hooks',
            '@helpers': './src/helpers',
          },
        },
      ],
    ],
  };
};
