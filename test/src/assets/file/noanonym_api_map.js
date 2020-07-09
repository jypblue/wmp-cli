module.exports = [
  "auctionClient.addRemind",
  "auctionClient.bidForSku",
  "auctionClient.cancelRemind",
  "auctionClient.getBiddingNumber",
  "auctionClient.getDepositDetail",
  "auctionClient.getTotalDeposit",
  "auctionClient.getMyJoinedLotRecords",
  "auctionClient.getMyPurchasedLotRecords",
  "auctionClient.getDepositOrderInfo",
  "cart.deleteSku",
  "cart.deleteSkuInActivity",
  "cart.getCartTotalQty",
  "cart.renderCartV2",
  "cart.selectSku",
  "cart.selectSkuInActivity",
  "cart.unSelectAll",
  "cart.unSelectSku",
  "cart.unSelectSkuInActivity",
  "cart.updateSkuCount",
  "cart.updateSkuCountInActivity",
  "coupon.couponCount",
  "coupon.couponOverdueNotifyTabbar",
  "coupon.getCouponListInUserCenter",
  "coupon.receiveCouponV2",
  "coupon.receiveNewUserGiftBagV3",
  "coupon.lotteryGoodLuck",
  "coupon.getMyLotteryLuckyRecord",
  "coupon.lotteryDailyShare",
  "coupon.getCouponInfoByCouponId",
  "crowdfunding.getSkuCrowdfundingInfo",
  "orders.queryOrderAddress",
  "orders.directPurchaseRenderOrderV3",
  "orders.getOrderDetail",
  "orders.getOrderDetailV2",
  "orders.getOrderList",
  "orders.getPaySuccessInfo",
  "orders.modifyOrderAddress",
  "orders.modifyMiniProgramOrderAddress",
  "orders.needPay",
  "orders.orderCancel",
  "orders.orderCount",
  "orders.setOrderUnvisible",
  "orders.friendGiftRenderOrder",
  "orders.friendGiftSubmitOrder",
  "orders.getFriendGiftList",
  "orders.receiveFriendGift",
  "orders.addFriendGiftAddress",
  "trade.renderOrderV3",
  "trade.submitOrderV3",
  "productGift.randomGiftSku",
  "trial.getPersonalTrialList",
  "trial.fillAddress",
  "trial.getApplicationStatus",
  "trial.applyTrialProduct",
  "trial.getApplicationStatus",
  "voucher.getUserVoucherInfoDetail",
  "voucher.getUserVoucherInfoList",
  "voucher.voucherExchangeCoupon",
  "vip.getGrowthValueList",
  "vip.getPointList",
  "vip.getVipInfo",
  "vip.getVipCardShareKey",
  "vip.getSharedUsers",
  "user.createRecAddressV2",
  "user.delRecAddress",
  "user.getRecAddressInfo",
  "user.getRecAddressList",
  "user.getUserInfo",
  "user.getUserProfileWithUserInfo",
  "user.isFollerWeixin",
  "user.setDefaultAddr",
  "user.submitReceiverInfo",
  "user.updateRecAddressV2",
  "user.logout",
  "callCenterCustomer.getEmojiList",
  "callCenterCustomer.getHistoryMessages",
  "callCenterCustomer.getMessagesBySeq",
  "callCenterCustomer.initChat",
  "callCenterCustomer.requestAgent",
  "callCenterCustomer.sendMessage",
  "callCenterCustomer.submitRating",
  "groupBuy.getMyGroupBuy",
  "user.updateUserInfo",
  "user.updateUserProfileWithUserInfo",
  "user.getCustomsClearanceInfoList",
  "user.getSubmitStatus",
  "user.submitCustomsClearanceInfo",
  "user.deleteCustomsClearanceInfo",
  "orderActivity.flashSaleAppoint",
  "orderActivity.flashSaleCancelAppoint",
  "user.getQrCode",
  "orders.getSplitOrderList",
  "vip.experienceVip",
  "vip.hasVipExperienceQualifications",
  "orders.directPurchaseSubmitOrderV3",
  "orders.submitOrderForVipV3",
  "scmLogistics.receiverGetItemLogistics",
  "orders.finalConfirmOrderItemByOrderNumber",
  "orders.pushDeliverByOrderNumber",
  "orders.tryConfirmOrderByOrderNumber",
  "orders.querySubOrderLogistics",
  "orders.appendStoreOrderAddress",
  "coupon.receiveCouponByExchangeCode",
  "orders.renderOrderForVipV4",
  "orders.submitOrderForVipV3",
  "orders.getAllCollectSpuList",
  "coupon.receiveHonourGiftBag",
  "orders.tryConfirmGiftOrder",
  "orders.pushDeliverGiftOrder",
  "orders.deleteGiftRecord",
  "orders.queryGiftOrderLogistics",
  "orders.getUserLuckyBag",
  "orders.friendGiftUseVipLuckyBag",
  "orders.normalLuckyBagRenderOrder",
  "orders.friendGiftSubmitNormalLuckyBag",
  "orders.needUpdateLotteryTime",
  "orders.updateFirstShareTime",
  "orders.updateLotteryTime",
  "orders.queryShareKey",
  "coupon.receiveCouponByExchangeCode",
  "productGift.switchGiftSku",
  "orders.queryShareStatus",
  "orders.incrRerenderChance",
  "orders.normalLuckyBagRerenderOrder",
  "orders.getVipShareDiscountAmount",
  "productGift.switchGiftSku",
  "orders.queryShareStatus",
  "orders.incrRerenderChance",
  "orders.normalLuckyBagRerenderOrder",
  "coupon.getCouponListBySkuInCartV2",
  "coupon.querySkuCouponInCartV2",
  "orders.directPurchaseRenderOrderWithLimit",
  "orders.directPurchaseSubmitOrderWithLimit",
  "orders.renderOrderWithLimit",
  "orders.submitOrderWithLimit",
  "orderSearch.searchForOrder",
  "orderActivity.flashSaleFirstAppointMark",
  "orders.orderBuyAgain",
  "user.partnerUnbindV2",
  "orders.addFriendGiftAddressV2",
  "orders.orderRenderComment",
  "orders.orderSubmitComment",
  "orders.getComment",
  "cart.selectAllV2",
  "orders.appendStoreOrderAddressV2",
  "yitShopContentService.likePost",
  "user.getSignInInfo",
  "user.getUserPointInfo",
  "vip.afterShowedVipDiscountAdjustmentMessage",
  "vip.getVipDiscountAdjustmentMessage",
  "user.getUserProfileStatus",
  "user.recordUserProfileWindowsPopTime",
  "user.getUserProfileInfo",
  "user.recordUserProfileInfo",
  "user.getUserProfileTagList",
  "coupon.receiveCouponV3",
  "vip.getVipShareKey",
  "vip.joinShareVip",
  "vip.getShareUserInfo",
  "vip.checkShareKey",
  "collectThumb.cancelStockRemind",
  "collectThumb.createUserCollectThumb",
  "collectThumb.getStockRemind",
  "collectThumb.getUserCollectThumb",
  "collectThumb.giveThumb",
  "collectThumb.purchaseLimit",
  "collectThumb.shareUserCollectThumb",
  "orders.collectThumbRenderOrder",
  "orders.collectThumbSubmitOrder",
  "catering.getUserCateringList",
  "cart.orderingRenderCart",
  "cart.orderingUpdateSkuCount",
  "cart.orderingCartUpdateSkuCount",
  "cart.orderingClearCart",
  "cart.orderingDeleteSku",
  "orders.orderingRenderOrder",
  "orders.orderingSubmitOrder",
  "catering.getScheduleNumber",
  "orders.queryUserBonusCoupon",
  "orders.getPaySuccessInfoWithoutTradeNo",
  "groupBuy.deleteMyGroupBuy",
  "tradeLadderGroup.renderDeposit",
  "tradeLadderGroup.renderTailMoney",
  "tradeLadderGroup.submitDeposit",
  "tradeLadderGroup.submitTailMoney",
  "trade.preSaleDepositRenderOrder",
  "trade.preSaleDepositSubmitOrder",
  "trade.preSaleTailMoneyRenderOrder",
  "trade.preSaleTailMoneySubmitOrder",
  "ordersLadderGroup.getMyLadderGroupList",
  "cart.clearInvalidSku",
  "orders.getCancelReason",
  "orders.orderCancelV3",
  "orders.deleteOrderComment",
  "collectPostService.collectPost",
  "collectPostService.getUserCollectPostCount",
  "collectPostService.checkUserCollectPost",
  "collectPostService.getUserCollectPostList",
  "coupon.receiveIncreaseGift",
  "coupon.helpIncreaseGift",
  "user.resetMobile",
  "user.checkIsSdpUserReSetMobile",
  "user.checkUserLoginedApp",
  "orders.userGroupQualifications",
  "collectThumb.cancelCollectThumb",
  "collectThumb.closeCollectThumbCancelRemind",
  "collectThumb.collectThumbAppoint",
  "collectThumb.collectThumbCancelAppoint",
  "collectThumb.getCollectThumbSkuStock",
  "collectThumb.giveThumbV2",
  "cart.adviseBuyTips",
  "orders.getVipSavedTotalAmount",
  "trial.myReviewList",
  "yitShopCommentService.createComment",
  "yitShopCommentService.deleteComment",
  "yitShopCommentService.likeComment",
  "orders.groupRenderOrderV4",
  "orders.groupSubmitOrderV4",
  "luckydraw.getJaguarActivitySignUpInfo",
  "orders.orderPersuadeVip",
  "user.getUserSSOTokenV2",
  "electronicInvoice.getInvoiceStatusInfoClient",
  "cart.replaceCartSku",
  "trade.comboRenderOrder",
  "trade.comboSubmitOrder",
  "cart.addComboToCart",
  "cart.FoodAdviseBuyTips",
  "yitShopContentService.likePost",
  "lifePost.delUgc",
  "feedback.submitFeedback",
  "feedback.getFeedbackTypeList",
  "lifePost.addOrEditUgc",
  "aestheticslab.myReviewList",
  "collectSpu.getCollectSpuCount",
  "collectSpu.saveCollectSpu",
  "collectSpu.batchCancelCollectSpu",
  "collectSpu.getSpuCollectState",
  "collectSpu.pageGetCollectSpu",
  "user.getSSOTicket",
  "node_shoppingCart.saveCollectAndDelete",
  "stockArriveNotify.queryCanSubscribeStatus",
  "stockArriveNotify.subscribe",
  "storeCampaign.bindUser",
  "storeCampaign.getUserPhoto",
  "auctionClient.cancelActivityRemind",
  "auctionClient.addActivityRemind",
  "callCenterCustomer.feedbackRobotChat",
  "catering.getCateringScheduleInfo",
  "catering.getCateringScheduleInfoList",
  "user.repairDeviceRegister",
  "trade.directPurchaseRenderOrderV3",
  "trade.directPurchaseSubmitOrderV3",
  "voucher.getUserVoucherInfoDetailV2",
  "node_coupon.newUserGiftBagInfoV2",
  "node_coupon.receiveNewUserGiftBag",
  "orders.queryOrderSpu",
  "coupon.getUserCardCenterList",
  "coupon.getCartCardInfoList",
  "trade.orderPersuadeVip",
  "orders.getVipSavedTotalAmount",
  "orders.getVipSavedDetail",
  "orders.queryOrderSpuV2",
  "user.setDefaultClearanceIdentity",
  "node_shoppingCart.saveCollectAndDelete",
  "node_shoppingCart.renderShoppingCart",
  "node_shoppingCart.selectAll",
  "node_shoppingCart.unSelectAll",
  "node_shoppingCart.selectSku",
  "node_shoppingCart.unSelectSku",
  "node_shoppingCart.saveCollectSpu",
  "node_shoppingCart.updateSkuCount",
  "node_shoppingCart.deleteSku",
  "node_shoppingCart.replaceCartSku",
  "node_shoppingCart.saveCollectAndDelete",
  "node_activityNotify.addActivityNotifyV2",
  "node_activityNotify.cancelActivityNotifyV2",
  "node_user.getSingInInfo",
  "user.checkWhetherOfflineClockIn",
  "user.offlineClockIn",
  "node_user.pendingReceiptLogistics",
  "redpack.receiveRedpack",
  "redpack.getRedpackInfoForUser",
  "user.getUserCenterSignInInfo",
  "livevideo.getLiveRoomInfo",
  "liveVideoNotify.addLiveVideoNotify",
  "liveVideoNotify.cancelLiveVideoNotify",
  "notification.adjustBusinessCodeAuthInfo",
  "followShop.followShop",
  "followShop.unfollowShop",
  "livevideoAnchorPush.getLiveRoomList",
  "livevideoAnchorPush.getLiveRoomDetail",
  "socialDraft.saveDraft",
  "socialDraft.getDraftList",
  "socialDraft.deleteDraft",
  "socialDraft.getDraftDetail",
  "socialPost.publishPost",
  "socialUser.updateMyUserInfo",
  "node_social.getNewMessageNum",
  "instantMessaging.getMyImUserInfo",
  "like.userLike",
  "socialComment.addComment",
  "coupon.getCartCardInfoGroup",
  "follow.checkFollowState",
  "socialPost.isPublishCompleted",
  "instantMessaging.getConversationList",
  "instantMessaging.getMessageList",
  "instantMessaging.getUnreadMessageCount",
  "instantMessaging.setMessageRead",
  "node_user.signUp",
  "user.registerXcxSignUpNotice",
  "user.getNavCurSignUpInfo",
  "node_social.getCommentATNews",
  "node_social.getLikeCollectNews",
  "node_social.getNewFollowNews",
  "socialActivity.getUserAwardList",
  "socialActivity.getUserLuckDrawPage",
  "taskClient.getUserEffectiveTask",
  "user.updateUserInfoV2"
];
