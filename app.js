//app.js
var app = getApp();
App({
  //获取用户openID
  openid: null,


  onLaunch: function() {},
  onReady: function() {},

  onShow: function() {
    // Do something when show.
  },
  onHide: function() {
    // Do something when hide.
  },

  globalData: {
    logMsg: [],
    logColor: [],
    operPhone: '',
    userInfo: null,
    markers: [],
    longitude: '', //经度  
    latitude: '', //纬度  
    address: '', //地址  
    cityInfo: {}, //城市信息 
    barcodeResult: '',
    city: '',
    sessionId: '',
    marker: [],
    thisSN: '',
    warningSignal: '',
    code: '',
    //deviceData
    ifRecalibrate: '',
    recalibrateData: '',
    reportingInterval: '',
    waterStatus: '',
    warningInfo: '',
    battery: '',
    version: '',
    signalStrength: '',
    reportTime: '',
    imsi: '',
    errorCode: '',
    createTime: '',
    sn: 'xxx',
    coverNo: '', //井盖编号
    reportInterval: '', //上报间隔
    city: ''

  }
})