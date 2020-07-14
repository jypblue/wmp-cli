import {
  promisify,
  isType
} from 'utils/util';
import { isObject } from 'lodash';
import config from '../config';
import { getDeviceId } from './device';
import anonym_api_map from 'assets/file/anonym_api_map.js';
import no_anonym_api_map from 'assets/file/no_anonym_api_map.js';



const wxpRequest = promisify(wx.request);

/**
 *  格式化请求验签参数
 * @param { String/Array } mt 接口名称
 * @param { Object/Array } data 参数对象
 * @return { Object } result 组装好的结果
 */
const formatRequestParams = (params, csrfToken) => {

  const { url, action_id, data = {} } = params;

  const _aid = config.AID;
  const _vn = config.UPDATEVERSION;
  const _ts = Number(new Date());
  const _sm = 'md5';
  const _referer = '';
  const _channel = encodeURIComponent(config.CHANNEL);
  const _scene = wx.getGlobalSys('scene') || 0;
  const _pvid = wx.getGlobalOp('pvid') || '';
  const _action_id = action_id || 0;
  const isArray = Array.isArray(url);
  const mtArr = isArray ? url : [url];
  const _mt = isArray ? url.join(',') : url;
  const _did = getDeviceId();
  const checkData = isArray ? data : [data];
  const store_id = wx.getStorageStore('store_id');
  // const curStoreTime = getCurrentSysTime();
  // const cur_time = wx.getStorageStore('storeTime') ? wx.getStorageStore('storeTime') : curStoreTime;

  const _store_id = store_id ? store_id + ',' + new Date() : '';
  const _dlv = wx.getStorageUser('vipInfo')?.discountLevel || 'NORMAl_USER';

  let signature = 'yitshenghuoguan.xyz!';
  // 删除undefined业务参数
  checkData.forEach((item) => {
    for (const key in item) {
      if (item[key] === undefined) {
        delete item[key];
      }
    }
  });

  // 全局获取验证参数
  for (let i = 0; i < mtArr.length; i++) {
    const item = mtArr[i];
    // 判断是否有依赖，目前只支持一层依赖
    const mt = item.indexOf(':') > -1 ? item.substring(0, item.indexOf(':')) : item;
    const anonym = anonym_api_map.includes(mt); // 是匿名接口
    const noAnonym = no_anonym_api_map.includes(mt);// 是非匿名接口

    if (!anonym && !noAnonym) {
      console.error([
        `当前${mt}接口验签声明不存在`,
        'assets/file文件夹下添加接口声明',
      ].join('\n'));
      return false;
    }

    if (noAnonym) {
      if (csrfToken) {
        signature = csrfToken;
      }
    }
  }
  // 组装参数对象
  let result = {
    _aid,
    _vn,
    _mt,
    _sm,
    _ts,
    _referer,
    _channel,
    _scene,
    _did,
    _pvid,
    _action_id,
    _store_id,
    _dlv
  };
  const formatReqData = {};
  if (isArray) {
    checkData.forEach((item, i) => {
      for (const key in item) {
        if (item.hasOwnProperty(key)) {
          formatReqData[i + '_' + key] = item[key];
        }
      }
    });
    result = { ...result, ...formatReqData };
  } else {
    result = { ...result, ...data };
  }
  // 添加验证_sig
  const signaArr = [];
  for (const key in result) {
    if (result.hasOwnProperty(key)) {
      if (isObject(result[key]) || Array.isArray(result[key])) {
        result[key] = JSON.stringify(result[key]);
      }
      signaArr.push(key + '=' + result[key]);
    }
  }
  const _sig = signaArr.sort().join('') + signature;
  result._sig = _sig;

  return result;
};

/**
 * 格式化返回响应数据
 * @param { Object } data 正常返回的数据
 * @return { Object } result 格式化后的数据
 */
const formatResponseData = (data) => {
  const result = [];
  const { content, stat } = data;
  const stateArr = stat.stateList;

  stateArr.forEach((item, i) => {
    result[i] = {
      state: item,
      data: content[i]
    };
  });
  return result;
};


// 获取token发送请求
function getRequestToken(tk) {
  const _utk = wx.getStorageUser('userToken') || '';
  const _dtk = wx.getStorageUser('deviceToken') ||  '';
  const _ntk = wx.getStorageUser('ntk') || ''; // ntk
  const _tk  = tk || _utk || _ntk || _dtk;
  return _tk;
}

// 获取请求地址
function getRequestPath(url) {
  const isNodeApi  = /^node_/.test(url);
  return isNodeApi ? '/apiagg/m.api' : '/apigw/m.api';
}



// 请求函数
const wxFetch = async (options) => {
  const { url, showLoading, tk, loadingText, mask, complete } = options;
  const csrfToken =  wx.getStorageUser('deviceSecret') || wx.getStorageSync('deviceSecret') || wx.getStorageUser('csrfToken') || '';
  const _tk = getRequestToken(tk);
  const data = formatRequestParams(options, csrfToken);
  if (!data) {
    console.warn('请求参数格式化异常');
    return false;
  }
  // 获取请求的接口地址
  const requestPath = getRequestPath(url);

  const requestHost = config.host;
  const header = {
    'content-type': 'application/x-www-form-urlencoded',
    '_referer'    : data._referer,
    _tk
  };

  try {
    showLoading && wx.showLoading({
      title: loadingText || '加载中',
      mask : !!mask
    });
    const params = {
      url: requestHost + requestPath,
      header,
      method: 'POST',
      data
    };
    // 请求成功
    const response = await wxpRequest(params);
    const code = response.data.stat.code;
    switch (code) {
      case 0:
        return formatResponseData(response.data);
      case -300:
      case -180:
      case -160:
      case -360:
      case -361:
      case -181:
      case -182:
        break;
      case -400:
        break;
      default:
        break;
    }
    return response.data;

  } catch (error) {
    // 请求失败
    return Promise.reject(error);
  } finally {
    complete && complete();
    showLoading && wx.hideLoading();
  }
};

//  格式化请求参数格式
function stringifyRequestData(data){
  Object.keys(data).forEach(key=>{
    if (data.hasOwnProperty(key)) {
      if (isType(data[key]) === 'Object' || Array.isArray(data[key])) {
        data[key] = JSON.stringify(data[key]);
      }
    }
  });
  return data;
}

export default async function $fetch (params) {
  let { url, data, showLoading = false } = params;
  // 如果接口请求参数对象中有参数是对象或者数组，自动将它JSON.stringify
  const dataType = isType(data);
  switch(dataType) {
    case 'Array':
      data = data.map(item => {
        return stringifyRequestData(item);
      });
      break;
    case 'Object':
      data = stringifyRequestData(data);
      break;
    default:
      console.error('请求接口数据类型不对', data);
      return false;
  }

  try {
    const res = await wxFetch({...params, url, data, showLoading});
    return res.length === 1 ? res[0] : res;
  } catch (error) {
    return Promise.reject(error);
  }
};


