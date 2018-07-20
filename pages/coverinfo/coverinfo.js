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
    warningInfo:'',
    gravityAngle: "", //重力角度（单位：度）

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
    wx.showModal({
      title: '删除设备',
      content: '是否确认将此设备删除？',
      confirmText: "确认",
      cancelText: "取消",
      success: function (res) {
        console.log(res);
        if (res.confirm) {
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

              //删除设备成功
              wx.reLaunch({
                url: '../mappage/mappage',
              })
            }
          })



        } else {
          console.log('用户点击取消')
        }
      }
    });

  },
  checkLog:function(){
    wx.redirectTo({
      url: '../logInfo/logInfo',
    })
  },




  onLoad: function () {

    var _this = this;



    //获取单个设备信息
    wx.request({
      url: 'https://jinggai.lhj.mlink-tech.cn/device/queryDevice.htm',
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
        //设备状态：1正常；2水浸；3撬动；4未收到设备上报数据；5水浸且撬动；
        if(res.data.device.status == 1){
          app.globalData.warningInfo = '正常'
        }
        if (res.data.device.status == 2) {
          app.globalData.warningInfo = '水浸'
        }
        if (res.data.device.status == 3) {
          app.globalData.warningInfo = '撬动'
        }
        if (res.data.device.status == 4) {
          app.globalData.warningInfo = '未收到设备上报数据'
        }
        if (res.data.device.status == 5) {
          app.globalData.warningInfo = '水浸且撬动'
        }

        app.globalData.temperature = res.data.deviceData.temperature;
        app.globalData.gravityAngle = res.data.deviceData.gravityAngle;
        app.globalData.waterStatus = res.data.deviceData.waterStatus;
        app.globalData.battery = res.data.deviceData.battery;
        app.globalData.version = res.data.deviceData.version;
        app.globalData.signalStrength = res.data.deviceData.signalStrength;
        app.globalData.reportTime = res.data.deviceData.reportTime;
        app.globalData.imsi = res.data.deviceData.imsi;
        app.globalData.errorCode = res.data.deviceData.errorCode;
        app.globalData.createTime = res.data.deviceData.createTime;
        

        //视图层数据绑定
        _this.setData({
          sn: app.globalData.sn,
          latitude: app.globalData.latitude,
          longitude: app.globalData.longitude,
          address: app.globalData.address,
          city: app.globalData.city,
          operPhone: app.globalData.operPhone,
          warningInfo: app.globalData.warningInfo,
          //deviceData
          temperature: app.globalData.temperature,
          gravityAngle: app.globalData.gravityAngle,
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




      }
    })


  },


})