const state = sessionStorage.getItem('state') ? JSON.parse(sessionStorage.getItem('state')) : {
  userInfo: {
    userName: '',
  }
}




export default state