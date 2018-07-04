// 引用百度地图微信小程序JSAPI模块   
var bmap = require('../../utils/bmap-wx.js');
var wxMarkerData = []; //定位成功回调对象  
var app = getApp();
Page({
  data: {
    ak: "MF1xKjxAmcFcD2ERWLElpshMTk0Da4hc", //填写申请到的ak  
    markers: [],
    longitude: '', //经度  
    latitude: '', //纬度  
    address: '', //地址  
    sn: '',
    cityInfo: {} //城市信息  
  },
  /* 
  
  REQ
{
“SESSIONID”:”XXXXXXXX”
“METHOD”:”ADDDEVICE”,
“DEVICEINFO”:
{
“ACCESSTECHNOLOGY”:”NB”,
“VENDOR”:”CT”,

2017-8-3 5
“NODEID”:”8612345678901234”,
"DESCRIPTION":"a test node",
“DEVICETYPE”:”BASICSERVICE”
}
}
  */

  addConfirm: function() {
    wx.request({
      url: 'http://112.74.62.193/appservice', //仅为示例，并非真实的接口地址
      data: {
        "SESSIONID": app.globalData.sessionID,
        "METHOD": "ADDDEVICE",
        "DEVICEINFO": {
          "ACCESSTECHNOLOGY": "NB",
          "VENDOR": "CT",
          "NODEID": app.globalData.barcodeResult, //这里是SN，之后需替换成扫码结果
          "DESCRIPTION": "a test node",
          "DEVICETYPE": "BASICSERVICE"
        }
      },
      method: "POST",
      header: {
        'content-type': 'application/json' // 默认值
      },
      success: function(res) {
        //检查ERRORCODE
        if (res.data.ERRORCODE == 0) {
          console.log(res)
          console.log(app.globalData.sessionID)
          //console.log(app.globalData.barcodeResult)

          //同时把此设备添加到coverList中
          //设备对应一个object，如{SN:123456789,lat:20,lng:30}
          //正式版本此部分需上传到服务器
          app.globalData.coverList[(app.globalData.coverList).length] = {
            SN: app.globalData.barcodeResult,
            lat: app.globalData.latitude,
            lng: app.globalData.longitude,
            address: app.globalData.address
          }
          //将数据存储在本地缓存中
          wx.setStorage({
            key: 'coverInfo',
            data: app.globalData.coverList
          })

          wx.redirectTo({
            url: '../mappage/mappage',
          })
        }
        else{
          console.log("设备识别或添加失败")
        }
      }

    })

    console.log(app.globalData.coverList)
  },
  onLoad: function(options) {
    var that = this;
    /* 获取定位地理位置 */
    // 新建bmap对象   
    var BMap = new bmap.BMapWX({
      ak: that.data.ak
    });
    var fail = function(data) {
      console.log(data);
    };
    var success = function(data) {
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