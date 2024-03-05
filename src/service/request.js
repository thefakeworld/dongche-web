import axios from "axios";
import { message } from "antd";
import { getLocalSecret, getSession, removeSession } from "./storage";


const request = axios.create({
  baseURL: "/api",
  timeout: 300000,
});

request.interceptors.request.use((config) => {
  const session = getSession();
  const secret_key = getLocalSecret();
  config.headers.Authorization = session?.token;
  if(secret_key) {
    config.headers['x-secret-key'] = secret_key;
  }
  return config;
});
request.interceptors.response.use(
  async (res) => {
    console.log('拦截响应', res);
    if(res.data.status === 0 || res.data.status === 'success') { 
      return res.data
    }

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
    console.error('请求错误', error)
    const status = error?.response?.status;

    const { code, msg } = error?.response?.data || {};
    switch (status) {
      case 401: {
        removeSession();
        break;
      }
      default: {
        
      }
    }
    message.error(msg || "服务器异常")
    return Promise.reject(error);
  }
);

export default request;
