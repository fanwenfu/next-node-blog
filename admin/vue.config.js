module.exports = {
  //axios域代理，解决axios跨域问题
  devServer: {
    proxy: {
      "": {
        target: "http://127.0.0.1:3000",
        changeOrigin: true,
      
      }
    }
  }
};
