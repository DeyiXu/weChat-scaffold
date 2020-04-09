const auth = {
  setToken(token) {
    try {
      wx.setStorageSync('union_vip_token', token)
    } catch (e) {}
  },
  getToken() {
    try {
      var value = wx.getStorageSync('union_vip_token')
      if (value) {
        return value;
      } else {
        return "";
      }
    } catch (e) {
      return "";
    }
  }
}
// module.exports = {
//   auth: auth,
// }

export {
  auth
}