/**
 * 获取所有数据
 */
function getAllData(){
  console.log("getAllData")
  const db = wx.cloud.database()
  return db.collection('catlist').get()
}

/**
 * 通过id获取一个数据
 */
function getDataById(id){
  const db = wx.cloud.database()
  return db.collection("catlist").doc(id).get()
}

exports.getAllData = getAllData
exports.getDataById = getDataById