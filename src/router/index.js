import Vue from 'vue'
import VueRouter from 'vue-router'


Vue.use(VueRouter)
var title = '| 智慧餐口';
//将路由单独抽出来
const routes = [
    {
        //默认首页
        path: '',
        //redirect重定向
        redirect:'login',
        component: () => import('../views/Login.vue'),
    },
    {
        // 登录页面
        path: '/login',
        name: 'Login',
        component: () => import('../views/Login.vue'),
    },
    {
        // 404页面
        path:'*',
        name:'NotFound',
        component: () => import('../views/NotFound.vue'),
    },
    
    {
        //订餐页面
        path: '/ordering',
        name: 'Ordering',
        component: () => import('../Layout/Ordering.vue'),
        children:[
            // 订餐
            {
                path:'newOrders',
                name:'NewOrders',
                component: () => import('../components/AllOrder/NewOrders.vue'),
                meta: {
                    title: '新增订单' + title
                }
            },
            {
                path:'getOrders',
                name:'GetOrders',
                component: () => import('../components/AllOrder/GetOrders.vue'),
            },
            {
                path:'completeOrders',
                name:'CompleteOrders',
                component: () => import('../components/AllOrder/CompleteOrders.vue'),
            },
            {
                path:'illegalOrders' ,
                name:'IllegalOrders',
                component: () => import('../components/AllOrder/IllegalOrders.vue'),
            },
            {
                path:'menu',
                name:'Menu',
                component: () => import('../components/AllMenu/Menu.vue'),
                meta: {
                    title: '菜单管理' + title
                }
            },
            {
                path: 'meat',
                name: 'Meat',
                component: () => import('../components/AllMenu/Meat.vue'),
            },
            {
                path:'Test/:id',
                name: 'Test',
                component: () => import('../components/Statistics/Test.vue'),
                props:true,
            },
            {
                path:'OverallStatistics',
                name: 'OverallStatistics',
                component: () => import('../components/Statistics/OverallStatistics.vue'),
                meta: {
                    title: '统计总览' + title
                }
                
            },
            {
                path:'editMenu',
                name: 'EditMenu',
                component: () => import('../components/AllMenu/EditMenu.vue'),
            },
            {
                path:'info',
                name: 'Info',
                component: () => import('../components/Information/Info.vue'),
                meta: {
                    title: '店铺信息' + title
                }
            }
        ]
    },
]

/* 解决重复点击相同路由的报错问题 */
const originalPush = VueRouter.prototype.push
//修改原型对象中的push方法
VueRouter.prototype.push = function push(location) {
  return originalPush.call(this, location).catch(err => err)
}

const router = new VueRouter({
  routes,
  mode: 'history',
})




// 路由守卫
// router.beforeEach((to, from, next) => {
//     let isLogin = sessionStorage.getItem('isLogin');
//     // 退出登录
//     if(to.path == '/logout'){
//         // 将缓存清空
//         sessionStorage.clear();
//         next({path:'/login'})
//     } else if(to.path == '/login'){
//         // 如果已经登录，就跳转到首页
//         if(isLogin){
//             next({path:'/main'})
//         } else {
//             next()
//         }
//     } else if(isLogin == null){
//         // 如果没有登录，就跳转到登录页面
//         next({path:'/login'})
//     }
        
// })



export default router

