import { VantComponent } from '../vant/common/component';

const app = getApp();

VantComponent({
  props: {
    event: {
      type: Object,
      value: null,
      observer(val){
        if(val){
          this.init(val);
        } else {
          this.$emit('complete', { success: false});
        }
      }
    },
    type: {
      type: String,
      default: 'AUTH_USER_INFO', // 昵称登录授权：AUTH_USER_INFO / 手机号登录： PHONE_BINDING
    },
    redirectType: {
      type: String,
      default: 'navigateTo',
    },
    zIndex: {
      type: Number,
      value: 100
    },
    overlay: {
      type: Boolean,
      value: true
    },
    closeOnClickOverlay: {
      type: Boolean,
      value: false
    }
  },
  data:{
    isBindPhoneShow: false,
    userInfo: null,
    nickName: '',
    userId: '',
    mobileToken: '',
  },
  methods: {
    // 是否绑定登录
    hasLogin() {
      return wx.getStorageUser('userToken') || wx.getStorageSync('userToken') || '';
    },
    // 是否授权
    hasAuthorized() {
      return wx.getStorageUser('ntk') || '';
    },
    // 是否含有tempToken
    hasTempToken() {
      return wx.getStorageUser('tempToken') || '';
    },
    // 初始化
    init(event) {
      const { type } = this.data;
      switch(type) {
        case 'AUTH_USER_INFO': // 授权头像昵称
          this.wxAuthLogin(event);
          break;
        case 'PHONE_BINDING': // 绑定手机号
          this.wxPhoneBind(event);
          break;
        default:
          // 做个异常提示
          console.error('参数传递错误，昵称登录授权：AUTH_USER_INFO ；手机号登录： PHONE_BINDING');
          wx.Logger.report('参数传递错误，主动触发登录未传递登录类型参数！昵称登录授权：AUTH_USER_INFO ；手机号登录： PHONE_BINDING');
          break;
      }
    },
    // 微信登录授权
    async wxAuthLogin(event){
      try {
        if(this.hasLogin() || this.hasAuthorized()) {
          this.$emit('complete', { success: true });
        } else {
          const res = await app.handleWxAuthLogin(event);
          if(res.success) {
            this.$emit('complete', { success: true });
          } else {
            this.$emit('complete', { success: false });
          }
        }
      } catch (error) {
        console.error(error);
        wx.Logger.report(error.toString(), 'function wxAuthLogin');
      }
    },
    // 微信手机号绑定
    async wxPhoneBind(event) {
      try {
        // 如果已经登录了直接返回
        if(this.hasLogin()) {
          const loginData = app.getLoginDataFromStorage();
          this.$emit('complete', { success: true, data: loginData });
        } else if(this.hasAuthorized()) {
          // 如果之前已经授权过且本地有tempToken，直接弹出绑定手机号的授权弹窗
          this.setData({
            isBindPhoneShow: true
          });
        } else {
          // 都没有就直接从头走一遍授权绑定流程
          const res = await app.handleWxAuthLogin(event);
          // 要做一下判断如果有utk了直接返回，有ntk了调用绑定手机号
          if(res.success && res.data.ntk) {
            this.setData({
              isBindPhoneShow: true
            });
          } else {
            wx.Logger.report('wxPhoneBind主动触发手机绑定时，微信昵称授权失败');
          }
        }
      } catch (error) {
        console.error(error);
        wx.Logger.report(error.toString(), 'function wxPhoneBind');
      }
    },
    // 绑定成功
    handleLoginSuccess(res) {
      const data = app.formatSilentLoginData(res);
      this.setData({
        isBindPhoneShow: false
      });
      this.$emit('complete', { success: true, data});
    },
    // 绑定失败
    handleLoginFailure() {
      this.setData({
        isBindPhoneShow: false
      });
      this.$emit('complete', { success: false, data: {
        error_msg: 'PHONE_BINDING_FAIL'
      }});
    },
    // 拒绝绑定
    handleBindPhoneCancel() {
      this.handleLoginFailure();
    },
    // 允许绑定
    handleBindPhoneConfirm(event) {
      console.log(event.detail);
      const detail = event.detail;
      // 如果选择的拒绝, 则直接返回不作任何操作
      if (detail.errMsg === 'getPhoneNumber:ok') {
        // 获取绑定状态
        this.handleWxAndPhoneBind(detail);
      }
    },

    // 执行绑定手机号操作
    async handleWxAndPhoneBind(detail) {
      try {
        const ttk = this.hasTempToken();
        const result = await this.mobileHasUser(detail, ttk);
        if(!result || Object.keys(result).length === 0) {
          this.handleLoginFailure();
          wx.Logger.report('mobileHasUser no result');
          // 上报接口调用失败
          return false;
        }

        const { state, mobileToken } = result;
        if(state === 'JUMP_LOGIN') {
          // 能绑定，需要自己确认文字
          wx.setStorageUser('wxBindFail', JSON.stringify(result));
          this.handleLoginFailure();
          wx[this.data.redirectType || 'navigateTo']({
            url: '/pages/login_bind_fail/login_bind_fail'
          });
        } else if(state === 'DIRECT_BINDING'){
          // 可以直接绑定
          this.handleThirdPartyBind(mobileToken, ttk);
        }
      } catch (error) {
        console.log(error);
        this.handleLoginFailure();
        wx.Logger.report(error.toString(), 'function handleWxAndPhoneBind');
      }
    },

    // 手动调用第三方绑定
    async handleThirdPartyBind(mobileToken, curTtk) {
      try {
        const res = await this.thirdPartyBind(mobileToken, curTtk);
        if(res) {
          // 处理返回数据
          app.handleUnionIdProcess(res);
          this.handleLoginSuccess(res);
        } else {
          this.handleLoginFailure();
        }
      } catch (error) {
        console.log(error);
        wx.Logger.report(error.toString(), 'function handleThirdPartyBind');
      }
    },
    // 手机号绑定验证
    async mobileHasUser(data, ttk) {
      try {
        const encryptedData = data.encryptedData;
        const iv = data.iv;
        const params = {
          url: 'user.mobileHasUser',
          data: {
            ttk,
            xcxRequest: {
              encryptedData,
              iv
            }
          },
          showLoading: true
        };

        const res = await app.$fetch(params);
        if(res.error_num === 0) {
          // 新版登录成功
          return res.content;
        } else {
          wx.showToast({
            title: res.error_info,
            duration: 2000,
            icon:'none'
          });
          return false;
        }
      } catch (error) {
        console.log(error);
        wx.Logger.report(error.toString(), 'user.mobileHasUser');
        return false;
      }
    },
    // 调用三方绑定接口
    async thirdPartyBind(mobileToken, curTtk) {
      try {
        const params = {
          url: 'user.thirdPartyBind',
          data: {
            curTtk,
            mobileToken
          }
        };
        const res = await app.$fetch(params);
        console.log(res);
        if (res.error_num === 0) {
          const data = res.content;
          console.log('phone bind success:', data);
          return data;
        } else {
          wx.showToast({
            title: res.error_info,
            duration: 2000,
            icon:'none'
          });
          return false;
        }
      } catch (error) {
        console.log(error);
        wx.Logger.report(error.toString(), 'user.thirdPartyBind');
        return false;
      }

    },
  }
});
