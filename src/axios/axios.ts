import axios from "axios";
export const options = {
  baseURL: "http://47.107.44.19:3000",
  timeout: 15000,
};
export default () => {
  let process: any;
  const AxiosInstance: any = axios.create(options);
  // http request 拦截器
  AxiosInstance.interceptors.request.use(
    (config: any) => {
      console.log(config, "config啊啊啊啊啊");
      return config;
    },
    (err: any) => {
      return Promise.reject(err);
    }
  );
  // 初始化
  AxiosInstance.init = function (req: any) {
    if (process.browser) {
    } else {
      const content = req.headers.cookie;
      if (content) {
        AxiosInstance.defaults.headers.common["Cookie"] = content;
      }
    }

    return AxiosInstance;
  };

  // 客户端自己执行
  if (process.client) {
    AxiosInstance.init();
  }

  return AxiosInstance;
};
