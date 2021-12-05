<template>
  <div id="app">

<!--    <router-link to="login" tag="button" active-class="active">首页</router-link>-->
<!--    <router-view></router-view>-->
      <router-view></router-view>
  </div>

</template>         

<script>
import HelloWorld from './components/HelloWorld.vue';
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
import Info from "./components/Information/Info";

import EditMenu from "./components/AllMenu/EditMenu";

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
            Info,
            EditMenu,
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

  .active{
   /*更改样式*/
    color: #E9EEF3;
  }
body{
  /*background-color: rgb(121,187,255);*/
  margin: 0;
  padding: 0;
  border: 0;
}

#app {
  font-family: 'Avenir', Helvetica, Arial, sans-serif;
  -webkit-font-smoothing: antialiased;
  -moz-osx-font-smoothing: grayscale;
  text-align: center;
  /*color: #2c3e50;*/
  /*margin-top: 60px;*/
}

</style>
