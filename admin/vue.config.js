module.exports = {
  publicPath: "/admin/",
  //   outputDir:"admin",
  //axios域代理，解决axios跨域问题
  devServer: {
    proxy: {
      "/api": {
        target: "http://localhost:3000",
        changeOrigin: true,
        pathRewrite: {
          "^/api": "/",
        },
      },
    },
  },
};