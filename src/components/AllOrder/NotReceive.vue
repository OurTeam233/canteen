<template>
  <div>
    <!-- 未取订单 -->
    <el-card>
      <el-row :gutter="20">
        <el-col :span="8">
          <el-input
            placeholder="请输入要查询的菜品名称"
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
          <el-button type="primary" @click="completeOrders()">取餐所有选中</el-button>
        </el-col>
      </el-row>

      <!-- 表格数据 -->
      <el-table :data="orderList.filter(data => {
        // 查询不为空
        if(this.queryInfo.query != ''){
          // 在这一行的菜品列表中遍历
          for(let i = 0; i < data.orderDetailsList.length; i++){
            // 如果菜品名称中包含查询内容
            if(data.orderDetailsList[i].name.toLowerCase().includes(this.queryInfo.query.toLowerCase())){
              // 返回true
              return true;
            }
          }
          return false;
        }
        return true;
        }).slice(
              (queryInfo.pagenum - 1) * queryInfo.pagesize,
              queryInfo.pagenum * queryInfo.pagesize
            )" 
        ref="multipleTable"
        stripe border 
        style="width: 100%" 
        @selection-change="handleSelectionChange">
        <!-- <el-table-column type="index"> </el-table-column> -->
        <el-table-column type="selection" width="55"></el-table-column>
        <el-table-column prop="orderNumber" label="取餐号" width="85px"></el-table-column>
        <el-table-column prop="orderDetailsList" :formatter="getDishesString" label="菜品列表" width="500px"></el-table-column>
        <el-table-column prop="note" label="备注"></el-table-column>
        <el-table-column prop="totalPrice" :formatter="moneyFormat" label="总价(元)" width="80px"></el-table-column>
        <el-table-column prop="orderTime" :formatter="dateFormat" label="取餐开始时间" width="200px"></el-table-column>
        <el-table-column label="操作" width="80px">
          <template v-slot="scope">
            <!-- <el-button size="mini" type="primary" @click="finish(scope.row)">完成</el-button> -->
            <el-button size="mini" type="primary" @click="completeOrder(scope.row)">已取餐</el-button>
          </template>
        </el-table-column>
      </el-table>

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
import { getOrderList } from '../../api/user.js'
import { changeOrderType } from '../../api/user.js'
export default {
  name: 'NewOrders',
  data() {
    return {
      queryInfo: {
        query: "",
        pagenum: 1,
        pagesize: 10
      },
      orderList: [],
      // 所用订单的总数
      total: 0,
      // 多选列表
      multipleSelection: [],

    };
  },
  created() {
  },
  mounted() {
   this.getNewOrderList();
  },
  methods: {
    // 重新获取菜品列表
    getNewOrderList(){
      // 请求所有订单并进行筛选
      getOrderList().then(res => {
        this.orderList = [];
        for(let i = 0; i < res.data.length; i++){
          if(res.data[i].type == 1){
            this.orderList.push(res.data[i]);
          }
        }
        console.log(this.orderList)
        // 同时更新菜品的总数
        this.total = this.orderList.length;
      });
      
    },

    // 获取菜品列表(字符串拼接)
    getDishesString(row){
      let ans = ''
      if(row.orderDetailsList){
        row.orderDetailsList.forEach(item => {
          if(ans != '') ans += '、';
          ans += item.name + '*' + item.num;
        });
      }
      return ans;
    },
    
    // 价格格式化
    moneyFormat(row){
      return row.totalPrice / 100
    },

    // 格式化取餐时间
    dateFormat(row){
      return new Date(row.orderTime).toLocaleString();
    },
    
    // 处理单个订单
    completeOrder(row){
      // 将订单状态改为历史
      changeOrderType(row.id, 2).then(res => {
        this.$message({
          message: '成功处理该订单,请在历史订单中查看',
          type: 'success'
        });
        // 刷新订单列表
        this.getNewOrderList();
      }).catch(err => {
        this.$message({
          message: '处理失败,请重试',
          type: 'error'
        });
      });
      // // 更新数据
      // this.getNewOrderList();
      
    },

    // 处理选中的订单
    completeOrders(){
      // 如果没有选中任何订单
      if(this.multipleSelection.length == 0){
        this.$message({
          message: '请选择要完成的订单',
          type: 'warning'
        })
        return;
      }
      // 如果选中了大于等于一个订单
      if(this.multipleSelection.length >= 1){
        // 存放所有要更新的promise
        let all = [];
        for(let i = 0; i < this.multipleSelection.length; i++){
          // 将订单状态改为已完成
          all.push(changeOrderType(this.multipleSelection[i].id, 2))
        }
        // 将所有promise执行完毕
        Promise.all(all).then(res => {
          // 更新数据
          this.getNewOrderList();
        })
        this.$message({
          message: '所选订单已被取走',
          type: 'success'
        })
        return;
      }
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