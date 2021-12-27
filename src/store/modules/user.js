// 还是觉得抽出来比较好
// 只存放有关登录的个人信息

const state = {
  userInfo:{},
  type: '',
  token:'',
}
const mutations = {
  //设置用户信息
  SET_USER_INFO(state,user){
    state.userInfo = user
  },
  //设置用户类型
  SET_USER_TYPE(state,type){
    state.type = type
  },
  //设置token
  SET_TOKEN(state,token){
    state.token = token
  }
}

const actions = {
  set_token({commit},token){
    commit('SET_TOKEN',token)
  },
  set_userInfo({commit},userInfo){
    commit('SET_USER_INFO',userInfo)
  },
  set_userType({commit},type){
    commit('SET_USER_TYPE',type)
  }
}

export default {
  state,
  mutations,
  actions
}