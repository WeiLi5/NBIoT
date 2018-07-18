// pages/mainlog/mainlog.js
var app = getApp();

Page({
  onLoad:function(){
    wx.login({
      success: function (res) {
        if (res.code) {
          app.globalData.code = res.code
        } else {
          console.log('登录失败！' + res.errMsg)
        }
      }
    });
  },




  getPhoneNumber: function (e) {
    var errMsg = e.detail.errMsg;
    var iv 

    app.globalData.iv = e.detail.iv
    app.globalData.encryptedData = e.detail.encryptedData


    if (e.detail.errMsg == 'getPhoneNumber:fail user deny') {
      wx.showModal({
        title: '提示',
        showCancel: false,
        content: '未授权',
        success: function (res) {
          //用户未同意
        }
      })
    } else {
      wx.showModal({
        title: '提示',
        showCancel: false,
        content: '同意授权',
        success: function (res) {
          //wx.login({
            //success: function (log) {
          if (app.globalData.code) {
                //登陆接口
                wx.request({
                  url: 'https://jinggai.woxinshangdi.com/user/getSessionKeyByCode.htm',
                  data: {
                    code: app.globalData.code
                  },
                  header: {
                    'content-type': 'application/x-www-form-urlencoded'
                  },
                  method: "POST",
                  success: function (res) {
                    console.log(res.data)
                    //已获取号码
                    if (res.data.retCode == 0) {
                      var sessionId = res.data.sessionId;
                      wx.setStorage({
                        key: "sessionId",
                        data: sessionId
                      })

                      wx.redirectTo({
                        url: '../mappage/mappage',
                      })
                    }
                    else if (res.data.retCode == 1000){
                      //获取手机号码
                      wx.request({
                        url: 'https://jinggai.woxinshangdi.com/user/decodePhoneInfo.htm', 
                        data: {
                          tempSessionId: res.data.tempSessionId,
                          encryptedData: app.globalData.encryptedData,
                          iv: app.globalData.iv
                        },
                        header: {
                          'content-type': 'application/x-www-form-urlencoded'
                        },
                        method: "POST",
                        success: function (res) {
                          console.log(res.data)
                          if (res.data.retCode == 0) {
                            var sessionId = res.data.sessionId;
                            wx.setStorage({
                              key: "sessionId",
                              data: sessionId
                            })


                            wx.redirectTo({
                              url: '../mappage/mappage',
                            })
                          }
                          else{
                            wx.showModal({
                              title: '登录失败',
                              content: res.data.retMsg,
                            });
                          }
                        }
                      })

                    }
                    else if (res.data.retCode == 2000){
                      wx.showModal({
                        title: '登陆失败',
                        content: res.data.retMsg,
                      });
                    } 
                    else {
                      wx.showModal({
                        title: '登录失败',
                        content: res.data.retMsg,
                      });
                    }
                  }
                })

              } else {
                console.log('获取用户登录态失败！' + res.errMsg)
              }
            }
          });

        }
      //})
    //}
  }
})