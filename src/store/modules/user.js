// 状态
const state = {
  token: '',
  userInfo: {},

}


// 同步操作
const mutations = {
  // 设置用户信息
  setUserInfo(state, user) {
    state.userInfo = user
  },

  // 设置用户token
  setToken(state, token) {
    state.token = token
  }
}


// 异步操作
const actions = {


}






export default {
  state,
  mutations,
  actions,

}