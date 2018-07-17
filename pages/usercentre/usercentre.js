// pages/usercentre/usercentre.js
var app = getApp();

Page({

  /**
   * 页面的初始数据
   */
  data: {
    username: ''

  },

  changeUser: function() {
    wx.redirectTo({
      url: '../mainlog/mainlog',
    })

  },

  goChangePassword: function() {
    console.log(app.globalData.city)


  },

  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function(options) {
    this.setData({
      username: app.globalData.username
    })
  },

})