Page({

  /**
   * 页面的初始数据
   */
  data: {
    cultureDetile: [],
    context: ''
  },

  /**
   * 生命周期函数--监听页面显示
   */
  onShow: function () {
    this.getCultureDetile();
  },

  //获取文化细节 
  getCultureDetile(e) {
    let that = this
    let pages = getCurrentPages();
    let currentPage = pages[pages.length - 1];
    let options = currentPage.options;
    //×1将字符串转为数字
    const thiscultureId = options.cultureId * 1;

    // console.log(options)
    console.log(thiscultureId)
    // console.log(that.data)
    wx.cloud.database().collection('CultureDetile')
      .where({
        cultureId: thiscultureId
      })
      .get()
      .then(res => {
        // console.log(res)
        that.setData({
          cultureDetile: res.data,
          context: res.data[0].context.split('|').join('\n')
        })
        // console.log(that.data.cultureDetile[0].imgs)
      })
    // console.log(that.data.cultureDetile)

  }
})