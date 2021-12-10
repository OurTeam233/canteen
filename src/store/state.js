// const state = sessionStorage.getItem('state') ? JSON.parse(sessionStorage.getItem('state')) : {
//   userInfo: {
//     userName: '',
//   }
// }

const state = {
  userInfo: {
    userName: sessionStorage.getItem('userName') ? sessionStorage.getItem('userName') : '',
  }
}




export default state