// 仅用来存放一些公共信息

const state = {
  userInfo: {
    // 将用户名缓存到sessionStorage中
    userName: sessionStorage.getItem('userName') ? sessionStorage.getItem('userName') : '',
  }
}




export default state