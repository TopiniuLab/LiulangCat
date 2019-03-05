Page({
  data: {
    scale: 14,
    latitude: "",
    longitude: "",
  },

  onReady(e){
    // this.mapCtx.moveToLocation();
  },
  onLoad() {
    var that = this;
    wx.getLocation({
      success: function (res) {
        that.setData({
          latitude: res.latitude,
          longitude: res.longitude,
        })
      },
    })

    this.mapCtx = wx.createMapContext('map', this);
  },
  go(){
    console.log('kkk')
    this.mapCtx.moveToLocation();
  }
})