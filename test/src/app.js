// app.js
import storage from './utils/namespace/storage';
import customGlobal from './utils/namespace/global';
import $fetch from './utils/request';
import eventBus from './utils/event';


if (wx){
  storage();
  customGlobal();
  wx.eventBus = eventBus();
}

App({
  globalData: {

  },
  onLaunch () {
    wx.setGlobalUtil || customGlobal();
    // 补救实例化不成功的情况
    wx.setStorageUser || storage();
    wx.eventBus || (wx.eventBus = eventBus());
  },
  onLoad() {},
  onShow() {},
  $fetch,
});
