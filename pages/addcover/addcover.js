// 引用百度地图微信小程序JSAPI模块   
var bmap = require('../../utils/bmap-wx.js');
var wxMarkerData = []; //定位成功回调对象  
var app = getApp();
Page({
  data: {
    ak: "VNuApmSavnK7xuxIxxAgq1gp8FIpANxQ", //填写申请到的ak  
    markers: [],
    longitude: '', //经度  
    latitude: '', //纬度  
    address: '', //地址  
    sn: '',//sn
    coverNo:'',
    city:''//城市
  },

  //获取用户输入的井盖号码
  bindCoverNo:function(e){
    this.setData({
      coverNo:e.detail.value
    })

  },



  addConfirm: function() {
   
    wx.request({
      url: 'https://jinggai.woxinshangdi.com/device/addDevice.htm', 
      data: {
        "sessionId": app.globalData.sessionId,
        "sn": 'LHJ800210000006',
        "latitude": app.globalData.latitude,
        "longitude": app.globalData.longitude,
        "address":app.globalData.address,
        "city":app.globalData.city,
        "description":"测试井盖"
        
      },
      method: "POST",
      header: {
        'content-type': 'application/x-www-form-urlencoded' // 默认值
      },
      success: function(res) {
        if (res.data.retCode == 0){
        console.log("添加设备成功")
        //添加设备
        wx.reLaunch({
          url: '../mappage/mappage',
        })
        }
        else{
          wx.showModal({
            title: '添加失败',
            content: res.data.retMsg,
          })
        }

      }
    })

  },
  onShow: function(options) {
    console.log(app.globalData.barcodeResult)
    console.log(app.globalData.latitude)
    console.log(app.globalData.longitude)
    console.log(app.globalData.address)
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
        sn: app.globalData.barcodeResult,
        city: app.globalData.city

      });

    }
    // 发起regeocoding检索请求   
    BMap.regeocoding({
      fail: fail,
      success: success
    });
  }

})