// pages/coverinfo/coverinfo.js
//所点击井盖的详细信息页面

var app = getApp();
Page({
  data: {
    sn: '',
    oper: '',
    coverNo:'',
    latitude: "",
    longitude: "",
    address: "",
    city: "",

    warningInfo: '',

 
    battery: "", //电池电量（单位V）
    version: "", //设备内核版本
    signalStrength: "", //信号强度
    reportTime: "", //上报时间
    imsi: "", //IMSI
    errorCode: "", //错误码 1：IP和Port配置错误
    createTime: "",
    operPhone: "",
    ifRecalibrate: "",
    reportingInterval: "", //设备校准的数据
    reportInterval: "" //上报间隔

  },

  //获取用户输入的上报时间
  bindReportingInterval: function(e) {
    this.setData({
      reportingInterval: e.detail.value
    })

  },
  //设置设备上报间隔
  configInterval: function() {

    var dataForRec;

    app.globalData.reportingInterval = this.data.reportingInterval
    var num = parseInt(app.globalData.reportingInterval);

    if (typeof num !== 'number' || num % 1 !== 0 || num < 1 || num > 30) {
      wx.showModal({
        content: '输入的上报间隔有误，数值范围需在1-30之间',
        showCancel: false,
      })

    } else {

      //上报间隔数据

      num = num.toString(16)
      if (num.length == 1) {
        num = '000' + num
      }
      if (num.length == 2) {
        num = '00' + num
      }

      dataForRec = '0001000000010A000501110101' + num
                    

      console.log(dataForRec)


      wx.request({
        url: 'https://jinggai.lhj.mlink-tech.cn/device/pushData.htm',
        data: {
          "sessionId": app.globalData.sessionId,
          "sn": app.globalData.thisSN,
          'packet': dataForRec
        },
        method: "POST",
        header: {
          'content-type': 'application/x-www-form-urlencoded' // 默认值
        },
        success: function(res) {
          if (res.data.retCode == 0) {
            wx.showToast({
              title: '设置成功',
              icon: 'success',
              duration: 3000
            });
          } else {
            wx.showToast({
              title: '设置失败',
              icon: 'fail',
              duration: 3000
            });
          }
        }
      })
    }



  },

  //校准设备
  recalibrateDevice: function() {

    wx.request({
      url: 'https://jinggai.lhj.mlink-tech.cn/device/pushData.htm',
      data: {
        "sessionId": app.globalData.sessionId,
        "sn": app.globalData.thisSN,
        'packet': '0001000000010A0005012301015566'

      },
      method: "POST",
      header: {
        'content-type': 'application/x-www-form-urlencoded' // 默认值
      },
      success: function(res) {
        if (res.data.retCode == 0) {
          wx.showToast({
            title: '校准成功',
            icon: 'success',
            duration: 3000
          });
        } else {
          wx.showToast({
            title: '校准失败',
            icon: 'fail',
            duration: 3000
          });
        }
      }
    })



  },

  //删除此设备
  deleteCover: function() {
    wx.showModal({
      title: '删除设备',
      content: '是否确认将此设备删除？',
      confirmText: "确认",
      cancelText: "取消",
      success: function(res) {
        console.log(res);
        if (res.confirm) {
          wx.request({
            url: 'https://jinggai.lhj.mlink-tech.cn/device/delDevice.htm',
            data: {
              "sessionId": app.globalData.sessionId,
              "sn": app.globalData.thisSN

            },
            method: "POST",
            header: {
              'content-type': 'application/x-www-form-urlencoded' // 默认值
            },
            success: function(res) {

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

  checkLog: function() {
    wx.redirectTo({
      url: '../logInfo/logInfo',
    })
  },


  onLoad: function() {

    var _this = this;



    //获取单个设备信息
    wx.request({
      url: 'https://jinggai.lhj.mlink-tech.cn/device/queryDevice.htm',
      //"LHJ800121000250" app.globalData.thisSN
      data: {
        "sn": app.globalData.thisSN
      },
      method: "GET",
      header: {
        'content-type': 'application/json'
      },
      success: function(res) {
        console.log(res.data)
        app.globalData.sn = res.data.device.sn
        app.globalData.coverNo = res.data.device.number
        app.globalData.longitude = res.data.device.longitude
        app.globalData.latitude = res.data.device.latitude
        app.globalData.operPhone = res.data.device.operPhone
        app.globalData.address = res.data.device.address
        app.globalData.city = res.data.device.city
        //设备状态：1正常；2水浸；3撬动；4未收到设备上报数据；5水浸且撬动；
        if (res.data.device.status == 1) {
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

        //app.globalData.ifRecalibrate 
        if (res.data.deviceData.isAdjusted == '00') {
          app.globalData.ifRecalibrate = '未校准'
        }

        if (res.data.deviceData.isAdjusted == '01') {
          app.globalData.ifRecalibrate = '已校准'
        }



      /*
     
        if (res.data.deviceData.waterStatus == '00') {
          app.globalData.waterStatus = '未水浸'
        }
        if (res.data.deviceData.waterStatus == '01') {
          app.globalData.waterStatus = '水浸'
        }
      */

        //我们电池最高是3.6，最低差不多3.1。可以设成3.4以上是高，3.2~3.4为中，3.2以下低。
        var battery = parseFloat(res.data.deviceData.battery);
        if (battery <= 3.2){
          app.globalData.battery = '低'
        }
        if (battery >= 3.4) {
          app.globalData.battery = '高'
        }
        if (battery < 3.4 && battery > 3.2) {
          app.globalData.battery = '中'
        }


        //信号强度20以上高 10以上中 10以下低 
        var signal = parseFloat(res.data.deviceData.signalStrength);
        if (signal <= 10) {
          app.globalData.signalStrength = '低'
        }
        if (signal >= 20) {
          app.globalData.signalStrength = '高'
        }
        if (signal < 20 && signal > 10) {
          app.globalData.signalStrength = '中'
        }


        app.globalData.version = res.data.deviceData.version;
        
        app.globalData.reportTime = res.data.deviceData.reportTime;
        app.globalData.imsi = res.data.deviceData.imsi;
        app.globalData.errorCode = res.data.deviceData.errorCode;
        app.globalData.createTime = res.data.deviceData.createTime;

        if (res.data.deviceData.reportInterval == null){
          app.globalData.reportInterval = '1 天';
        }
        else{
          app.globalData.reportInterval = res.data.deviceData.reportInterval + ' 天'

        }
     
        


        //视图层数据绑定
        _this.setData({
          sn: app.globalData.sn,
          coverNo: app.globalData.coverNo,
          latitude: app.globalData.latitude,
          longitude: app.globalData.longitude,
          address: app.globalData.address,
          city: app.globalData.city,
          operPhone: app.globalData.operPhone,
          warningInfo: app.globalData.warningInfo,
          //deviceData
          
      
          reportInterval: app.globalData.reportInterval,
          battery: app.globalData.battery,
          version: app.globalData.version,
          signalStrength: app.globalData.signalStrength,
          reportTime: app.globalData.reportTime,
          imsi: app.globalData.imsi,
          errorCode: app.globalData.errorCode,
          createTime: app.globalData.createTime,
          city: app.globalData.city,
          ifRecalibrate: app.globalData.ifRecalibrate
        })
      }
    })


  },


})