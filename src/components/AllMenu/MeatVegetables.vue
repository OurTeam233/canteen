<template>
  <div>
    <div class="el-icon-plus size avatar-uploader-icon">
      <router-link to="/Ordering/EditMenu" tag="span">添加菜品</router-link>
    </div>
    <div v-for="item in items" :key="item.index" class="size">
      <img src="https://shadow.elemecdn.com/app/element/hamburger.9cf7b091-55e9-11e9-a976-7f4d0b07eef6.png"
           class="img-size">
      <p class="p-size">菜品:{{item.currentDate}}</p>
      <p class="p-size">价格:￥{{item.priceDate}}</p>
      <!--            <el-button type="primary" class="el-button-size" size="mini"  round @click="editMenu">编辑 </el-button>-->
      <!--            <el-button type="danger" class="el-button-size" size="mini" round>删除</el-button>-->
      <router-link to="/Ordering/EditMenu" tag="button" class="el-button-edit">编辑</router-link>
      <!--            <router-link to=" " tag="button" class="el-button-size">删除</router-link>-->
      <el-button type="button" class="el-button-delete" @click="open">删除</el-button>
    </div>
    <router-view></router-view>
  </div>

</template>

<script>
  export default {
    name: 'MeatVegetables',
    data () {
      return {
        items: [
          {
            currentDate: '豆芽',
            priceDate: '4'
          },
          {
            currentDate: '豆子',
            priceDate: '9'
          },
          {
            currentDate: '茄子',
            priceDate: '3'
          },
          {
            currentDate: '手撕包菜',
            priceDate: '1'
          },
        ],

      }
    },
  }
</script>

<style scoped>
  .size {
    float: left;
    width: 15%;
    height: 300px;
    padding: 10px;
    margin-left: 20px;
    background-color: rgba(255, 255, 255, 0.2);
    border: 1px rgba(255, 255, 255, 0.5) solid;
    border-radius: 2%;
    box-shadow: 1px 0px 10px rgba(228, 231, 237, 0.5) inset;
    position: relative;
  }

  .img-size {
    width: 100%;
    height: 200px;
    padding: 0;
    margin: 0;
    border-radius: 2%;
  }

  .img-size:hover {
    width: 105%;
    height: 205px;
  }

  .p-size {
    text-align: left;
    line-height: 0px;
    margin: 0;
    padding: 0;
    width: 100%;
    height: 30px;
    color: #737373;
    position: relative;
    top: -50px;
  }

  .p-size:hover {
    color: rgb(179, 216, 300);
    font-size: 18px;
  }

  .el-button-edit {
    position: relative;
    background-color: rgba(233, 238, 243, 0.5);
    width: 50px;
    height: 30px;
    margin-right: 5px;
    border: 1px seashell solid;
    top: -130px;
    left: 36px;
    color: black;
    border-radius: 5%;
  }

  .el-button-edit:hover {
    background-color: rgb(179, 216, 255);
    color: #ffffff;
    border: 1px rgb(179, 216, 255) solid;
  }

  .el-button-delete {
    position: relative;
    background-color: rgba(233, 238, 243, 0.5);
    width: 50px;
    height: 30px;
    /*margin-right: 5px;*/
    padding: 0;
    border: 1px seashell solid;
    font-size: 13px;
    top: -64px;
    left: 5px;
    color: black;
    text-align: center;
    border-radius: 5%;
  }

  .el-button-delete:hover {
    background-color: rgba(289, 123, 100, 0.7);
    color: #ffffff;
    border: 1px rgb(179, 216, 255) solid;
  }

  .el-icon-plus {
    text-align: center;
  }

  .avatar-uploader-icon {
    font-size: 28px;
    color: #8c939d;
    line-height: 300px;
    text-align: center;
  }
</style>