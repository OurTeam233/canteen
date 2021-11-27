<template>
  <div id="app">

    <router-view />
  </div>

</template>

<script>
import Login from './views/Login.vue';
import Ordering from "./Layout/Ordering";
import Main from "./views/Main.vue";
import New from "./views/Order/New.vue";
import Finish from "./views/Order/Finish.vue";

export default {
  name: 'app',
  components: {
    Login,
    Main,
    Ordering,
    New,
    Finish,
  }
}
</script>

<style>

body{
  background-color: rgb(121,187,255);
  margin: 0;
  padding: 0;
  border: 0;
}

#app {
  font-family: 'Avenir', Helvetica, Arial, sans-serif;
  -webkit-font-smoothing: antialiased;
  -moz-osx-font-smoothing: grayscale;
  text-align: center;
  color: #2c3e50;

}

</style>
