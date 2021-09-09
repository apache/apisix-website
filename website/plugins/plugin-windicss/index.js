const WindiCSS = require("windicss-webpack-plugin").default;

module.exports = function (context, options) {
  return {
    name: 'plugin-windicss',
    configureWebpack(config) {
      return {
        plugins: [
          new WindiCSS(),
        ]
      };
    },
  };
};
