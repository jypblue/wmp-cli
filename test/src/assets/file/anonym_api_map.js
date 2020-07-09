module.exports = [
  "auctionClient.getAuctionActivityBaseInfo",
  "auctionClient.getBidRuleConfig",
  "auctionClient.getLotAuctionInfo",
  "auctionClient.getLotGroup",
  "auctionClient.queryAuctionBidRecords",
  "auctionClient.queryAuctionSkuState",
  "auctionClient.queryDepositPayingInfo",
  "cart.addToCart",
  "cart.getCartSpuInfoBySpuIds",
  "cms.getNativeData",
  "cms.getSubMData",
  "cms.getPrdsByCatOrderByConversion",
  "coupon.getCouponRelatedProductInfoV2",
  "coupon.getNewUserCouponInfo",
  "coupon.queryUserCouponInfoByCodeForCelebration",
  "coupon.shouldPopup",
  "coupon.queryUserCouponInfoByCodeList",
  "coupon.renderLotteryPage",
  "coupon.queryOrderingCouponBySpuIds",
  "coupon.queryUnusedAppNewUserCouponAmount",
  "fcategoryV3Client.getFCategoryClient",
  "fcategoryV3Client.getFCategoryRecommend",
  "fcategoryV3Client.getFCategoryTagClient",
  "fcategoryV3Client.getFCategoryLevelOneList",
  "fullspu.getSpuById",
  "footprints.showUserFootprints",
  "footprints.getUserFootprintsNum",
  "ladderGroup.getLadderGroupEntranceList",
  "ladderGroup.getLadderGroupSpuDetail",
  "ladderGroup.getLadderGroupShareInfo",
  "media.processSegment",
  "mixer.ProductMixer",
  "orderActivity.getActivityInCartInfo",
  "orderActivity.getActivityProductInfo",
  "orderActivity.getOneDayFlashSaleInfo",
  "orderActivity.getSpuPromotionDetailBySpuId",
  "orderActivity.getSpuPromotionSummaryBySpuId",
  "orderActivity.getAllFlashSaleInfoV2",
  "orderActivity.getFlashSaleShareConfig",
  "orderActivityV3.getProductGiftActivityInfo",
  "payment.requestWeixinXcxPayV2",
  "productHttp.getProductInfo",
  "orders.getFriendGiftShareDetail",
  "orders.hasFriendGift",
  "product.getStockPrice",
  "product.getStockPriceV3",
  "product.getProductInfoWithModulesV2",
  "productHttp.getProductDetailV2",
  "productHttp.getProductDetailV3",
  "productHttp.getProductDetailV4",
  "productRec.getLatestBestSalesProductIntPriceList",
  "productRec.getRecommendProductIntPriceList",
  "productRec.getSimilarProduct",
  "recommendation.getRecommendProductListV2",
  "recommendation.getLatestBestSalesProductListV2",
  "restrictions.getRestrictionDescription",
  "recommendation.getRecommendProductListPagination",
  "search.getDefaultSearchWord",
  "search.getHotQueriesV2",
  "search.searchItem",
  "search.clientProductSearchV2",
  "node_search.brandProducts",
  "search.querySuggestion",
  "search.searchForFCategoryV2",
  "secondFloor.getTodayVideo",
  "secondFloor.getVideoRelateSpuList",
  "secondFloor.getHistoryVideoList",
  "secondFloor.getVideoDetail",
  "secondFloor.getRecommendVideoListByVideoId",
  "secondFloor.getStartPageInfo",
  "secondFloor.addVideoPlayCount",
  "secondFloor.listVideoRelateSpuWithPrice",
  "storing.getValue",
  "trial.getTrialProductDetail",
  "trial.getTrialProductPendingCount",
  "trial.addReview",
  "trial.getReviewDetail",
  "trial.getReviewList",
  "trial.getSpuReviewList",
  "trial.getWinnerList",
  "trial.getTrialProductCenter",
  "trial.getPreviousTrialProductPage",
  "trial.acceptAgreement",
  "trial.getTrialProductDetailByOriginalSpuId",
  "trial.getReviewListV2",
  "trial.getTrialEffectiveProduct",
  "time.getServerTime",
  "user.getAppABTestConfig",
  "vendor.getCurrentChannelAnnouncement",
  "vip.getPersuadeCopyWriting",
  "vip.getVipInfoV2",
  "vip.getVipShareConfig",
  "user.getBanner",
  "user.getBannerV2",
  "user.miniProgramLogin",
  "user.miniDeviceRegister",
  "user.downSmsCode",
  "user.webLogin",
  "urdm.getResourceContent",
  "user.partnerLogin",
  "user.partnerXcxLogin",
  "user.partnerXcxBind",
  "user.partnerBind",
  "user.autoLoginV2",
  "groupBuy.getGroupBuyActivityInfo",
  "groupBuy.getSkuStocksBySpu",
  "groupBuy.getQuickGroupBuyByActivityId",
  "price.batchGetCurrentPriceAndGroupConfigByTime",
  "price.batchGetGroupPriceByTimeFromLV2Cache",
  "user.partnerAuthNotify",
  "notification.saveFormId",
  "coupon.getProductCouponInfoV2",
  "orderActivityV3.getProductActivityInfo",
  "orderActivityV3.getProductFlashSaleDetailV2",
  "vip.getVipExperienceDays",
  "qrcode.getPath",
  "faq.addFeedback",
  "faq.findFaqsByCategoryId",
  "faq.getDetail",
  "faq.listAll",
  "orders.getOrderDetailByScanQrCode",
  "user.loginByUserId",
  "userRec.getCategoryRecommendIntPriceProductList",
  "userRec.getRecommendIntPriceListForCart",
  "userRec.getRecommendIntPriceProductList",
  "userRecommendation.showUserFootprints",
  "userRecommendation.getUserFootprintsNum",
  "userRecommendation.delUserFootprints",
  "coupon.shouldPopupV3",
  "fcategorynewclient.getFCategoryNewClient",
  "fcategorynewclient.getFCategoryNewClientSearch",
  "search.searchForFCategory",
  "coupon.shouldPopupV2",
  "orders.getMyLuckBag",
  "search.searchForFCategory",
  "ad.getAdList",
  "coupon.shouldPopupV2",
  "groupBuy.getShareInfo",
  "groupBuy.getGroupDetailV2",
  "groupBuy.getMoreGroupBuyWithoutLimitV2",
  "groupBuy.getQuickGroupBuyListV2",
  "orders.getMyLuckBag",
  "ad.removeAd",
  "ad.getAdListFilterTime",
  "orders.getDefaultGreeting",
  "qrcode.getMiniCodeByTypeAndWechatAppType",
  "brand.getBrandAndProductCount",
  "restrictions.getProductDetailRestrictionInfo",
  "yitShopContentService.getDailyNewDeals",
  "yitShopContentService.getPostDetail",
  "yitShopContentService.getRecommendDeals",
  "yitShopContentService.getRecommendDealsWithSpm",
  "topicSearch.searchRelatedTopicList",
  "yitShopContentService.sharePost",
  "yitShopContentService.getYitTopic",
  "yitShopContentService.getCommentLikedSorted",
  "orderActivityV3.getPromotionBrandDetail",
  "orderActivityV3.getPromotionBrandList",
  "orders.getCommentInProductDetail",
  "orders.commentStatistic",
  "orders.queryComment",
  "coupon.getProductCouponInfoV3",
  "shareVipActivity.getResentShareVipActivity",
  "vip.getSharerInfo",
  "collectThumb.getCollectThumbActivity",
  "collectThumb.getUserCollectThumbDetail",
  "collectThumb.getCollectThumbRule",
  "cateringMenu.getCateringMenuListV2",
  "store.getStoreById",
  "product.getProductFromKVById",
  "orderActivity.getOrderingActivityProductInfo",
  "userRec.getRecommendIntPriceProductList",
  "groupBuy.getGroupBuyPromotionListByState",
  "groupBuy.addGroupBuyAppoint",
  "groupBuy.cancelGroupBuyAppoint",
  "userRec.getNewUserCategoryList",
  "userRec.getNewUserRecommendList",
  "groupBuy.getGroupBuyProductInfo",
  "cms.getPromotionCode",
  "groupBuy.getMoreGroupBuyWithoutLimitV2",
  "groupBuy.getGroupDetailV2",
  "productRec.getRecommendListForLikeCollectionV2",
  "preSaleActivity.getPreSaleActivitySpuDetail",
  "payment.requestWeixinXcxTgyxPay",
  "secondFloor.listPostByAggregateDate",
  "coupon.getIncreaseGift",
  "ladderGroup.getLadderGroupEntranceList",
  "payment.requestWeixinXcxTgyxPay",
  "groupBuy.getNewUserGroupBuyList",
  "user.checkSmsCode",
  "ladderGroup.getLadderGroupComponentInfo",
  "preSaleActivity.getPreSaleShareInfo",
  "ladderGroup.deleteLadderGroup",
  "sharingV2.requestSharing",
  "collectThumb.getProductCollectThumbInfo",
  "share.getShareSetting",
  "crowdfunding.getCrowdfundingInfoBySpuIdOrProjectId",
  "crowdfunding.getRewardListBySpuIdOrProjectId",
  "crowdfunding.getRelatedCrowdfundingsBySpuIdOrProjectId",
  "crowdfunding.getCrowdfundingResultPageInfo",
  "newSupplier.getSupplierBusinessLicenseUrl",
  "trial.getTrialProductForCms",
  "user.getXcxUpgradeSetting",
  "yitShopCommentService.getCommentLikedSorted",
  "amClient.getEffectiveActivityInfo",
  "userRec.updateUserUnlikeGroupAndRefill",
  "newAnnouncement.getChannelAnnouncementInfo",
  "newAnnouncement.getGlobalAnnouncementInfo",
  "node_fcategoryV3Client.getFCategoryClient",
  "node_fcategoryV3Client.getFCategoryRecommend",
  "ad.getJaguarSpuListFemale",
  "ad.getJaguarSpuListMale",
  "ad.getJaguarTopSpuList",
  "ad.getJaguarVideoUrl",
  "user.getResource",
  "amClient.getBrandGatherBannerList",
  "amClient.getBrandGatherDetail",
  "amClient.getBrandGatherHotList",
  "amClient.getBrandGatherList",
  "amClient.getBrandGatherRecommendList",
  "amClient.getFlashSaleBannerList",
  "amClient.getPlayMethodBanner",
  "orderActivityV3.getBrandBarrage",
  "fcategorynewclient.getYooxFCategoryNewClient",
  "combo.checkComboEffective",
  "combo.getComboDetailInfo",
  "combo.getComboSkuInfo",
  "combo.queryComboInfoListV2",
  "combo.queryComboInfoListForProductDetail",
  "mixer.comboSpuOptionMixer",
  "riskControlData.verifySliderCode",
  "user.getAddressFileBaseUrl",
  "yitShopContentService.getRecommendDealsWithSpmV2",
  "clusterSubject.getClusterSubjectDetail",
  "lifePost.getSpecialDetail",
  "lifePost.getPostByTag",
  "lifePost.getContentProviderIndex",
  "lifePost.getLifePostList",
  "lifePost.getTopicTalkResult",
  "lifePost.myTopicTalk",
  "lifePost.getRecommendPostByPostId",
  "lifePost.getUgcDetail",
  "node_lifePost.getArticleDetails",
  "node_lifePost.getTopicInfo",
  "node_lifePost.getTopicPostList",
  "search.searchFCategoryWithFacet",
  "node_search.searchFCategoryWithFacet",
  "search.getFCategoryProductCount",
  "search.clientProductSearch",
  "node_search.clientProductSearch",
  "search.getClientProductSearchCount",
  "secondFloor.getVideoDetailV2",
  "secondFloor.getRecommendVideoListByVideoIdV2",
  "secondFloor.listPostByAggregateDateV2",
  "yitShopContentService.getPostDetailV2",
  "sharing.feedbackSharingResult",
  "cms.getSubModuleData",
  "userRec.getFirstPageRecommendList",
  "orderActivity.getGiftActivityInCartInfo",
  "orderActivity.getGiftActivityProductInfo",
  "secondFloor.userSubscribe",
  "secondFloor.checkUserSubscribe",
  "trial.getOriginalSpuReviewList",
  "urdm.getResourceContent",
  "search.getHotQueriesV3",
  "urdm.notInterestMaterial",
  "secondFloor.getVideoListResult",
  "yitShopContentService.getLikeList",
  "userRec.getRecommendProductByScene",
  "userRec.getRecommendProductByScene",
  "crowdfunding.getGoingCrowdfundingInfoList",
  "crowdfunding.getEndedCrowdfundingInfoList",
  "footprints.isValidForRecommendation",
  "storeProduct.getTotalStock",
  "node_product.getProductDetailFirst",
  "node_product.getProductDetailV2",
  "node_article.getArticleDetails",
  "node_activityNotify.addActivityNotify",
  "node_activityNotify.cancelActivityNotify",
  "node_tagRelate.getTagRelateList",
  "node_auctionClient.cancelRemind",
  "node_auctionClient.addRemind",
  "user.partnerLoginFirstLanding",
  "store.getNearestStoreListByPosition",
  "activityNotify.cancelActivityNotify",
  "activityNotify.addActivityNotify",
  "share.batchImageSharing",
  "shorturl.getPageUrl",
  "coupon.getUserCardCenterList",
  "coupon.getCartCardInfoList",
  "trade.orderPersuadeVip",
  "node_product.getImageList",
  "vip.getPersonalCenterCopyWriting",
  "vip.getVipEquities",
  "node_vip.buyVipResult",
  "node_product.vipBuyProductList",
  "node_trial.getReviewDetail",
  "node_tagRelate.buyRecommendList",
  "node_tagRelate.getTagRelateListV2",
  "node_userRec.getGuessLikeList",
  "node_userRec.dislikeEntityAndRefill",
  "cms.getNativeDataV2",
  "node_cateringMenu.getSkusAndOptions",
  "vip.activateVipCard",
  "wechat.codeDecrypt",
  "vip.vipWillExpired",
  "orderActivity.getAllFlashSaleInfoV3",
  "share.getShareSettingV2",
  "sharing.feedbackSharingResult",
  "user.getInstantNoodlesActivityInfo",
  "search.orderMakeUpSearch",
  "amClient.getPlayMethodLiteInfo",
  "node_search.orderMakeUpSearch",
  "node_user.userCenter",
  "livevideo.getLiveRoomList",
  "node_homePage.getPageData",
  "node_cms.getActivityNativeData",
  "node_cms.getIndexNativeData",
  "node_product.getProductGroupDetail",
  "livevideo.getLiveRoomTinyList",
  "notification.getTempIdsByBusinessCodes",
  "node_supplierShop.batchGetShopInfoByShopIds",
  "node_search.searchFCategoryV4",
  "node_fcategoryV4Client.getFCategoryV4",
  "node_product.getSkus",
  "covidSubscription.beFriend",
  "covidSubscription.bless",
  "covidSubscription.comfort",
  "covidSubscription.getUserByArea",
  "covidSubscription.getUserInfo",
  "covidSubscription.reportSafe",
  "covidSubscription.saveUserInfo",
  "coronavirusSearch.getCurrentCoronavirusStats",
  "coronavirusSearch.getListNearestCases",
  "coronavirusSearch.getNearByCases",
  "covidSubscription.getShareWords",
  "notification.adjustBusinessCodeAuthInfoWithOpenId",
  "coronavirusSearch.getCaseByArea",
  "covidSubscription.getUserLocation",
  "covidSubscription.subscribeNotify",
  "coronavirusSearch.getLocationDetailStat",
  "covidSubscription.getAddress",
  "covidSubscription.switchShowLocation",
  "node_search.clientShopSearch",
  "node_social.userCenter",
  "node_social.userCenterContent",
  "node_social.userCenterSpuList",
  "follow.followEntity",
  "socialTopic.getUserParticipatedTopicList",
  "socialDomain.getDomainList",
  "node_social.userTopicList",
  "node_social.getPostDetailV3",
  "node_social.similarContentBaseOnContent",
  "node_social.getMessageInfo",
  "node_social.getOneLevelDiscoveryPageInfo",
  "node_social.getOneLevelFollowPageInfo",
  "node_social.getDiscoverFeeds",
  "node_social.getUserFolloweePostList",
  "node_social.officialRecommend",
  "socialTopic.getTopicDetail",
  "socialTopic.getTopicPostList",
  "socialTopic.getTopicArticleList",
  "search.clientProductSearch",
  "socialSearch.topicSearch",
  "node_social.bigCastRecommend",
  "node_social.outstandingAccountRecommend",
  "node_social.getTopicDetailV2",
  "node_social.getTopicPostList",
  "node_social.socialSearch",
  "node_search.clientProductSearch",
  "footprints.showUserRecentBuy",
  "node_social.userTopicList",
  "node_social.getDomainList",
  "node_social.topicSquare",
  "node_social.userRecommendList",
  "socialUser.getUserInfoList",
  "instantMessaging.getImUsersByImUids",
  "node_social.getUserLikeList",
  "socialRec.updateAndGetDislikeAccount",
  "node_social.getFansList",
  "community.reportRead",
  "share.feedbackSharingResult",
  "node_social.getHotTopicList",
  "user.thirdPartyAuthorization",
  "user.mobileHasUser",
  "user.thirdPartyBind",
  "user.thirdPartyAutoLogin",
  "node_social.userCenterSimilarAccount",
  "node_shop.getShopHomeInfoV2",
  "video.submitSnapshotByTimeOffsetTask",
  "video.getVideoInfoByFileIdFromCache",
  "socialUser.getInviteeUserInfo",
  "user.specifiedUserIdBindOver",
  "socialUser.getUserDetail",
  "node_board.getBoard",
  "node_board.getCategory",
  "node_search.clientProductSearchV2",
  "socialUser.getSharerUserInfo",
  "socialTopic.getUserParticipatedTopicList",
  "node_social.getFollowPageInfo",
  "node_product.getCommentsTabList",
  "node_product.getProductComments",
  "socialActivity.getAllAwardList",
  "socialActivity.getOngoingActivity",
  "user.bindWeChatIdAndDeviceId",
  "socialPost.hasFolloweePublishNewPost",
  "socialActivity.getAlreadyUserAwardRecordList",
  "socialUser.showCommunity",
  "node_cms.getSimpleNativeData",
  "node_social.getDraftPost",
  "node_social.getEditPost",
  "file.requestVODUploadingSignature",
  "file.requestOSSUploadingTicket",
  "groupBuy.getGroupBuyTabInfoByState",
  "node_social.getPostDetailConfig",
  "node_social.getPossibleInterestedUsers",
  "node_social.getTopicDetailV2",
  "socialUser.getSharerUserInfoV2",
  "search.getDefaultSearchWordV3",
  "node_social.cmsPage",
  "node_social.getDiscoverDomain"
];
