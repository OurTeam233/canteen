import Vue from 'vue'
import Vuex from 'vuex'

import mutations from "./mutations";
import actions from "./actions";
import state from "./state";
import user from "./modules/user";

Vue.use(Vuex)


// 创建store对象
const store = new Vuex.Store({
  // 定义状态
  state,
  // 同步操作(状态更新)
  mutations,
  // 异步操作
  actions,
  
  // 模块
  modules:{
    user
  },
  // 插件
  plugins: [],

})


// 导出store对象
export default store;