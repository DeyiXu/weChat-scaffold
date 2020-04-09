import create from '../../../common/westore/create'

//获取应用实例
const app = getApp()

create({
  options: {
    addGlobalClass: true,
  },
  data: {
    StatusBar: app.globalData.StatusBar,
    CustomBar: app.globalData.CustomBar,
  },
  methods: {

  }
})