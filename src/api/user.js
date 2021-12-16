/*封装api，用于发送请求 */

import axios from '../utils/request'
// import http from '../utils/http'
// import api from '@/api/api'

// 用户登录
// export const login = (username, password, userType) => http.post('http://121.43.56.241:8080/CanteenWeb/User/Login', {username, password, userType})
// export const login = (username, password, userType) => api.postListAPI(username, password, userType)
export const login = (username, password, userType) => axios.post('/Login/Store', {username, password, userType})



// 测试(查询店铺信息)
export const test = () => axios.post('/Store')
// 获取到店铺id后就可以请求店铺中的菜品信息
export const test2 = () => axios.post('/Dishes')


// 图床测试
export const img = () => axios.post('/image/meat1.webp')






