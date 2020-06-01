/*
 * @Author: 范文富
 * @Date: 2020-04-14 16:42:09
 * @LastEditTime: 2020-06-01 10:48:03
 * @LastEditors: Please set LastEditors
 * @Description: In User Settings Edit
 * @FilePath: /next-antd-node-blog/admin/vue.config.js
 */ 
module.exports = {
  publicPath: "/admin/",
  //   outputDir:"admin",
  //axios域代理，解决axios跨域问题
  devServer: {
    proxy: {
      "/api": {
        target: "http://fanlogs.cn:3000",
        changeOrigin: true,
        pathRewrite: {
          "^/api": "/",
        },
      },
    },
  },
};