<template>
  <div id="app">
    <router-view></router-view>
  </div>
</template>

<script>
import Login from './views/Login.vue';
import Ordering from "./Layout/Ordering";

import NewOrders from "./components/AllOrder/NewOrders";
import IllegalOrders from "./components/AllOrder/IllegalOrders";
import GetOrders from "./components/AllOrder/GetOrders";
import CompleteOrders from "./components/AllOrder/CompleteOrders";
import Meat from "./components/AllMenu/Meat";
import MeatVegetables from "./components/AllMenu/MeatVegetables";
import EnDayStat from "./components/Statistics/EnDayStat";
import WeekStat from "./components/Statistics/WeekStat";
import Test from "./components/Statistics/Test";
import OverallStatistics from "./components/Statistics/OverallStatistics";
import Info from "./components/Information/Info";
import EditMenu from "./components/AllMenu/EditMenu";
import Menu from "./components/AllMenu/Menu";

export default {
  name: 'app',
  components: {
    Login,
    Ordering,
    NewOrders,
    IllegalOrders,
    CompleteOrders,
    GetOrders,
    Meat,
    MeatVegetables,
    EnDayStat,
    WeekStat,
    Test,
    OverallStatistics,
    Info,
    EditMenu,
    Menu,
  },
  mounted() {
    window.addEventListener('unload', this.saveState());
  },
  methods:{
    loginClick(){
      //通过代码修改路径 vue-router
      this.$router.push('/login')
    },
    orderingClick(){
      this.$router.push('/ordering')
    },
    saveState() {
      sessionStorage.setItem('state', JSON.stringify(this.$store.state))
    }

  },

}
</script>

<style>
.active {
  /*更改样式*/
  color: #e9eef3;
}

html,body{
  height: 100%;
  margin:0;
}

body {
  background-color: rgb(121, 187, 255);

  margin: 0;
  padding: 0;
  border: 0;
  
}

#app {
  font-family: "Avenir", Helvetica, Arial, sans-serif;
  -webkit-font-smoothing: antialiased;
  -moz-osx-font-smoothing: grayscale;
  text-align: center;
  color: #2c3e50;
}
</style>
