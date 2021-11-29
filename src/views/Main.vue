<template>
  <div class="box">

    <!-- 顶部导航栏 -->
    <el-container>
      <el-header style="text-align: right; font-size: 12px">
        <el-dropdown>
          <i class="el-icon-setting" style="margin-right: 15px"></i>
          <el-dropdown-menu slot="dropdown">
            <el-dropdown-item>用户中心</el-dropdown-item>
            <el-dropdown-item>退出登录</el-dropdown-item>
          </el-dropdown-menu>
        </el-dropdown>
        <i class="el-icon-user-solid"></i>
        <span>马冬梅</span>
      </el-header>
  
    </el-container>



    <el-container>
      <!-- 侧边栏导航 -->
      <el-aside width="200px">
        <el-menu :default-openeds="['1']">
         
          <el-submenu index="1">
            <template slot="title"><i class="el-icon-message"></i>订单管理</template>
              <el-menu-item index="1-1">
                <!-- <router-link to="/main/new">新增订单</router-link> -->
                新增订单
              </el-menu-item>
              <el-menu-item index="1-2">待取餐订单</el-menu-item>
              <el-menu-item index="1-3">
                <router-link to="/main/finish">已完成订单</router-link>
              </el-menu-item>
              <el-menu-item index="1-4">违规订单</el-menu-item>
          </el-submenu>

          <el-submenu index="2">
            <template slot="title"><i class="el-icon-message"></i>菜品管理</template>
              <el-menu-item index="2-1">新增订单</el-menu-item>
              <el-menu-item index="2-2">待取餐订单</el-menu-item>
              <el-menu-item index="2-3">已完成订单</el-menu-item>
              <el-menu-item index="2-4">违规订单</el-menu-item>
          </el-submenu>

          <el-submenu index="3">
            <template slot="title"><i class="el-icon-message"></i>店铺</template>
              <el-menu-item index="3-1">新增订单</el-menu-item>
              <el-menu-item index="3-2">待取餐订单</el-menu-item>
              <el-menu-item index="3-3">已完成订单</el-menu-item>
              <el-menu-item index="3-4">违规订单</el-menu-item>
          </el-submenu>

          <el-submenu index="4">
            <template slot="title"><i class="el-icon-message"></i>统计</template>
              <el-menu-item index="4-1">新增订单</el-menu-item>
              <el-menu-item index="4-2">待取餐订单</el-menu-item>
              <el-menu-item index="4-3">已完成订单</el-menu-item>
              <el-menu-item index="4-4">违规订单</el-menu-item>
          </el-submenu>
        </el-menu>
      </el-aside>

      <!-- 主体内容(嵌套路由) -->
      <el-main>
        <router-view></router-view>
      </el-main>
      
      


    </el-container>

    
    


  </div>
</template>




<script>
import Finish from '../views/Order/Finish.vue'
export default{
  name: 'Main',
  components: {
    Finish
  },
  
}
</script>




<style scoped>

.container {
  
  padding: 0;
  margin: 0;
}

.el-header {
    background-color: #fff;
    color: #333;
    line-height: 60px;
}
  
.el-aside {
  color: #333;
}
</style>
