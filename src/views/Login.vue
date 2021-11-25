<template>
  <div class="container">
    
    <el-form ref="form" :model="form" class="login-box">
      <h2>欢迎登录食堂管理系统</h2>
      <el-form-item label="账号">
        <el-input type="text" placeholder="请输入用户名" v-model="form.name"></el-input>
      </el-form-item>
      <el-form-item label="密码">
        <el-input type="password" placeholder="请输入密码" v-model="form.password"></el-input>
      </el-form-item>
      <el-button type="primary" @click="onSubmit">登录</el-button>

    </el-form>
    


  </div>
</template>
<script>
  export default {
    name: 'Login',
    data(){
      return {
        form: {
          name: '',
          password: ''
        }
      }
    },
    methods: {
      onSubmit() {
        console.log("submit!");
      },
      
    },
  };

</script>


<style  scoped>
  
  

  .login-box {
    /* filter: blur(2px); */
    width: 400px;
    margin: 150px auto;
    padding:50px;
    border: 1px solid #DCDFE6;
    border-radius: 15px;
    /* box-shadow: 0 0 30px #DCDFE6; */
    background-color: #fff;
    
  }
</style>

