var DB = require('../../utils/DB.js')
var QQMapWX = require('../../public/js/qqmap-wx-jssdk.min.js');
var qqmapsdk;

Page({
  data: {
    containerHeight:0,
    scale: 16,
    latitude: 0,
    longitude: 0,
    myMarkers: [{}],

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
    let tempLatitude = 0
    let templongitude = 0

    const db = wx.cloud.database()
    db.collection('catlist').doc(res.markerId).get({
      success(res) {
        tempLatitude = res.data.latitude
        templongitude = res.data.longitude
        
        qqmapsdk.reverseGeocoder({
          location: {
            latitude: tempLatitude,
            longitude: templongitude,
          },
          success: (res) => {//成功后的回调
            console.log(res)
            var res = res.result;
            that.setData({
              detail: {
                address: res.address,
                createTime: res.createTime
              }
            })
          },
          fail: (res) => {
            console.log(res)
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

    DB.getAllData().then(
      success => {
        console.log("获取数据成功")
        var markers = []
        for (var i = 0; i < success.data.length; i++) {
          // let temImg
          // wx.cloud.getTempFileURL({
          //   fileList: ["cloud://dev-c86710.6465-dev-c86710/icon_1.png"],
          //   success: res => {
          //     temImg = res.fileList[0].tempFileURL
          //     console.log("getTempFileURL:",res.fileList[0].tempFileURL)
          //   }
          // })
          markers[i] = {
            id: success.data[i]._id,
            latitude: success.data[i].latitude,
            longitude: success.data[i].longitude,
            iconPath: '../../public/imgs/icon_cat.png',
            width: 30,
            height: 30
          }
        }
        that.setData({
          myMarkers: markers
        })
      }
    )

    this.mapCtx = wx.createMapContext('map', this);

    wx.getLocation({
      type: 'gcj02',
      altitude: true,//高精度定位
      success: function (res) {
        console.log("latitude:" + res.latitude + " " + "longitude:" + res.longitude)
        that.setData({
          latitude: res.latitude,
          longitude: res.longitude,
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