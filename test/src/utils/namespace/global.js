import namespace from './namespace.global.js';
import { registerNameSpace } from '../util';


/**
 * 自定义 global 存储对象
 * @class Global
 */
class Global {

    // storage 存储对象
    data = {}

    constructor(){
      // 往wx中注册命名空间
      registerNameSpace(this, namespace, 'Global');
    }

    /**
     * 设置存储
     * @param {string} key   指定设置存储的key, 格式为: namesapce.property
     * @param {any}    value 需要设置存储的值
     * @memberof Global
     */
    set(key, value){
      // 正常调用 namespace.property
      this.data[key] = value;
    }

    /**
     * 获取当前存储
     * @param {string} key 指定设置存储的key, 格式为: namesapce.property
     * @returns {any} 存储的值
     * @memberof Global
     */
    get(key){
      // 返回 data 中的值
      return this.data[key];
    }

    /**
     * 删除指定存储
     * @param {string} key 指定设置存储的key, 格式为: namesapce.property
     * @memberof Global
     */
    remove(key){
      delete this.data[key];
    }
}

export default function(){
  return new Global();
}

