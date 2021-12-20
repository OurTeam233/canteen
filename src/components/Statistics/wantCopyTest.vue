<template>
  <div class="wechat">
    <div class="wechat_card">
      <el-row :gutter="20" class="wechat_card_head">
        <el-col :span="8">
          <!--搜索框-->
          <el-input
            placeholder="输入订单号查询"
            v-model="queryInfo.query"
            clearable
            @clear="getDataList"
            style="width: 95%"
          >
            <el-button
              slot="append"
              icon="el-icon-search"
              @click="getDataList"
            ></el-button>
          </el-input>
        </el-col>
      </el-row>
      <!--用户列表区域-->
      <el-table
        :data="list_data"
        border
        stripe
        size="medium"
        :header-cell-style="{ textAlign: 'center' }"
        :cell-style="{ textAlign: 'center' }"
      >
        <el-table-column type="index" label="序号"></el-table-column>
        <el-table-column label="用户" prop="userId"></el-table-column>
        <el-table-column label="商品" prop="mallId"></el-table-column>
        <el-table-column label="投诉内容" prop="content"></el-table-column>
        <el-table-column label="订单号" prop="orderId"></el-table-column>
        <el-table-column label="反馈" prop="Feedback"></el-table-column>
        <el-table-column label="状态" prop="status">
          <template slot-scope="scope">
            <el-tag v-if="scope.row.status === 0">待受理</el-tag>
            <el-tag v-if="scope.row.status === 1" type="warning">处理中</el-tag>
            <el-tag v-if="scope.row.status === 2" type="success">完成</el-tag>
            <el-tag v-if="scope.row.status === 3" type="info">撤销</el-tag>
          </template>
        </el-table-column>
        <el-table-column label="投诉图片" prop="images">
          <template slot-scope="scope">
            <el-image
              @mouseenter="enterImage($event)"
              style="width: 75%; height: 75%"
              :src="scope.row.images"
              fit="contain"
              :preview-src-list="scope.row.list_image"
            >
            </el-image>
          </template>
        </el-table-column>

        <el-table-column width="130px">
          <template slot-scope="scope">
            <!--修改按钮-->
            <el-button type="primary" icon="el-icon-edit" size="mini" @click="drawerButton_click(scope.row)"
              >查看详情</el-button
            >
          </template>
        </el-table-column>
      </el-table>
      <!-- 分页 -->
      <el-pagination
        @size-change="handleSize_change"
        @current-change="handleCurrent_change"
        :current-page="this.queryInfo.pageNum"
        :page-sizes="[3, 7, 15, 20, 30]"
        :page-size="this.queryInfo.pageSize"
        layout="total, sizes, prev, pager, next, jumper"
        :total="total"
      ></el-pagination>

      <!-- 用户详细信息抽屉 -->
      <el-drawer
        title="我是标题"
        :visible.sync="boolean_drawerDialogVisible"
        direction="rtl"
      >
        <el-card class="order_drawer">
          <div class="order_item">
            订单时间:
            <el-tag type="success"></el-tag>
          </div>
          <div class="order_item">
            商品信息:<el-tag type="success">
           </el-tag>
          </div>
          <div class="order_item">
            <span>商品图片</span>
            <el-image
              style="width: 35%; height: 35%"
              fit="contain"
            >
            </el-image>
          </div>
          <div class="order_item">
            用户手机号:<el-tag type="success">1</el-tag>
          </div>
          <div class="order_item">
            用户地址:<el-tag type="success">1</el-tag>
          </div>
            <div class="order_item">
            投诉内容:<el-tag type="success"></el-tag>
          </div>
            <div class="order_item">
            反馈内容:<el-tag type="success"></el-tag>
          </div>
        </el-card>
      </el-drawer>
    </div>
  </div>
</template>
<script>
import { utils } from "../../utils/utils";
export default {
  name: "shopComplain",
  data() {
    return {
      queryInfo: {
        query: "",
        pageNum: 1,
        pageSize: 7,
      },
      total: 0,
      list_data: [],

      obj_drawerInfo: {},
      obj_person: {},

      boolean_drawerDialogVisible: false,

      netWork: {},
    };
  },

  methods: {
    enterImage(event) {
      console.log("划过了");
    },
    drawerButton_click(row) {
      this.obj_drawerInfo = utils.copyObject(row);
      this.boolean_drawerDialogVisible = true;
    },
    handleCurrent_change(newPage) {
      this.queryInfo.pageNum = newPage;
      this.getDataList();
    },
    handleSize_change(newSize) {
      this.queryInfo.pageSize = newSize;
      this.getDataList();
    },
    getDataList() {
      let condition = `mallcomplaint.mallId=${this.obj_person.mallId} and mallcomplaint.orderId like "%${this.queryInfo.query}%"`;
      this.queryInfo.condition = condition;
      this.netWork.getAPI(this.queryInfo).then((res) => {
        if (utils.showMessage(res, "获取数据")) {
          this.list_data = res.data.rows;
          this.list_data = this.toListImages_list(this.list_data);
          console.log(this.list_data);
        } else {
        }
      });
    },
    toListImages_list(list_data) {
      list_data.forEach((item, index, obj) => {
        item.list_image = item.images.split(",");
      });
      return list_data;
    },
    setConfig() {
      this.obj_person = utils.getPersonInfo_Object();
      this.netWork = utils.setConfig(this, "MallcomplaintAction");
    },
  },
  created() {
    this.setConfig();
    this.getDataList();
  },
};
</script>
<style scoped>

.wechat {
  width: 100%;
  /* height: 100%; */
  padding: 10px;
  box-sizing: border-box;
}
.wechat_card {
  width: 100%;
  /* min-height: 450px; */
  /* height: 100%; */
  box-shadow: 1px 1px 5px #ddd;
  background-color: #fff;
  padding: 20px;
  box-sizing: border-box;
}
.wechat_card_head {
  margin-bottom: 15px;
}
.el-table {
  font-size: 13px;
}
.el-pagination {
  text-align: left;
  padding-top: 20px;
}
/* 抽屉样式 */
.order_drawer {
  position: relative;
  /* width: 100%; */
  display: flex;
  justify-content: left;
  align-items: center;
  flex-direction: column;
  padding: 20px 0 20px 20px;
  box-sizing: border-box;
  margin: 10px;
}
.order_drawer >>> .el-card__body {
  width: 100%;
  padding: 0;
}
.order_item {
  padding: 10px 0px;
  color: #888;
  font-size: 12px;
  text-align: left;

  display: flex;
  justify-content: space-between;
  align-items: center;
}
.order_item span {
  vertical-align: middle;
}
.order_item >>> .el-tag.el-tag--success {
  font-size: 12px;
}

.el-drawer__header > :first-child {
  flex: 1;
  text-align: left;
}
</style>