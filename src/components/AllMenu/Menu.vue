<template>
  <div>
    <div style="margin-bottom: 20px;">
      <el-button size="small" @click="addTab(groupId)">
        add tab
      </el-button>
    </div>
    <el-tabs
      v-model="groupId"
      type="border-card"
      closable
      @tab-remove="removeTab"
    >
      <el-tab-pane
        v-for="group in groups"
        :key="group.index"
        :label="group.groupTab"
        :name="group.groupId"
      >
        <!-- {{ group.foods }} -->
        <el-card class="background">
          <el-card :body-style="{ padding: '0px' }" v-for="food in group.foods" :key="food" class="foodCard" >
            <img :src="food.img" class="image"/>
            <div style="padding: 14px;">
              <span>名称：{{food.name}}</span>
              <div>价格：{{food.price}}</div>
              <div class="bottom clearfix">
              
                <el-button type="text" class="button">删除</el-button>
              </div>
            </div>
          </el-card>
        </el-card>
      </el-tab-pane>
    </el-tabs>
  </div>
</template>

<script>
export default {
  name: "Menu",
  data() {
    return {
      // 当前选中的tab
      cntGroupId: "1",
      // 所有分组
      groups: [
        {
          groupTab: "荤菜",
          groupId:"1",
          foods: [
            {
              name: "青椒炒肉",
              price: 6,
              img:
                "https://shadow.elemecdn.com/app/element/hamburger.9cf7b091-55e9-11e9-a976-7f4d0b07eef6.png",
            },
            {
              name: "黄焖鸡",
              price: 11,
              img:
                "https://shadow.elemecdn.com/app/element/hamburger.9cf7b091-55e9-11e9-a976-7f4d0b07eef6.png",
            },
          ],
        },
        {
          groupTab: "素菜",
          groupId:"2",
          foods: [
            {
              name: "青椒炒青椒",
              price: 3,
              img:
                "https://shadow.elemecdn.com/app/element/hamburger.9cf7b091-55e9-11e9-a976-7f4d0b07eef6.png",
            },
            {
              name: "西红柿炒番茄",
              price: 4,
              img:
                "https://shadow.elemecdn.com/app/element/hamburger.9cf7b091-55e9-11e9-a976-7f4d0b07eef6.png",
            },
          ],
        },
      ],
    };
  },
  methods: {
    addTab(targetName) {
      // 新标签名
      let newTabName = ++this.tabIndex + "";
      this.groups.push({
        title: "新标签",
        name: newTabName,
        content: "New Tab content",
      });
      this.groupId = newTabName;
    },
    removeTab(targetName) {
      let tabs = this.groups;
      let activeName = this.groupId;
      if (activeName === targetName) {
        tabs.forEach((tab, index) => {
          if (tab.name === targetName) {
            let nextTab = tabs[index + 1] || tabs[index - 1];
            if (nextTab) {
              activeName = nextTab.name;
            }
          }
        });
      }
      

      this.groupId = activeName;
      this.groups = tabs.filter((tab) => tab.name !== targetName);
    },
  },
};
</script>

<style scoped>

/*标签栏 */
.el-tabs{
  background-color: #fff;
}


/*卡片的背景 */
.background{
  background-color: #fff;
  width: 100%;
  /* margin: 0 10px; */
  display: flex;
  flex-direction: row; 
  border:none;
}

/*菜谱中的每个菜的卡片 */
.foodCard{
  display: inline-block;
  width: 230px;
  margin: 20px 20px 0 10px;
  text-align: left;
  
  
}

</style>
