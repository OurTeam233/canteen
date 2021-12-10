// const state = sessionStorage.getItem('state') ? JSON.parse(sessionStorage.getItem('state')) : {
//   userInfo: {
//     userName: '',
//   }
// }

const state = {
  userInfo: {
    // 将用户名缓存到sessionStorage中
    userName: sessionStorage.getItem('userName') ? sessionStorage.getItem('userName') : '',
  }
}




export default state