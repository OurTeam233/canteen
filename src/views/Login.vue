<template>
  <div class="container">
    <el-form ref="form" :model="form" :rules="rules" class="login-box">
      <h2>欢迎登录食堂管理系统</h2>
      <el-form-item label="账号" prop="name">
        <el-input
          type="text"
          placeholder="请输入用户名"
          v-model="form.username"
        ></el-input>
      </el-form-item>
      <el-form-item label="密码" prop="password">
        <el-input
          type="password"
          placeholder="请输入密码"
          v-model="form.password"
          show-password
        ></el-input>
      </el-form-item>
      <el-button type="primary" @click="submitForm('form')">登录</el-button>
    </el-form>
  </div>
</template>
<script>
import { login } from "../api/user.js";

export default {
  name: "Login",
  data() {
    return {
      loading: false,
      form: {
        username: "",
        password: "",
        userType: 2, //用户类型
      },
      rules: {
        username: [
          {
            required: true,
            message: "请输入用户名",
            trigger: "blur",
          },
        ],
        password: [
          {
            required: true,
            message: "请输入密码",
            trigger: "blur",
          },
        ],
      },
    };
  },
  methods: {
    // 提交登录信息
    submitForm(formName) {
      // 通过vuex提交登录的用户名
      // this.$store.commit('setUserName', this.form.username);
      this.$refs[formName].validate((valid) => {
        if (valid) {
          this.loading = true;
          // 调用登录接口
          login(
            this.form.username,
            this.form.password,
            this.form.userType
          ).then((res) => {
            // 商家登录成功
            if (res.data.success) {
              // console.log("对对对");
              // let result = res.data.rows[0];
              // // 应该是要储存后端传来的token
              // window.sessionStorage.setItem("token", result.token);
              // window.sessionStorage.setItem(
              //   "userInfo",
              //   JSON.stringify(result.userInfo)
              // );
              
              this.$store.dispatch("set_token", res.data.token);
              window.sessionStorage.setItem('token', res.data.token);
              // 页面跳转
              // this.$router.push(this.$store.activePath)
              // 成功登录后的缓存数据
              window.sessionStorage.setItem("isLogin", "true");
              // 由于vue的DOM更新是异步的，所以要等数据更新完之后再跳转页面
              this.$router.push({
                name: "OverallStatistics",
                params: {
                  name: this.form.username,
                },
              });

              
            } else {
              this.$message({
                showClose: true,
                message: "用户名或密码错误!",
                type: "error",
              });
              return false;
            }
          });

          
          // 保存用户名
          // sessionStorage.setItem('userName', this.$store.state.userInfo.userName);
        } else {
          return false;
        }
      });
    },
    resetForm(formName) {
      this.$refs[formName].resetFields();
    },
  },
};
</script>

<style scoped>
.login-box {
  /* filter: blur(2px); */
  width: 400px;
  margin: 150px auto;
  padding: 50px;
  border: 1px solid #dcdfe6;
  border-radius: 15px;
  /* box-shadow: 0 0 30px #DCDFE6; */
  box-shadow: 0 0 50px 0 rgba(146, 146, 146, 0.63);
  background-color: #fff;
}
</style>
