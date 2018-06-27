//app.js
App({
  //获取用户openID
  openid: null,

  onLaunch: function() {
    var that = this;
    wx.login({
      success: function(res) {
        console.log(res);
        wx.request({
          url: 'https://wli5.applinzi.com/code.php',
          data: {
            code: res.code
          },
          header: {
            'content-type': 'application/json' // 默认值
          },
          success: function(res) {
            var data = res.data;
            var openid = data.openid;
            that.openid = openid;
            //console.log(res.data);
          }
        })
      }
    })

  },
  globalData: {
    userInfo: null,
    markers: [],
    longitude: '', //经度  
    latitude: '', //纬度  
    address: '', //地址  
    cityInfo: {}, //城市信息 
    barcodeResult: '',
    username: ''

  }
})