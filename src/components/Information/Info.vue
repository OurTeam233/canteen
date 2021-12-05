<template>
  <div>
    <el-table
      :data="tableData"
      style="width: 100%"
    >
      <el-table-column label="店铺信息">
        <template slot-scope="props">
          <el-form>
            <el-form-item label="店铺名称：" class="form-item">
              <span >{{ props.row.shop }}</span>
              <el-button class="el-button" size="medium" @click="editName">编辑</el-button>
            </el-form-item>
            <el-form-item label="联系电话：" class="form-item" >
              <span>{{ props.row.telephone }}</span>
              <el-button class="el-button" size="medium">编辑</el-button>
            </el-form-item>
            <el-form-item label="店铺地址：" class="form-item">
              <span>{{ props.row.address }}</span>
              <el-button class="el-button" size="medium">编辑</el-button>
            </el-form-item>
            <el-form-item label="商品详情：" class="form-item">
              <span>{{ props.row.id }}</span>
              <el-button class="el-button" size="medium">查看</el-button>
            </el-form-item>
            <el-form-item label="营业额：￥" class="form-item">
              <span>{{ props.row.money}}</span>
              <el-button class="el-button" size="medium">查看</el-button>
            </el-form-item>
            <el-form-item label="接单设置：" class="form-item">
              <el-switch
                v-model="value1"
                active-text="自动接单"
                inactive-text="手动接单">
              </el-switch>
            </el-form-item>
            <el-form-item label="店铺状态：" class="form-item">
              <el-switch
                v-model="value2"
                active-text="休息"
                inactive-text="营业">
              </el-switch>
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

  .form-item {

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
  export default {
    name: 'Info',
    data () {
      return {
        value1: true,
        value2: true,
        tableData: [{
          category: '江浙小吃、小吃零食',
          desc: '荷兰优质淡奶，奶香浓而不腻',
          address: '上海市普陀区真北路',
          shop: '王小虎夫妻店',
          telephone: '123456789',
          money: '10万元',
          ordering: '手动',//自动
          state: '营业'
        },]
      }
    },

    methods: {

      edit(){

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