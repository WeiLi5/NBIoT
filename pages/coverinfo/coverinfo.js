// pages/coverinfo/coverinfo.js
//所点击井盖的详细信息页面

var app = getApp();
Page({
  data: {
    sn: '',
    oper: '',
    latitude: "",
    longitude: "",
    address: "",
    city: "",
    temperature: "", //温度（单位℃）
    gravityStatus: "", //重力状态 00正常，01报警
    gravityAngle: "", //重力角度（单位：度）
    waterWarning: "", //水浸报警 00正常，01报警
    waterStatus: "", //水浸状态 00正常，01水浸
    battery: "", //电池电量（单位V）
    version: "", //设备内核版本
    signalStrength: "", //信号强度
    reportTime: "", //上报时间
    imsi: "", //IMSI
    errorCode: "", //错误码 1：IP和Port配置错误
    createTime: "",
    operPhone: ""

  },

  //删除此设备
  deleteCover: function () {

    //获取设备deviceID
    wx.request({
      url: 'https://jinggai.woxinshangdi.com/device/delDevice.htm',
      data: {
        "sessionId": app.globalData.sessionId,
        "sn": app.globalData.thisSN

      },
      method: "POST",
      header: {
        'content-type': 'application/x-www-form-urlencoded' // 默认值
      },
      success: function (res) {
        console.log(app.globalData.thisSN)
        console.log(res.data)

        //删除设备成功
        wx.reLaunch({
          url: '../mappage/mappage',
        })
      }
    })
  },


  onLoad: function () {
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
        console.log(res.data.device)
        console.log(res.data)
        app.globalData.sn = res.data.device.thisSN
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






    //视图层数据绑定
    var that = this;
    that.setData({
      //device
      sn: sn,
      latitude: latitude,
      longitude: longitude,
      address: address,
      //deviceData
      temperature: temperature,
      gravityStatus: gravityStatus,
      gravityAngle: gravityAngle,
      waterWarning: waterWarning,
      battery: battery,
      version: version,
      signalStrength: signalStrength,
      reportTime: reportTime,
      imsi: imsi,
      errorCode: errorCode,
      createTime: createTime,
      city: city
    })
    console.log(app.globalData.thisSN)
    console.log(this.data.imsi)



  },
  onReady: function () {
    //视图层数据绑定
    var that = this;
    that.setData({
      sn: app.globalData.thisSN,
      latitude: app.globalData.latitude,
      longitude: app.globalData.longitude,
      address: app.globalData.address,
      city: app.globalData.city,
      operPhone: app.globalData.operPhone,
      //deviceData
            //deviceData
      temperature: app.globalData.temperature,
      gravityStatus: app.globalData.gravityStatus,
      gravityAngle: app.globalData.gravityAngle,
      waterWarning: app.globalData.waterWarning,
      waterStatus: app.globalData.waterStatus,
      battery: app.globalData.battery,
      version: app.globalData.version,
      signalStrength: app.globalData.signalStrength,
      reportTime: app.globalData.reportTime,
      imsi: app.globalData.imsi,
      errorCode: app.globalData.errorCode,
      createTime: app.globalData.createTime,
      city: app.globalData.city

    })
    console.log(app.globalData.thisSN)
    console.log(this.data.oper)
  }

})