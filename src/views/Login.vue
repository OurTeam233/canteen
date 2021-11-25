<template>
  <div>
    <el-form ref="form" :model="form" label-width="80px">
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
