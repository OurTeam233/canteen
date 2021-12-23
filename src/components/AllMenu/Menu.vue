<template>
  <div>
    <!-- 订单管理 -->
    <el-card>
      <el-row :gutter="20">
        <el-col :span="8">
          <el-input
            placeholder="请输入内容"
            clearable
            v-model="queryInfo.query"
          >
            <el-button
              slot="append"
              icon="el-icon-search"
            ></el-button>
          </el-input>
        </el-col>
        <el-col :span="3">
          <el-button type="primary" @click="createDishesTab">+ 新增分类</el-button>
        </el-col>
      </el-row>

      <el-tabs
        v-model="cntGroupId"
        type="border-card">
        <el-tab-pane
          v-for="group in dishesList"
          :key="group.index"
          :label="group.name"
          :name="group.id">
          
          <!-- {{ group.foods }} -->
          <div class="operate">
            <el-button size="medium" type="primary" plain>+ 新增菜品</el-button>
            <el-button size="medium" type="warning" plain>删除选中</el-button>
            <el-button size="medium" type="danger" plain @click="deleteDishesTab">删除此分类</el-button>
          </div>

          <el-table
            :data="group.dishes"
            stripe
            border
            style="width: 100%"
            @selection-change="handleSelectionChange">

            <!-- <el-table-column type="index"> </el-table-column> -->
            <el-table-column type="selection" width="55"></el-table-column>
            <el-table-column prop="name" label="菜品名"></el-table-column>

            <el-table-column prop="imgUrl" label="缩略图" width="100px">
              <template slot-scope="scope">
                <img
                  :src="scope.row.imgUrl"
                  alt=""
                  width="65px"
                  height="65px"/>
              </template>
            </el-table-column>
            <el-table-column
              prop="price"
              label="价格(元)"
              width="100px"
            ></el-table-column>
            <el-table-column prop="vipPrice" label="会员价(元)" width="100px">
              <!-- <template v-slot="scope">
          {{ scope.row.add_time | dateFormat }}
        </template> -->
            </el-table-column>

            <el-table-column label="操作" width="100px">
              <template v-slot="scope">
                <el-button
                  size="medium"
                  type="primary"
                  @click="finish(scope.row)">编辑</el-button>
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
        </el-tab-pane>
      </el-tabs>
    </el-card>
  </div>
</template>

<script>
import { 
  getDishesList,
  addDishesType,
} from '../../api/user.js'
export default {
  name: "Menu",
  mounted() {
    getDishesList().then(res => {
      this.dishesList = res.data
      console.log(this.dishesList)
    })
  },
  data() {
    return {
      queryInfo: {
        query: "",
        pagenum: 1,
        pagesize: 10,
      },
      cntGroupId: 1,  
      dishesList: [],

      // 所用订单的总数
      total: 0,
      // 好像是多选列表
      multipleSelection: [],
    };
  },
  created() {
  },
  methods: {
    
    // //删除标签
    // removeTab(targetName) {
    //   let tabs = this.editableTabs;
    //   let activeName = this.editableTabsValue;
    //   if (activeName === targetName) {
    //     tabs.forEach((tab, index) => {
    //       if (tab.name === targetName) {
    //         let nextTab = tabs[index + 1] || tabs[index - 1];
    //         if (nextTab) {
    //           activeName = nextTab.name;
    //         }
    //       }
    //     });
    //   }
      
    //   this.editableTabsValue = activeName;
    //   this.editableTabs = tabs.filter(tab => tab.name !== targetName);
    // },


    // 新增标签(会弹出一个模态框出来)
    createDishesTab() {
      this.$prompt('请输入新增的菜品分类名称', '新增', {
        confirmButtonText: '确定',
        cancelButtonText: '取消',
        // 正则匹配空值
        inputPattern: /^\S+$/,
        inputErrorMessage: '内容不能为空'
      }).then(({ value }) => {
        this.$message({
          type: 'success',
          message: '成功创建一个分类: ' + value
        });
      }).catch(() => {
        this.$message({
          type: 'info',
          message: '取消输入'
        });       
      });
    },
    // 删除标签
    deleteDishesTab() {
      this.$confirm('此操作将永久删除该分类, 是否继续?', '提示', {
        confirmButtonText: '确定',
        cancelButtonText: '取消',
        type: 'warning'
      }).then(() => {
        this.$message({
          type: 'success',
          message: '删除成功!'
        });
      }).catch(() => {
        this.$message({
          type: 'info',
          message: '已取消删除'
        });        
      });
    },
    // 新增菜品
    createDishes() {
      
    },
    
    // 多选
    toggleSelection(rows) {
      if (rows) {
        rows.forEach((row) => {
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
    },
  },
};
</script>

<style scoped>
/*标签栏 */
.el-tabs {
  background-color: #fff;
}

/* 表格的每一行 */
/* .el-table__cell{
  height: 68px;
  padding: 3px 0;
} */
.el-table-column {
  height: 68px;
  padding: 3px 0;
}
/* 表格上方的操作按钮 */
.operate {
  display: flex;

  /* justify-content: space-between; */
  align-items: center;
  height: 50px;
  padding: 0 10px;
}
</style>
