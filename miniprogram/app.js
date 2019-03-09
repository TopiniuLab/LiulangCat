//app.js
App({
  onLaunch: function () {
    wx.getSystemInfo({
      success: (res) => {
        this.globalData.containerHeight=res.windowHeight
      },
    })
    this.initWxCloud();
    if (!wx.cloud) {
      console.error('请使用 2.2.3 或以上的基础库以使用云能力')
    } else {
      wx.cloud.init({
        traceUser: true,
      })
    }

    //获取用户openid
    wx.cloud.callFunction({
      name: 'login',
      success: (res) => {
        console.log('app.js ===> ', res.result)
        this.globalData.userOpenId = res.result.openid;
      },
      fail: (err) => {
        console.log(err)
      }
    })

  },
  globalData: {
    DB: null,
    TB: null,
    userOpenId:'',
    containerHeight:0
  },
  // 初始化数据库
  initWxCloud() {
    wx.cloud.init({
      env: 'dev-c86710',
      traceUser: true
    });

    const db = wx.cloud.database({
      config: {
        env: 'dev-c86710',
        // env: 'livestory-online-0c2f81',
      }
    });
    const tb = db.collection('catlist');
    this.globalData.DB = db;
    this.globalData.TB = tb;
    console.log(this.globalData.DB)
  }
})
