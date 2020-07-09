// 声明命名空间对象
const namespace = {};

/**
 * @property {string} wifiAutoPlay wifi下自动播放视频
 */
namespace.setting = {};

/**
 * 用户信息
 *
 * @property {string} openid 用户身份ID
 * @property {string} customerId 用户ID 改为使用userInfo.id
 * @property {string} userInfo 用户信息 原来的customerId改为userInfo.id 存储的格式 { account: "", birthday: "", ... }
 * @property {string} vipInfo 会员信息 ！！！存储格式必须按照示例的格式去存储，缺少字段会导致取值报错！！！ { discount: '', discountLevel: '', vipType: '', vipInfo: { userId: '', isVip: true, ... } }
 * @property {string} userToken
 * @property {string} deviceToken
 * @property {string} _did
 * @property {string} deviceSecret
 * @property {string} tempToken
 * @property {string} csrfToken 验签用的token (旧版字段)
 * @property {Boolean} isNewUser 疫情地图-用户是否点击过分享按钮
 * @property {Boolean} isSubscribeBol 消息页页-本地记录是否不显示关注公众号按钮
 * @property {Boolean} communityFirstTimeBol 用户首次进社区-进入关注页，本地记录
 * @property {Boolean} have_visited_community 用户是否曾经进入过社区，接口获取，保存本地
 */
namespace.user = {};

/**
 *线下店
 *
 * @property {string}  storeTime storeId的更新时间
 * @property {number}  store_id 扫描进入线下店的id
 * @property {number}  storeId 扫描进入线下店点餐页的线下店id
 */
namespace.store = {};

/**
 *引导
 *
 * @property {string}  addXcxDate 添加小程序提示日期
 * @property {boolean} hideOrderListShareGuid 订单列表分享引导
 * @property {boolean} hideOrderDetailShareGuid 订单详情分享引导
 * @property {boolean} searchResultShopGuide 搜索结果页店铺引导
 */
namespace.guide = {};

/**
 *引导
 *
 * @property {object}  pack 新人礼包弹框数据
 * @property {string}  bubble 记录新人礼包页面气泡是否展示过
 * @property {string}  centerClick 记录是否点击个人中心的服务模块
 */
namespace.gift = {};

/**
 *tabbar
 *
 * @property {string}  lastGetTabbarTime tabbar更新时间
 * @property {object}  tabbarData_V2 tabbar数据
 * @property {object}  isShowTabbarChangeQipao tabbar数据
 */
namespace.tabbar = {};

/**
 * 自定义组件
 * @property {string}  couponAdHeight 返回组件内广告的高度
*/

namespace.comp = {};

/**
 * 用于涉及追踪的信息, 比如: 用户行为追踪
 *
 * @property {array}  spms       记录用户最近三次的营销类埋码
 * @property {string} utm        自定义utm追踪信息
 * @property {number} cacheTime  utm的缓存起始时间
 * @property {string} utm_medium 一个特殊的处理. 与 utm 相关
 * @property {string} channel    追踪渠道码
 */
namespace.track = {};


/**
 * 时间相关
 *
 * @property {number} orderScaneTime 点餐扫码入口缓存时间
 */
namespace.time = {};

/**
 * 页面相关
 *
 * @property {number} anchorSpuId 跳转后用来定位的spuid
 */
namespace.page = {};

/**
 * cms相关
 *
 * @property {number} sliderparams 首焦图曝光参数
 */
namespace.cms = {};


/**
 * 社区相关
 */
namespace.community = {};

export default namespace;
