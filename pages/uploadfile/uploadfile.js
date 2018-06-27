// pages/uploadfile/uploadfile.js
Page({

  /**
   * 页面的初始数据
   */
  data: {
    imageSrc: ""
  },

  uploadImage: function() {
    var that = this;
    wx.chooseImage({
      count: 1, // 默认9
      sizeType: ['original', 'compressed'], // 可以指定是原图还是压缩图，默认二者都有
      sourceType: ['album', 'camera'], // 可以指定来源是相册还是相机，默认二者都有
      success: function(res) {
        // 返回选定照片的本地文件路径列表，tempFilePath可以作为img标签的src属性显示图片
        var tempFilePaths = res.tempFilePaths

        //显示图片
        /*
        that.setData({
          imageSrc:tempFilePaths
        })
        console.log(res)
        */

        //上传图片
        wx.uploadFile({
          url: 'https://wli5.applinzi.com/upload_image.php',
          filePath: tempFilePaths[0],
          name: 'imageUp',
          success: function(res) {
            var data = res.data;
            console.log(data);
          },
          fail: function() {
            console.log("fail image")
          }

        })
      }
    })

  },

  downloadImage: function() {
    var that = this;
    wx.downloadFile({
      url: 'https://wli5.applinzi.com/kiana.png',
      success: function(res) {
        that.setData({
          imageSrc: res.tempFilePath
        })


      }


    })

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
            console.log(res.data)
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