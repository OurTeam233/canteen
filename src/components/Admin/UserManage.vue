<template>
  <div>
    <!-- 商家用户管理 -->
    <el-card>
      <el-row :gutter="20">
        <el-col :span="8">
          <el-input
            placeholder="请输入要查询的店铺名称"
            clearable
            v-model="queryInfo.query"
          >
            <el-button
              slot="append"
              icon="el-icon-search"
            ></el-button>
          </el-input>
        </el-col>
        <el-col :span="4">
          <el-button type="primary" @click="completeOrders()">+ 新增用户</el-button>
        </el-col>
      </el-row>

      <!-- 表格数据 -->
      <el-table :data="userList.filter(data => {
        // 查询不为空
        if(this.queryInfo.query != ''){
          // 查询用户名和店铺名
          if(data.username.toLowerCase().includes(this.queryInfo.query.toLowerCase()) || data.storeName.toLowerCase().includes(this.queryInfo.query.toLowerCase())){
            // 返回true
            return true;
          }
          return false;
        }
        return true;
        })" 
        ref="multipleTable"
        stripe border 
        style="width: 100%" 
        @selection-change="handleSelectionChange">
        <!-- <el-table-column type="index"> </el-table-column> -->
        <el-table-column type="selection" width="55"></el-table-column>
        <el-table-column prop="storeName" label="店铺名" width="200px"></el-table-column>
        <el-table-column prop="username"  label="用户名" ></el-table-column>
        
        <el-table-column label="操作" width="110px">
          <template v-slot="scope">
            <!-- <el-button size="mini" type="primary" @click="finish(scope.row)">完成</el-button> -->
            <el-button size="mini" type="warning" @click="finish(scope.row);showForm()">重置密码</el-button>
          </template>
        </el-table-column>
      </el-table> 


      <!-- 重置用户信息的表单 -->
      <el-dialog class="newUser" title="账号信息重置" :visible.sync="dialogFormVisible">
        <el-form :model="newUser" :rules="rules" ref="newUser">
          <el-form-item label="用户名:" prop="username">
            <el-input v-model="newUser.username" autocomplete="off"></el-input>
          </el-form-item>
          
          <el-form-item label="密码" prop="password">
            <el-input v-model="newUser.password" autocomplete="off"></el-input>
          </el-form-item>
          
        </el-form>
        <div slot="footer" class="dialog-footer">
          <el-button @click="hideForm();resetForm('newUser')">取 消</el-button>
          <el-button type="primary" @click="submitForm('newUser')">确 定</el-button>
        </div>
      </el-dialog>

      <el-pagination
        @size-change="handleSizeChange"
        @current-change="handleCurrentChange"
        :current-page="queryInfo.pagenum"
        :page-sizes="[10, 20, 50]"
        :page-size="queryInfo.pagesize"
        layout="total, sizes, prev, pager, next, jumper"
        :total="total"
        background
      >
      </el-pagination>
    </el-card>
  </div>
</template>

<script>
import { 
  getUserList,
  resetUser,

} from '../../api/user.js'
export default {
  name: 'UserManage',
  data() {
    return {
      queryInfo: {
        query: "",
        pagenum: 1,
        pagesize: 10
      },
      userList: [],
      // 所用订单的总数
      total: 0,
      // 多选列表
      multipleSelection: [],
      // 弹出表单是否显示
      dialogFormVisible: false,
      // 需要重置的用户的表单
      newUser: {
        id: '',
        username: '',
        password: '',
      },

      // 表单验证规则
      rules:{
        username: [
          {
            required: true,
            message: '请输入要更改的用户名',
            trigger: 'blur'
          },
          {
            min: 1,
            max: 11,
            message: '长度在 1 到 11 个字符',
            trigger: 'change'
          }
        ],
        password: [
          {
            required: true,
            message: '请输入要更改的密码',
            trigger: 'change'
          }
        ]
      }

    };
  },
  created() {
  },
  mounted() {
   this.getNewUserList();
  },
  methods: {
    // 重新获取菜品列表
    getNewUserList(){
      // 请求所有订单并进行筛选
      getUserList().then(res => {
        // 清空数据
        this.userList = [];
        // console.log(res.data)
        for(let i = 0; i < res.data.length; i++){
          let id = res.data[i].id;
          let username = res.data[i].username;
          let storeName;
          if(res.data[i].store != undefined){
            storeName = res.data[i].store.name;
          } else {
            storeName = "暂无店铺"
          }
          let user = {
            id: id,
            username: username,
            storeName: storeName,
          }
          this.userList.push(user);
        }
      });
      console.log(this.userList)
      
    },

    // 重置用户的账号或者密码
    resetUserInfo(){

    },

    // 显示弹出表单
    showForm() {
      this.dialogFormVisible = true;
    },
    // 隐藏弹出表单
    hideForm() {
      this.dialogFormVisible = false;
    },

    

    // 选中改行并将数据赋值到表单中
    finish(row){
      // console.log(row.username)
      this.newUser.id = row.id;
      this.newUser.username = row.username;
    },

    // 表单的提交与清空
    submitForm(formName) {
      this.$refs[formName].validate((valid) => {
        if (valid) {
          // 验证成功将表单数据请求出去
          console.log(this.newUser)
          resetUser(JSON.stringify(this.newUser)).then(res => {
            console.log(res)
            this.$message({
              message: '账号信息修改成功',
              type: 'success'
            });
            // 更新数据
            this.getNewUserList();
            // 隐藏弹出表单
            this.hideForm();
            // 清空弹出表单中的数据
            this.newUser = {
              id: '',
              username: '',
              password: '',
            }
          }).catch(err => {
            this.$message({
              message: '更改失败,请检查网络或稍后再试',
              type: 'error'
            });
          })
          // 成功提交后清空并隐藏表单
          // this.hideForm();
          // this.resetForm('newDishes');
        } else {
          console.log('error submit!!');
          return false;
        }
      });
    },
    resetForm(formName) {
      this.$refs[formName].resetFields();
    },
    // 多选
    toggleSelection(rows) {
      if (rows) {
        rows.forEach(row => {
          this.$refs.multipleTable.toggleRowSelection(row);
        });
      } else {
        this.$refs.multipleTable.clearSelection();
      }
    },
    handleSelectionChange(val) {
      this.multipleSelection = val;
    },

    // 分页
    handleSizeChange(val) {
      this.queryInfo.pagesize = val;
      // console.log(`每页 ${val} 条`);
    },
    handleCurrentChange(val) {
      this.queryInfo.pagenum = val;
      // console.log(`当前页: ${val}`);
    }
    
  }
};
</script>