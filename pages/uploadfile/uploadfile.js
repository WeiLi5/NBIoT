// pages/uploadfile/uploadfile.js
Page({

  /**
   * 页面的初始数据
   */
  data: {
    imageSrc: ""
  },



  downloadImage: function() {
    var that = this;
    var sessionID = "";
    var deviceID = "";
    wx.request({
      url: 'http://112.74.62.193/appservice', //仅为示例，并非真实的接口地址
      data: {
        "ACCOUNT": "MLPROJ-LHJ",
        "METHOD": "LOGIN",
        "PASSWORD": "MLink*1212"
      },
      header: {
        'content-type': 'application/json' // 默认值
      },
      method:"POST",
      success: function(res) {
        //console.log(res)
        //console.log(res.data.RESULT.SESSIONID)

        sessionID = res.data.RESULT.SESSIONID
        //console.log(res.data.RESULT.SESSIONID)
        console.log(sessionID)

        //****************** */
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
            console.log(res.data.RESULT)
            console.log(res.data.RESULT[0].DEVICEID)
            console.log("--------------------")
            deviceID = res.data.RESULT[0].DEVICEID

            /**************** */

            wx.request({
              url: 'http://112.74.62.193/appservice', //仅为示例，并非真实的接口地址
              data: {
                "SESSIONID":sessionID,
                "METHOD": "PULL",
                "DEVICEID": deviceID,
                "TIMEOUT": 0
              },
              method: "POST",
              header: {
                'content-type': 'application/json' // 默认值
              },
              success: function (res) {
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