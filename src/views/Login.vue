<template>
  <div class="container">
    
    <el-form ref="form" :model="form" :rules="rules" class="login-box">
      <h2>欢迎登录食堂管理系统</h2>
      <el-form-item label="账号" prop="name">
        <el-input type="text" placeholder="请输入用户名" v-model="form.name"></el-input>
      </el-form-item>
      <el-form-item label="密码" prop="password">
        <el-input type="password" placeholder="请输入密码" v-model="form.password"></el-input>
      </el-form-item>
      <el-button type="primary"  @click="submitForm('form')">登录</el-button>

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
        },
        rules: {
          name: [{ 
              required: true,
              message: '请输入用户名', 
              trigger: 'blur' 
            },
            
          ],
          password: [{ 
              required: true, 
              message: '请输入密码', 
              trigger: 'blur' 
            },
            
          ]

        }
      }
    },
    methods: {
      
      submitForm(formName) {
        // 通过vuex提交登录的用户名
        this.$store.commit('setUserName', this.form.name);
        this.$refs[formName].validate((valid) => {
          if (valid) {
            // 成功登录后的缓存数据
            sessionStorage.setItem('isLogin', 'true');
            // 页面跳转
            this.$router.push({
              name:'Ordering',
              params:{
                name:this.form.name
              }
            });
          } else {
            this.$message({
              showClose: true,
              message: '请输入用户名或密码!',
              type: 'error'
            });
            return false;
          }
        });
      },
      resetForm(formName) {
        this.$refs[formName].resetFields();
      }
    }
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
    box-shadow: 0 0 50px 0 rgba(146, 146, 146, 0.63);
    background-color: #fff;
    
  }
</style>

