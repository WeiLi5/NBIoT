Page({
  data:{
    marker: [{
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
    /*this.setData({
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
    })*/

    console.log(this.data.markers)

  },

  passMark : function(){
    var datas = [{
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

    },{
      id: "3",
      latitude: 70,
      longitude: 70,
      width: 50,
      height: 50,
      title: "Series Number"

    }];

    var markers = [];


    for (var i in datas){
      markers[i] = {
        id : datas[i].id,
        longtitude : datas[i].longitude
      }
    }

    //console.log(markers)
    var that = this;
    that.setData({
      marker: markers
    })
    console.log('从这开始')
    console.log(this.data.marker)
    console.log('从这结束')
    







    //var markers = this.data.markers;
  }

})