const withLess = require("@zeit/next-less");
if (typeof require !== "undefined") {
  require.extensions[".less"] = (file) => {};
}
module.exports = withLess({
  //   target: "serverless",
  webpack(config) {
      config.module.rules.push({
        test: /\.(svg|woff2?|ttf|eot|jpe?g|png|gif)$/i,
        use: [
          {
            loader: "url-loader",
            options: {
              limit: 8192,
              esModule: false
            },
          },
        ],
      });
    // config.plugins.push(new CleanWebpackPlugin());
    return config;
  },
});