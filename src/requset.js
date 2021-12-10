/* 将axios封装到该文件中*/

// 导入axios
import axios from 'axios'
// 导入qs模块
import qs from 'qs'
// 使用element-ui中的message提示
import { Message } from 'element-ui'

// 创建axios实例
const baseUrl = axios.create({
  // 公共接口
  baseurl: '/api',
  // 请求超时时间
  timeout: 6000,
})

// 请求拦截器
baseUrl.interceptors.request.use(
  config => {
    let token = sessionStorage.getItem('token');
    // 添加请求头
    config.headers.token = token;
    // 序列化参数
    config.data = qs.stringify(config.data);
    // 配置请求头
    config.headers["Content-Type"] = "application/x-www-form-urlencoded";
    // 返回配置
    return config;

  }, 
  error => {
    Promise.reject(error);
  }
)

// 响应拦截器
baseUrl.interceptors.response.use(
  response => {
    return response.data;
  },
  error => {
    // 接收到异常响应的处理
    if(error && error.response) {
      switch (error.response.status) {
        case 400:
          error.message = '请求错误(400)'
          break;
        case 401:
          error.message = '未授权，请重新登录(401)'
          break;
        case 403:
          error.message = '拒绝访问(403)'
          break;
        case 404:
          error.message = '请求出错(404)'
          window.location.href = '/NotFound'
          break;
        case 405:
          error.message = '请求方法未允许(405)'
          break;
        case 408:
          error.message = '请求超时(408)'
          break;
        case 500:
          error.message = '服务器错误(500)'
          break;
        case 501:
          error.message = '服务未实现(501)'
          break;
        case 502:
          error.message = '网络错误(502)'
          break;
        case 503:
          error.message = '服务不可用(503)'
          break;
        case 504:
          error.message = '网络超时(504)'
          break;
        case 505:
          error.message = 'HTTP版本不受支持(505)'
          break;
        default:
          error.message = `连接出错(${error.response.status})!`
      }
    } else {
      // 超时处理
      if(JSON.stringify(error).includes('timeout')) {
        Message.error('请求超时，请刷新当前页!');
      }
      error.message = "连接服务器失败!"
    }

    Message.error(error.message);
    // return Promise.reject(error.message);
    return Promise.resolve(error.message);
  }
)


export default baseUrl