<template>
  <div>
    <el-tabs
      v-model="editableTabsValue"
      type="card"
      editable
      @edit="handleTabsEdit"
    >
      <el-tab-pane
        :key="item.name"
        v-for="item in editableTabs"
        :label="item.title"
        :name="item.name"
      >
        {{ item.content }}
      </el-tab-pane>
    </el-tabs>
  </div>
</template>

<script>
export default {
  name: "Meat",
  data() {
    return {
      editableTabsValue: "2",
      editableTabs: [
        {
          title: "Tab 1",
          name: "1",
          content: "Tab 1 content",
        },
        {
          title: "Tab 2",
          name: "2",
          content: "Tab 2 content",
        },
      ],
      tabIndex: 2,
    };
  },
  methods: {
    handleTabsEdit(targetName, action) {
      if (action === "add") {
        let newTabName = ++this.tabIndex + "";
        this.editableTabs.push({
          title: "New Tab",
          name: newTabName,
          content: "New Tab content",
        });
        this.editableTabsValue = newTabName;
      }
      if (action === "remove") {
        let tabs = this.editableTabs;
        let activeName = this.editableTabsValue;
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

        this.editableTabsValue = activeName;
        this.editableTabs = tabs.filter((tab) => tab.name !== targetName);
      }
    },
  },
};
</script>

<style scoped>
.size {
  float: left;
  width: 200px;
  height: 300px;
  padding: 10px;
  margin: 20px;
  background-color: rgba(255, 255, 255, 0.5);
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
.p-size {
  text-align: left;
  line-height: 0px;
  margin: 0;
  padding: 0;
  width: 100%;
  height: 30px;
  position: relative;
  top: -50px;
}
.el-button-size {
  background-color: #e9eef3;
  position: relative;
  border: 1px beige solid;
  top: -130px;
  left: 30px;
  color: black;
}
</style>
