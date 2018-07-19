// pages/logInfo/logInfo.js
var app = getApp();
Page({

  /**
   * 页面的初始数据
   */
  data: {
    logInfo:[],
    logType:[]

  
  },

  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function () {
    var _this = this;
    //获取单个设备信息
    var logMsg = [];
    wx.request({
      url: 'https://jinggai.woxinshangdi.com/device/queryDevice.htm',
      data: {
        "sn": app.globalData.thisSN
      },
      method: "GET",
      header: {
        'content-type': 'application/json'
      },
      success: function (res) {
        var alarmInfo = [];
        var logColor = [];
        /**
        sn : xxx, //设备编号
				type : xxx, //类型：0报警；1解除报警；
				alarmType : xxx, //报警类型：2水浸；3撬动；4未收到设备上报数据；5水浸且撬动；
				releasePhone : xxx, //解除报警的手机号码（为空时代表自动解除）
				createTime : xxx //报警或解除报警时间
         
         */
      
        console.log(res.data)
        alarmInfo = res.data.alarmInfoList

        for (var i in alarmInfo){
          //报警
          if(alarmInfo[i].type == 0){
            logColor[i] = 0
            if (alarmInfo[i].alarmType == 2){
              logMsg[i] = {
                msg: alarmInfo[i].createTime + '：水浸报警', color: 0
              }
            }
            if (alarmInfo[i].alarmType == 3) {
              logMsg[i] = {msg:alarmInfo[i].createTime + '：撬动报警',color:0}
            }
            if (alarmInfo[i].alarmType == 4) {
              logMsg[i] = {
                msg: alarmInfo[i].createTime + '：设备未上报数据', color: 0
              }
            }
            if (alarmInfo[i].alarmType == 5) {
              logMsg[i] = {
                msg: alarmInfo[i].createTime + '：水浸且撬动', color: 0
              }
            }
          }

          if (alarmInfo[i].type == 1){
            logColor[i] = 1
            if (alarmInfo[i].alarmType == 2) {
              logMsg[i] = {
                msg: alarmInfo[i].createTime + '：操作人:' + alarmInfo[i].releasePhone + ' 解除了水浸报警', color: 1
              }
            }
            if (alarmInfo[i].alarmType == 3) {
              logMsg[i] = {msg:alarmInfo[i].createTime + '：操作人:' + alarmInfo[i].releasePhone + ' 解除了撬动报警',color:1}
            } 
            if (alarmInfo[i].alarmType == 4) {
              logMsg[i] = {
                msg: alarmInfo[i].createTime + ' 设备重新上报数据', color: 1
              }
            } 
            if (alarmInfo[i].alarmType == 5) {
              logMsg[i] = {
                msg: alarmInfo[i].createTime + '：操作人:' + alarmInfo[i].releasePhone + ' 解除了水浸和撬动报警', color: 1
              }
            }

          }



        }
       app.globalData.logMsg = logMsg
       app.globalData.logColor = logColor


       _this.setData({
         logInfo: app.globalData.logMsg,
         logType: app.globalData.logColor
       })


      }
    })
  },




  /**
   * 生命周期函数--监听页面显示
   */
  onShow: function () {
    console.log(this.data.logInfo)
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