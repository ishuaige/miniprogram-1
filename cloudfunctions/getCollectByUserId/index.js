// 云函数入口文件
const cloud = require('wx-server-sdk')

cloud.init()

// 云函数入口函数
exports.main = async (event, context) => {
  const wxContext = cloud.getWXContext();
  let res = await cloud.database().collection('User')
    .where({
      openId: wxContext.OPENID
    }).get();
  // console.log(res.data[0].collect);
  return res.data[0].collect
}