Page({
  data: {
    active: 1,
    category: [],
    cultureList: []
  },

  onLoad: function (option) {
    this.getCategory();
  },

  //获取分类
  getCategory() {
    let that = this
    wx.cloud.database().collection('Category').get()
      .then(res => {
        // console.log(res.data)
        that.setData({
          category: res.data
        })
        // console.log(that.data.category)
      })
  },

  //标签变化触发事件
  onChange(event) {
    wx.showToast({
      title: `${event.detail.title}`,
      icon: 'none',
    });
    // console.log(event)

    this.getCultureList(event.detail.title);
    
  },

  //获取文化列表
  getCultureList(title) {
    let that = this
    wx.cloud.database().collection('Culture')
      .where({
        category: title
      })
      .get()
      .then(res => {
        // console.log(res.data)
        if(res.data.length ==0){
          wx.showToast({
            title: '暂无数据',
            icon: 'none',
          });
        }
        that.setData({
          cultureList: res.data
        })
        // console.log(this.data.cultureList)
      })
  }

});