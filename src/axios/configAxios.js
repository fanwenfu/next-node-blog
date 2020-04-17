import axios from "axios";

export default () => {
//   const options = {
//     baseURL: "http://localhost:3000",
//   };

  const inst = axios.create();

  // 全局处理  
    // inst.defaults.baseURL = "http://localhost:3000";
    // inst.defaults.axios = {
    //   host:"http://localhost",
    //   port:"3000",
    // };
    inst.defaults.timeout = 15000;
  inst.defaults.headers.common["platform"] = "web";
  inst.defaults.headers.common["timezone"] =
    new Date().getTimezoneOffset() / 60;

  // 初始化
  inst.init = function (req) {
    if (process.browser) {
    } else {
      const content = req.headers.cookie;
      if (content) {
        inst.defaults.headers.common["Cookie"] = content;
      }
    }

    return inst;
  };

  // 客户端自己执行
  if (process.client) {
    inst.init();
  }

  return inst;
};
