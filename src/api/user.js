/*封装api，用于发送请求 */

import axios from '../utils/request'
// import http from '../utils/http'
// import api from '@/api/api'

// 用户登录
// export const login = (username, password, userType) => http.post('http://121.43.56.241:8080/CanteenWeb/User/Login', {username, password, userType})
// export const login = (username, password, userType) => api.postListAPI(username, password, userType)
export const login = (username, password, userType) => axios.post('/Login/Store', {username, password, userType})




// 获取店铺数据
export const getStoreInfo = () => axios.post('/Store')

// 获取店铺中所有的菜品信息
export const getDishesList = () => axios.post('/Dishes')

// 获取...订单信息
export const getOrderList = () => axios.post('/Order/Select')


// 更改订单状态
export const changeOrderType = (orderId, type) => axios.post('/Order/Update', {orderId, type})




// 图床测试
export const img = () => axios.post('/image/meat1.webp')






