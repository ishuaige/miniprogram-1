// pages/collect/index.js
Page({

  /**
   * 页面的初始数据
   */
  data: {
    collectList: []
  },


  onShow: function (options) {
    this.getList();
    wx.showToast({
      title: '该功能尚未开放喔',
      icon: 'none',
      duration: 2000
    })
  },

  async getList() {
    let collectIdArr = wx.getStorageSync("collect");

    let numberCollect = collectIdArr.map(Number);
    console.log(numberCollect);
    const _ = wx.cloud.database().command
    let res = await wx.cloud.database().collection('Culture')
      .where({
        _id: _.in(numberCollect)
      })
      .get();
    console.log(res.data);
    this.setData({
      collectList: res.data
    })
  }

})