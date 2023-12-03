import axios from "axios";
import { message } from "antd";
import { getSession, removeSession } from "./storage";


const request = axios.create({
  baseURL: "/api",
  timeout: 30000,
});

request.interceptors.request.use((config) => {
  const session = getSession();
  config.headers.Authorization = session?.token;
  return config;
});
request.interceptors.response.use(
  async (res) => {
    console.log('res', res);
    if(Array.isArray(res.data)) {
      return res.data
    }
    switch (res.data.code) {
      case 0: {
        return res.data.data;
      }
      case 401: {
        removeSession();
        break;
      }
      case 500: {
        message.error(res.data.msg || "服务器异常")
        throw new Error(res.data.msg);
      }
      default: {
        message.error(res.data.msg || "接口请求失败")
        throw new Error(res.data.msg);
      }
    }
  },
  async (error) => {
    const { status } = error?.response;
    const { code, msg } = error?.response?.data || {};
    switch (status) {
      case 401: {
        removeSession();
        break;
      }
      default: {
        message.error(msg || "服务器异常")
        removeSession();
      }
    }
    return Promise.reject(error);
  }
);

export default request;
