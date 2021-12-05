<template>
  <div class="big">
    <div style="margin: 20px;"></div>
    <el-form :label-position="labelPosition" label-width="80px" :model="formLabelAlign" class="el-form">
      <el-form-item label="菜品图片" class="el-form-item img">
        <img v-bind:src="img" class="img">

        <el-upload
          class="upload-demo"
          action="https://jsonplaceholder.typicode.com/posts/"
          :on-change="handleChange">
          <el-button size="small" type="primary">点击上传</el-button>
        </el-upload>

      </el-form-item>
      <el-form-item label="菜品名称" class="el-form-item">
        <el-input v-model="formLabelAlign.name"></el-input>
      </el-form-item>
      <el-form-item label="价格" class="el-form-item">
        <el-input v-model="formLabelAlign.region"></el-input>
      </el-form-item>
      <el-form-item label="描述" class="el-form-item">
        <el-input v-model="formLabelAlign.type"></el-input>
      </el-form-item>
      <el-form-item label="菜品分类" class="el-form-item">
        <el-select v-model="value" placeholder="请选择" class="el-select">
          <el-option
            v-for="item in options"
            :key="item.value"
            :label="item.label"
            :value="item.value">
          </el-option>
        </el-select>
      </el-form-item>
    </el-form>
    <el-button type="primary" size="small" round @click="open" class="button">保存</el-button>
  </div>
</template>

<script>
  export default {
    name: 'EditMenu',
    data () {
      return {
        options: [{
          value: '选项1',
          label: '荤菜'
        }, {
          value: '选项2',
          label: '素菜'
        }, {
          value: '选项3',
          label: '花荤'
        }, {
          value: '选项4',
          label: '主食'
        },
        ],
        value: '',
        labelPosition: 'left',
        img: 'https://fuss10.elemecdn.com/e/5d/4a731a90594a4af544c0c25941171jpeg.jpeg',
        // fileList: [{
        //     name: 'food.jpeg',
        //     url: 'https://fuss10.elemecdn.com/3/63/4e7f3a15429bfda99bce42a18cdd1jpeg.jpeg?imageMogr2/thumbnail/360x360/format/webp/quality/100'
        // }, {
        //     name: 'food2.jpeg',
        //     url: 'https://fuss10.elemecdn.com/3/63/4e7f3a15429bfda99bce42a18cdd1jpeg.jpeg?imageMogr2/thumbnail/360x360/format/webp/quality/100'
        // }],
        formLabelAlign: {
          name: '',
          region: '',
          type: ''
        }
      }
    },
    methods: {
      handleChange (file, fileList) {
        this.fileList = fileList.slice(-3)
      },
      open () {
        this.$confirm('检测到未保存的内容，是否在离开页面前保存修改？', '确认信息', {
          distinguishCancelAndClose: true,
          confirmButtonText: '保存',
          cancelButtonText: '放弃修改'
        })
          .then(() => {
            this.$message({
              type: 'info',
              message: '保存修改'
            })
          })
          .catch(action => {
            this.$message({
              type: 'info',
              message: action === 'cancel'
                ? '放弃保存并离开页面'
                : '停留在当前页面'
            })
          })
      }
    }
  }
</script>

<style scoped>
  .big {
    background-color: rgba(204, 204, 205, 0.3);
    margin: auto;
    position: absolute;
    width: 50%;
    height: 60%;
    left: 30%;
    top: 30%;
    border-radius: 1%;
    box-shadow: 1px 1px 10px rgb(204, 204, 205);
  }

  .el-select {
    position: relative;
    float: left;
  }

  .img {
    float: left;
    width: 30%;
    height: 30%;
  }

  .el-form {
    position: relative;
    left: 20%;
    top: 10%;
  }

  .el-form-item {
    margin-bottom: 10px;
    width: 50%;
  }

  .button {
    position: relative;
    top: 10%;
    left: -200px;
  }
</style>