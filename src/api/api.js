// 暂时没用，封装不下去了
import http from '../utils/http'

/**
 *  @parms request 请求地址 例如：http://localhost:8080/request/...
 *  @parms '/testIp' 代表vue-cil中config，index.js中配置的代理
 */

let resquest = '/ip/request'

// get请求
export function getListAPI(params) {
  return http.get(`${resquest}/getList.json`, params)
}

// post请求
export function postListAPI(params) {
  return http.post(`${resquest}/postList.json`, params)
}

// put请求
export function putListAPI(params) {
  return http.put(`${resquest}/putList.json`, params)
}

// delete请求
export function deleteListAPI(params) {
  return http.delete(`${resquest}/deleteList.json`, params)
}