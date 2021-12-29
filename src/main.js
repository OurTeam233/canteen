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
/*导入阿里巴巴图标 */
import "@/assets/iconfont/iconfont.css";
Vue.use(ElementUI);

// 使用vue-socket.io
// import VueSocketIO from 'vue-socket.io'
// Vue.use(new VueSocketIO({
//     debug: true,
//     connection: 'http://121.43.56.241:8080/CanteenWeb',
//     vuex: {
//         store,
//         actionPrefix: 'SOCKET_', //为vuex设置的两个前缀
//         mutationPrefix: 'SOCKET_'
//     },
//     options: { path: "/my-app/" } //Optional options
// }))



Vue.config.productionTip = false


new Vue({
  router,
  store,
  render: h => h(App),
}).$mount('#app')
