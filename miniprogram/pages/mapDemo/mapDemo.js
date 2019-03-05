Page({
  onReady(e){
    this.mapCtx.moveToLocation();
  },
  onLoad() {
    this.mapCtx = wx.createMapContext('map', this);
  },
  go(){
    console.log('kkk')
    this.mapCtx.moveToLocation();
  }
})