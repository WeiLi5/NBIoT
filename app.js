//app.js
var app = getApp();
App({
  //获取用户openID
  openid: null,


  onLaunch: function() {
  },

  onShow: function () {
    // Do something when show.
  },
  onHide: function () {
      // Do something when hide.
  },

  globalData: {
    oper:'',
    userInfo: null,
    markers: [],
    longitude: '', //经度  
    latitude: '', //纬度  
    address: '', //地址  
    cityInfo: {}, //城市信息 
    barcodeResult: '',
    city:'',
    sessionId: '',
    marker:[],
    thisSN: '',
    warningSignal: '',
    code: '',
    //deviceData
    temperature: '',
    gravityStatus: '',
    gravityAngle: '',
    waterWarning: '',
    battery: '',
    version: '',
    signalStrength: '',
    reportTime: '',
    imsi: '',
    errorCode: '',
    createTime: '',
    city: ''

  }
})