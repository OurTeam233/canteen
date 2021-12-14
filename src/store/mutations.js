const mutations = {
  // // 登录时设置用户名
  // setUserName(state, name) {   
  //   state.userInfo.userName = name;
  // }
  //清空vuex数据
  clearVUEX(state) {
    state.catch_components = []
    state.activePath = '/Ordering/OverallStatistics'
    state.tabList = [{
      path: '/Ordering/OverallStatistics',
      label: '工作台',
      name: 'OverallStatistics'
    }]
    // 顺便清除token
    state.token = ''
    state.userInfo = {}

  },
  // 跳转页面执行
  selectMenu(state, submenu) {
    // 首页就是 wellcome   也就是 home
    if (submenu.name === 'wellcome' || submenu.name === 'home') {
      submenu.name = 'home'
      submenu.path = 'home'
    }
    // 当前选中菜单
    var activePath = submenu.name
    // 历史已选中菜单列表
    var oldTabList = state.tabList
    // 将菜单信息添加到tablist - 添加时判断是否已有该标签
    var result = oldTabList.some(item => {
      if (item.name === activePath) {
        return true
      }
    })
    // 如果不包含该对象，则添加
    if (!result) {
      oldTabList.push({
        path: submenu.name,
        name: submenu.name,
        label: submenu.label
      })
    }
    // 重新赋值
    state.activePath = activePath
    state.tabList = oldTabList
  },
  // 添加keepalive缓存
  addKeepAliveCache(state, val) {
    // 如果是首页不缓存
    if (val === 'wellcome' || val === 'home') {
      return
    }
    // 添加时判断，如果该组件已存在，则不添加
    if (state.catch_components.indexOf(val) === -1) {
      // 不存在，缓存页面
      state.catch_components.push(val)
    }
  },
  // 删除keepalive缓存
  removeKeepAliveCache(state, val) {
    let cache = state.catch_components
    for (let i = 0; i < cache.length; i++) {
      if (cache[i] === val) {
        cache.splice(i, 1);
      }
    }
    state.catch_components = cache
  },
  //关闭菜单
  closeTab(state, val) {
    // 重新赋值
    state.activePath = val.activePath
    state.tabList = val.tabList
  },
  // 点击标签选择菜单
  changeMenu(state, val) {
    state.activePath = val
  }







}


export default mutations