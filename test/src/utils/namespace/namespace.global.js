// 声明命名空间对象
const namespace = {};

/**
 * 一些工具类的存储
 * @property {string} action_id    所有请求中都会带上, 用于标识op与请求间的关系
 * @property {string} firstPage    用于标识用户打开小程序时的第一个页面
 * @property {string} lastPagePath 最后一个页面的path
 * @property {string} currPagePath 当前页面的path
 * @property {object} app          缓存app对象
 */
namespace.util = {};

/**
 * 微信提供的系统信息
 * @property {object} authSetting 用户操作的授权信息, 比如 是否允许保存图片至相册
 * @property {string} networkType 当前网络类型, 比如: wifi, 4G
 * @property {object} info        微信系统信息 wx.getSystemInfoSync (非原对象, 自已二次处理过)
 * @property {object} systemInfo  微信系统信息
 * @property {string} scene     进入小程序时的场景值
 */
namespace.sys = {};

/**
 * op 埋点
 * @property {array}   url              页面path, 仅存储最新的两个, 当前页面path放在数组第一项
 * @property {string}  cnt_biz_params   当前页面的完整参数
 * @property {string}  base_info        发送埋点时的基础信息
 * @property {string}  pvid             在触发onShow时将会更新此值, 用于标识上报的 op 哪此属于同一个页面行为
 * @property {string}  op               spm串, 具体埋点
 * @property {boolean} buriedRequesting 用于标识formid的发送情况
 * @property {array}   buried           formid列表
 */
namespace.op = {};

/**
 *地址
 * @property {object} wx_address 微信地址
 */
namespace.address = {};

/**
 *订单
 * @property {number} pay_ordernum 支付成功订单号
 */
namespace.order = {};

/**
 * 自定义组件
 * @property {string}  couponAdHeight 返回组件内广告的高度
*/

/**
 * 存储一些对象信息集; 比如页面信息, 入口信息
 * @property {object} entryInfo 用户第一次进入小程序时的信息
 */
namespace.info = {};


/**
 * 仅局限于某一个页面级使用, 但同时会涉及页面的切换跳转
 * @property {object} comment 商品定制描述信息
 */
namespace.page = {};

/**
 * 仅局限于某一个页面级使用, 但同时会涉及页面的切换跳转
 * @property {object} roomSpuList 商品定制描述信息
 */
namespace.room = {};


/**
 * 自定义配制信息 (此命名空间为 utils/config.js 里的值, 目前不做过多变更, 后续可考虑是否移除, 直接从文件中获取)
 * @property {string} version
 */
namespace.config = {};


namespace.comp = {};

/**
 * tim相关
 * @property {Object} timReady
 * @property {Object} communityTimReady     //社区IM初始化
 */
namespace.tim = {};

/**
 * 储存社区-页面一些按钮状态信息
 * @property {Object} postBtnInfo          //社区文章详情页
 * @property {Object} userBtnInfo          //社区个人中心
 * @property {Object} postdelInfo          //社区删除文章
 */
namespace.commbtn = {};

export default namespace;
