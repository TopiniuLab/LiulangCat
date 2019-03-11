Page({

  /**
   * 页面的初始数据
   */
  data: {
    catDetail: null,
    containerHeight: 0,
    time: '',
    date: '',
    showCard: false
  },
  openLocation(){
    wx.openLocation({
      latitude: this.data.catDetail.latitude,
      longitude: this.data.catDetail.longitude,
      scale: 18
    })
  },
  goBack(){
    wx.navigateBack({
      delta: 1
    })
  },

  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function (options) {
    console.log(options)
    wx.getSystemInfo({
      success: (res) => {
        this.setData({
          containerHeight: res.windowHeight
        })
        console.log(res)
      },
    })
    getApp().globalData.TB.doc(options.id).get({
      success: (res) => {
        console.log(res.data)
        console.log(res.data.createTime.split(' '))
        this.setData({
          catDetail: res.data,
          time: res.data.createTime.split(' ')[1],
          date: res.data.createTime.split(' ')[0]
        })
      },
      error: (err) => {
        wx.showToast({
          title: '获取数据失败，请重试',
          icon: 'none'
        })
      }
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
    setTimeout(()=>{
      this.setData({
        showCard: true
      })
    },500)
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