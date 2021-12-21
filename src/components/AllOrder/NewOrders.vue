<template>
  <div>
    <!-- 新增订单 -->
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
          <el-button type="primary" @click="completeOrders()">完成选中</el-button>
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
        })" 
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
            <el-button size="mini" type="primary" @click="completeOrder(scope.row)">完成</el-button>
          </template>
        </el-table-column>
      </el-table>

      <el-pagination
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
      orderList: [
        // 数据说明
        // {
        //   id: 2,
        //   orderNumber: "02-0001",
        //   orderTime: 164037459000,
        //   studentId: 1,
        //   time: 1640374602000,
        //   totalPrice: 100,
        //   type: 2
        //   orderDetailsList: [
        //     {
        //       dishesId: 5,
        //       name: "冬瓜",
        //       num: 1,
        //       price: 2,
        //     },
        //     {
        //       dishesId: 4,
        //       name: "草莓",
        //       num: 1,
        //       price: 2.5,
        //     }
        //   ]
        // },
        
      ],
      // 所用订单的总数
      total: 0,
      // 好像是多选列表
      multipleSelection: [],
      

    };
  },
  created() {
  },
  mounted() {
    // getOrderList().then(res => {
    //   for(let i = 0; i < res.data.length; i++){
    //     if(res.data[i].type == 3){
    //       this.orderList.push(res.data[i]);
    //     }
    //   }
    //   // this.orderList = res.data
    //   console.log(res.data)
    // })
    
    this.getNewOrderList();
  },
  methods: {
    // 重新获取菜品列表
    getNewOrderList(){
      // 请求所有订单并进行筛选
      getOrderList().then(res => {
        this.orderList = [];
        for(let i = 0; i < res.data.length; i++){
          if(res.data[i].type == 0){
            this.orderList.push(res.data[i]);
          }
        }
        // this.orderList = res.data
        console.log(this.orderList)
      })
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
      // 将订单状态改为已完成
      changeOrderType(row.id, 1);
      // 更新数据
      this.getNewOrderList();
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
          all.push(changeOrderType(this.multipleSelection[i].id, 1))
        }
        // 将所有promise执行完毕
        Promise.all(all).then(res => {
          // 更新数据
          this.getNewOrderList();
        })
        this.$message({
          message: '已成功完成所选订单',
          type: 'success'
        })
        // // 更新数据
        // setTimeout(this.getNewOrderList(),1000);
        
        return;
      }
    },


    // eslint-disable-next-line no-unused-vars
    finish(row){
      alert(JSON.stringify(row));
    },
    
    clearSearch(){
      this.queryInfo.query = "";
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
    }
    
  }
};
</script>