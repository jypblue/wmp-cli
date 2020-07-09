const util = require('../../utils/util');

Page({
  data: {
    wxBindUserInfo: null,
  },
  onLoad (options) {
    const wxBindFailStr = wx.getStorageUser('wxBindFail');
    const wxBindUserInfo = wxBindFailStr && JSON.parse(wxBindFailStr);
    this.setData({
      wxBindUserInfo
    });
  },
  onReady () {

  },

  /**
     * 生命周期函数--监听页面显示
     */
  onShow () {

  },

  /**
     * 生命周期函数--监听页面隐藏
     */
  onHide () {

  },

  /**
     * 打开客服链接
     */
  onlineServerCallback(e) {
    if (e && e.detail && e.detail.path) {
      let querystring = '';
      if (JSON.stringify(e.detail.query) !== '{}') { // 如果没有参数返回的是 '{}'
        querystring = `?${util.getParams(e.detail.query)}`;
      }
      util.NavigateTo({ url: `${e.detail.path}${querystring}` });// 这个地址是客服页面回退之后的跳转
    }
  },
});
