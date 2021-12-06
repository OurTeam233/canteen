import Vue from 'vue'
import Router from 'vue-router'
import Login from '../views/Login.vue'
import Main from '../views/Main.vue';
import NotFound from "../views/NotFound";
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
import Menu from "../components/AllMenu/Menu";


//统计
import EnDayStat from "../components/Statistics/EnDayStat";
import WeekStat from "../components/Statistics/WeekStat";
import Test from "../components/Statistics/Test";
import OverallStatistics from "../components/Statistics/OverallStatistics";

// 店铺管理
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
        // 404页面
        path:'*',
        name:'NotFound',
        component:NotFound
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
                name:'NewOrders',
                component:NewOrders,
            },
            {
                path:'getOrders',
                name:'GetOrders',
                component:GetOrders,
            },
            {
                path:'completeOrders',
                name:'CompleteOrders',
                component:CompleteOrders,
            },
            {
                path:'illegalOrders' ,
                name:'IllegalOrders',
                component: IllegalOrders,
            },
            {
                path:'menu',
                name:'Menu',
                component:Menu,
            },
            {
                path: 'meat',
                name: 'Meat',
                component: Meat,
            },
            {
                path: 'meatVegetables',
                name: 'MeatVegetables',
                component: MeatVegetables,
            },
            {
                path: 'enDayStat',
                name: 'EnDayStat',
                component: EnDayStat,
            },
            {
                path: 'weekStat',
                name: 'WeekStat',
                component: WeekStat,
            },
            {
                path:'Test/:id',
                name: 'Test',
                component: Test,
                props:true,
            },
            {
                path:'OverallStatistics',
                name: 'OverallStatistics',
                component: OverallStatistics,
                
            },
            {
                path:'editMenu',
                name: 'EditMenu',
                component: EditMenu,
            },
            {
                path:'info',
                name: 'Info',
                component: Info,
            }
            

        ]
    },

]


export default new Router({
	routes,
    mode:'history',


})