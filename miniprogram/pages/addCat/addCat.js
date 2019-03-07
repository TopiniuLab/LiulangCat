Page({
  /**
   * 页面的初始数据
   */
  data: {
    region: [],
    customItem: '全部',
    detailLocation: '',

    containerHeight: 0,
  },
  onLoad(){
    wx.getSystemInfo({
      success: (res) => {
        this.setData({
          containerHeight: res.windowHeight
        })
        console.log(res)
      },
    })
  },
  submit(){
    
  },
  chooseLocation(){
    wx.chooseLocation({
      success: (res) => {
        wx.showLoading({
          title: '解析地址中',
        })
        this.completeLocation(res.latitude, res.longitude, (res) => {
          this.setData({
            region: [res.address_component.province, res.address_component.city, res.address_component.district],
            detailLocation: `${res.formatted_addresses.recommend}(${res.address_component.street_number})`
          })
        })
        console.log(res)
      },
    })
  },
  bindRegionChange(e,code,postCode){
    console.log(e)
    this.setData({
      region: e.detail.value
    })
  },
  completeLocation(la,lo,cb){
    var QQMapWX = require('../../public/js/qqmap-wx-jssdk.min.js')

    var QQMapSDK = new QQMapWX({
      key: 'WHTBZ-OJTKU-7CDVL-4MS74-HY6T5-JKBXO'
    })
    var _this = this;
    QQMapSDK.reverseGeocoder({
      location: {
        latitude: la,
        longitude: lo
      },
      success: (res) => {
        if (res.status !== 0) {
          wx.showToast({
            title: '解析地址异常',
          })
          return;
        }
        res = res.result;
        cb(res);
        wx.hideLoading()
      }
    })
  },
  getLocation(){
    wx.showLoading({
      title: '获取位置中',
    })
    wx.getLocation({
      success: (res) => {
        console.log(res)
        var QQMapWX = require('../../public/js/qqmap-wx-jssdk.min.js')

        var QQMapSDK = new QQMapWX({
          key: 'WHTBZ-OJTKU-7CDVL-4MS74-HY6T5-JKBXO'
        })

        var _this = this;
        QQMapSDK.reverseGeocoder({
          location: {
            latitude: res.latitude,
            longitude: res.longitude
          },
          success:(res)=>{
            if(res.status !== 0){
              wx.showToast({
                title: '解析地址异常',
              })
              return;
            }
            res = res.result;
            this.setData({
              region: [res.address_component.province, res.address_component.city, res.address_component.district],
              detailLocation: `${res.formatted_addresses.recommend}`
            })
            wx.hideLoading()
          }
        })
      },
    })
  },
  
  addPhoto(){
    wx.chooseImage({
      success: function(res) {
        console.log(res)
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