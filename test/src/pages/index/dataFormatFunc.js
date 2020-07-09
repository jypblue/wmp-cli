
import { getQueryString } from 'utils/util';

function getModuleDataEntityList(bodyData) {
  const subModuleDataItem = bodyData?.subModuleDataList[0] || {};
  const { entityList = [] } = subModuleDataItem;
  return entityList;
}

function getModuleDataEntityItem0(bodyData){
  const entityList = getModuleDataEntityList(bodyData);
  const entity = entityList.length ? entityList[0].entity : {};
  return entity;
}

export function formatH5NavV1(bodyData) {
  const entity = getModuleDataEntityItem0(bodyData);
  const { navigations = [] } = entity;

  return navigations.map(item => {
    const {
      normalImgUrl,
      selectedImgUrl,
      h5link,
      h5Link,
      title,
      _vid
    } = item;
    const identity = getQueryString(h5Link, '_activity') || 'index';
    return {
      identity,
      normalImgUrl,
      selectedImgUrl,
      h5link,
      h5Link,
      title,
      _vid
    };
  });
}


export function formatH5SearchBar(bodyData) {
  const entity = getModuleDataEntityItem0(bodyData);
  return entity;
}


export function formatH5Slider1(bodyData) {
  const entityList = getModuleDataEntityList(bodyData);
  return entityList.map(item => {
    const {
      h5link,
      h5link2,
      h5link2Name,
      imgUrl,
      index,
      fixed,
      _vid
    } = item.entity;
    return {
      h5link,
      h5link2,
      name: h5link2Name,
      src: imgUrl,
      index,
      fixed,
      _vid
    };
  });
}


export function formatH5NewPersonArea(bodyData) {
  const entity = getModuleDataEntityItem0(bodyData);
  return entity;
}

export function formatH5TimeLimit(bodyData) {
  const entityList = getModuleDataEntityList(bodyData);
  return entityList.map(item => {
    const {
      title,
      subTitle,
      milliSecondToStartVip,
      milliSecondToStart,
      milliSecondToEnd,
      link,
      details
    } = item.entity;
    const subList = details.map(item => {
      const {
        price,
        dailyPrice,
        imageUrl,
        promotionLinkUrl,
        _vid,
        spuId,
        tag
      } = item;
      return {
        price,
        dailyPrice,
        imageUrl,
        promotionLinkUrl,
        _vid,
        spuId,
        tag
      };
    });
    return {
      title,
      subTitle,
      millisecondToStartVip: milliSecondToStartVip,
      millisecondToStart: milliSecondToStart,
      millisecondToEnd: milliSecondToEnd,
      link,
      subList
    };
  });
}
