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
    }
    /*
    , {
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

    */
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
                sessionId: app.globalData.sessionId
          },
              header: {
                'content-type': 'application/json' // 默认值
              },
              success: function (res) {
                console.log("获取设备列表成功")
                var datas = res.data.deviceList;
                var warn = '';
                console.log(datas[1].status)
                //初始化清空全局marker list
                //主要为了设备全部删光的情况
                app.globalData.marker = []

          //设备状态：1正常；2水浸；3撬动；4未收到设备上报数据；5水浸且撬动；
          

                for (var i in datas) {

                  if (datas[i].status == 1) {
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
                  if (datas[i].status == 2) {
                    app.globalData.marker[i] = {
                      id: datas[i].sn,
                      longitude: datas[i].longitude,
                      latitude: datas[i].latitude,
                      width: 50,
                      height: 50,
                      iconPath: "../../images/map-marker-icon-water.png",
                      title: datas[i].sn
                    }
                  } 
                  if (datas[i].status == 3) {
                    app.globalData.marker[i] = {
                      id: datas[i].sn,
                      longitude: datas[i].longitude,
                      latitude: datas[i].latitude,
                      width: 50,
                      height: 50,
                      iconPath: "../../images/map-marker-icon-warn.png",
                      title: datas[i].sn
                    }
                  }
                  if (datas[i].status == 4) {
                    app.globalData.marker[i] = {
                      id: datas[i].sn,
                      longitude: datas[i].longitude,
                      latitude: datas[i].latitude,
                      width: 50,
                      height: 50,
                      iconPath: "../../images/map-marker-icon-nodata.png",
                      title: datas[i].sn
                    }
                  }  
                  if (datas[i].status == 5) {
                    app.globalData.marker[i] = {
                      id: datas[i].sn,
                      longitude: datas[i].longitude,
                      latitude: datas[i].latitude,
                      width: 50,
                      height: 50,
                      iconPath: "../../images/map-marker-icon-doublewarn.png",
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

        //查看井盖详细上报信息
        if (res.tapIndex == 0) {
          wx.navigateTo({
            url: '../coverinfo/coverinfo',
          })
        }
        if (res.tapIndex == 1) {
          //获取所点击的井盖地理位置信息
          //调用获取单个设备数据接口
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
              //打开导航
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

        //解除警报
        if (res.tapIndex == 2) {
          //判断设备是否处于报警状态



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
              if (res.data.device.status == 1 ||res.data.device.status == 4){
                wx.showModal({
                  content: '此设备不处于警报状态或处于未上报数据状态，黄色指针属于未上报状态，未上报状态无法手动解除警报',
                  showCancel: false,
                  success: function (res) {
                    if (res.confirm) {
                      console.log('确定')
                    }
                  }
                });

              }
              else{



                //调用解除警报接口
                wx.request({
                  url: 'https://jinggai.woxinshangdi.com/device/releaseAlarm.htm',

                  data: {
                    "sessionId": app.globalData.sessionId,
                    "sn": app.globalData.thisSN
                  },
                  method: "POST",
                  header: {
                    'content-type': 'application/x-www-form-urlencoded'
                  },
                  success: function (res) {
                    if (res.data.retCode == 0) {
                      //刷新地图页面
                      //未发现好方法
                      //-------
                      wx.reLaunch({
                        url: '../alarmRelease/alarmRelease',
                      })


                      ///------

                    }
                    else {
                      wx.showModal({
                        title: '解除警报失败',
                        content: res.data.retMsg,
                      });
                    }
                  }

                })


              }

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