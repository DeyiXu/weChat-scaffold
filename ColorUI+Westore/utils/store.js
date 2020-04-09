export default {
  data: {
    tabsIndex: 'tab1', //更改我会刷新所有页面,不需要在组件和页面声明data依赖
    userInfo: {},
    hasUserInfo: false,
    canIUse: wx.canIUse('button.open-type.getUserInfo'),
    
    motto: 'Hi 开发者！',
    logs: [],
    firstName: 'dnt',
    lastName: 'zhang',
    fullName: function() {
      return this.firstName + this.lastName
    },
  },
  globalData: ['tabsIndex', 'userInfo', 'hasUserInfo'],
  logMotto: function() {
    console.log(this.data.motto)
  },
  //默认 false，为 true 会无脑更新所有实例
  //updateAll: true
}