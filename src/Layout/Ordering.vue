<template>
  <div class="big">
    <el-container>
      <el-header>
        <!--头部导航-->

        <img class="logo" src="url" />
        <p class="logo-name">智慧餐口</p>

        <div class="block el-cascader-state">
          <el-cascader
            v-model="value"
            :options="options"
            @change="handleChange"
          >
          </el-cascader>
        </div>
        <p class="name">{{$route.params.name}}</p>
        <el-avatar
          class="el-avatar-state"
          shape="circle"
          :size="45"
          :src="url"
        ></el-avatar>
      </el-header>

      <el-container>
        <el-aside width="200px">
          <!--侧边导航-->
          <el-col :span="12" class="aside-bar">
            <el-menu
              default-active="2"
              class="el-menu-vertical-demo"
              @open="handleOpen"
              @close="handleClose"
              background-color="#545c64"
              text-color="rgb(64,158,255)"
              active-text-color="#ffd04b"
            >
              <el-submenu index="1">
                <template slot="title">
                  <i class="el-icon-location"></i>
                  <span>订餐系统</span>
                </template>
                <el-menu-item-group>
                  <el-menu-item index="1-1" @click="newOrders">新增订单</el-menu-item>
                  <el-menu-item index="1-2" @click="getOrders">待取订餐</el-menu-item>
                  <el-menu-item index="1-3" @click="completeOrders">已完成订单</el-menu-item>
                  <el-menu-item index="1-4" @click="illegalOrders">违规订单</el-menu-item>
                </el-menu-item-group>
              </el-submenu>
              <el-submenu index="2">
                <template slot="title">
                  <i class="el-icon-location"></i>
                  <span>菜谱</span>
                </template>
                <el-menu-item-group>
                  <el-menu-item index="2-1">荤菜</el-menu-item>
                  <el-menu-item index="2-2">花荤</el-menu-item>
                  <el-menu-item index="2-3">素菜</el-menu-item>
                  <el-menu-item index="2-4">主食</el-menu-item>
                </el-menu-item-group>
              </el-submenu>
              <el-submenu index="3">
                <template slot="title">
                  <i class="el-icon-location"></i>
                  <span>统计</span>
                </template>
                <el-menu-item-group>
                  <el-menu-item index="3-1" >
                    <router-link :to="{name:'Test', params:{id:3}}">当天收益</router-link>
                    
                  </el-menu-item>
                  <el-menu-item index="3-2">
                    <router-link :to="{name:'OverallStatistics'}">总体统计</router-link>
                  </el-menu-item>
                  <el-menu-item index="3-3">本月收益</el-menu-item>
                  <el-menu-item index="3-4">上月收益</el-menu-item>
                </el-menu-item-group>
              </el-submenu>
              
            </el-menu>
          </el-col>
        </el-aside>

        <el-main>
          <router-view></router-view>
        </el-main>
      </el-container>
    </el-container>
  </div>
</template>

<script>

export default {
    name: "Ordering",
    data() {

        return {
            url: 'https://fuss10.elemecdn.com/e/5d/4a731a90594a4af544c0c25941171jpeg.jpeg',

            activeIndex: '1',
            activeIndex2: '1',
            value: [],
            options: [
                {
                    value: 'yingye',
                    label: '营业',
                },
                {
                    value: 'xiuxi',
                    label: '休息',
                }
            ]
        };
    },

    methods: {
        handleSelect(key, keyPath) {
            console.log(key, keyPath);
        },
        handleOpen(key, keyPath) {
            console.log(key, keyPath);
        },
        handleClose(key, keyPath) {
            console.log(key, keyPath);
        },
        handleChange(value) {
            console.log(value);
        },
        newOrders(){
            this.$router.push('/Ordering/NewOrders')
        },
        getOrders(){
            this.$router.push('/Ordering/GetOrders')
        },
        completeOrders(){
            this.$router.push('/Ordering/CompleteOrders')
        },
        illegalOrders(){
            this.$router.push('/Ordering/IllegalOrders')
        },
        test(){
            this.$router.push('/Ordering/Test')
        },
        }

    }

</script>

<style scoped>
.aside-bar {
  background-color: rgb(64, 158, 255);
  width: 200px;
}

.el-header {
  background-color: #545c64;
  color: #333;
  text-align: center;
  line-height: 60px;
  padding: 0;
  border-bottom: 1px solid #999999;
}

.logo {
  float: left;
  margin-left: 200px;
  margin-top: 4px;
  width: 50px;
  height: 50px;
}

.logo-name {
  float: left;
  margin-left: 5px;
  margin-top: 10px;
  color: #ffffff;
}

.el-cascader-state {
  float: right;
  width: 80px;
  height: 10px;
  text-align: center;
  color: rgb(64, 158, 255);
}

.el-avatar-state {
  float: right;
  margin-right: 10px;
  margin-top: 7px;
}

.name {
  float: right;
  font-size: 14px;
  margin-right: 20px;
  margin-top: 10px;
  color: #ffffff;
}

.el-aside {
  background-color: #545c64;
  color: #333;
  text-align: center;
  line-height: 200px;
  width: 200px;
  height: 600px;
}

.el-main {
  background-color: #e9eef3;
  color: #333;
  text-align: center;
  line-height: 160px;
  width: 100%;
  margin: 0;
  padding: 0;
}

body > .el-container {
  margin-bottom: 0px;
}

.el-container:nth-child(5) .el-aside,
.el-container:nth-child(6) .el-aside {
  line-height: 260px;
}

.el-container:nth-child(7) .el-aside {
  line-height: 320px;
}
</style>
