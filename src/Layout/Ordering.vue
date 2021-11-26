<template>
    <div class="menu-nav">
        <el-menu
                :default-active="activeIndex2"
                class="el-menu-demo"
                mode="horizontal"
                @select="handleSelect"
                background-color="#545c64"
                text-color="#fff"
                active-text-color="#ffd04b">
            <el-menu-item index="1">订单</el-menu-item>
            <el-menu-item index="2">菜谱</el-menu-item>
            <el-menu-item index="3">统计</el-menu-item>
            <el-menu-item index="4">店铺管理</el-menu-item>
        </el-menu>
    </div>
</template>

<script>
    export default {
        name: "Ordering",
        data() {
            return {
                activeIndex: '1',
                activeIndex2: '1'
            };
        },
        methods: {
            handleSelect(key, keyPath) {
                console.log(key, keyPath);
            }
        }
    }
</script>

<style scoped>
    .menu-nav{
        border: 1px #2c3e50 solid ;
        background-color: rgb(236,245,255);
    }
    .menu{
        float: right;
        width: 100%;
        height: 30px;
        margin: 0;
    }
</style>