<template>
  <div>
    我是测试界面 参数传递:{{ id }}
    <div style="width: 100%; height: 300px" ref="chart"></div>
    <button @click="button()">测试请求</button>
  </div>
</template>

<script>
let Echarts = require("echarts/lib/echarts");
require("echarts/lib/chart/bar");
import {test} from "../../api/user.js";

export default {
  name: "Test",
  props: ["id"],
  data() {
    return { chart: null };
  }, //图表实例
  mounted() {
    this.init();
  },
  methods: {
    init() {
      //2.初始化
      this.chart = Echarts.init(this.$refs.chart);
      //3.配置数据
      let option = {
        xAxis: {
          type: "category",
          data: ["Mon", "Tue", "Wed", "Thu", "Fri", "Sat", "Sun"],
        }, //X轴
        yAxis: { type: "value" }, //Y轴
        series: [{ data: [120, 200, 150, 80, 70, 110, 130], type: "bar" }], //配置项
      };
      // 4.传入数据
      this.chart.setOption(option);
    },
    button() {
      test().then((res) => {
        console.log(res);
      });
    },
  }


};
</script>

<style scoped></style>
