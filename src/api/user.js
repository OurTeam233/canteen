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
export const addDishes = (dishes) => axios.post('/CanteenWeb/Dishes/Insert',{dishes})
// export const addDishes = (dishes) => axios({
//   url: '/CanteenWeb/Dishes/Insert',
//   method: 'post',
//   data: {
//     decodeURI(dishes)
//   }
// })

// 查询所有菜品标签
export const getDishesType = () => axios.post('/CanteenWeb/Dishes/Types/Select')

// 上传图片(好像被组件代替了没用上)
export const uploadImg = (file) => axios.post('/upload', {file})

// 修改店铺营业状态
export const changeStoreStatus = (status) => axios.post('/CanteenWeb/Store/Update', {status})



/*管理员操作 */

// 查询所有用户
export const getUserList = () => axios.post('/CanteenWeb/User/Select')

// 修改用户账号和密码
export const resetUser = (user) => axios.post('/CanteenWeb/User/Update', {user}) 

// 创建新的商家用户
export const createUser = (user) => axios.post('/CanteenWeb/User/Insert', {user})


/*统计界面操作 (商家和管理员公用界面，只是请求到的数据不同) */

//获取明天的预定菜品
export const getTomorrowDishes = () => axios.post('/CanteenWeb/Statistic/Dishes/NextDay')

//获取今天的预定菜品
export const getTodayDishes = () => axios.post('/CanteenWeb/Statistic/Dishes/Today')

// 获取店铺的总营业额
export const getTotalPrice = () => axios.post('/CanteenWeb/Statistic/TotalPrice')

// 统计本店铺的用户数量
export const getUserNum = () => axios.post('/CanteenWeb/Statistic/TotalStudent')

// 统计本店的累计订单数
export const getOrderNum = () => axios.post('/CanteenWeb/Statistic/OrderCount')

// 统计本店的菜品销售情况
export const getStoreDishesNum = () => axios.post('/CanteenWeb/Statistic/StoreDishes')

// 统计本店的违规订单数量
export const getIllegalOrderNum = () => axios.post('/CanteenWeb/Statistic/IllegalOrder')

// 获取本店的菜品数量
export const getTotalDishesNum = () => axios.post('/CanteenWeb/Statistic/TotalDishes')
