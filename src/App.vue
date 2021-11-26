<template>
  <div id="app">
    <router-view />
  </div>

</template>

<script>
import HelloWorld from './components/HelloWorld.vue'
import Login from './views/Login.vue'


export default {
  name: 'app',
  components: {
    HelloWorld,
    Login
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
  
  /* margin-top: 60px; */
}

</style>
