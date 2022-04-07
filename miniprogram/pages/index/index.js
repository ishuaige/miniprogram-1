// pages/index/index.js

Page({

  /**
   * 页面的初始数据
   */
  data: {
    cultureList: [],
    swiperList: [],
    limitcnt: 10,
    skipcnt: 0,
  },

  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function (options) {
    wx.stopPullDownRefresh() //刷新完成后停止下拉刷新动效
    this.getSwiper();
    this.getCulture();

  },

  //获取轮播图数据
  getSwiper() {
    let that = this
    // console.log(that.data.swiperList)
    wx.cloud.database().collection('swiper').get()
      .then(res => {
        // console.log(res.data)
        that.setData({
          swiperList: res.data
        })
        // console.log(that.data.swiperList)
      })
  },

  //获取文化列表数据
  getCulture() {
    let that = this
    wx.cloud.database().collection('Culture')
      .limit(that.data.limitcnt)
      .skip(that.data.skipcnt)
      .get()
      .then(res => {
        // console.log(res.data)
        that.setData({
          cultureList: that.data.cultureList.concat(res.data)
        })
        // console.log(that.data.cultureList)
      })
  },

  onClickNotice(event) {
    console.log(event);
    // wx.showToast({
    //   title: '该小程序仅供内部学习使用，因作者本人能力有限，资源均来自于网上，若有使用不当，侵权等问题，请及时联系作者，感谢您的支持！',
    //   icon: 'none',
    //   duration: 2000
    // })
    wx.showModal({
      title: '通知',
      content: '该小程序仅供内部学习使用，因作者本人能力有限，资源均来自于网上，若有使用不当，侵权等问题，请及时联系作者，感谢您的支持！',
      success(res) {
        if (res.confirm) {
          console.log('用户点击确定')
        } else if (res.cancel) {
          console.log('用户点击取消')
        }
      }
    })
  },
  /**
   * 生命周期函数--监听页面显示
   */
  onShow: function () {
    // this.toTop();
  },

  //回到顶部
  toTop() {
    wx.pageScrollTo({
      scrollTop: 0
    })
  },

  /**
   * 页面相关事件处理函数--监听用户下拉动作
   */
  onPullDownRefresh: function () {
    console.log("用户下拉");
    this.setData({
      cultureList: [],
      skipcnt: 0
    })
    this.onLoad();
  },

  /**
   * 页面上拉触底事件的处理函数
   */
  onReachBottom: function () {
    console.log("用户上拉");
    this.setData({
      skipcnt: this.data.skipcnt + 10
    })
    this.getCulture();
  },

})