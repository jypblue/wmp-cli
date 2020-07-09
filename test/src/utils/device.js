
// 生成首位不为0的15位随机数
export function createDeviceId(){
  // 生成首位不为0的15位随机数
  const deviceId = Math.ceil(Math.random() * 9)
  + Math.random().toString().slice(2, 16);
  // 写入本地
  wx.setStorageSync('_did', deviceId);

  return deviceId;
}

// 获取did
export function getDeviceId(){
  // 如果本地不存在did，则重新生成 did
  return wx.getStorageSync('_did') || createDeviceId();
}
