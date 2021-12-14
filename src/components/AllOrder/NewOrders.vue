<!--新增订单-->
<!--
<template>
  <div>
      
    <el-table
      ref="multipleTable"
      :data="tableData"
      tooltip-effect="dark"
      style="width: 100%"
      @selection-change="handleSelectionChange"
    >
      
      <el-table-column type="selection" width="55"> </el-table-column>
      <el-table-column label="取餐号" width="120">
        <template slot-scope="scope">{{ scope.row.date }}</template>
      </el-table-column>

      <el-table-column prop="address" label="菜品" show-overflow-tooltip>
      </el-table-column>
      <el-table-column prop="address" label="价格" show-overflow-tooltip>
      </el-table-column>
      <el-table-column prop="name" label="取餐开始时间" width="120">
      </el-table-column>

      

    </el-table>
    <div style="margin-top: 20px">
      <el-button @click="toggleSelection([tableData[1], tableData[2]])"
        >切换第二、第三行的选中状态</el-button
      >
      <el-button @click="toggleSelection()">取消选择</el-button>
    </div>
  </div>
</template>

<script>
// export default {
//   data() {
//     return {
//       search: '',
//       tableData: [
//         {   
//           date: "2016-05-03",
//           name: "王小虎",
//           address: "上海市普陀区金沙江路 1518 弄",
//         },
//         {
//           date: "2016-05-02",
//           name: "王小虎",
//           address: "上海市普陀区金沙江路 1518 弄",
//         },
//         {
//           date: "2016-05-04",
//           name: "王小虎",
//           address: "上海市普陀区金沙江路 1518 弄",
//         },
//         {
//           date: "2016-05-01",
//           name: "王小虎",
//           address: "上海市普陀区金沙江路 1518 弄",
//         },
//         {
//           date: "2016-05-08",
//           name: "王小虎",
//           address: "上海市普陀区金沙江路 1518 弄",
//         },
//         {
//           date: "2016-05-06",
//           name: "王小虎",
//           address: "上海市普陀区金沙江路 1518 弄",
//         },
//         {
//           date: "2016-05-07",
//           name: "王小虎",
//           address: "上海市普陀区金沙江路 1518 弄",
//         },
//       ],
//       multipleSelection: [],
//     };
//   },

//   methods: {
//     toggleSelection(rows) {
//       if (rows) {
//         rows.forEach((row) => {
//           this.$refs.multipleTable.toggleRowSelection(row);
//         });
//       } else {
//         this.$refs.multipleTable.clearSelection();
//       }
//     },
//     handleSelectionChange(val) {
//       this.multipleSelection = val;
//     },
//   },
// };
</script>
-->




<!--_____________________________________csdn__________________________________________-->
<template>
  <div>
    

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
          <el-button type="primary" @click="clearSearch">清空搜索</el-button>
        </el-col>
      </el-row>

      <el-table :data="goodslist" stripe border style="width: 100%">
        <el-table-column type="index"> </el-table-column>
        <el-table-column prop="number" label="取餐号"></el-table-column>
        <el-table-column prop="foods" label="菜品" width="700px"></el-table-column>
        <el-table-column prop="price" label="价格" width="70px"></el-table-column>
        <el-table-column prop="time" label="取餐时间" width="170px">
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
export default {
  data() {
    return {
      queryInfo: {
        query: "",
        pagenum: 1,
        pagesize: 10
      },
      goodslist: [
        {
          number: "1-14-11",
          foods: "鸡肉",
          price: 30,
          time: "2022-12-12"
        },
        {
          number: "1-14-12",
          foods: "牛肉",
          price: 10,
          time: "2022-12-12"
        },
        {
          number: "1-14-11",
          foods: "鸡肉",
          price: 30,
          time: "2022-12-12"
        },
        {
          number: "1-14-12",
          foods: "牛肉",
          price: 10,
          time: "2022-12-12"
        },
        {
          number: "1-14-11",
          foods: "鸡肉",
          price: 30,
          time: "2022-12-12"
        },
        {
          number: "1-14-12",
          foods: "牛肉",
          price: 10,
          time: "2022-12-12"
        },
        {
          number: "1-14-11",
          foods: "鸡肉",
          price: 30,
          time: "2022-12-12"
        },
        {
          number: "1-14-12",
          foods: "牛肉",
          price: 10,
          time: "2022-12-12"
        },
        {
          number: "1-14-11",
          foods: "鸡肉",
          price: 30,
          time: "2022-12-12"
        },
        {
          number: "1-14-12",
          foods: "牛肉",
          price: 10,
          time: "2022-12-12"
        },
        {
          number: "1-14-11",
          foods: "鸡肉",
          price: 30,
          time: "2022-12-12"
        },
        {
          number: "1-14-12",
          foods: "牛肉",
          price: 10,
          time: "2022-12-12"
        }
      ],
      total: 12
    };
  },
  created() {
       this.getGoodsList();
  },
  methods: {
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
    }
    
  }
};
</script>