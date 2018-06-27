// pages/mainlog/mainlog.js
var app = getApp();

Page({

  /**
   * 页面的初始数据
   */
  data: {
    username:'',
    password:''
  },

  //读取用户账号密码
  inputUserName: function (e) {
    this.setData({
      username: e.detail.value
    });
  },
  inputPassword: function (e) {
    this.setData({
      password: e.detail.value
    });
  },
  login: function(){
    console.log('用户名： ' + this.data.username + '密码' + this.data.password)
    app.globalData.username = this.data.username
    console.log(app.globalData.username)
    wx.redirectTo({
      url: '../mappage/mappage',
    })

  },
  usersignup: function(){
    wx.navigateTo({
      url: '../signup/signup',
    })

  },

  //跳转手机登录页面
  logbyphone: function(){
    wx.redirectTo({
      url: '../phonelog/phonelog',
    })
  },


  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function (options) {
  
  },

  /**
   * 生命周期函数--监听页面初次渲染完成
   */
  onReady: function () {
  
  },

  /**
   * 生命周期函数--监听页面显示
   */
  onShow: function () {
  
  },

  /**
   * 生命周期函数--监听页面隐藏
   */
  onHide: function () {
  
  },

  /**
   * 生命周期函数--监听页面卸载
   */
  onUnload: function () {
  
  },

  /**
   * 页面相关事件处理函数--监听用户下拉动作
   */
  onPullDownRefresh: function () {
  
  },

  /**
   * 页面上拉触底事件的处理函数
   */
  onReachBottom: function () {
  
  },

  /**
   * 用户点击右上角分享
   */
  onShareAppMessage: function () {
  
  }
})