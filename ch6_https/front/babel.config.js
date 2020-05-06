module.exports = function(api) {
  return {
    presets: [
      [
        "@nuxt/babel-preset-app",
        {
          corejs: { version: 3 }
        }
      ]
    ]
  };
};
