/*封装api，用于发送请求 */

import axios from '../utils/request'
// import http from '../utils/http'
// import api from '@/api/api'

// 用户登录
// export const login = (username, password, userType) => http.post('http://121.43.56.241:8080/CanteenWeb/User/Login', {username, password, userType})
// export const login = (username, password, userType) => api.postListAPI(username, password, userType)
export const login = (username, password, userType) => axios.post('/CanteenWeb/Login', {username, password, userType})


// 获取店铺数据
export const getStoreInfo = () => axios.post('/CanteenWeb/Store')

// 获取店铺中所有的菜品信息
export const getDishesList = () => axios.post('/CanteenWeb/Dishes')

// 获取...订单信息
export const getOrderList = () => axios.post('/CanteenWeb/Order/Select')

// 更改订单状态
export const changeOrderType = (orderId, type) => axios.post('/CanteenWeb/Order/Update', {orderId, type})

// 删除菜品
export const deleteDishes = (dishesId) => axios.post('/CanteenWeb/Dishes/Delete', {dishesId})

// 新增菜品
export const addDishes = (dishes) => axios({
  url: '/CanteenWeb/Dishes/Insert',
  method: 'post',
  data: {
    dishes
  }
})

// 查询所有菜品标签
export const getDishesType = () => axios.post('/CanteenWeb/Dishes/Types/Select')

// 上传图片(好像被组件代替了没用上)
export const uploadImg = (file) => axios.post('/upload', {file})

// 修改店铺营业状态
export const changeStoreStatus = (status) => axios.post('/CanteenWeb/Store/Update', {status})



/*管理员操作 */

// 查询所有用户
export const getUserList = () => axios.post('/CanteenWeb/User/Select')

// 



