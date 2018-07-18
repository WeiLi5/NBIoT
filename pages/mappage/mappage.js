var app = getApp();

//引入百度地图api
var bmap = require('../../utils/bmap-wx.js');
//用于保存BMap.search接口返回的数据
var wxMarkerData = [];

Page({
  data: {
    Height: 0,
    scale: 13,
    //testP:"xxxxxxx",
    markers:[{xxx:"dsdsd"}],

    controls: [{
        id: 1,
        iconPath: '../../images/icon_scan.png',
        position: {
          left: 20,
          top: 20,
          width: 50,
          height: 50
        },
        clickable: true
    }, {
      id: 'showmarker',
      iconPath: '../../images/icon_show_marker.png',
      position: {
        left: 90,
        top: 20,
        width: 50,
        height: 50
      },
      clickable: true
    }
    ],
    circles: []

  },


  onShow: function() {
    var _this = this;
    var BMap = new bmap.BMapWX({
      ak: 'VNuApmSavnK7xuxIxxAgq1gp8FIpANxQ'

    })



    wx.getSystemInfo({
      success: function(res) {
        //设置map高度，根据当前设备宽高满屏显示
        _this.setData({
          view: {
            Height: res.windowHeight
          }

        })
      }
    })

    var success = function(data) {
      app.globalData.latitude = data.wxMarkerData[0].latitude
      app.globalData.longitude = data.wxMarkerData[0].longitude
      app.globalData.address = data.wxMarkerData[0].address
      app.globalData.city = data.originalData.result.addressComponent.city
    }

    var fail = function(data) {
      console.log(data);
    }
    BMap.regeocoding({
      fail: fail,
      success: success
    });


    wx.getLocation({
      type: 'wgs84', 
      success: function(res) {

        


        //从服务器取到设备信息
        //var datas = app.globalData.coverList
        wx.getStorage({
          key: 'sessionId',
          success: function (res) {
            app.globalData.sessionId = res.data

            wx.request({
              url: 'https://jinggai.woxinshangdi.com/device/deviceList.htm',
              data: {
                sessionId: res.data
          },
              header: {
                'content-type': 'application/json' // 默认值
              },
              success: function (res) {
                console.log("获取设备列表成功")
                var datas = res.data.deviceList;
                console.log(datas)
                console.log("+++++++++++++++++++++")
                console.log(res.data)
                //初始化清空全局marker list
                //主要为了设备全部删光的情况
                app.globalData.marker = []


                for (var i in datas) {

                  if (true) {
                    app.globalData.marker[i] = {
                      id: datas[i].sn,
                      longitude: datas[i].longitude,
                      latitude: datas[i].latitude,
                      width: 50,
                      height: 50,
                      iconPath: "../../images/map-marker-icon.png",
                      title: datas[i].sn
                    }
                  } else {
                    app.globalData.marker[i] = {
                      id: datas[i].sn,
                      longitude: datas[i].longitude,
                      latitude: datas[i].latitude,
                      width: 50,
                      height: 50,
                      iconPath: "../../images/map-marker-icon-normal.png",
                      title: datas[i].sn
                    }

                  }
                }

                _this.setData({
                  markers: app.globalData.marker
                })


              }
            })
          }
        })


        _this.setData({
          latitude: res.latitude,
          longitude: res.longitude,
          
        })
      }

    })


  

  },

  regionchange(e) {
    console.log("regionchange===" + e.type)
  },

  //点击merkers
  markertap(e) {
    //console.log(e.markerId)
    app.globalData.thisSN = e.markerId
 



    var that = this

    wx.showActionSheet({
      itemList: ["查看该井盖信息", "开始导航","警报归位"],
      success: function(res) {
        console.log(res.tapIndex)
        if (res.tapIndex == 0) {
/*
          var latitude = "";
          var longitude = "";
          var sn = "";
          var address = "";
          var city = "";
          var temperature = "";
          var gravityStatus = "";
          var gravityAngle = "";
          var waterWarning = "";
          var waterStatus = "";
          var battery = "";
          var version = "";
          var signalStrength = "";
          var reportTime = "";
          var imsi = "";
          var errorCode = "";
          var createTime = "";
          var operPhone = "";



          //获取单个设备信息
          wx.request({
            url: 'https://jinggai.woxinshangdi.com/device/queryDevice.htm',
            data: {
              "sn": app.globalData.thisSN
            },
            method: "GET",
            header: {
              'content-type': 'application/json'
            },
            success: function (res) {
              console.log(res.data)
              app.globalData.sn = res.data.device.sn
              app.globalData.longitude = res.data.device.longitude
              app.globalData.latitude = res.data.device.latitude
              app.globalData.operPhone = res.data.device.operPhone
              app.globalData.address = res.data.device.address
              app.globalData.city = res.data.device.city

              app.globalData.temperature = res.data.deviceData.temperature;
              app.globalData.gravityStatus = res.data.deviceData.gravityStatus;
              app.globalData.gravityAngle = res.data.deviceData.gravityAngle;
              app.globalData.waterWarning = res.data.deviceData.waterWarning;
              app.globalData.waterStatus = res.data.deviceData.waterStatus;
              app.globalData.battery = res.data.deviceData.battery;
              app.globalData.version = res.data.deviceData.version;
              app.globalData.signalStrength = res.data.deviceData.signalStrength;
              app.globalData.reportTime = res.data.deviceData.reportTime;
              app.globalData.imsi = res.data.deviceData.imsi;
              app.globalData.errorCode = res.data.deviceData.errorCode;
              app.globalData.createTime = res.data.deviceData.createTime;





            }
            
          })
          */
          wx.navigateTo({
            url: '../coverinfo/coverinfo',
          })
        }
        if (res.tapIndex == 1) {
          //获取所点击的井盖地理位置信息
          //获取单个设备信息
          wx.request({
            url: 'https://jinggai.woxinshangdi.com/device/queryDevice.htm',
            data: {
              "sn": app.globalData.thisSN
            },
            method: "GET",
            header: {
              'content-type': 'application/json'
            },
            success: function (res) {
              wx.openLocation({
                latitude: Number(res.data.device.latitude),
                longitude: Number(res.data.device.longitude),
                scale: 18,
                name: app.globalData.thisSN,
                address: res.data.device.address
              })
            }
          })

        }
      },
      fail: function(res) {
        console.log(res.errMsg)
      }
    })
  },

  //点击缩放按钮动态请求数据
  controltap(e) {
    var that = this;
    console.log("scale===" + this.data.scale)
    if (e.controlId === 'showmarker'){
      var _this = this;
      _this.setData({
        markers: app.globalData.marker
      })
    }
    if(e.controlId === 1) {
      wx.scanCode({
        onlyFromCamera: true,
        scanType: 'barCode',
        success: (res) => {
          app.globalData.barcodeResult = res.result
          wx.navigateTo({
            url: '../addcover/addcover',
          })
        }
      })
    }
  },

})