<template>
  <div>
    <!-- 新增订单 -->
    <el-card>
      <el-row :gutter="20">
        <el-col :span="8">
          <el-input
            placeholder="请输入内容"
            clearable
            v-model="queryInfo.query"
            @clear="getGoodsList"
          >
            <el-button
              slot="append"
              icon="el-icon-search"
              @click="handleCurrentChange(1)"
            ></el-button>
          </el-input>
        </el-col>
        <el-col :span="4">
          <el-button type="primary" @click="toggleSelection()">清空选择</el-button>
        </el-col>
      </el-row>

      <!-- 表格数据 -->
      <el-table :data="orderList" stripe border style="width: 100%" @selection-change="handleSelectionChange">
        <!-- <el-table-column type="index"> </el-table-column> -->
        <el-table-column type="selection" width="55"></el-table-column>
        <el-table-column prop="orderNumber" label="取餐号"></el-table-column>
        <el-table-column prop="orderDetailsList" :formatter="getDishesString" label="菜品列表" width="700px">
          
        </el-table-column>
        <el-table-column prop="totalPrice" label="总价格" width="70px"></el-table-column>
        <el-table-column prop="orderTime" :formatter="dateFormat" label="取餐开始时间" width="200px">
          <!-- <template v-slot="scope">
            {{ scope.row.add_time | dateFormat }}
          </template> -->
        </el-table-column>
        <el-table-column label="操作" width="80px">
          <template v-slot="scope">
            <el-button size="mini" type="primary" @click="finish(scope.row)">完成</el-button>
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
        // {
        //   id: 2,
        //   orderNumber: "02-0001",
        //   orderTime: 164037459000,
        //   studentId: 1,
        //   time: 1640374602000,
        //   totalPrice: 100,
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
      total: 12,
      // 好像是多选列表
      multipleSelection: [],

    };
  },
  created() {
       this.getGoodsList();
  },
  mounted() {
    getOrderList().then(res => {
      this.orderList = res.data
      console.log(res.data)
    })
  },
  methods: {
    // 获取菜品列表(在一行中显示)
    getDishesString(row){
      let ans = ''
      row.orderDetailsList.forEach(item => {
        if(ans != '') ans += '、';
        ans += item.name + '*' + item.num;
      });
      return ans;
    },

    // 格式化取餐时间
    dateFormat(row){
      return new Date(row.orderTime).toLocaleString();
    },
    
    

    async getGoodsList() {
      const { data } = await this.$http.get("goods", {
        params: this.queryInfo
      });
      if (data.meta.status !== 200) {
        return this.$message.error(data.meta.msg);
      }
      this.goodslist = data.data.goods;
      this.total = data.data.total;
    },
    handleSizeChange(newSize) {
      this.queryInfo.pagesize = newSize;
      this.getGoodsList();
    },
    handleCurrentChange(newPage) {
      this.queryInfo.pagenum = newPage;
      this.getGoodsList();
    },
    // eslint-disable-next-line no-unused-vars
    finish(row){
      alert(JSON.stringify(row));
    },
    removeById(id) {
      this.$confirm("此操作将永久删除该商品, 是否继续?", "提示", {
        confirmButtonText: "确定",
        cancelButtonText: "取消",
        type: "warning"
      })
        .then(async () => {
          const { data } = await this.$http.delete(`goods/${id}`);
          if (data.meta.status !== 200) {
            return this.$message.error(data.meta.msg);
          }
          this.getGoodsList();
          this.$message({
            type: "success",
            message: "删除成功!"
          });
        })
        .catch(() => {
          this.$message({
            type: "info",
            message: "已取消删除"
          });
        });
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