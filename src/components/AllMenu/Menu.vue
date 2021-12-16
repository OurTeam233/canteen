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
        <el-col :span="3">
          <el-button type="primary" @click="toggleSelection()"
            >+ 新增分类</el-button
          >
        </el-col>
      </el-row>

      <el-tabs
        v-model="cntGroupId"
        type="border-card"
        closable
        @tab-remove="removeTab"
      >
        <el-tab-pane
          v-for="group in dishesList"
          :key="group.index"
          :label="group.name"
          :name="group.id"
        >
          <!-- {{ group.foods }} -->
          <div class="operate">
            <el-button size="medium" type="primary" plain>+ 新增菜品</el-button>
            <el-button size="medium" type="warning" plain>删除选中</el-button>
            <el-button size="medium" type="danger" plain>删除此分类</el-button>
          </div>

          <el-table
            :data="group.dishes"
            stripe
            border
            style="width: 100%"
            @selection-change="handleSelectionChange"
          >
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
import { getDishesList } from '../../api/user.js'
export default {
  name: "Menu",
  mounted() {
    getDishesList().then(res => {
      this.dishesList = res.data
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
      total: 12,
      // 好像是多选列表
      multipleSelection: [],
    };
  },
  created() {
    this.getGoodsList();
  },
  methods: {
    async getGoodsList() {
      const { data } = await this.$http.get("goods", {
        params: this.queryInfo,
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
    finish(row) {
      alert(JSON.stringify(row));
    },
    removeById(id) {
      this.$confirm("此操作将永久删除该商品, 是否继续?", "提示", {
        confirmButtonText: "确定",
        cancelButtonText: "取消",
        type: "warning",
      })
        .then(async () => {
          const { data } = await this.$http.delete(`goods/${id}`);
          if (data.meta.status !== 200) {
            return this.$message.error(data.meta.msg);
          }
          this.getGoodsList();
          this.$message({
            type: "success",
            message: "删除成功!",
          });
        })
        .catch(() => {
          this.$message({
            type: "info",
            message: "已取消删除",
          });
        });
    },
    clearSearch() {
      this.queryInfo.query = "";
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
