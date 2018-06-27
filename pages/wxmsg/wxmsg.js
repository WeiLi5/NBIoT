Page({
  data:{
    markers: [{
      id: "3",
      latitude: 70,
      longitude: 70,
      width: 50,
      height: 50,
      title: "Series Number"

    }]
  },

  onLoad: function(){
    var that = this;
    this.setData({
      markers: [{
        id: "1",
        latitude: 60,
        longitude: 70,
        width: 50,
        height: 50,
        title: "Series Number"

      }, {
        id: "2",
        latitude: 70,
        longitude: 70,
        width: 50,
        height: 50,
        title: "Series Number"

      }]
    })

    console.log(this.data.markers)

  }
  



})