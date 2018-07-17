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
          left: 220,
          top: 20,
          width: 50,
          height: 50
        },
        clickable: true
    }, {
      id: 'showmarker',
      iconPath: '../../images/icon_show_marker.png',
      position: {
        left: 140,
        top: 20,
        width: 50,
        height: 50
      },
      clickable: true
    },

      {
        id: 'usercentre',
        iconPath: '../../images/icon_usercenter.png',
        position: {
          left: 300,
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
    console.log(e.markerId)



    var that = this

    wx.showActionSheet({
      itemList: ["查看该井盖信息", "开始导航","警报归位"],
      success: function(res) {
        console.log(res.tapIndex)
        if (res.tapIndex == 0) {
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
    if (e.controlId === 'usercentre') {
      wx.navigateTo({
        url: '../usercentre/usercentre',
      })
    } 
    if (e.controlId === 'showmarker'){
      var _this = this;
      console.log("111111111111111")
      console.log(this.data.markers)
      console.log(app.globalData.marker)
      _this.setData({
        markers: app.globalData.marker
      })
      console.log('2222222222222222')
      console.log(this.data.markers)
      console.log(app.globalData.marker)


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