//app.js
import store from '/utils/store'

import HttpClient from "/utils/http_client.js";
import {
  auth
} from "/utils/auth.js";

App({
  onLaunch: function() {
    const that = this;
    // 展示本地存储能力
    var logs = wx.getStorageSync('logs') || []
    logs.unshift(Date.now())
    wx.setStorageSync('logs', logs)

    // 登录
    console.log('登录前');
    that.authLogin().then(data => console.log(data));
    console.log('登陆后');
    // wx.login({
    //   success: res => {
    //     // 发送 res.code 到后台换取 openId, sessionKey, unionId
    //   }
    // })
    // 获取用户信息
    wx.getSetting({
      success: res => {
        if (res.authSetting['scope.userInfo']) {
          // 已经授权，可以直接调用 getUserInfo 获取头像昵称，不会弹框
          wx.getUserInfo({
            success: res => {
              // 可以将 res 发送给后台解码出 unionId
              this.globalData.userInfo = res.userInfo

              // 由于 getUserInfo 是网络请求，可能会在 Page.onLoad 之后才返回
              // 所以此处加入 callback 以防止这种情况
              if (this.userInfoReadyCallback) {
                this.userInfoReadyCallback(res)
              }
            }
          })
        }
      }
    })
    // 获取系统状态栏信息
    wx.getSystemInfo({
      success: e => {
        this.globalData.StatusBar = e.statusBarHeight;
        let capsule = wx.getMenuButtonBoundingClientRect();
        if (capsule) {
          this.globalData.Custom = capsule;
          this.globalData.CustomBar = capsule.bottom + capsule.top - e.statusBarHeight;
        } else {
          this.globalData.CustomBar = e.statusBarHeight + 50;
        }
      }
    })
  },
  authLogin: function() {
    const that = this;
    return new Promise((resolve, reject) => {
      wx.login({
        success: res => {
          HttpClient.post({
            url: "/wx/login",
            data: {
              code: res.code,
              client: "wx-xh",
            },
            success: ({
              data: result
            }) => {
              if (result.code == 1) {
                auth.setToken(result.data);
              }
              resolve(true);
            }
          });
        },
        fail: err => {
          reject('wx.login error:', err);
        }
      });
    });
  },
  globalData: {
    userInfo: null
  }
})