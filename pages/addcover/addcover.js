// 引用百度地图微信小程序JSAPI模块   
var bmap = require('../../utils/bmap-wx.js');
var wxMarkerData = [];  //定位成功回调对象  
var app = getApp();
Page({
  data: {
    ak: "MF1xKjxAmcFcD2ERWLElpshMTk0Da4hc", //填写申请到的ak  
    markers: [],
    longitude: '',   //经度  
    latitude: '',    //纬度  
    address: '',     //地址  
    sn: '',
    cityInfo: {}     //城市信息  
  },
  onLoad: function (options) {
    var that = this;
    /* 获取定位地理位置 */
    // 新建bmap对象   
    var BMap = new bmap.BMapWX({
      ak: that.data.ak
    });
    var fail = function (data) {
      console.log(data);
    };
    var success = function (data) {
      //返回数据内，已经包含经纬度  
      console.log(data);
      //使用wxMarkerData获取数据  
      wxMarkerData = data.wxMarkerData;
      //把所有数据放在初始化data内  
      that.setData({
        latitude: app.globalData.latitude,
        longitude: app.globalData.longitude,
        address: app.globalData.address,
        sn: app.globalData.barcodeResult

      });
     
    }
    // 发起regeocoding检索请求   
    BMap.regeocoding({
      fail: fail,
      success: success
    });
  }

})  