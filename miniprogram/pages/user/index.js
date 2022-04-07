// pages/user/index.js
var appId = 'wx71ad58e9e606f327';
var appSecret = '436aec48cd684e1f555df59b92476ad9';
Page({
  data: {
    userinfo: {},
    // 被收藏的商品的数量
    collectNums: 0
  },

  async handleGetUserInfo(e) {
    let userInfores = await wx.getUserProfile({
      desc: '正在获取', //不写不弹提示框
      // success: function (res) {
      //   console.log("获取成功:", res.userInfo)
      //   wx.setStorageSync("userinfo", res.userInfo)
      // },
      // fail: function (err) {
      //   console.log("获取失败: ", err)
      // }
    })

    // 将用户加入数据库
    let res = await wx.cloud.callFunction({
      name: 'getUserByOpenId',
      data: {}
    });
    // console.log(res.result.data[0]._id);

    // 若用户已在数据库则不加入
    let len = res.result.data.length;
    if (!len) {
      let res1 = await wx.cloud.callFunction({
        name: 'addUser',
        data: {}
      })
      // console.log(res1);
      userInfores.userInfo._id = res1.result._id;
    } else {
      userInfores.userInfo._id = res.result.data[0]._id;
    }

    // console.log(userInfores.userInfo)
    wx.setStorageSync("userinfo", userInfores.userInfo);
    const userinfo = wx.getStorageSync("userinfo");
    const collect = wx.getStorageSync("collect") || [];
    this.setData({
      userinfo,
      collectNums: collect.length
    });
  },

  // 获取收藏的商品
  async getCollect() {
    let res = await wx.cloud.callFunction({
      name: 'getCollectByUserId',
      data: {}
    });
    wx.setStorageSync('collect', res.result)

  },
  onShow() {
    const userinfo = wx.getStorageSync("userinfo");
    const collect = wx.getStorageSync("collect") || [];
    this.setData({
      userinfo
    });
  },
  //获得“关于我们”信息
  getAboutMe() {
    // wx.showToast({
    //   title: '该小程序旨在收集和分享一些我国非物质文化遗产信息，以便于您更好的了解我国非物质文化遗产。因作者本人能力有限，无法保证面面俱到，若您有好的建议可联系作者，感谢您的支持与包容。',
    //   icon: 'none',
    //   duration: 2000
    // })
    wx.showModal({
      title: '关于我们',
      content: '该小程序旨在收集和分享一些我国非物质文化遗产信息，以便于您更好的了解我国非物质文化遗产。因作者本人能力有限，无法保证面面俱到，若您有好的建议可联系作者，感谢您的支持与包容。',
      success(res) {
        if (res.confirm) {
          console.log('用户点击确定')
        } else if (res.cancel) {
          console.log('用户点击取消')
        }
      }
    })
  }
})