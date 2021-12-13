import Vue from 'vue'
import App from './App.vue'
/* 使用elementUI组件 */
import ElementUI from 'element-ui';
import 'element-ui/lib/theme-chalk/index.css';
// Vue实例中使用的路由
import router from './router/index.js';
import store from './store/index.js';
// 实验一下echarts(全局导入)
import echarts from "echarts";
// Vue.prototype.$echarts = echarts;
/* 让vue使用elementUI(懒得抽了) */
Vue.use(ElementUI);




Vue.config.productionTip = false


new Vue({
  router,
  store,
  render: h => h(App),
}).$mount('#app')
