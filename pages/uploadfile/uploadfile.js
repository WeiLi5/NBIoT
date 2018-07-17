// pages/uploadfile/uploadfile.js

var app = getApp();

Page({

  /**
   * 页面的初始数据
   */
  data: {
    imageSrc: "",
    markers:[]
  },

  setTest: function(){
    var that = this;
    var marker = [{a:'123',b:'456'},{a:'789',b:'098765'}]
    that.setData({markers:marker}) 
    console.log(this.data.markers)

  },

  analyData: function() {

    var originData = "000100000001040049031201013436303131313137343233353633380D010134433438344133383330333033323309010101000A010100070101015E010101096020010192B56C0D0601010000001301010000";
    var spliteData = originData.split("")

    //2
    var reserved = spliteData.slice(0, 2).join('');
    var version = spliteData.slice(2, 4);
    var seq = spliteData.slice(4, 12);
    var oid = spliteData.slice(12, 14);
    var length = spliteData.slice(14, 18);
    var msgid = spliteData.slice(18, 20);


    console.log(reserved)
    console.log(version)
    console.log(seq)
    console.log(oid)
    console.log(length)
    console.log(msgid)

    if (reserved == "00") {
      console.log("yea")
    } else {
      console.log("nooo")
    }


    var i = 20;
    var deviceType = [];
    var imsi = "";

    var sn = '';
    var coreVersion = '';
    var signalStrength = '';
    var energy = '';
    var temp = '';
    var repoTime = '';
    var gravitySensor = '';
    var water = '';

    var len = spliteData.length;

    for (var i = 20; i < len;) {
      deviceType = spliteData.slice(i, i + 2).join('')
      //imsi
      if (deviceType == "12") {
        imsi = spliteData.slice(i, i + 36).join('')
        i = i + 36
      }
      //sn
      else if (deviceType == "0D") {
        sn = spliteData.slice(i, i + 36).join('')
        i = i + 36

      }
      //
      else if (deviceType == "09") {
        coreVersion = spliteData.slice(i, i + 10).join('')
        i = i + 10

      } else if (deviceType == "0A") {
        signalStrength = spliteData.slice(i, i + 8).join('')
        i = i + 8

      } else if (deviceType == "07") {
        energy = spliteData.slice(i, i + 10).join('')
        i = i + 10

      } else if (deviceType == "01") {
        temp = spliteData.slice(i, i + 10).join('')
        i = i + 10

      } else if (deviceType == "20") {
        repoTime = spliteData.slice(i, i + 14).join('')
        i = i + 14

      } else if (deviceType == "06") {
        gravitySensor = spliteData.slice(i, i + 12).join('')
        i = i + 12

      } else if (deviceType == "13") {
        water = spliteData.slice(i, i + 10).join('')
        i = i + 10

      } else {
        console.log('数据错误')
      }


    }


    console.log(imsi)
    console.log(water)

  },

  //分段数据解析测试

  analySubData: function() {


    //temp
    var temp = '01010109FC'
    var splitTemp = temp.split('')
    var mTemp = parseInt(splitTemp.slice(6, 10).join(''), 16) / 100.00
    console.log(splitTemp.slice(6, 10).join(''))
    console.log(mTemp)


    //energy
    var energy = '07010101A3'
    var splitEnergy = energy.split('')
    var mEnergy = parseInt(splitEnergy.slice(6, 10).join(''), 16) / 100.00
    console.log(splitEnergy.slice(6, 10).join(''))
    console.log(mEnergy)

    //core
    var coreVersion = '0701010100'
    var splitCore = coreVersion.split('')
    var leftCoreVersion = parseInt(splitCore.slice(6, 8).join(''), 16)
    var rightCoreVersion = parseInt(splitCore.slice(8, 10).join(''), 16)
    var mCoreVersion = [leftCoreVersion, '.', rightCoreVersion, '.'].join('')
    console.log(mCoreVersion)


    //信号强度解析
    var signalStrength = '0A010115'
    var splitSignal = signalStrength.split('')
    var mSignalStrength = parseInt(splitSignal.slice(6, 8).join(''), 16)
    console.log(mSignalStrength)

    //sn解析

    var sn = '0D01014C4847383030313130303030313530';
    var splitSn = sn.split('');
    var hexSn = splitSn.slice(6, 36).join('');
    var mSn = hexCharCodeToStr(hexSn);
    console.log(mSn)

    //imsi解析

    var imsi = '120101343630313131313136383531343031';
    var splitImsi = imsi.split('');
    var hexImsi = splitImsi.slice(6, 36).join('');
    var mImsi = hexCharCodeToStr(hexImsi);
    console.log(mImsi)

    function hexCharCodeToStr(hexCharCodeStr) {　　
      var trimedStr = hexCharCodeStr.trim();　　
      var rawStr = 　　trimedStr.substr(0, 2).toLowerCase() === "0x"　　 ? 　　trimedStr.substr(2)　　 : 　　trimedStr;　　
      var len = rawStr.length;　　
      if (len % 2 !== 0) {　　　　
        alert("Illegal Format ASCII Code!");　　　　
        return "";　　
      }　　
      var curCharCode;　　
      var resultStr = [];　　
      for (var i = 0; i < len; i = i + 2) {　　　　
        curCharCode = parseInt(rawStr.substr(i, 2), 16); // ASCII Code Value
        　　　　
        resultStr.push(String.fromCharCode(curCharCode));　　
      }　　
      return resultStr.join("");
    }

    //重力传感器解析
    var gravitySensor = '060101000000';
    var splitGravitySensor = gravitySensor.split('');
    //用于报警信息检测；【00:正常，01:报警】
    var warnSignal = splitGravitySensor.slice(6, 8).join('')
    var mAngle = parseInt(splitGravitySensor.slice(8, 12).join(''), 16) / 100.00
    console.log(mAngle)
    console.log(warnSignal)




    //水浸解析
    var water = '1301010000'
    var splitWater = water.split('')
    var mWater = splitWater.slice(6, 8).join('')
    var waterWarn = splitWater.slice(8, 10).join('')
    console.log(mWater)
    console.log(waterWarn)


    //时间解析
    var repoTime = '2001015A66C2FC'

    var splitTime = repoTime.split('')
    var unixTime = parseInt(splitTime.slice(6, 14).join(''), 16)
    var mTime = FormatDateTime(unixTime.toString() + '000')
    console.log(mTime)


    function FormatDateTime(UnixTime) {
      var a = UnixTime.replace("/Date(", "").replace(")/", "");
      var date = new Date(parseInt(a));
      var y = date.getFullYear();
      var m = date.getMonth() + 1;
      m = m < 10 ? ('0' + m) : m;
      var d = date.getDate();
      d = d < 10 ? ('0' + d) : d;
      var h = date.getHours();
      h = h < 10 ? ('0' + h) : h;
      var minute = date.getMinutes();
      var second = date.getSeconds();
      minute = minute < 10 ? ('0' + minute) : minute;
      second = second < 10 ? ('0' + second) : second;
      return y + '-' + m + '-' + d + ' ' + h + ':' + minute + ':' + second;
    }


  },




  //***************** */


  //本地缓存测试
  storeData: function() {

    var coverList = [{
      SN: 12345678,
      lat: 39.960686,
      lng: 116.306174,
      address: '葫芦岛'
    }, {
      SN: 66666666,
      lat: 60,
      lng: 100,
      address: '山东'
    }, {
      SN: 88888888,
      lat: 30,
      lng: 11,
      address: '北京'
    }]
    wx.setStorage({
      key: 'coverInfo',
      data: coverList
    })


  },

  getData: function() {
    wx.getStorage({
      key: 'coverInfo',
      success: function(res) {
        //console.log(res.data)
        app.globalData.coverList = res.data
        //console.log(app.globalData.coverList)

      }
    })
  },

  delData: function() {
    //var coverInfo = [];
    wx.getStorage({
      key: 'coverInfo',
      success: function(res) {
        //console.log(res.data)
        app.globalData.coverList = res.data
      }
    })

    for (var j in app.globalData.coverList) {
      if ("66666666" == app.globalData.coverList[j].SN) {
        app.globalData.coverList.splice(j, 1)
      }
    }



    wx.setStorage({
      key: 'coverInfo',
      data: app.globalData.coverList
    })


    //最后
    wx.getStorage({
      key: 'coverInfo',
      success: function(res) {
        console.log(res.data)
        //app.globalData.coverList = res.data
      }
    })
  },



            /*
             
             "ACCOUNT": "MLPROJ-LHJ",
        "METHOD": "LOGIN",
        "PASSWORD": "MLink*1212"
              
             
            */







  downloadImage: function() {
    var that = this;
    var sessionID = "";
    var deviceID = "";
    wx.request({
      url: 'http://112.74.62.193/appservice', //仅为示例，并非真实的接口地址
      data: {
        "ACCOUNT": "WUYONGQIANG",
        "METHOD": "LOGIN",
        "PASSWORD": "Wyq*123123"
      },
      header: {
        'content-type': 'application/json' // 默认值
      },
      method: "POST",
      success: function(res) {

        sessionID = res.data.RESULT.SESSIONID
        //console.log(sessionID)

        //****************** */
        wx.request({
          url: 'http://112.74.62.193/appservice', 
          data: {
            "METHOD": "GETDEVICELIST",
            "SESSIONID": sessionID

          },
          method: "POST",
          header: {
            'content-type': 'application/json' 
          },
          success: function(res) {
            console.log("--------------------")
            console.log(res.data.RESULT)
            console.log("--------------------")
            deviceID = res.data.RESULT[9].DEVICEID



            wx.request({
              url: 'http://112.74.62.193/appservice', //仅为示例，并非真实的接口地址
              data: {
                "SESSIONID": sessionID,
                "METHOD": "PULL",
                "DEVICEID": deviceID,
                "TIMEOUT": 0
              },
              method: "POST",
              header: {
                'content-type': 'application/json' // 默认值
              },
              success: function(res) {
                console.log("用deviceID拿到的")
                console.log(res)
              }
            })

          }
        })

      }
    })
    /*
    sessionID "CDE82575A276DEFF1419898F80221AF9FFA5BD27DEDE4252507EC7410FBA326285C3879767A915DCF1D9D0B81C1D9AA39F3D78F7CE41795865C09BDD3939667A"


    "DEVICEID":"025f6c86-8235-4bd1-abfd-b6e2b827fced"


    
    */

    /*
        wx.request({
          url: 'http://112.74.62.193/appservice', //仅为示例，并非真实的接口地址
          data: {
            "METHOD": "GETDEVICELIST",
            "SESSIONID": sessionID
          
          },
          method: "POST",
          header: {
            'content-type': 'application/json' // 默认值
          },
          success: function (res) {
            console.log("--------------------")
            //console.log(res)
            console.log("--------------------")
            console.log(res)
            console.log("--------------------")

          }
        })

        */
    /*
        wx.request({
          url: 'http://112.74.62.193/appservice', //仅为示例，并非真实的接口地址
          data: {
            "SESSIONID": "CDE82575A276DEFF1419898F80221AF9FFA5BD27DEDE4252507EC7410FBA326285C3879767A915DCF1D9D0B81C1D9AA39F3D78F7CE41795865C09BDD3939667A",
            "METHOD":"PULL",
            "DEVICEID":"025f6c86-8235-4bd1-abfd-b6e2b827fced",
          "TIMEOUT":0
          },
      method: "POST",
          header: {
            'content-type': 'application/json' // 默认值
          },
          success: function (res) {
            //console.log(res.data)
          }
        })

        */


  },


  getOpenId: function() {

    wx.login({
      success: function(res) {
        wx.request({
          url: 'https://wli5.applinzi.com/code.php',
          data: {
            code: res.code
          },
          header: {
            'content-type': 'application/json' // 默认值
          },
          success: function(res) {
            //console.log(res.data)
          }
        })
      }
    })
  },
  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function(options) {

  },

  /**
   * 生命周期函数--监听页面初次渲染完成
   */
  onReady: function() {

  },

  /**
   * 生命周期函数--监听页面显示
   */
  onShow: function() {

  },

  /**
   * 生命周期函数--监听页面隐藏
   */
  onHide: function() {

  },

  /**
   * 生命周期函数--监听页面卸载
   */
  onUnload: function() {

  },

  /**
   * 页面相关事件处理函数--监听用户下拉动作
   */
  onPullDownRefresh: function() {

  },

  /**
   * 页面上拉触底事件的处理函数
   */
  onReachBottom: function() {

  },

  /**
   * 用户点击右上角分享
   */
  onShareAppMessage: function() {

  }
})