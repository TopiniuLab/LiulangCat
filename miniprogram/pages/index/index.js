var DB = require('../../utils/DB.js')
var QQMapWX = require('../../public/js/qqmap-wx-jssdk.min.js');
var qqmapsdk;

Page({
  data: {
    windowHeight: 0,
    containerHeight:0,
    scale: 16,
    latitude: 0,
    longitude: 0,
    myMarkers: [{}],

    detail:null,
    isHideDetailWrap:true,

    flagCatList: [],
    animation: null,
    ani: null,
    currentId: ''
  },

  /**
   * 定位
   */
  go() {
    console.log('kkk')
    this.mapCtx.moveToLocation()
    console.log("latitude:" + this.data.latitude + " " + "longitude:" + this.data.longitude)
  },
  hideCard(){
    console.log('...')
    this.animation.translate(0, -150).step()
    console.log(this.data.windowHeight)
    this.ani.height(this.data.windowHeight).translate(0,0).step()

    this.setData({
      animation: this.animation.export(),
      ani: this.ani.export()
    })

  },
  onMarkerClick(res){
    this.setData({
      currentId: res.markerId
    })
    var that = this;
    let tempLatitude = 0
    let templongitude = 0
    console.log(this.animation)
    // this.animation.translate(0,150).step();
    this.animation.translate(0, 150).step()
    this.ani.height(this.data.windowHeight - 150).translate(0,150).step()


    this.setData({
      detail: this.data.flagCatList[res.markerId],
      isHideDetailWrap: false,
      animation: this.animation.export(),
      ani: this.ani.export()
    })
  },

  hideDetailWrap(){
    this.setData({
      isHidden: true
    })
  },
  goDetail(){
    wx.navigateTo({
      url: '../catDetail/catDetail?id=' + this.data.currentId,
    })
  },
  goAdd(){
    wx.navigateTo({
      url: '../addCat/addCat',
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
          this.data.flagCatList[success.data[i]._id] = success.data[i];
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
          windowHeight:res.windowHeight,
          containerHeight: res.windowHeight
        })
      },
    })

  },

  /**
   * 生命周期函数--监听页面初次渲染完成
   */
  onReady: function () {
    this.animation = wx.createAnimation({
      duration: 500,
      timingFunction: 'ease',
      delay: 100
    })
    this.ani = wx.createAnimation({
      duration: 500,
      timingFunction: 'ease',
      delay: 0
    })
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