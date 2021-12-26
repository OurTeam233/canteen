<template>
  <div>
    <el-table
      :data="storeInfoList"
      style="width: 100%"
    >
      <el-table-column label="店铺信息">
        <template slot-scope="props">
          <el-form>
            <el-form-item label="店铺名称:" class="form-item">
              <span >{{ props.row.name }}</span>
              <el-button class="el-button" size="medium" @click="editName">编辑</el-button>
            </el-form-item>
            <el-form-item label="联系电话:" class="form-item" >
              <span>{{ props.row.phone }}</span>
              <el-button class="el-button" size="medium">编辑</el-button>
            </el-form-item>
            <el-form-item label="店铺描述:" class="form-item">
              <span>{{ props.row.description }}</span>
              <el-button class="el-button" size="medium">编辑</el-button>
            </el-form-item>
            
            
            
            
          </el-form>
        </template>
      </el-table-column>
    </el-table>
  </div>
</template>

<style>
  .demo-table-expand {
    font-size: 0;
  }

  .demo-table-expand label {
    width: 90px;
    color: #99a9bf;
  }

  .demo-table-expand .el-form-item {
    margin-right: 0;
    margin-bottom: 0;
    width: 50%;
  }

  .el-table-column {
    font-size: large;
  }


  .form-item:hover {

    /*background-color: #545c64;*/
    color: rgb(121, 187, 255);
  }

  .el-button {
    float: right;
    margin-right: 60px;
  }
</style>

<script>
  import { getStoreInfo } from '../../api/user.js'
  export default {
    name: 'Info',
    data () {
      return {
        value1: true,
        value2: true,
        storeInfoList: [{
          name: '',
          phone: '',
          description: '',
          logoUrl: '',
        }],
      }
    },
    mounted(){
      this.getNewStoreInfo()
    },
    methods: {

      getNewStoreInfo(){
        getStoreInfo().then(res => {
          this.storeInfoList[0].name = res.data.name;
          this.storeInfoList[0].phone = res.data.phone;
          this.storeInfoList[0].description = res.data.description;
          this.storeInfoList[0].logoUrl = res.data.logoUrl;
          console.log(res)
        })
      },
      editName () {
        this.$prompt('请输入店名', '提示', {
          confirmButtonText: '确定',
          cancelButtonText: '取消',
          inputPattern: /^[\u4E00-\u9FA5A-Za-z0-9_]{2,15}$/,
          // inputPattern: "[0-9]*",
          // inputPattern: /[\w!#$%&'*+/=?^_`{|}~-]+(?:\.[\w!#$%&'*+/=?^_`{|}~-]+)*@(?:[\w](?:[\w-]*[\w])?\.)+[\w](?:[\w-]*[\w])?/,
          inputErrorMessage: '格式不正确或查出字数限制'
        }).then(({ value }) => {
          this.$message({
            type: 'success',
            message: '你更改的店名是: ' + value,
            // tableData
          })
        }).catch(() => {
          this.$message({
            type: 'info',
            message: '取消输入'
          })
        })
      },

    }
  }
</script>