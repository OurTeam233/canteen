import Vue from 'vue'
import Router from 'vue-router'
import Login from '../views/Login.vue'
import Main from '../views/Main.vue';
//订餐
import Ordering from "../Layout/Ordering";
import NewOrders from "../components/AllOrder/NewOrders";
import GetOrders from "../components/AllOrder/GetOrders";
import CompleteOrders from "../components/AllOrder/CompleteOrders";
import IllegalOrders from "../components/AllOrder/IllegalOrders";

 //菜谱
import Meat from "../components/AllMenu/Meat";
import MeatVegetables from "../components/AllMenu/MeatVegetables";
import EditMenu from "../components/AllMenu/EditMenu";
//统计
import EnDayStat from "../components/Statistics/EnDayStat";
import WeekStat from "../components/Statistics/WeekStat";
//店铺信息
import Info from "../components/Information/Info";


Vue.use(Router)

//将路由单独抽出来
const routes = [
    {
        //首页
        path:'/main',
        name:'Main',
        component: Main
    },
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
            // 订餐
            {
                path:'newOrders',
                component:NewOrders,
            },
            {
                path:'getOrders',
                component:GetOrders,
            },
            {
                path:'completeOrders',
                component:CompleteOrders,
            },
            {
                path:'illegalOrders' ,
                component: IllegalOrders,
            },
            {
                path: 'meat',
                component: Meat,
            },
            {
                path: 'meatVegetables',
                component: MeatVegetables,
            },
            {
                path:'editMenu',
                component:EditMenu,
            },
            {
                path: 'enDayStat',
                component: EnDayStat,
            },
            {
                path: 'weekStat',
                component: WeekStat,
            },
            {
                path: 'info',
                component: Info,
            }
        ]
    },
]


Vue.use(Router);

export default new Router({
	routes,
    mode:'history',
})