// pages/search/index.js
Page({

  /**
   * 页面的初始数据
   */
  data: {
    value: '',
    cultureList: []
  },
  TimeId: -1,

  onChange(e) {
    this.setData({
      value: e.detail,
    });

  },

  async onSearch() {
    clearTimeout(this.TimeId);
    this.TimeId = setTimeout(() => {}, 1000);
    if (this.data.value == '') {
      console.log("输入为空");
      return;
    }
    let that = this;
    console.log('搜索' + this.data.value);
    const res = await wx.cloud.database().collection('Culture')
      .where({
        title: { //columnName表示欲模糊查询数据所在列的名
          $regex: '.*' + that.data.value + '.*', //queryContent表示欲查询的内容，‘.*’等同于SQL中的‘%’
          $options: '1' //$options:'1' 代表这个like的条件不区分大小写,详见开发文档
        }
      })
      .get();

    this.setData({
      cultureList: res.data
    })

    // console.log(that.data.cultureList)
  },
 
})