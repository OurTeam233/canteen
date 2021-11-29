import Vue from 'vue';
import Router from 'vue-router';
import Login from '../views/Login.vue';
import Ordering from "../Layout/Ordering";
import Main from '../views/Main.vue';
import New from '../views/Order/New.vue';
import Finish from '../views/Order/Finish.vue';
import Statistics from '../views/Statistics/Statistics.vue';
 
Vue.use(Router);

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
    },
    {
        //首页
        path:'/main',
        name:'Main',
        component: Main,
        children:[
            {
                // 新增订单
                path:'new',
                name:'New',
                compoment: New
            },
            {
                // 已完成订单
                path:'finish',
                name:'Finish',
                compoment: Finish
            },
            {
                // 统计
                path:'statistics',
                name:'Statistics',
                compoment: Statistics
            }
            
        ]
    }
]   

 


export default new Router({
	routes,
    mode:'history',
    
})