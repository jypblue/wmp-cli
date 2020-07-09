const app = getApp();

Page({
  data: {
    userInfoEvent: null,
    ntk: ''

  },
  onLoad () {
    const ntk = app.getAuthorized();
    this.setData({
      ntk
    });
  },

  onReady () {

  },
  onShow () {

  },

  onHide () {

  },
  onUnload(){
    // 如果未登陆成功且未跳转页面表示: 点击了左上角返回 或 右上角三个点里的回到首页
    // 触发登录事件，清空回调队列
    wx.event.emit('xcxLogin', { success: false, data: { error_msg: 'PAGE_ON_UNLOAD'} });
  },
  handleUserInfoBind(event) {
    console.log(event);
    this.setData({
      userInfoEvent: event
    });
  },
  // 登录成功
  handleLoginComplete(result) {
    console.log('result:', result);
    wx.event.emit('xcxLogin', result.detail);
  }
});
