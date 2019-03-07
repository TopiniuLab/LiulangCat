
Page({
  data: {
    containerHeight:0,
    scale: 14,
    latitude: 28.11266,
    longitude: 112.9834,
    myMarkers: [{
      id: 1,
      latitude: 28.11266,
      longitude: 112.9834,
      iconPath: '../../images/icon_1.png',
      label: {
        content: "test 1 ...",
        bgColor: "#ffffff",
        fontSize: 20
      },
      width: 30,
      height: 30
    }],
  },

  go() {
    console.log('kkk')
    this.mapCtx.moveToLocation();
  },

  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function (options) {
    var that = this;
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
            label: {
              content: "test 2 ...",
              bgColor: "#ffffff",
              fontSize: 20
            },
            width: 50,
            height: 50
          }],
        })
      },
    })

    this.mapCtx = wx.createMapContext('map', this);

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