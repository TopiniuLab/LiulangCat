Page({
  /**
   * 页面的初始数据
   */
  data: {
    region: [],
    customItem: '全部',
    detailLocation: '',

    containerHeight: 0,
    uploadedPhoto: [],
    contactTypes: [{
      id: 1,
      name: 'QQ'
    }, {
      id: 2,
      name: '微博',
    }, {
      id: 3,
      name: '微信'
    }, {
      id: 4,
      name: '手机号'
    }],
    contactType: {
      id: 1,
      name: 'QQ'
    },
    contactValue: '',
    isStray: false,
    locationInfo: {
      latitude: '',
      longitude: ''
    },
    description: ''
  },
  switchStray(e) {
    console.log(e)
    this.setData({
      isStray: e.detail.value
    })
  },
  switchContactType(e) {
    let o = this.data.contactType;
    o = {
      id: parseInt(e.currentTarget.dataset.id),
      name: e.currentTarget.dataset.name,
    }
    this.setData({
      contactType: o
    })
  },
  onLoad() {
    wx.getSystemInfo({
      success: (res) => {
        this.setData({
          containerHeight: res.windowHeight
        })
        console.log(res)
      },
    })
  },
  compuData() {
    /**
        "address": 南县
        "contactType": 电话
        "contactValue": 17680507554
        "createTime": 2019/3/9
        "description": 纤细信息。。。
        "isStray": true
        "latitude": 28.11266
        "longitude": 112.9834
        "photos":["图片1"]
     */
    const p = this.data;
    let o = [];
    p.uploadedPhoto.map(i => {
      o.push(i.id)
    })
    let d = new Date();
    return {
      address: p.region[0] + p.region[1] + p.region[2] + p.detailLocation,
      contactType: p.contactType,
      contactValue: p.contactValue,
      description: p.description,
      isStray: p.isStray,
      ...p.locationInfo,
      photos: o,
      createTime: this.curentTime()
    }
  },
  curentTime() {
    var now = new Date();

    var year = now.getFullYear(); //年
    var month = now.getMonth() + 1; //月
    var day = now.getDate(); //日

    var hh = now.getHours(); //时
    var mm = now.getMinutes(); //分

    var clock = year + "-";

    if (month < 10)
      clock += "0";

    clock += month + "-";

    if (day < 10)
      clock += "0";

    clock += day + " ";

    if (hh < 10)
      clock += "0";

    clock += hh + ":";
    if (mm < 10) clock += '0';
    clock += mm;
    return (clock);
  },
  bindDescInput(e) {
    console.log(e)
    this.data.description = e.detail.value;
  },
  bindContactInput(e) {
    this.data.contactValue = e.detail.value;
  },
  submit() {
    if (this.data.description === ''){
      wx.showToast({
        title: '详细描述不能为空',
        icon: 'none'
      })
      return;
    }
    getApp().globalData.TB.add({
      data: this.compuData(),
      success: (res) => {
        wx.showToast({
          title: '添加成功',
          icon: 'none'
        })
      },
      fail: (err) => {
        console.log(err)
        wx.showToast({
          title: '',
          icon: 'none'
        })
      }
    })
  },
  chooseLocation() {
    wx.chooseLocation({
      success: (res) => {
        wx.showLoading({
          title: '解析地址中',
        })
        this.data.locationInfo = {
          latitude: res.latitude,
          longitude: res.longitude
        }
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
  bindRegionChange(e, code, postCode) {
    console.log(e)
    this.setData({
      region: e.detail.value
    })
  },
  completeLocation(la, lo, cb) {
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
  getLocation() {
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
        this.data.locationInfo = {
          latitude: res.latitude,
          longitude: res.longitude
        }

        var _this = this;
        QQMapSDK.reverseGeocoder({
          location: {
            latitude: res.latitude,
            longitude: res.longitude
          },
          success: (res) => {
            if (res.status !== 0) {
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
  delImg(e) {
    console.log('的了img')
    console.log(e)
    let id = e.currentTarget.dataset.fileid;
    wx.cloud.deleteFile({
      fileList: [id],
      success: (res) => {
        let o = this.data.uploadedPhoto;
        let inde = -1;
        o.map((i, index) => {
          if (i.id === id) {
            inde = index;
          }
        })
        o.splice(inde, 1)
        this.setData({
          uploadedPhoto: o
        })
      },
      fail: (err) => {
        wx.showToast({
          title: '删除失败，请重试',
        })
        console.log(err)
      }
    })
  },

  addPhoto() {
    wx.chooseImage({
      success: (res) => {
        console.log(res)
        res.tempFilePaths.map(o => {
          console.log('上传啦   ' + o + '   ' + getApp().globalData.userOpenId)
          wx.cloud.uploadFile({
            cloudPath: getApp().globalData.userOpenId + '/' +  o.split('//')[1],
            filePath: o, // 文件路径
            success: res => {
              // get resource ID
              let p = this.data.uploadedPhoto;
              p.push({
                filePath: o,
                id: res.fileID
              })
              this.setData({
                uploadedPhoto: p
              })
              console.log(res.fileID)
            },
            fail: err => {
              // handle error
              console.log(err)
            }
          })
        })
      },
    })
  },

  /**
   * 生命周期函数--监听页面初次渲染完成
   */
  onReady: function() {

  },

  /**
   * 生命周期函数--监听页面显示
   */
  onShow: function() {

  },

  /**
   * 生命周期函数--监听页面隐藏
   */
  onHide: function() {

  },

  /**
   * 生命周期函数--监听页面卸载
   */
  onUnload: function() {

  },

  /**
   * 页面相关事件处理函数--监听用户下拉动作
   */
  onPullDownRefresh: function() {

  },

  /**
   * 页面上拉触底事件的处理函数
   */
  onReachBottom: function() {

  },

  /**
   * 用户点击右上角分享
   */
  onShareAppMessage: function() {

  }
})