// 仅用来存放一些公共信息
const state = {
  // 缓存组件页面
  catch_components: [],
  
  // 当前选中的菜单 - 默认选择首页
  activePath: '/Ordering/OverallStatistics',
  // 菜单项 - 默认包含首页
  tabList: [
      {
        path: '/ordering/OverallStatistics', 
        label: '工作台', 
        name: 'OverallStatistics'
      }
  ]
  
}

export default state