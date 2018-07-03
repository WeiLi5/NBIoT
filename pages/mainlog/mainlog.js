// pages/mainlog/mainlog.js
var app = getApp();

Page({

  /**
   * 页面的初始数据
   */
  data: {
    username: '',
    password: ''
  },

  //读取用户账号密码
  inputUserName: function(e) {
    this.setData({
      username: e.detail.value
    });
  },
  inputPassword: function(e) {
    this.setData({
      password: e.detail.value
    });
  },

  //用户名密码存到全局变量
  //TODO：在此处进行用户名密码比对
  login: function() {
    console.log('用户名： ' + this.data.username + '密码' + this.data.password)
    app.globalData.username = this.data.username
    app.globalData.password = this.data.password
    console.log(app.globalData.username)

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
      method: "POST",
      success: function(res) {
        console.log(res.data)
        if (res.data.ERRORCODE == 0) {
          app.globalData.sessionID = res.data.RESULT.SESSIONID
          wx.redirectTo({
            url: '../mappage/mappage',
          })
        }
        else{
          console.log('获取sessionID失败')
        }
      },
      fail: function(res) {
        console.log('登陆出现问题')
      }
    })




  },
  usersignup: function() {
    wx.navigateTo({
      url: '../signup/signup',
    })

  },

  //跳转手机登录页面
  logbyphone: function() {
    wx.redirectTo({
      url: '../phonelog/phonelog',
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