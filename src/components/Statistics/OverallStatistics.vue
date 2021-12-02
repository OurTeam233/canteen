<template>
  <div class="box">
    <div class="left-box">
      <el-card class="turnover">
        <p>累计营业额</p>
        <div style="width: 500px; height: 300px" ref="chart" id="charts"></div>
      </el-card> 
      <el-card class="concrete">
        <div id="data">
          <p>Hi,已为您细分各版块数据。</p>
          <div class="data-plate">

            <div v-for="n in 6" :key="n" class="test">
              <div class="test-icon"></div>
              <div class="test-text">
                <p style="width:130px">累计订单</p>
                <div>
                  <p style="float:left; font-size:22px; font-weight:bold;">300</p>
                  <p style="float: right; color:green">新增 +91</p>
                </div>
              </div>
            </div>

          </div>
        </div>
      </el-card>

    </div>
    
    
    <div class="right-box new">
      <el-card class="new">
        <p>新增订单</p>
        <p>今日 本周 本月</p>
        <div v-for="n in 8" :key="n" class="new-info">
          <div >
            <p class="userName">用户名</p>
            <p class="pay">付款：15.00</p>
          </div>
          
          <p class="new-time">6分钟前</p>
        </div>

      </el-card>
    </div>
  </div>
</template>

<script>
import * as Echarts from 'echarts';

export default {
  name: "OverallStatistics",
  data() {
    return {chart: null};
  },
  mounted() {
    this.init();
  },
  methods: {
    init() { 
      let chartDom = document.getElementById('charts');
      let myChart = Echarts.init(chartDom);
      this.chart = Echarts.init(this.$refs.chart);
      // 配置项
      let option = {
        legend: {},
        tooltip: {
          trigger: "axis",
          showContent: false,
        },
        dataset: {
          source: [
            ["product", "2012", "2013", "2014", "2015", "2016", "2017"],
            ["Milk Tea", 56.5, 82.1, 88.7, 70.1, 53.4, 85.1],
            ["Matcha Latte", 51.1, 51.4, 55.1, 53.3, 73.8, 68.7],
            ["Cheese Cocoa", 40.1, 62.2, 69.5, 36.4, 45.2, 32.5],
            ["Walnut Brownie", 25.2, 37.1, 41.2, 18, 33.9, 49.1],
          ],
        },
        xAxis: { type: "category" },
        yAxis: { gridIndex: 0 },
        grid: { top: "55%" },
        series: [
          {
            type: "line",
            smooth: true,
            seriesLayoutBy: "row",
            emphasis: { focus: "series" },
          },
          {
            type: "line",
            smooth: true,
            seriesLayoutBy: "row",
            emphasis: { focus: "series" },
          },
          {
            type: "line",
            smooth: true,
            seriesLayoutBy: "row",
            emphasis: { focus: "series" },
          },
          {
            type: "line",
            smooth: true,
            seriesLayoutBy: "row",
            emphasis: { focus: "series" },
          },
          {
            type: "pie",
            id: "pie",
            radius: "30%",
            center: ["50%", "25%"],
            emphasis: {
              focus: "self",
            },
            label: {
              formatter: "{b}: {@2012} ({d}%)",
            },
            encode: {
              itemName: "product",
              value: "2012",
              tooltip: "2012",
            },
          },
        ],
      };

      myChart.on("updateAxisPointer", function(event) {
        const xAxisInfo = event.axesInfo[0];
        if (xAxisInfo) {
          const dimension = xAxisInfo.value + 1;
          myChart.setOption({
            series: {
              id: "pie",
              label: {
                formatter: "{b}: {@[" + dimension + "]} ({d}%)",
              },
              encode: {
                value: dimension,
                tooltip: dimension,
              },
            },
          });
        }
      });
      myChart.setOption(option);
    },
  },
};
</script>



<style scoped>

p{
  /* float:left; */
  text-align: left;
  line-height: 20px;
  font-size:16px;
  /* font-weight:bold; */
  margin:10px 0 5px 0;

}




.box{
  display:flex;
}

.left-box{
  width:66%;
  margin:10px;
}

.turnover{
  margin-bottom:10px;

}
/* 
#charts{
  clear:both;
} */


.data-plate{
  /* clear:both; */
  display:flex;
  flex-wrap:wrap;
}

.test{
  /* background-color:gray; */
  width:30%;
  height:80px;
  margin:10px;
  display:flex;
  
}

.test-icon{
  background-color:red;
  width:60px;
  height:60px;
  margin:10px;
}

.test-text{
  display:block;
}




.right-box{
  width:33%;
  margin:10px 10px 10px 0;
}

.new-info{
  width:100%;
  height:70px;
  background-color:rgba(1,1,1,0.1);
  border-radius:10px;
  display:flex;
  margin-bottom: 10px;
}

.new-info div{
  width:80%;
}

.new-time{
  width:20%;
  line-height:63px;
}



.userName, .pay{
  padding:8px 0 0 10px;
  
  margin:5px 0;
  line-height: 20px;
}

.userName{
  font-weight: bold;
}

.pay{
  font-size:13px;
}










</style>
