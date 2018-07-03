// pages/usercentre/usercentre.js
var app = getApp();

Page({

  /**
   * 页面的初始数据
   */
  data: {
    username: ''

  },
  /*
    {
      “SESSIONID”:”XXXXXXXX”
      “METHOD”:”DELDEVICE”,
    “DEVICEID”:”********”
  }
  */

  deleteDevice: function() {
    var deviceID ='';

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
      success: function(res) {
        deviceID = res.data.RESULT[6].DEVICEID

        //删除设备api
        wx.request({
          url: 'http://112.74.62.193/appservice', 
          data: {
            "SESSIONID": app.globalData.sessionID,
            "METHOD":"DELDEVICE",
            "DEVICEID":deviceID
          },
          header: {
            'content-type': 'application/json' // 默认值
          },
          method:"POST",
          success: function (res) {
            console.log(res)
          }
        })


      }
    })

  },

  changeUser: function() {
    wx.redirectTo({
      url: '../mainlog/mainlog',
    })

  },

  goChangePassword: function() {
    wx.navigateTo({
      url: '../changepassword/changepassword',
    })

  },

  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function(options) {
    this.setData({
      username: app.globalData.username
    })
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