// 仅用来存放一些公共信息
const state = {
  // 缓存组件页面
  catch_components: [],
  
  // 当前选中的菜单 - 默认选择首页
  activePath: '/Ordering/Statistics',
  // 菜单项 - 默认包含首页
  tabList: [
      {path: '/Ordering/Statistics', label: '工作台', name: 'Statistics'}
  ]
}

export default state