<!--已完成订单-->
<template>
    <el-table
            :data="tableData"
            style="width: 100%">
        <el-table-column
                prop="number"
                label="订餐号"
                width="180">
        </el-table-column>
        <el-table-column
                prop="name"
                label="用户名"
                width="180">
        </el-table-column>
        <el-table-column
                prop="details"
                label="菜品详情">
        </el-table-column>
        <el-table-column
                prop="orderdata"
                label="订餐时间"
                width="180">
        </el-table-column>
        <el-table-column
                prop="takedata"
                label="取餐时间"
                width="180">
        </el-table-column>
        <el-table-column
                prop="illegal"
                label="违规情况"
                width="180">
        </el-table-column>
        <el-table-column
                prop="price"
                label="总价"
                width="100">
        </el-table-column>
        <el-table-column label="操作">
            <template slot-scope="scope">
                <el-button
                        size="mini"
                        @click="handleEdit(scope.$index, scope.row)">修改</el-button>
            </template>
        </el-table-column>
    </el-table>
</template>

<script>
    export default {
        name: "Completeorders",
        data() {
            return {
                tableData: [{
                    number:'05-02-1',
                    orderdata: '2016-05-02-11:11',
                    takedata:'2016-05-02-11:50',
                    name: '王小虎',
                    details: '红烧肉 辣椒炒鹅肉 米饭',
                    price:'12',
                    illegal:'违规',
                }, {
                    number: '05-02-2',
                    orderdata: '2016-05-02-11:11',
                    takedata:'2016-05-02-11:50',
                    name: '王小虎',
                    details: '清蒸鱼 白菜豆腐 米饭',
                    price:'12',
                    illegal:'正常',
                }, {
                    number: '05-02-3',
                    orderdata: '2016-05-02-11:11',
                    takedata:'2016-05-02-11:50',
                    name: '王小虎',
                    details: '佛跳墙 香煎小菜 米线',
                    price:'12',
                    illegal:'正常',
                }, {
                    number: '05-02-4',
                    orderdata: '2016-05-02-11:11',
                    takedata:'2016-05-02-11:50',
                    name: '王小虎',
                    details: '土豆 豆芽炒肉 粥',
                    price:'12',
                    illegal:'违规',
                }]
            }
        }
    }
</script>

<style scoped>

</style>