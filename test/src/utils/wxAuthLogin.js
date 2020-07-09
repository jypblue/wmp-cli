const extConfigs = require('config');

const LOGIN_PATHS  = 'pages/login/login'; //手动登录页面地址

// checkIsLogin登录单例函数
function xcxCheckIsLoginSingleTon() {
  let count = 0;

  // 添加订阅重置事件，重置订阅次数为0
  wx.event.on('xcxLoginCountToZero', () => {
    count = 0;
  });

  return function(...args) {
    // 获取调用的参数key/value
    const params = this.paramsAnalysis(args);

    try {
      // 通过 userToken 判断用户是否已登陆
      if (this.getUserToken()) {
        // 登陆成功后的处理 (返回的数据结果保持与登陆接口返回一致)
        const loginData = this.getLoginDataFromStorage();
        // 登录成功，执行登录成功的回调参数
        this.xcxLoginSuccess(params, loginData);
      } else {
        // 没有userToken进行登录操作
        this.globalData.xcxLoginParamsQueue.push(params);
        // 调用登录
        if(count < 1) {
          // 订阅登录事件
          wx.event.once('xcxLogin', (event) => {
            count = 0;
            this.onXcxLoginComplete(event);
          });
          this.xcxLogin(params);
        }
        count++;
      }
    } catch(error) {
      // 用于处理 wx.getStorageSync 出错的情况
      // 走登录失败
      count = 0;
      this.xcxLoginFail(params, error);
      wx.Logger.report(error.toString(), 'xcxCheckIsLoginSingleTon');
    }
  };
}

module.exports = {
  // 是否绑定登录
  getUserToken() {
    return wx.getStorageUser('userToken') || wx.getStorageSync('userToken') || '';
  },
  // 是否授权
  getAuthorized() {
    return this.getUserToken() || wx.getStorageUser('ntk') || '';
  },
  // 是否含有tempToken
  getTempToken() {
    return wx.getStorageUser('tempToken') || '';
  },
  // 静默授权登录新方法
  async thirdPartyAutoLogin(tempToken) {
    try {
      const params = {
        url: 'user.thirdPartyAuthorization',
        data: {
          partnerId: 'temp_token_login',
          authResp: 'code=' + tempToken
        }
      };
      const res = await this.$fetch(params);
      if (res.error_num === 0) {
        return res.content;
      } else {
        wx.Logger && wx.Logger.report(res.toString(), 'user.thirdPartyAuthorization');
        return false;
      }
    } catch (error) {
      console.error('user.thirdPartyAutoLogin: ', error);
      wx.Logger && wx.Logger.report(error.toString(), 'user.thirdPartyAuthorization');
      return false;
    }
  },
  /**
     * 微信授权头像昵称统一方法
     * @param {getUserInfo的事件信息} event
     * @return 微信授权成功或失败的结果对象 { success: true/ false , data: xxxx }
     */
  async handleWxAuthLogin(event){
    const data = event.detail;
    if (data.errMsg === 'getUserInfo:ok'){
      // 获取当前登陆的 code
      try {
        const wxLoginResult = await this.getWxLoginCode();
        const params = {
          code: wxLoginResult.code,
          userInfo: data,
          showLoading: true
        };
        const result = await this.thirdPartyAuthorization(params);
        // 处理数据，设置登录信息
        if(result) {
          this.handleUnionIdProcess(result);
        } else {
          wx.showToast({title:'授权失败，请重新授权', duration: 2000, icon:'none'});
        }

        // 返回登录成功或者失败
        return result ? {success: true, data: result} : { success: false, data: null};
      } catch (error) {
        wx.Logger.report(error.toString(), 'handleWxAuthLogin');
      }

    } else {
      wx.showToast({title:'需要授权登录才能使用小程序的各种功能',icon:'none'});
    }
  },
  // 没有event获取相关信息，如ttk
  async handleWxAuthNoUserInfo(){
    // 获取当前登陆的 code
    try {
      const wxLoginResult = await this.getWxLoginCode();
      const params = {
        code: wxLoginResult.code,
        userInfo: null,
        showLoading: false
      };
      const result = await this.thirdPartyAuthorization(params);
      // 处理数据，设置登录信息
      if(result) {
        this.handleUnionIdProcess(result);
      }
      // 返回登录成功或者失败
      return result ? {success: true, data: result} : { success: false, data: null};
    } catch (error) {
      wx.Logger.report(error.toString(), 'handleWxAuthNoUserInfo');
    }
  },
  // 微信授权code
  getWxLoginCode() {
    return new Promise((resolve, reject)=>{
      wx.login({ success: resolve, fail: reject });
    });
  },
  /**
     * 微信授权登录子流程
     * @param {微信wx.login返回的code} code
     * @param {微信中button 按钮是getUserInfo返回的授权信息} userInfo
     * @return 接口返回的数据
     */
  async thirdPartyAuthorization(options){
    try {
      const {
        code,
        userInfo,
        showLoading = false
      } = options;
      const userInfoString = userInfo ? `&iv=${userInfo.iv}&encryptedData=${userInfo.encryptedData}` : '';
      const authResp = `code=${code}${userInfoString}`;
      const params = {
        url: 'user.thirdPartyAuthorization',
        data: {
          authResp,
          partnerId: extConfigs.PARTNERID,
        },
        showLoading,
      };
      const res = await this.$fetch(params);
      if(res.error_num === 0) {
        // 新版登录成功
        return res.content;
      } else {
        wx.Logger.report(res.toString(), 'user.thirdPartyAuthorization');
        return false;
      }
    } catch (error) {
      console.log(error);
      wx.showToast({title:'授权失败，请重新授权', duration: 2000, icon:'none'});
      wx.Logger.report(error.toString(), 'user.thirdPartyAuthorization');
      return false;
    }
  },
  // 处理授权登录返回来的信息
  handleUnionIdProcess(data) {
    if(!data) {
      console.error('获取登录返回信息失败！');
      return false;
    }

    const {utk, ntk, ttk, vipInfo, userInfo, discount, vipType, needUserInfo } = data;

    // 更新utk
    if (utk) {
      wx.setStorageUser('userToken', utk);
      wx.setStorageSync('userToken', utk);
    }

    // ntk
    ntk && wx.setStorageUser('ntk', ntk);

    // ttk
    ttk && wx.setStorageUser('tempToken', ttk);

    // 是否需要授权微信code登录
    needUserInfo && wx.setStorageUser('needUserInfo', needUserInfo);

    // 更新用户信息
    userInfo && wx.setStorageUser('userInfo', userInfo);

    // 更新vip相关信息
    if (vipInfo) {
      wx.setStorageUser('vipInfo', {
        discount     : discount,
        discountLevel: vipInfo?.discountLevel || '',
        vipInfo      : vipInfo,
        vipType      : vipType || '',
      });
    }
  },

  // 更新设备注册信息
  handleDeviceInfoUpdate(data = null){
    if(!data) {
      return false;
    }
    // 接口数据
    const { deviceId, deviceSecret, deviceToken } = data;

    if (deviceId) {
      wx.setStorageUser('_did', deviceId);
      wx.setStorageSync('_did', deviceId);
    }
    if (deviceSecret) {
      wx.setStorageUser('deviceSecret', deviceSecret);
      wx.setStorageSync('deviceSecret', deviceSecret);
    }
    if (deviceToken) {
      wx.setStorageUser('deviceToken', deviceToken);
      wx.setStorageSync('deviceToken', deviceToken);
    }
  },

  /**
     * 从storage中获取登录的相关信息
     * @returns {
     *      token: userToken, // 用户已绑定手机号的标记token
     *      userToken,        // 用户已绑定手机号的标记token
     *      csrfToken,        // HTTP请求参数token
     *      tempToken,        // 静默登录使用
     *      userInfo,         // 用户信息
     *      vipInfo,          // vip信息
     *      ntk               // 只授权未绑定手机号的中间状态token
     * }
     */
  getLoginDataFromStorage() {
    const userToken    = wx.getStorageUser('userToken') || wx.getStorageSync('userToken') || '';
    const tempToken    = wx.getStorageUser('tempToken') || wx.getStorageSync('tempToken') || '';
    const ntk          = wx.getStorageUser('ntk') || '';
    const csrfToken    = wx.getStorageUser('csrfToken') || wx.getStorageSync('csrfToken') || '';
    const userInfo     = wx.getStorageUser('userInfo') || wx.getStorageSync('userInfo') || '';
    const vipInfo      = wx.getStorageUser('vipInfo')?.vipInfo || {};

    return {
      token: userToken,
      userToken,
      csrfToken,
      tempToken,
      userInfo,
      vipInfo,
      ntk
    };
  },
  lastPage() {
    // 兼容处理防止调用时报错
    return getCurrentPages().slice(-1)[0] || {};
  },
  /**
     * 判断当前页面是不是登录页面
     * @returns {Boolean} true/false
     */
  isLoginPage() {
    const page = getCurrentPages().slice(-1)[0] || { route: '' };
    const url = page.route;
    return url.indexOf(LOGIN_PATHS) === 0;
  },

  /**
     * 参数解析(最多两个参数)
     * @param   {array} args rest 参数
     * @returns {params} 对象格式化好后的参数对象，key为命名参数，或者是随机uuid参数，value值为format好的信息
     */
  paramsAnalysis(args) {
    // 格式化传入参数
    let params = {};
    // 获取最后一个参数
    const option = args.slice(-1)[0];
    // 如果存在两个参数, 则第一个参数视为 keyname
    // const keyName = args[1] ? args[0] : `key_${util.uuid()}`;
    const paramsType = Object.prototype.toString.call(option).slice(8, -1);

    switch(paramsType) {
      case 'String':
        params = {
          redirectURL: option
        };
        break;
      case 'Boolean':
        params = {
          disable: option
        };
        break;
      case 'Function':
        params = {
          complete: option
        };
        break;
      case 'Object':
        params = {
          complete: option?.callback,
          ...option
        };
        break;
      default:
        console.error('checkIsLogin params error');
        wx.Logger.report('checkIsLogin params error');
        break;
    }
    return params;
  },

  /**
     * 登陆验证
     * @param  {string} keyname 当前调用对应的 keyname , 此值唯一, 如有相同的则会覆盖
     * @param  {obejct|string|function|boolean} option 配制信息|回跳地址|回调函数
     *     option[object]   完整的配制信息
     *         option.entryBefore : 执行了跳转登陆页的行为且在进入登陆页之前的回调
     *         option.entryAfter  : 执行了wx[navigateTo | redirectTo], 不管成功还是失败
     *         option.success     : 登陆成功回调
     *         option.fail        : 登陆失败回调
     *         option.complete    : 不管成功还是失败都执行
     *         option.redirectURL : 登陆成功后的回跳地址
     *         option.redirectType: 页面跳转方式（默认 redirectTo）
     *         option.disable     : 登陆失败后禁止页面跳转 (默认: false) // ?再加注释
     *         option.query       : 跳转至登陆页时的参数
     *         option.steps       : 是否启用每步监听 (默认: false)
     *     option[string]   登陆成功后的回跳地址
     *     option[function] 登陆成功后的回调函数
     *     option[boolean]  不管什么情况都不执行回调或回跳
     */
  checkIsLogin: xcxCheckIsLoginSingleTon(),
  // xcx登录
  async xcxLogin(params) {
    const { disable } = params; // 登录失败时静止跳转到手动登录页面的标记
    // 先尝试静默登录
    const silentLoginData = await this.xcxSilentLogin();
    console.log('xcxLogin start:', silentLoginData);
    if(silentLoginData) {
      const { userToken } = silentLoginData;
      // 手机绑定成功的user用户, 其它是ntk状态或者dtk状态，对于电商而言必须有userToken才行
      if(userToken) {
        // 静默登录成功
        wx.event.emit('xcxLogin', { success: true, data: silentLoginData} );
      } else if(disable){
        // 判断后续登录回调函数是否有非匿名的回调配置有就跳转到登录页面，没有就回调登录失败
        this.silentLoginFail(params, 'NO_USER_TOKEN');
      } else {
        // 跳转到登录页面
        this.handleToPageLogin(params);
      }
    } else {
      // 静默登录失败
      if(disable){
        this.silentLoginFail(params, 'SILENT_LOGIN_FAIL');
      } else {
        // 跳转到登录页面
        this.handleToPageLogin(params);
      }
    }
  },
  // 判断后续登录回调函数是否有非匿名的回调配置有就跳转到登录页面，没有就回调登录失败
  silentLoginFail(params, error_msg) {
    const { xcxLoginParamsQueue } = this.globalData;
    const item = xcxLoginParamsQueue.filter(item => !item.disable);
    if(item && item.length) {
      // 跳转到登录页面
      this.handleToPageLogin(params);
    } else {
      wx.event.emit('xcxLogin', { success: false, data: { error_msg }});
    }
  },

  // 静默登录
  async xcxSilentLogin(){
    try {
      // 如果有ttk,使用ttk尝试获取用户登录信息
      const tempToken = this.getTempToken();
      if(tempToken){
        const result = await this.thirdPartyAutoLogin(tempToken);
        if(result) {
          // 格式化返回数据并存储到本地
          this.handleUnionIdProcess(result);
          // 如果有设备注册信息也重新注册一下
          this.handleDeviceInfoUpdate(result.deviceRegisterInfo);
          return this.formatSilentLoginData(result);
        }
        return false;
      } else {
        // 没有的话尝试只使用code获取用户信息
        const wxLoginResult = await this.getWxLoginCode();
        const params = {
          code: wxLoginResult.code,
          userInfo: null,
          showLoading: false
        };
        const result = await this.thirdPartyAuthorization(params);
        // 处理数据，设置登录信息
        if(result) {
          // 格式化返回数据并存储到本地
          this.handleUnionIdProcess(result);
          // 如果有设备注册信息也重新注册一下
          this.handleDeviceInfoUpdate(result.deviceRegisterInfo);
          return this.formatSilentLoginData(result);
        }
        return false;
      }
    } catch (error) {
      // 上报错误
      wx.event.emit('xcxLogin', { success: false, data: { error_msg: error.toString() }});
      wx.Logger.report(error.toString(), 'xcxSilentLogin');
      return false;
    }
  },

  // 格式化静默登录的返回信息
  formatSilentLoginData(data){
    const {utk, ntk, ttk, vipInfo, userInfo, discount, vipType} = data;
    return {
      token: utk,
      userToken: utk,
      tempToken: ttk,
      userInfo,
      vipInfo: {
        discount     : discount,
        discountLevel: vipInfo?.discountLevel,
        vipInfo      : vipInfo,
        vipType      : vipType || '',
      },
      ntk
    };
  },

  /**
     * xcx登录成功
     * @param {* Object} params 原始调用参数
     * @param {* Object} loginData 登录成功后的登录信息
     */
  xcxLoginSuccess(params, loginData) {
    /**
         * 当前是登录页就返回再执行回调，否则有回调方法再执行回调方法,
         * 老代码通过判断是否是redirectType !== 'redirectTo'类型
         */
    if (this.isLoginPage()) {
      wx.navigateBack({
        delta: 1,
        complete: () => {
          setTimeout(() => {
            this.handleLoginSuccessCallback(params, loginData);
          }, 0);
        }
      });
    } else {
      this.handleLoginSuccessCallback(params, loginData);
    }
  },
  // 执行成功的回调
  handleLoginSuccessCallback(params, loginData) {
    try {
      const { success, complete, redirectType, redirectURL } = params;
      redirectURL && this.handleToRedirectURL(redirectURL, redirectType);
      success && success(loginData, { login: true });
      // 不管成功还失败皆执行的回调
      complete && complete(loginData, { login: true });
    } catch (error) {
      wx.Logger.report(error.toString(), 'handleSuccessCallback');
    }
  },
  // 如果有重定向URL进行跳转操作
  handleToRedirectURL(redirectURL = '', redirectType = 'redirectTo') {
    redirectURL && wx[redirectType]({
      url: redirectURL
    });
  },
  // xcx静默登录失败
  xcxLoginFail(params, error = '') {
    const { fail, complete } = params;
    try {
      // 失败回调
      fail && fail(error, { login: false});
      // 不管成功还失败皆执行的回调
      complete && complete(error, { login: false});
    } catch (error) {
      wx.Logger.report(error.toString(), 'xcxLoginFail');
    }
  },


  /**
     * 手动跳转到登录页面 /pages/login/login
     */
  handleToPageLogin(params) {
    if(this.isLoginPage()) {
      return false;
    }

    const {
      redirectType,
      entryBefore,
      entryAfter,
      query
    } = params;
    // 执行回调
    entryBefore && entryBefore();
    // 跳转至登陆页面
    // 获取跳转地址
    const URL  = '/' + LOGIN_PATHS + (query ? `?${query}` : '');
    // 默认以新窗口打开
    wx[redirectType || 'navigateTo']({
      url     : URL,
      complete: event => entryAfter && entryAfter(event)
    });
  },
  // 监听登录页面登录完成事件
  onXcxLoginComplete(event) {
    const { xcxLoginParamsQueue } = this.globalData;
    while(xcxLoginParamsQueue.length) {
      const params = xcxLoginParamsQueue.shift();
      // 成功
      if(event.success) {
        this.xcxLoginSuccess(params, event.data);
      } else {
        // 失败
        this.xcxLoginFail(params, event.data);
      }
    }
  },
};
