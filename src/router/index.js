import Vue from 'vue'
import Router from 'vue-router'
// import Home from '../views/Home.vue'
import Login from '../views/Login.vue'
import Main from '../views/Main.vue'
 
Vue.use(Router)
 
export default new Router({
	routes: [
		{
      // 登录页面
      path: '/login',
      name: 'Login',
      component:Login
    },
    {
      // 主页面
      path: '/main',
      name: 'Main',
      component:Main
    }
    
	]
})