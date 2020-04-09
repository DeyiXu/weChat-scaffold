import store from '../../utils/store'
import create from '../../common/westore/create'
//获取应用实例
const app = getApp()

create(store, {
  data: {
    tabsIndex: null,
  },
  onLoad: function() {
    console.log('onLoad....')
    const that = this
    if (app.globalData.userInfo) {
      that.store.data.userInfo = app.globalData.userInfo
      that.store.data.hasUserInfo = true
      that.update()
      console.log(1, app.globalData.userInfo)
    } else if (that.data.canIUse) {
      // 由于 getUserInfo 是网络请求，可能会在 Page.onLoad 之后才返回
      // 所以此处加入 callback 以防止这种情况
      app.userInfoReadyCallback = res => {
        that.store.data.userInfo = res.userInfo
        that.store.data.hasUserInfo = res.true
        that.update()
        console.log(2, res.userInfo)
      }
    } else {
      // 在没有 open-type=getUserInfo 版本的兼容处理
      wx.getUserInfo({
        success: res => {
          app.globalData.userInfo = res.userInfo
          that.store.data.userInfo = res.userInfo
          that.store.data.hasUserInfo = true
          that.update()
          console.log(3, res.userInfo)
        },
        
      })
    }
  },
  getUserInfo: function(e) {
    app.globalData.userInfo = e.detail.userInfo
    this.store.data.userInfo = e.detail.userInfo
    this.store.data.hasUserInfo = true
    this.update()
  },
  NavChange(e) {
    this.store.data.tabsIndex = e.currentTarget.dataset.cur
    this.store.update()
  },
})