<template>
  <div>
    <!-- 订单管理 -->
    <el-card>
      <!-- 操作按钮 -->
      <div class="operate">
        <el-button size="medium" type="primary" plain @click="showForm()">+ 新增菜品</el-button>
        <el-button size="medium" type="warning" plain @click="deleteDishes()">删除选中</el-button>
      </div>
      
      <el-dialog class="newDishes" title="更改菜品信息" :visible.sync="dialogFormVisible">
        <el-form :model="newDishes" :rules="rules">
          <el-form-item label="菜品名:" :label-width="formLabelWidth" prop="name">
            <el-input v-model="newDishes.dishes.name" autocomplete="off"></el-input>
          </el-form-item>
          <el-form-item label="菜品类别:" :label-width="formLabelWidth" prop="dishesTypeName">
            <el-select v-model="newDishes.dishesTypeName" filterable allow-create placeholder="请选择菜品类别">
              <el-option label="区域一" value="shanghai"></el-option>
              <el-option label="区域二" value="beijing"></el-option>
            </el-select>
          </el-form-item>
          <el-form-item label="普通价格:" :label-width="formLabelWidth" prop="price">
            <el-input v-model="newDishes.dishes.price" autocomplete="off"></el-input>
          </el-form-item>
          <el-form-item label="会员价格:" :label-width="formLabelWidth" prop="vipPrice">
            <el-input v-model="newDishes.dishes.vipPrice" autocomplete="off"></el-input>
          </el-form-item>
          <el-form-item label="上传菜品图片:" :label-width="formLabelWidth">
            <el-upload
              action="http://121.43.56.241:8080/upload"
              list-type="picture-card"
              limit="1"
              :on-preview="handlePictureCardPreview"
              :on-remove="handleRemove">
              <i class="el-icon-plus"></i>
            </el-upload>
          </el-form-item>
        </el-form>
        <div slot="footer" class="dialog-footer">
          <el-button @click="hideForm()">取 消</el-button>
          <el-button type="primary" @click="hideForm()">确 定</el-button>
        </div>
      </el-dialog>




      <el-tabs
        v-model="cntGroupId"
        type="border-card">
        
        <el-tab-pane
          v-for="group in dishesList"
          :key="group.index"
          :label="group.name"
          :name="group.id">
          
          <!-- {{ group.foods }} -->
          

          <el-table
            :data="group.dishes"
            stripe
            border
            style="width: 100%"
            @selection-change="handleSelectionChange">
            <el-empty description="暂时没有菜品呢"></el-empty>
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
  deleteDishes,
} from '../../api/user.js'
export default {
  name: "Menu",
  mounted() {
    this.getNewDishesList()
  
  },
  data() {
    return {
      queryInfo: {
        query: "",
        pagenum: 1,
        pagesize: 10,
      },
      cntGroupId: 3,  
      dishesList: [],

      // 所用订单的总数
      total: 0,
      // 好像是多选列表
      multipleSelection: [],
      // 弹出表单是否显示
      dialogFormVisible: false,
      // 表单的样式设置
      formLabelWidth: '100px',
      // 新增菜品所填表单数据
      newDishes: {
        dishes: {
          name: '',
          price: '',
          vipPrice: '',
          imgUrl: '',
        },
        dishesTypeName: '',
      },
      // 表单的验证规则
      rules:{
        name: [
          {
            required: true,
            message: '请输入菜品名',
            trigger: 'blur'
          },
          {
            min: 1,
            max: 6,
            message: '长度在 1 到 6 个汉字',
            trigger: 'blur'
          }
        ],
        price: [
          {
            required: true,
            message: '请输入普通价格',
            trigger: 'blur'
          },
        ],
        vipPrice: [
          {
            required: true,
            message: '请输入会员价格',
            trigger: 'blur'
          },
        ],
        imgUrl: [],
        dishesTypeName: [
          {
            required: true,
            message: '请输入菜品类别',
            trigger: 'blur'
          },
        ],
      },
    };
  },
  created() {
  },
  methods: {
    // 获取最新的菜品列表
    getNewDishesList() {
      getDishesList().then(res => {
        this.dishesList = res.data
        console.log(this.dishesList)
      })
    },

    // 打印测试
    finish(row){
      console.log(row)
    },

    // 显示弹出表单
    showForm() {
      this.dialogFormVisible = true;
    },
    // 隐藏弹出表单
    hideForm() {
      this.dialogFormVisible = false;
    },
    
    // 新增菜品
    createDishes() {
      
    },
    // 删除所有选中的菜品
    deleteDishes() {
      // 如果没有选中任何订单
      if(this.multipleSelection.length == 0){
        this.$message({
          message: '请选择要删除的菜品',
          type: 'warning'
        })
        return;
      }
      // 如果选中了大于等于一个订单
      if(this.multipleSelection.length >= 1){
        // 存放所有要删除的promise
        let all = [];
        for(let i = 0; i < this.multipleSelection.length; i++){
          // 将所选菜品删除
          all.push(deleteDishes(this.multipleSelection[i].id))
        }
        // 将所有promise执行完毕
        Promise.all(all).then(res => {
          this.$message({
            message: '成功删除所选菜品',
            type: 'success'
          });
          // 更新数据
          this.getNewDishesList();
        })
        
        return;
      }
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

    // 图片上传
    handleRemove(file, fileList) {
      console.log(file, fileList);
    },
    handlePictureCardPreview(file) {
      this.dialogImageUrl = file.url;
      this.dialogVisible = true;
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


/* 修改菜品的表单样式 */
.newDishes{
  text-align: left;
}
</style>
