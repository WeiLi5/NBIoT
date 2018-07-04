var app = getApp();

//引入百度地图api
var bmap = require('../../utils/bmap-wx.js');
//用于保存BMap.search接口返回的数据
var wxMarkerData = [];

Page({
  data: {
    Height: 0,
    scale: 13,
    markers: [],
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

  onLoad: function() {
    var _this = this;
    var BMap = new bmap.BMapWX({
      ak: 'MF1xKjxAmcFcD2ERWLElpshMTk0Da4hc'

    })

    //把设备信息从缓存中取出，存到全局变量中
    wx.getStorage({
      key: 'coverInfo',
      success: function (res) {
        app.globalData.coverList = res.data
      }
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
      console.log(data);
      wxMarkerData = data.wxMarkerData;

      app.globalData.latitude = wxMarkerData[0].latitude,
        app.globalData.longitude = wxMarkerData[0].longitude,
        app.globalData.address = wxMarkerData[0].address
    }


    var fail = function(data) {
      console.log(data);
    }
    BMap.regeocoding({
      fail: fail,
      success: success
    });


    wx.getLocation({
      type: 'wgs84', // 默认为 wgs84 返回 gps 坐标，gcj02 返回可用于 wx.openLocation 的坐标
      success: function(res) {



        var datas = app.globalData.coverList

        var marker = [];
        for (var i in datas) {

          if (true) {
            marker[i] = {
              id: datas[i].SN,
              longitude: datas[i].lng,
              latitude: datas[i].lat,
              width: 50,
              height: 50,
              iconPath: "../../images/map-marker-icon.png",
              title: datas[i].SN
            }
          } else {
            marker[i] = {
              id: i,
              longitude: datas[i].lng,
              latitude: datas[i].lat,
              width: 50,
              height: 50,
              iconPath: "../../images/map-marker-icon-normal.png",
              title: datas[i].SN
            }

          }
        }



        _this.setData({
          latitude: res.latitude,
          longitude: res.longitude,
          markers: marker

        })

        //console.log(this.data.markers)
        //console.log(this.data.marker)

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
    console.log(app.globalData.thisSN)



    var that = this

    wx.showActionSheet({
      itemList: ["查看该井盖信息", "警报归位"],
      success: function(res) {
        console.log(res.tapIndex)
        if (res.tapIndex == 0) {
          wx.navigateTo({
            url: '../coverinfo/coverinfo',
          })
        }
        if (res.tapIndex == 1) {
          console.log(e)
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
    } else {
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