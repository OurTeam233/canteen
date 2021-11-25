import Vue from 'vue'
import Router from 'vue-router'
// import Home from '../views/Home.vue'
import Login from '../views/Login.vue'
 
 
Vue.use(Router)
 
export default new Router({
	routes: [
		{
      // 登录页面
      path: '/login',
      name: 'Login',
      component:Login
    }
    
	]
})