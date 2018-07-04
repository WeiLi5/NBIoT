// pages/coverinfo/coverinfo.js
//所点击井盖的详细信息页面

var app = getApp();
Page({
  data: {
    sn: '',
    latitude : "",
    longitude : "",
    address : "",

  },

  //删除此设备
  deleteCover: function(){
    var deviceID = '';

    //获取设备deviceID
    wx.request({
      url: 'http://112.74.62.193/appservice',
      data: {
        "METHOD": "GETDEVICELIST",
        "SESSIONID": app.globalData.sessionID

      },
      method: "POST",
      header: {
        'content-type': 'application/json' // 默认值
      },
      success: function (res) {
        for (var i in res.data.RESULT){
          if (app.globalData.thisSN ==res.data.RESULT[i].SN){
            deviceID = res.data.RESULT[i].DEVICEID
          }
        }

        //删除设备api
        wx.request({
          url: 'http://112.74.62.193/appservice',
          data: {
            "SESSIONID": app.globalData.sessionID,
            "METHOD": "DELDEVICE",
            "DEVICEID": deviceID
          },
          header: {
            'content-type': 'application/json' // 默认值
          },
          method: "POST",
          success: function (res) {
            console.log(res)

            //设备删除成功
            //在此删除coverList中的对应设备
            //TODO：正式版本不应存在本地缓存

            for (var j in app.globalData.coverList){
              if (app.globalData.thisSN == app.globalData.coverList[j].SN){
                app.globalData.coverList.splice(j,1)
              }
            }

            wx.setStorage({
              key: 'coverInfo',
              data: app.globalData.coverList
            })


            wx.redirectTo({
              url: '../mappage/mappage',
            })
          }
        })


      }
    })
  },


  onLoad: function(options) {
    var coverList = app.globalData.coverList;
    var latitude = "";
    var longitude = "";
    var sn = "";
    var address = "";

    for (var i in coverList) {
      if (coverList[i].SN == app.globalData.thisSN) {
        sn = coverList[i].SN
        latitude = coverList[i].lat
        longitude = coverList[i].lng
        address = coverList[i].address
      } else {
        console.log("marker 点击出现错误")
      }
    }
    var that = this;
    that.setData({
      sn: sn,
      latitude: latitude,
      longitude: longitude,
      address: address,
    })
    console.log(address)
    console.log(address)
    console.log(coverList[0].SN)
    console.log(app.globalData.thisSN)

  },


})