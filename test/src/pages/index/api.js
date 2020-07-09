import $fetch from 'utils/request';


// 获取cms组件数据接口
export async function getSimpleNativeData(identity = 'index') {
  try {
    const url = wx.getGlobalUtil('currPagePath') || '';
    const params = {
      url: 'node_cms.getSimpleNativeData',
      data: {
        identity,
        guessLikeParams: {
          tabId: 1,
          sessionId: Number(new Date()),
          url
        },
        extension: {
          sliderParamsList: []
        },
      }
    };
    const res = await $fetch(params);
    if (res.state.code === 0) {
      const data = res.data;
      return data;
    } else {
      return null;
    }
  } catch(error) {
    return Promise.reject(error);
  }
}

// 获取猜你喜欢数据
export async function getGuessLikeList() {
  try {
    const currPagePath = wx.getGlobalUtil('currPagePath');
    const params = {
      url: 'node_homePage.getPageData',
      data: {
        numberPush: 20,
        tabId: 1,
        sessionId: Number(new Date()),
        paramsEx: {

        },
        url: currPagePath
      }
    };
    const res = await $fetch(params);
    if (res.state.code === 0) {
      const data = res.data;
      console.log(data);
      return data;
    } else {
      console.log(res);
      return null;
    }
  } catch(error) {
    return Promise.reject(error);
  }
}
