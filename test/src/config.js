const SDKAPPID = process.env.MODE === '__DEV__' ? 1400321408 : 1400293760;
const domain = process.env.DOMAIN;
export default {
  AID: 5, // 项目id
  PARTNERID: 'wechat_mini_program',
  SUBSCRIBE_APPID: 'wxc1f15f2ca2904279',
  GHID: 'gh_1770c4973780',
  UPDATEVERSION: 'v3.3.9.13',
  CHANNEL: 365,
  TITLE: '一条',
  SHORTTITLE: '一条',
  SDKAPPID,
  domain,
  host: 'https://api' + domain + '.yit.com',
};
