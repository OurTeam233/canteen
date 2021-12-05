import Vue from 'vue'
import App from './App.vue'
/* 使用elementUI组件 */
import ElementUI from 'element-ui';
import 'element-ui/lib/theme-chalk/index.css';
// 让Vue使用这个路由
import VueRouter from 'vue-router';
// Vue实例中使用的路由

import router from './router/index.js';

// 实验一下echarts(全局导入)
import echarts from "echarts";
Vue.prototype.$echarts = echarts;

 

/* 让vue使用elementUI */
Vue.use(ElementUI);
/* 让vue使用router */
Vue.use(VueRouter);


Vue.config.productionTip = false

new Vue({
  router,
  render: h => h(App),
}).$mount('#app')
