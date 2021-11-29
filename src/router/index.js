import Vue from 'vue'
import Router from 'vue-router'
// import Home from '../views/Home.vue'
import Login from '../views/Login.vue'
import Ordering from "../Layout/Ordering";
import Main from '../views/Main.vue';
import NewOrders from "../components/NewOrders";
import GetOrders from "../components/GetOrders";
import CompleteOrders from "../components/CompleteOrders";
import IllegalOrders from "../components/IllegalOrders";
 
 
Vue.use(Router)

//将路由单独抽出来
const routes = [
    {
        //默认首页
        path: '',
        //redirect重定向
        redirect:'login',
        component: Login,
    },
    {
        // 登录页面
        path: '/login',
        name: 'Login',
        component:Login
    },
    {
        //订餐页面
        path: '/ordering',
        name: 'Ordering',
        component: Ordering,
        children:[
            {
                path:'NewOrders',
                component:NewOrders,
            },
            {
                path:'GetOrders',
                component:GetOrders,
            },
            {
                path:'CompleteOrders',
                component:CompleteOrders,
            },
            {
                path:'IllegalOrders' ,
                component: IllegalOrders,
            }
        ]
    },
    {
        //首页
        path:'/main',
        name:'Main',
        component: Main
    }
]


Vue.use(Router);

export default new Router({
	routes,
    mode:'history',
})