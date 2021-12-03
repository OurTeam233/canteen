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
import NewOrders from "./components/NewOrders";
import IllegalOrders from "./components/IllegalOrders";
import GetOrders from "./components/GetOrders";
import CompleteOrders from "./components/CompleteOrders";
import Test from "./components/Statistics/Test";
import OverallStatistics from "./components/Statistics/OverallStatistics";

export default {
  name: 'app',
  components: {
      HelloWorld,
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
  },
  methods:{
      loginClick(){
          //通过代码修改路径 vue-router
          this.$router.push('/login')
      },
      orderingClick(){
          this.$router.push('/ordering')
      },

  },

}
</script>

<style>
.active {
  /*更改样式*/
  color: #e9eef3;
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
