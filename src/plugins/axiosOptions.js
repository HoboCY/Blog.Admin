import axios from "axios";
import { Message } from "element-ui";
import router from "../router/index.js";

// 3. 配置信息
let config = {
  // 每次请求的协议、IP地址。  设置该配置后，每次请求路径都可以使用相对路径，例如"/admin/login"
  baseURL: "https://996bug.icu/api/",
  // 请求超时时间
  timeout: 10000
};

const instance = axios.create(config);

instance.interceptors.request.use(
  (config) => {
    const token = "Bearer " + localStorage.getItem("token");
    token && (config.headers.Authorization = token);
    return config;
  },
  (error) => {
    return Promise.error(error);
  }
);

instance.interceptors.response.use(
  (response) => {
    return response;
  },
  (error) => {
    if (error.response.status) {
      switch (error.response.status) {
        case 400:
          Message.error(error.response.data);
          break;
        case 401:
          localStorage.removeItem("token");
          Message.error("未授权，请重新登录");
          router.push("/");
          break;
        case 403:
          localStorage.removeItem("token");
          Message.error("授权过期，请重新登录");
          router.push("/");
        case 404:
          Message.error("资源不存在");
          break;
        case 500:
          Message.error(error.response.data);
          break;
      }
    }
    return error;
  }
);
export default instance;
