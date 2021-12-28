<template>

  <el-container class="home-container">

    <!-- 侧边栏 -->
    <el-aside :width="isCollapse ? '64px' : '230px'">
        <!-- 头部logo -->
        <template>
          <div class="header-title" v-if="!isCollapse">
            <img width="40px" height="40px" src="../../public/img/DingTang.png" style="border-radius: 100%">
            <span style="font-weight:bold">智慧餐口管理系统</span>
          </div>
          <div class="header-title-hiddle" v-else>
             <img width="40px" height="40px" src="../../public/img/DingTang.png" style="border-radius: 100%">
          </div>
        </template>
        
        <!-- 菜单区域 -->
        <el-menu 
            background-color="#282C34" 
            text-color="#fff" 
            active-text-color="#fff"
            :collapse="isCollapse"
            :collapse-transition="false"
            :default-active="'/' + activePath"
            unique-opened
            router>
        
          <!-- 首页 -->
          <el-menu-item 
            :index="item.path" v-for="item in menuList" 
            :key="item.id"
            @click="selectMenu(item)">
            <i :class="item.class"></i>
            <span slot="title">{{item.label}}</span>
          </el-menu-item>

        </el-menu>
    </el-aside>

    <!-- 主体 -->
    <el-container>
      <!-- 头部 -->
      <el-header>
        
        <!-- 头部导航栏 -->
        <div class="header-row">
          <!-- 折叠 展开 和 名人名言 -->
          <div class="toggle-button">
            <div>
              <i :title="isCollapse ? '展开' : '收起'" class="fa fa-bars el-icon-s-fold" @click="toggleCollapse"></i>
            </div>
            <div style="height:25px;width:100%;margin-left:10px">
              <div style="float:left;color:#E74405;font-size:16px;height:25px;line-height:25px;">
                <i class="fa fa-bullhorn"></i>
              </div>
              <el-carousel height="25px" direction="vertical" indicator-position="none" autoplay :interval="8000">
                
                <el-carousel-item v-for="item in mottoList" :key="item">
                  <h3 class="medium">{{ item }}</h3>
                </el-carousel-item>
              </el-carousel>
            </div>
          </div>
          <!-- 营业状态显示 -->
          <div class="state" v-if="this.userType == '2'">
            <el-switch
              v-model="state"
              @change="changeState"
              active-text="营业中"
              inactive-text="休息中">
            </el-switch>
          </div>
          <!-- 头像下拉菜单 -->
          <div class="header-avatar">
            <div class="user">
              {{this.userType=='0'?'管理员':'商家'}}
              , 您好!
            </div>
            <el-dropdown @command="handleCommand">
              <span class="el-dropdown-link">
                <img width="35" height="35" style="border-radius:50%;background:#dddddd" src="../../public/img/DingTang.png" alt="">
                <!-- <i class="el-icon-arrow-down el-icon--right"></i> -->
              </span>
              <el-dropdown-menu slot="dropdown">
                <el-dropdown-item command="logout">退出登录</el-dropdown-item>
              </el-dropdown-menu>
            </el-dropdown>
          </div>
          
        </div>

        <!-- tab标签页区域 - 用于标签页切换 -->
        <div class="tabs-switch-page">
          <el-tag
            size="medium"
            v-for="(tab, index) in tabList"
            :key="tab.name"
            @close="handleClose(tab, index)"
            @click="changeMenu(tab)"
            :closable="tab.name !== 'home'"
            :effect="activePath === tab.name ? 'dark' : 'plain'">
          {{tab.label}}
          </el-tag>
        </div>
        
      </el-header>

      <!-- 内容区 -->
      <el-main>
        <!-- 路由占位符，用于展示内容区的内容 -->
        <div style="padding:15px">
          <keep-alive :include="catch_components">
            <router-view />
          </keep-alive>
        </div>
      </el-main>
    </el-container>
  </el-container>
</template>

<script>
import { mapState, mapMutations } from 'vuex';
import { changeStoreStatus } from '../api/user.js';
import {
  adminMenuList,
  storeMenuList
} from '../utils/menuList.js';
export default {
  
  //组件被创建
  created() {
    let tempType = sessionStorage.getItem('userType');
    // console.log(tempType)
    if(tempType != null){
      this.$store.dispatch('set_userType', tempType);
    }
    //加载菜单
    this.loadMenu();
  },
  computed: {
    ...mapState({ // 从 state 中的到的计算属性
       activePath: state => state.activePath, // 已选中菜单
       tabList: state => state.tabList,  // tags菜单列表
       catch_components: state => state.catch_components,  // keepalive缓存
       userType: state => state.user.type
    })
  },
  data() {
    return{
      //菜单列表
      menuList: [],
      // 折叠-展开 默认false不折叠 
      isCollapse: false,
      // 系统公告
      mottoList: [
          '测试公告1',
          '欢迎使用叮堂管理系统，祝您使用愉快!',
      ],
      // 营业状态
      state: true,
    }
  },
  methods: {

    // 点击开关切换商家的营业状态
    changeState() {
      // console.log("切换成功")
      // console.log(this.state)
      let toState = this.state ? 1 : 0;
      // console.log(toState)
      changeStoreStatus(toState).then(res => {
        // console.log(res)
        if(res.data.success) {
          this.$message({
            message: '营业状态切换成功',
            type: 'success'
          });
        }
      });
    },

    // 右上角下拉菜单点击事件
    handleCommand(command){
      switch(command){
        // 退出
        case 'logout': 
            // //消息提示
            // this.msg.success('退出登录')
            //重置vuex中的数据(也可以不清除)
            this.$store.commit('clearVUEX')
            //跳转到首页
            this.$router.push("/logout");
          break
        // //修改密码
        // case 'update-password':
        //   //消息提示
        //     this.msg.success('修改密码')
        //   break
      }
    },
    // 点击折叠 展开菜单
    toggleCollapse(){
        this.isCollapse = !this.isCollapse;
    },
    // 点击菜单 - 传入name，添加到keepalive缓存页面
    selectMenu(item){
        // 加入keepalive缓存
        this.$store.commit('addKeepAliveCache', item.name)
        //添加tags标签
        //访问wellcome 就代表home
        var name = item.name === 'wellcome' ? 'home' : item.name
        var submenu = {
          path: name,
          name: name,
          label: item.label
        }
        //修改选中菜单
        this.$store.commit('selectMenu', submenu)
    },
    // 关闭tab标签
    handleClose(tab, index) {
        // 历史选中菜单
        var oldActivePath = this.$store.state.activePath
        // 历史已选中菜单列表
        var oldTabList = this.$store.state.tabList
        // 计算标签个数
        let length = oldTabList.length - 1
        // 删除tabList中的该对象
        for(let i = 0;i < oldTabList.length;i++){
            let item = oldTabList[i]
            if(item.name === tab.name){
            oldTabList.splice(i, 1);
            }
        }
        // 删除keepAlive缓存
        this.$store.commit('removeKeepAliveCache', tab.name)
        // 如果关闭的标签不是当前路由的话，就不跳转
        if (tab.name !== oldActivePath) {
            return
        }
        // 如果length为1，必然只剩下首页标签，此时关闭后，更新到首页
        if(length === 1){
            // 同时存储菜单
            this.$store.commit('closeTab', {activePath: 'home', tabList: oldTabList})
            // tab页向左跳转
            this.$router.push({ name: oldTabList[index - 1].name })
            // 不再向下执行
            return
        }
        // 关闭的标签是最右边的话，往左边跳转一个
        if (index === length) {
            // 同时更新路径
            oldActivePath = oldTabList[index - 1].name
            // 同时存储菜单
            this.$store.commit('closeTab', {activePath:oldActivePath, tabList: oldTabList})
            // tab页向左跳转
            this.$router.push({ name: oldTabList[index - 1].name })
        } else {
            // 同时更新路径
            oldActivePath = oldTabList[index].name
            // 同时存储菜单
            this.$store.commit('closeTab', {activePath:oldActivePath, tabList: oldTabList})
            // tab页向右跳转
            this.$router.push({ name: oldTabList[index].name })
        }
    },
    // 点击标签跳转路由
    changeMenu(item) {
        // 历史选中菜单
        var oldActivePath = this.$store.state.activePath
        // 首先判断点击的是否是自己，如果是自己则return
        if(oldActivePath === item.name){
            return
        }
        // 不是自己，存储菜单
        this.$store.commit('changeMenu', item.name)
        // 页面跳转
        this.$router.push({ name: item.name })
    },
    //加载菜单
    loadMenu(){
      if(this.userType === '0') {
        // 管理员用户
        this.menuList = adminMenuList
      } else if(this.userType === '2') {
        // 商家用户
        this.menuList = storeMenuList
      }


        // this.menuList = [
        //     {
        //         id: 'number-01', 
        //         class: 'el-icon-suitcase-1', 
        //         path: '/Ordering/OverallStatistics', 
        //         label: '工作台', 
        //         name: 'OverallStatistics',
        //         // children:[{
        //         //   id: 'number-01-01',
        //         //   label:'第二个',
        //         //   path: '/Ordering/NewOrders',
        //         // }]
        //     },
        //     {
        //         id: 'number-02', 
        //         class: 'el-icon-document', 
        //         path: '/Ordering/NewOrders', 
        //         label: '新增订单', 
        //         name: 'NewOrders'
        //     },
        //     {
        //       id: 'number-06',
        //       class: 'el-icon-document-add',
        //       path: '/Ordering/NotReceive',
        //       label: '未取订单',
        //       name: 'NotReceive'
        //     },
        //     {
        //       id: 'number-03', 
        //       class: 'el-icon-document-checked',
        //       path: '/Ordering/HistoryOrders',
        //       label: '历史订单',
        //       name: 'HistoryOrders'
        //     },
        //     {
        //       id: 'number-09',
        //       class: 'el-icon-document-delete',
        //       path: '/Ordering/IllegalOrders',
        //       label: '违规订单',
        //       name: 'IllegalOrders'
        //     },
        //     {
        //       id: 'number-07',
        //       class: 'el-icon-dish',
        //       path: '/Ordering/Menu',
        //       label: '菜品管理',
        //       name: 'Menu'
        //     },
        //     {
        //       id: 'number-05',
        //       class: 'el-icon-s-custom',
        //       path: '/Ordering/Info',
        //       label: '店铺信息',
        //       name: 'Info'
        //     }
            
        // ]
    }
  },
};
</script>
<style lang="less" scoped>
.el-col-align-middle{
    line-height: 40px;
    text-align: left;
    font-size: 14px;
}
.home-container{
  height: 100%;
}
.el-header{
  color: rgb(0, 0, 0);
  font-size: 20px;
  border-bottom: 1px solid #dddddd;
  height: 103px !important;
  padding: 0;
  background: #fff;
}
.header-row{
  height:60px;
  width:100%;
  display: flex;
  flex-direction:row;
  justify-content: center;
  border-bottom:1px solid #dddddd;
  overflow: hidden;
}
.header-avatar{
  float:right;
  width:15%;
  display: flex;
  align-items: center;
  justify-content:flex-end;
  padding-right:20px;
  .user{
    font-size: 14px;
    font-weight: bold;
    padding: 0 10px;
  }
}

.el-aside{
  background-color: #282C34;
  height: 100vh;
  .header-title{
    padding-left: 10px;
    height: 60px;
    font-weight: 300;
    display: flex;
    font-size: 20px;
    align-items: center;
    cursor: pointer;
    color: #ffffff;
    span{
      margin-left: 10px;
    }
  }
  .header-title-hiddle{
    width: 64px;
    height: 60px;
    display: table-cell;
    vertical-align: middle;
    text-align: center;
    color: #ffffff;
    cursor: pointer;
  }
  .el-menu{
    border-right: none;
  }
}
// 菜单选中背景色
.el-menu-item.is-active{
  background-color: #1890FF !important;
}
// 菜单悬浮背景色
.el-menu-item:hover{
  background-color: #1890FF !important;
}
// 走马灯
.el-carousel__item h3 {
  color: #ee7c12;
  font-size: 14px;
  opacity: 0.75;
  line-height: 25px;
  margin: 0;
}

.el-main{
  background-color: #eaedf1;
  padding: 0;
  height: 85vh;
}

.fa{
  margin-right: 10px;
}

// 点击展开/折叠按钮
.toggle-button{
  width: 80%;
  font-size: 20px;
  line-height: 40px;
  color:#595959;
  text-align: left;
  display: flex;
  align-items: center;
  float:left;
  padding-left: 20px;
  i{
    cursor: pointer;
  }
}
// 面包屑导航
.el-breadcrumb{
  margin-bottom: 0;
}

// tab页
.tabs-switch-page{
  display: flex;
  align-items:center;
  height: 40px;
  background-color:#fff;
  overflow: hidden;
}
.el-tag{
  cursor: pointer;
  margin-left: 10px;
  border-radius: 2px;
  font-size: 12px;
  color: #1890FF;
  border-color: #1890FF;
}
.el-tag--dark{
  color: #fff;
  background-color: #1890FF;
}

.el-dropdown-link {
  cursor: pointer;
}
.el-icon-arrow-down {
  font-size: 12px;
}

.submit-row{
    display: flex;
    flex-direction: row;
    justify-content: flex-end;
    align-items: center;
}



.state{
  width:250px;
  line-height: 60px;
}
</style>