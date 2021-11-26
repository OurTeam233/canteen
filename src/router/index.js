import Vue from 'vue'
import Router from 'vue-router'
// import Home from '../views/Home.vue'
import Login from '../views/Login.vue'
import Ordering from "../Layout/Ordering";
 
 
Vue.use(Router)

//将路由单独抽出来
const routes = [
    {
        // 登录页面
        path: '/login',
        name: 'Login',
        component:Login
    },
    {
        //订餐页面
        path: '/Ordering',
        name: 'Ordering',
        component: Ordering,
    }
]

export default new Router({
	routes,
})