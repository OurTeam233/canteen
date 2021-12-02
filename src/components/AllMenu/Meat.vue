<template>
    <div>
        <div class="size">
            <img src="https://shadow.elemecdn.com/app/element/hamburger.9cf7b091-55e9-11e9-a976-7f4d0b07eef6.png" class="img-size">
            <p class="p-size">菜品:{{currentDate}}</p>
            <p class="p-size">价格:￥{{priceDate}}</p>
            <el-button type="primary" class="el-button-size" size="mini"  round >编辑 </el-button>
            <el-button type="danger" class="el-button-size" size="mini" round>删除</el-button>
        </div>
        <div class="size">
            <img src="https://shadow.elemecdn.com/app/element/hamburger.9cf7b091-55e9-11e9-a976-7f4d0b07eef6.png" class="img-size">
            <p class="p-size">菜品:{{currentDate}}</p>
            <p class="p-size">价格:￥{{priceDate}}</p>
            <el-button type="primary" class="el-button-size" size="mini"  round >编辑 </el-button>
            <el-button type="danger" class="el-button-size" size="mini" round>删除</el-button>
        </div>
        <div class="size">
            <img src="https://shadow.elemecdn.com/app/element/hamburger.9cf7b091-55e9-11e9-a976-7f4d0b07eef6.png" class="img-size">
            <p class="p-size">菜品:{{currentDate}}</p>
            <p class="p-size">价格:￥{{priceDate}}</p>
            <el-button type="primary" class="el-button-size" size="mini"  round >编辑 </el-button>
            <el-button type="danger" class="el-button-size" size="mini" round>删除</el-button>
        </div>
        <div class="size">
            <img src="https://shadow.elemecdn.com/app/element/hamburger.9cf7b091-55e9-11e9-a976-7f4d0b07eef6.png" class="img-size">
            <p class="p-size">菜品:{{currentDate}}</p>
            <p class="p-size">价格:￥{{priceDate}}</p>
            <el-button type="primary" class="el-button-size" size="mini"  round >编辑 </el-button>
            <el-button type="danger" class="el-button-size" size="mini" round>删除</el-button>
        </div>
        <div class="size">
            <img src="https://shadow.elemecdn.com/app/element/hamburger.9cf7b091-55e9-11e9-a976-7f4d0b07eef6.png" class="img-size">
            <p class="p-size">菜品:{{currentDate}}</p>
            <p class="p-size">价格:￥{{priceDate}}</p>
            <el-button type="primary" class="el-button-size" size="mini"  round >编辑 </el-button>
            <el-button type="danger" class="el-button-size" size="mini" round>删除</el-button>
        </div>


    </div>

</template>

<script>
    export default {
        name: "Meat",
        data() {
            return {
                loading: false,
                currentDate: '红烧牛肉',
                priceDate: '4'
            }
        },
    }
</script>

<style scoped>
    .size{
        float: left;
        width: 15%;
        height: 300px;
        padding: 10px;
        margin: 20px;
        background-color: rgba(255,255,255,0.5);
        border: 1px rgba(255,255,255,0.5) solid;
        border-radius: 2%;
        box-shadow: 1px 0px 10px rgba(228,231,237,0.5) inset;
        position: relative;
    }
    .img-size{
        width: 100%;
        height: 200px;
        padding: 0;
        margin: 0;
        border-radius: 2%;
    }
    .p-size{
        text-align:left;
        line-height:0px;
        margin: 0;
        padding: 0;
        width: 100%;
        height: 30px;
        position: relative;
        top: -50px;
    }
    .el-button-size{
        background-color: #E9EEF3;
        position: relative;
        border: 1px beige solid;
        top: -130px;
        left: 30px;
        color: black;
    }
</style>