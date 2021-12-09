import Vue from 'vue'
import App from './App.vue'
/* 使用elementUI组件 */
import ElementUI from 'element-ui';
import 'element-ui/lib/theme-chalk/index.css';
// 让Vue使用这个路由
import VueRouter from 'vue-router';
// Vue实例中使用的路由
import router from './router/index.js';

import store from './store/index.js';
// 实验一下echarts(全局导入)
import echarts from "echarts";
Vue.prototype.$echarts = echarts;


 

/* 让vue使用elementUI */
Vue.use(ElementUI);
/* 让vue使用router */
Vue.use(VueRouter);



Vue.config.productionTip = false


// 路由守卫
// router.beforeEach((to, from, next) => {
//   let isLogin = sessionStorage.getItem('isLogin');
//   // 退出登录
//   if(to.path == '/logout'){
//       // 将缓存清空
//       sessionStorage.clear();
//       next({path:'/login'})
//   } else if(to.path == '/login'){
//       // 如果已经登录，就跳转到首页
//       if(isLogin){
//           next({path:'/main'})
//       } else {
//           next()
//       }
//   } else if(isLogin == null){
//       // 如果没有登录，就跳转到登录页面
//       next({path:'/login'})
//   }
      
// })









new Vue({
  router,
  store,
  render: h => h(App),
}).$mount('#app')
