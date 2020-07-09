import namespace from './namespace.storage.js';
import { registerNameSpace } from '../util';

/**
 * 自定义 storage 存储对象
 * @class Storage
 */
class Storage {

    // storage 存储对象
    storage = {}

    constructor(){
      // 往wx中注册命名空间
      registerNameSpace(this, namespace, 'Storage');
    }

    /**
     * 设置存储
     * @param {string} key   指定设置存储的key, 格式为: namesapce.property
     * @param {any}    value 需要设置存储的值
     * @memberof Storage
     */
    set(key, value){
      // 正常调用 namespace.property
      this.storage[key] = value;

      try{
        wx.setStorageSync(key, value);
      } catch(e){
        //如果报错了，那么走异步存的方式，也有可能存不进去。
        //但是this.globalData里面有，那么再取的时候，如果有this.globalData，没有ls那么再存一次。
        if(typeof wx.setStorage === 'function'){
          wx.setStorage({
            key : key,
            data: value,
            fail: function(){
              wx.Logger.report(`wx.setStorage报错`,`setStorage:${key}`,`error`);
            }
          });
        }
      }
    }

    /**
     * 获取当前存储
     * @param {string} key 指定设置存储的key, 格式为: namesapce.property
     * @returns {any} 存储的值
     * @memberof Storage
     */
    get(key){
      // 判断当前属性是否已经存在为 global
      if (key in this.storage){
        // 返回 global 中的值
        return this.storage[key];
      } else {
        // 需要返回的数据
        let val = '';
        try{
          // 判断当前key在storage中是否存在
          if (wx.getStorageInfoSync().keys.includes(key)){
            // 当前属性不存在于 global 中则从 storage 中获取
            val = wx.getStorageSync(key);
            // 将从 storage 获取的值存储进 global 中
            this.set(key, val);
          }
        } catch(e) {}
        // 返回当前值
        return val;
      }
    }

    /**
     * 删除指定存储
     * @param {string} key 指定设置存储的key, 格式为: namesapce.property
     * @memberof Storage
     */
    remove(key){
      delete this.storage[key];
      wx.removeStorageSync(key);
    }
}

export default function(){
  return new Storage();
}

