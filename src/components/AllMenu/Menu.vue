<template>
  <div>
    <!-- 订单管理 -->
    <el-card>
      <!-- 操作按钮 -->
      <div class="operate">
        <el-button size="medium" type="primary" plain @click="showForm();getType()">+ 新增菜品</el-button>
        <el-button size="medium" type="warning" plain @click="deleteDishes()">删除选中</el-button>
      </div>
      
      <el-dialog class="newDishes" title="更改菜品信息" :visible.sync="dialogFormVisible">
        <el-form :model="newDishes" :rules="rules" ref="newDishes">
          <el-form-item label="菜品名:" :label-width="formLabelWidth" prop="name">
            <el-input v-model="newDishes.name" autocomplete="off"></el-input>
          </el-form-item>
          <el-form-item label="菜品类别:" :label-width="formLabelWidth" prop="dishesTypeName">
            <el-select v-model="newDishes.dishesTypeName" filterable allow-create placeholder="请选择菜品类别">
              <el-option
                v-for="item in dishesTypeList"
                :key="item.id"
                :label="item.name"
                :value="item.name">
              </el-option>
            </el-select>
          </el-form-item>
          <el-form-item label="普通价格(元):" :label-width="formLabelWidth" prop="price">
            <el-input v-model="newDishes.price" autocomplete="off"></el-input>
          </el-form-item>
          <el-form-item label="会员价格(元):" :label-width="formLabelWidth" prop="vipPrice">
            <el-input v-model="newDishes.vipPrice" autocomplete="off"></el-input>
          </el-form-item>
          <el-form-item label="上传菜品图片:" :label-width="formLabelWidth" prop="imgUrl">
            <el-upload
              class="uploader"
              action="/api/upload"
              list-type="picture-card"
              :show-file-list="true"
              :before-upload="beforeUpload"
              :on-success="handleSuccess"
              :on-remove="handleRemove"
              :limit="maxCount"
              v-model="newDishes.imgUrl">
              <!-- <img v-if="newDishes.imgUrl != ''" :src="newDishes.imgUrl" class="dishesImg">
              <i v-else class="el-icon-plus"></i> -->
              <i class="el-icon-plus"></i> 
            </el-upload>
          </el-form-item>
        </el-form>
        <!-- <div slot="footer" class="dialog-footer"> -->
        <el-button class="dialog-button" @click="hideForm();resetForm('newDishes')">取 消</el-button>
        <el-button class="dialog-button" type="primary" @click="submitForm('newDishes')">确 定</el-button>
        <!-- </div> -->
      </el-dialog>




      <el-tabs
        v-model="cntGroupId"
        type="border-card">
        
        <el-tab-pane
          v-for="group in dishesList"
          :key="group.index"
          :label="group.name"
          :name="String(group.id)">
          
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
            <el-table-column prop="price" label="价格(元)" width="100px" :formatter="moneyFormat" ></el-table-column>
            <el-table-column prop="vipPrice" label="会员价(元)" width="100px" :formatter="vipMoneyFormat" ></el-table-column>

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
  getDishesType,
  addDishes,
} from '../../api/user.js'
export default {
  name: "Menu",
  mounted() {
    this.getNewDishesList()
    
    // console.log('-------------------')
    // console.log(this.dishesList)
    // this.cntGroupId = String(this.dishesList[0].id)
  },
  data() {
    // 验证表单中的数字类型
    const isNumber = (rule, value, callback) => {
      if (!value) {
        callback();
      } else {
        var reg = /^-?\d{1,4}(?:\.\d{1,2})?$/;
        if (reg.test(value)) {
          callback();
        } else {
          callback(new Error("请输入数字"));//如:1 或1.8 或1.85
        }
      }
    }; 
    return {
      queryInfo: {
        query: "",
        pagenum: 1,
        pagesize: 10,
      },
      cntGroupId: '',
      // 菜品列表  
      dishesList: [],
      // 菜品类别列表
      dishesTypeList: [],

      // 所用订单的总数
      total: 0,
      // 好像是多选列表
      multipleSelection: [],
      // 弹出表单是否显示
      dialogFormVisible: false,
      // 表单的样式设置
      formLabelWidth: '110px',
      // 图片的最大上传数量
      maxCount: 1,
      // 新增菜品所填表单数据
      newDishes: {
        name: '',
        price: '',
        vipPrice: '',
        imgUrl: '',
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
            message: '请输入数字',
            trigger: 'blur'
          },
          {
            validator: isNumber,
            trigger: 'blur'
          }
          
        ],
        vipPrice: [
          {
            required: true,
            message: '请输入数字',
            trigger: 'blur'
          },
          {
            validator: isNumber,
            trigger: 'blur'
          }
        ],
        imgUrl: [
          {
            required: true,
            message: '请上传图片',
            trigger: 'change'
          }
        ],
        dishesTypeName: [
          {
            required: true,
            message: '请输入菜品类别',
            trigger: 'change'
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
        // 默认标签页为列表中的第一个元素
        this.cntGroupId = String(this.dishesList[0].id)

      })
    },
    // 价格格式化
    moneyFormat(row){
      return row.price / 100
    },
    vipMoneyFormat(row){
      return row.vipPrice / 100
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

    // 获取菜品类别
    getType() {
      getDishesType().then(res => {
        console.log(res.data)
        this.dishesTypeList = res.data
      })
    },
    
    // 表单的提交与清空
    submitForm(formName) {
      this.$refs[formName].validate((valid) => {
        if (valid) {
          // 验证成功将表单数据请求出去
          console.log(this.newDishes)
          addDishes(JSON.stringify(this.newDishes)).then(res => {
            console.log(res)
            this.$message({
              message: '添加成功',
              type: 'success'
            });
            // 更新数据
            this.getNewDishesList();
            // 隐藏弹出表单
            this.hideForm();
            // 清空弹出表单中的数据
            this.newDishes = {
              name: '',
              price: '',
              vipPrice: '',
              imgUrl: '',
              dishesTypeName: '',
            }
          }).catch(err => {
            this.$message({
              message: '添加失败,请检查网络或稍后再试',
              type: 'error'
            });
          })
          // 成功提交后清空并隐藏表单
          // this.hideForm();
          // this.resetForm('newDishes');
        } else {
          console.log('error submit!!');
          return false;
        }
      });
    },
    resetForm(formName) {
      this.$refs[formName].resetFields();
    },
    // 图片上传前的验证函数
    beforeUpload(file) {
      console.log(file)
      const isJPG = file.type === 'image/jpeg';
      const isLt2M = file.size / 1024 / 1024 < 2;

      if (!isJPG) {
        this.$message.error('上传图片只能是 JPG 格式!');
      }
      if (!isLt2M) {
        this.$message.error('上传图片大小不能超过 2MB!');
      }
      return isJPG && isLt2M;
    },
    // 图片上传成功后的回调函数
    handleSuccess(res, file) {
      // console.log('-------------------')
      // console.log(file)
      // console.log(res)
      this.newDishes.imgUrl = "http://121.43.56.241" + res.msg;
      console.log(this.newDishes.imgUrl)
    },
    // 移除图片时将图片地址清空
    handleRemove(file, fileList) {
      this.newDishes.imgUrl = '';
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

/*有关表单中图片上传的样式 */
.dishesImg{
  width:148px;
  height:148px;
}

/*弹出表单的底部按钮 */
.dialog-button{
  margin: -20px 10px 10px 10px;
}
</style>
