var QQMapWX = require('../../lib/qqmap-wx-jssdk.min.js');
var qqmapsdk;

Page({
  data: {
    containerHeight:0,
    scale: 14,
    latitude: 0,
    longitude: 0,
    myMarkers: [{
      id: 1,
      latitude: 28.11266,
      longitude: 112.9834,
      iconPath: '../../images/icon_1.png',
      width: 30,
      height: 30
    }],

    detail:{
      address:"",
      createTime:""
    },
    isHideDetailWrap:true
  },

  /**
   * 定位
   */
  go() {
    console.log('kkk')
    this.mapCtx.moveToLocation()
    console.log("latitude:" + this.data.latitude + " " + "longitude:" + this.data.longitude)
  },

  onMarkerClick(res){
    this.setData({
      isHideDetailWrap: false
    })
    var that = this;
    qqmapsdk.reverseGeocoder({
      location: {
        latitude: that.data.latitude,
        longitude: that.data.longitude,
      },
      success: (res) => {//成功后的回调
        var res = res.result;
        that.setData({
          detail: {
            address: res.address,
            createTime:"2019/3/8"
          }
        })
      }
    })
  },

  hideDetailWrap(){
    this.setData({
      isHidden: true
    })
  },

  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function (options) {
    var that = this;
    qqmapsdk = new QQMapWX({
      key: 'WZZBZ-2BZ3G-4CNQ5-IGDUI-SIKP3-UOFAR'
    })

    wx.cloud.init({
      env:"dev-c86710"
    })

    const db = wx.cloud.database()

    db.collection('catlist').get({
      success:(res)=>{
        console.log("获取数据:")
        console.log(res)
      },
      fail:(res)=>{
        console.log("失败")
      }
    })

    this.mapCtx = wx.createMapContext('map', this);

    wx.getLocation({
      success: function (res) {
        console.log("latitude:" + res.latitude + " " + "longitude:" + res.longitude)
        that.setData({
          latitude: res.latitude,
          longitude: res.longitude,
          myMarkers: [{
            id: 1,
            latitude: res.latitude,
            longitude: res.longitude,
            iconPath: '../../images/icon_1.png',
            width: 50,
            height: 50
          }],
        })
      },
    })

    //获取屏幕高度
    wx.getSystemInfo({
      success: (res)=> {
        this.setData({
          containerHeight:res.windowHeight
        })
      },
    })

  },

  /**
   * 生命周期函数--监听页面初次渲染完成
   */
  onReady: function () {

  },

  /**
   * 生命周期函数--监听页面显示
   */
  onShow: function () {
  
  },

  /**
   * 生命周期函数--监听页面隐藏
   */
  onHide: function () {

  },

  /**
   * 生命周期函数--监听页面卸载
   */
  onUnload: function () {

  },

  /**
   * 页面相关事件处理函数--监听用户下拉动作
   */
  onPullDownRefresh: function () {

  },

  /**
   * 页面上拉触底事件的处理函数
   */
  onReachBottom: function () {

  },

  /**
   * 用户点击右上角分享
   */
  onShareAppMessage: function () {

  }
})