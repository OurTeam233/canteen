<template>
  <div class="big">
    <el-container>
      <el-header >
        <!--头部导航-->

        <img class="logo" src="url" />
        <p class="logo-name">智慧餐口</p>

        <!-- 营业状态显示 -->
        <div class="block el-cascader-state">
          <el-cascader
            v-model="value"
            :options="options"
            @change="handleChange"
          >
          </el-cascader>
        </div>

        <!-- 普通竖直分割线 -->
        <!-- <el-divider direction="vertical"></el-divider> -->

        <p class="name"><!--{{ $route.params.name }}--> 三食堂</p>

        <!-- 头像 -->
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
              background-color="#1d2939"
              text-color="rgb(64,158,255)"
              active-text-color="#ffd04b"
            >
              <el-submenu index="1">
                <template slot="title">
                  <i class="el-icon-location"></i>
                  <span>订餐系统</span>
                </template>
                <el-menu-item-group>
                  <el-menu-item index="1-1" @click="newOrders"
                    >新增订单</el-menu-item
                  >
                  <el-menu-item index="1-2" @click="getOrders"
                    >待取订餐</el-menu-item
                  >
                  <el-menu-item index="1-3" @click="completeOrders"
                    >已完成订单</el-menu-item
                  >
                  <el-menu-item index="1-4" @click="illegalOrders"
                    >违规订单</el-menu-item
                  >
                </el-menu-item-group>
              </el-submenu>
              <el-submenu index="2">
                <template slot="title">
                  <i class="el-icon-location"></i>
                  <span>菜谱</span>
                </template>
                <el-menu-item-group>
                  <el-menu-item index="2-1" @click="meat">荤菜</el-menu-item>
                  <el-menu-item index="2-2" @click="meatVegetables"
                    >花荤</el-menu-item
                  >
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
                  <el-menu-item index="3-1">
                    <router-link :to="{ name: 'Test', params: { id: 3 } }"
                      >当天收益</router-link
                    >
                  </el-menu-item>
                  <el-menu-item index="3-2">
                    <router-link :to="{ name: 'OverallStatistics' }"
                      >总体统计</router-link
                    >
                  </el-menu-item>
                  <el-menu-item index="3-3">本月收益</el-menu-item>
                  <el-menu-item index="3-4">上月收益</el-menu-item>
                </el-menu-item-group>
              </el-submenu>

              <el-submenu index="4">
                <template slot="title">
                  <i class="el-icon-location"></i>
                  <span>店铺管理</span>
                </template>
                <el-menu-item-group>
                  
                  <el-menu-item index="4-1">本月收益</el-menu-item>
                  <el-menu-item index="4-2">上月收益</el-menu-item>
                </el-menu-item-group>
              </el-submenu>
            </el-menu>
          </el-col>
        </el-aside>

        <el-container>
          <el-main>
            <router-view></router-view>
          </el-main>
          <el-footer>哈哈哈</el-footer>
        </el-container>
        

        
      </el-container>

      
      
    </el-container>
  </div>
</template>

<script>
export default {
  name: "Ordering",
  data() {
    return {
      url:
        "https://fuss10.elemecdn.com/e/5d/4a731a90594a4af544c0c25941171jpeg.jpeg",

      activeIndex: "1",
      activeIndex2: "1",
      value: [],
      options: [
        {
          value: "yingye",
          label: "营业",
        },
        {
          value: "xiuxi",
          label: "休息",
        },
      ],
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
    newOrders() {
      this.$router.push("/Ordering/NewOrders");
    },
    getOrders() {
      this.$router.push("/Ordering/GetOrders");
    },
    completeOrders() {
      this.$router.push("/Ordering/CompleteOrders");
    },
    illegalOrders() {
      this.$router.push("/Ordering/IllegalOrders");
    },
    meat() {
      this.$router.push("/Ordering/Meat");
    },
    meatVegetables() {
      this.$router.push("/Ordering/MeatVegetables");
    },
    enDayStat() {
      this.$router.push("/Ordering/EnDayStat");
    },
    weekStat() {
      this.$router.push("/Ordering/WeekStat");
    },

    handleClose(key, keyPath) {
      console.log(key, keyPath);
    },
    handleChange(value) {
      console.log(value);
    },
    newOrders() {
      this.$router.push("/Ordering/NewOrders");
    },
    getOrders() {
      this.$router.push("/Ordering/GetOrders");
    },
    completeOrders() {
      this.$router.push("/Ordering/CompleteOrders");
    },
    illegalOrders() {
      this.$router.push("/Ordering/IllegalOrders");
    },
    test() {
      this.$router.push("/Ordering/Test");
    },
  },
};
</script>

<style scoped>

/*侧边栏里面的单元格 */
.aside-bar {
  background-color: rgb(64, 158, 255);
  width: 200px;
}


/*顶部信息栏 */
.el-header {
  /* background-color: #545c64; */
  background-color: #fff;
  color: #333;
  text-align: center;
  line-height: 60px;
  padding: 0;
  border-bottom: 1px solid #999999;
  border-left: 1px solid #eee;
  /*粘滞定位*/ 
  position:sticky;
  top:0;
  z-index: 10;
}

/*有点儿离谱的logo定位 */
.logo {
  float: left;
  margin-left: 5px;
  margin-top: 4px;
  width: 50px;
  height: 50px;
}

/*logo旁边的字 */
.logo-name {
  float: left;
  margin: 0 0 0 5px;
  line-height: 60px;
  color: #333;
}

/*顶部最右边的营业状态显示 */
.el-cascader-state {
  float: right;
  width: 100px;
  height: 10px;
  /* line-height: 60px; */
  text-align: center;
  margin-right: 10px;
  color: rgb(64, 158, 255);
}

/*头像显示 */
.el-avatar-state {
  float: right;
  margin-right: 10px;
  margin-top: 7px;
}

/*用户名 */
.name {
  float: right;
  font-size: 14px;
  /* margin-right: 20px; */
  /* margin-top: 10px; */
  margin: 0 20px 0 0;
  line-height: 60px;
  color: #333;
}

/*侧边栏 */
.el-aside {
  /* background-color: #545c64; */
  background-color: #1d2939;
  color: #333;
  text-align: center;
  line-height: 200px;
  width: 200px;
  /* height: 650px; */
  /* height: 100%; */
  /* position:sticky;
  top:60px;
  z-index: 9; */
}

.el-col{
  position: fixed;

}


/*中间的主题内容 */
.el-main {
  background-color: #e9eef3;
  color: #333;
  text-align: center;
  line-height: 160px;
  width: 100%;
  margin: 0;
  padding: 0;
}


/*底部footer */
.el-footer{
  width: 100%;
  background-color: #545c64;
  color: #fff;
  text-align: center;
  line-height: 60px;
  padding: 0;
  border-top: 1px solid #999999;
  /* border-left: 1px solid #eee; */
}


/*用来区分布局的容器 */
.el-container {
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
