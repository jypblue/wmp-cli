// const app = getApp();

import {
  formatH5NavV1,
  formatH5SearchBar,
  formatH5Slider1,
  formatH5TimeLimit,
  formatH5NewPersonArea
} from './dataFormatFunc';

import {
  getSimpleNativeData,
  getGuessLikeList
} from './api';
import { selectTabBar } from 'utils/util';


Page({
  data:{
    moduleDataList: [],
    duration: 300,  // swiper-item 切换过渡时间
    categoryCur: 0, // 当前数据列索引
    categoryMenu: [], // 分类菜单数据, 字符串数组格式
    categoryData: [], // 所有数据列
    placeholder: '',
    color: '#ad0e11',
    searchBarFocus: false,
    isH5GuessLikeInit: false
  },
  customData: {
    // 格式化数据的方法Map
    moduleDataFormatFuncMap: {
      h5NavV1: formatH5NavV1,
      h5SearchBar: formatH5SearchBar,
      h5Slider1: formatH5Slider1,
      h5NewPresonArea: formatH5NewPersonArea,
      h5TimeLimit: formatH5TimeLimit
    },
    identity: 'index',
    h5GuessLikeList: [],
    fallsListComponent: null,
  },
  onLoad(options) {
    this.pageInit(options);
  },
  onShow() {
    selectTabBar(this, 0, true);
  },
  onReady() {},
  onHide() {},
  onUnload() {},
  pageInit(options) {
    console.log(options);
    wx.showShareMenu();
    this.initSimpleNativeData();
  },

  // 初始化cms组件方法
  async initSimpleNativeData() {
    const res = await getSimpleNativeData();
    if(res) {
      const moduleDataList = this.formatModuleDataList(res.moduleDataList);
      console.log(moduleDataList);
      const h5NavV1 = this.getArrayTargetItem(moduleDataList, 'h5NavV1');
      this.setCategoryData(h5NavV1);
      const h5SearchBar = this.getArrayTargetItem(moduleDataList, 'h5SearchBar');
      this.setSearchBarData(h5SearchBar);

      // 可以优化为一次初始化setData
    }
  },
  // 格式化模块数据信息
  formatModuleDataList(moduleDataList) {
    const { moduleDataFormatFuncMap } = this.customData;
    return moduleDataList.map(item => {
      const { type, bodyData }  = item;
      const dataFormatFunc = moduleDataFormatFuncMap[type];
      if(dataFormatFunc) {
        const newData = dataFormatFunc(bodyData);
        return {
          type,
          data: newData
        };
      } else {
        return item;
      }
    });
  },

  // 获取数组目标item
  getArrayTargetItem(arr, type) {
    const index = arr.findIndex(item => item.type === type);
    if(index > -1) {
      return arr.splice(index, 1);
    }
    return [];
  },

  // 设置顶部搜索数据
  setSearchBarData(h5SearchBar) {
    const searchBar = h5SearchBar && h5SearchBar.length ? h5SearchBar[0].data : {};
    const { placeholder = '搜索一万件好东西'} = searchBar ;
    this.setData({
      placeholder
    });
  },

  // 设置categoryMenu
  setCategoryData(h5NavV1) {
    const menus = h5NavV1 && h5NavV1.length ? h5NavV1[0].data : [];
    const categoryData = [];
    const categoryMenu = [];

    menus.forEach((item, index) => {
      const {
        title,
        normalImgUrl,
        selectedImgUrl,
        identity
      } = item;
      categoryMenu.push({
        title: title.replace("&amp;", "&"),
        image: normalImgUrl,
        imageActive: selectedImgUrl,
        identity
      });
      categoryData.push({
        id: item.id || index,
        categoryCur: index, // 当前tab index
        requesting: false,
        end: false, // 是否触底
        emptyShow: false, // 是否为空
        listData: [], //当前tab 数据
      });
    });

    this.setData({
      categoryMenu,
      categoryData
    });

    // 第一次加载延迟 350 毫秒 防止第一次动画效果不能完全体验
    setTimeout(() => {
      this.refreshTabPane();
      this.initGuessLikeData();
    }, 350);
  },

  // 设置模块数据
  setModuleDataList(moduleDataList) {
    this.setData({
      moduleDataList
    });
  },
  // 获取当前激活页面的数据
  getCurrentData() {
    return this.data.categoryData[this.data.categoryCur];
  },
  // 更新当前页面数据
  setCurrentData(currentCur, pageData) {
    const { categoryData } = this.data;
    categoryData[currentCur] = pageData;
    const categoryCurKey = `categoryData[${currentCur}]`;
    this.setData({
      [categoryCurKey]: pageData
    });
  },
  	// 顶部tab切换事件
  toggleCategory(event) {
    console.log(event);
    const { identity } = event.detail.item;
    this.customData.identity = identity;
    this.setData({
      duration: 0
    });
    setTimeout(() => {
      this.setData({
        categoryCur: event.detail.index
      });
    }, 0);
  },
  	// 页面滑动切换事件
  animationFinish(event) {
    console.log(event);
    const { current } = event.detail;
    const { categoryMenu } = this.data;
    const { identity } = categoryMenu[current];
    this.customData.identity = identity;
    this.setData({
      duration: 300
    });
    setTimeout(() => {
      this.setData({
        categoryCur: current
      });
      const pageData = this.getCurrentData();

      if (pageData.listData.length === 0) {
        this.getHomeTabList();
      }
    }, 0);
  },
  // 刷新数据
  refreshTabPane() {
    // const { pageIndex } = this.customData;
    this.getHomeTabList();
  },
  // 加载更多
  loadMoreTabListData() {
    // this.getHomeTabList('more', this.getCurrentData(this.data.categoryCur).page);

    // 如果是首页，请求猜你喜欢数据，进行分页加载，其它页后续优化分数据渲染
    const {categoryCur} = this.data;
    if(categoryCur === 0) {
      this.get1stTabGuessLikeList();
    }
  },
  /**
   * 获取每个tab栏cms组件数据
   * @param {String} type
   * @returns void
   */
  async getHomeTabList() {
    const { identity } = this.customData;
    const currentCur = this.data.categoryCur;
    const pageData = this.getCurrentData();

    if (pageData.end) return;

    pageData.requesting = true;
    this.setCurrentData(currentCur, pageData);

    // 可以优化的点
    // 1. 如果是刷新就获取一下接口，如果是加载更多就处理当前缓存数据，每次放入10条数据
    // 2. 进行数据缓存，在网络不好或者数据请求失败时可以读取前面已有的数据展示

    const res = await getSimpleNativeData(identity);

    if(res) {
      // 格式化cms组件
      const moduleDataList = this.formatCmsModulesData(res.moduleDataList);

      console.log(moduleDataList);
      const listData = moduleDataList || [];
      pageData.requesting = false;
      pageData.listData = listData;
      // 因为首页有猜你喜欢
      pageData.end = currentCur === 0 ? false : true;
      this.setCurrentData(currentCur, pageData);
    }
  },
  /**
   * 格式化cms组件数据
   * 可优化
   * @param {Array} moduleData
   */
  formatCmsModulesData(moduleData) {
    const moduleDataList = this.formatModuleDataList(moduleData);
    // 剔除顶部数据组价
    // 可以优化
    ['h5NavV1', 'h5SearchBar', 'h5GuessLike'].forEach(type => {
      const index = moduleDataList.findIndex( item => item.type === type);
      if(index > -1) {
        moduleDataList.splice(index, 1);
      }
    });
    return moduleDataList;
  },
  tapCmsModule() {
    console.log('tap cms module ');
  },
  // input 点击
  handleSearchInputClick() {
    this.setData({
      searchBarFocus: true
    });
  },
  // 初始化猜你喜欢数据
  async initGuessLikeData() {
    const { h5GuessLikeList } = this.customData;
    const res = await getGuessLikeList();
    if(res) {
      const entityList = res.dynamicEntityList;
      const h5GuessLikeData = [].concat(h5GuessLikeList, entityList);
      // 组装猜你喜欢的数据结构然后加入
      this.setData({
        isH5GuessLikeInit: true,
      },()=>{
        this.startFallsList(entityList);
      });

      this.customData.h5GuessLikeList = h5GuessLikeData;
    }
  },
  // 获取猜你喜欢的数据
  async get1stTabGuessLikeList() {
    const { h5GuessLikeList } = this.customData;
    const pageData = this.getCurrentData();
    const res = await getGuessLikeList();
    if(res) {
      const entityList = res.dynamicEntityList;
      const h5GuessLikeData = [].concat(h5GuessLikeList, entityList);
      // 组装猜你喜欢的数据结构然后加入
      if(h5GuessLikeList.length) {
        this.appendFallsList(entityList);
      } else {
        this.startFallsList(entityList);
      }

      pageData.end = res.hasMore ? false : true;
      this.customData.h5GuessLikeList = h5GuessLikeData;
      this.setCurrentData(0, pageData);
    }
  },
  async startFallsList(items) {
    // 通过ID，获取组件实例
    this.customData.fallsListComponent = this.selectComponent('#homeFallsList');
    // 调用组件的start函数，渲染瀑布流
    const res = await this.customData.fallsListComponent.start(items);
    console.log('start render completed:', res);
  },
  async appendFallsList(items) {
    const res = await this.customData.fallsListComponent.append(items);
    console.log('append render completed:', res);
  }
});
