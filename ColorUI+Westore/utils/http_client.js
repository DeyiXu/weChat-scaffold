import {
  auth
} from "./auth.js";

import {
  urlQuery
} from "./util.js";

class HttpClientBaseInfo {
  constructor(options) {
    this.baseUrl = options.baseUrl;
  }
}

class HttpClient {
  constructor(info) {
    this.baseInfo = info;
  }
  get({
    url,
    data,
    success,
    fail,
    complete
  }) {
    this._do("GET", url, data, "json", success, fail, complete);
  }
  post({
    url,
    data,
    success,
    fail,
    complete
  }) {
    this._do("POST", url, data, "json", success, fail, complete);
  }
  put({
    url,
    data,
    success,
    fail,
    complete
  }) {
    this._do("PUT", url, data, "json", success, fail, complete);
  }
  delete({
    url,
    data,
    success,
    fail,
    complete
  }) {
    this._do("DELETE", url, data, "json", success, fail, complete);
  }
  _do(method, url, data, dataType, success, fail, complete) {
    const that = this;
    // 获取Token本地刷新Token
    const oldToken = auth.getToken();
    let reqURL = "";
    let header = {
      "content-type": "application/json",
    };
    if (url.indexOf("/wx/login") === -1 && url.indexOf("/wx/token/refresh") === -1) {
      if (!oldToken) {
        wx.showToast({
          title: '请求未授权',
          icon: 'warn',
          duration: 3000
        });
        return;
      }
      reqURL = urlQuery({
        url: that.baseInfo.baseUrl + url,
        query: {
          access_token: oldToken.access_token,
        },
      });
      header = {
        ...header,
        Authorization: `Bearer ${oldToken.access_token}`
      };
    } else {
      reqURL = that.baseInfo.baseUrl.replace('/api/v1', '') + url;
    }
    wx.request({
      url: reqURL,
      data: data,
      header: header,
      timeout: 5000,
      method: method,
      dataType: dataType,
      success: function (resp) {
        // 响应对象做解析处理
        const {
          data
        } = resp;
        // 如果是认证失败
        if (data.code == 1000) {
          // 如果获取不到，重定向到登录页面
          if (oldToken) {
            // 刷新Token，刷新成功保存本地，重新发起请求
            // 刷新Token，刷新失败，重定向到登录页面
            that.get({
              url: `/wx/token/refresh/${token.refresh_token}`,
              success: function (tokenResp) {
                const tokenRespData = tokenResp.data;
                if (tokenRespData.code == 1) {
                  auth.setToken(tokenRespData);
                  // 设置Token成功后，重新执行请求
                  that._do(method, url, data, dataType, success, fail, complete);
                } else {
                  wx.showToast({
                    title: `重新授权错误：${tokenRespData.message}`,
                    icon: 'warn',
                    duration: 3000
                  });
                }
              },
              fail: function (err) {
                wx.showToast({
                  title: '重新授权失败',
                  icon: 'warn',
                  duration: 3000
                });
              }
            });
          } else {
            wx.showToast({
              title: '授权信息未找到，请重启小程序',
              icon: 'warn',
              duration: 3000
            });
          }
        } else {
          if (success) {
            success(resp);
          }
        }
      },
      fail: function (err) {
        console.log(err)
        wx.showToast({
          title: '请求数据失败',
          icon: 'none',
          duration: 3000
        });
        if (fail) {
          fail(err);
        }
      },
      complete: complete
    });
  }
  uploadFile({
    filePath,
    success,
    fail,
    complete
  }) {
    const that = this;
    return wx.uploadFile({
      url: that.baseInfo.baseUrl + '/fs?access_token=' + auth.getToken().access_token,
      filePath: filePath,
      name: 'file',
      success: success,
      fail: function (err) {
        console.log(err)
        wx.showToast({
          title: '请求数据失败',
          icon: 'none',
          duration: 3000
        });
        if (fail) {
          fail(err);
        }
      },
      complete: complete
    });
  }
}

export default new HttpClient({
  baseUrl: "http://192.168.1.190:30001/api/v1",
});