
000100000001040049031201013436303131313137343233353633380D010134433438344133383330333033323309010101000A010100070101015E010101096020010192B56C0D0601010000001301010000

00 --reserved      	2
01 --version		2
00000001  --seq		8
04   --oid 			2
0049  --length 		4
03  --msgid 		2

固定数据：20 位

--> data 从第 21 位，下标 20 开始为 data



120101343630313131313734323335363338   --imsi 	36
0D0101344334383441333833303330333233	 --sn	36
09 01010100  --设备内核版本						10
0A 010100 --信号强度								8
07 0101015E  --电池电量							10 *
0101010960  --温度								10 *
20 010192B56C0D --上报时间						14
060101 00【00:正常，01:报警】 0000【/100=角度】   --重力传感器						12
130101 00【00:正常，01:报警】00【00:正常，01:水浸】  --水浸								10 TODO

//数据解析测试代码

	//重力传感器解析
	var gravitySensor = '060101000000';
	var splitGravitySensor = gravitySensor.split('');
	//用于报警信息检测；【00:正常，01:报警】
	var warnSignal = splitGravitySensor.slice(6, 8).join('')
    var mAngle = parseInt(splitGravitySensor.slice(8, 12).join(''), 16)/100.00
    console.log(splitGravitySensor.slice(8, 12).join(''))
    console.log(mAngle)
    console.log(warnSignal)




    //水浸解析
    var water = '1301010000'
    var splitWater = water.split('')
    var mWater = splitWater.slice(6, 8).join('')
    var waterWarn = splitWater.slice(8, 10).join('')
    console.log(mWater)
    console.log(waterWarn)

   	//温度解析
    var temp = '01010109FC'
    var splitTemp = temp.split('')
    var mTemp = parseInt(splitTemp.slice(6, 10).join(''), 16)/100.00
    console.log(splitTemp.slice(6, 10).join(''))
    console.log(mTemp)

    //电量解析
    var energy = '07010101A3'
    var splitEnergy = energy.split('')
    var mEnergy = parseInt(splitEnergy.slice(6, 10).join(''), 16)/100.00
    console.log(splitEnergy.slice(6, 10).join(''))
    console.log(mEnergy)

    //内核版本解析
    var coreVersion = '0701010100'
    var splitCore = coreVersion.split('')
    var leftCoreVersion = parseInt(splitCore.slice(6, 8).join(''), 16)
    var rightCoreVersion = parseInt(splitCore.slice(8, 10).join(''), 16)
    var mCoreVersion = [leftCoreVersion,'.',rightCoreVersion,'.'].join('')
    console.log(mCoreVersion)

    //信号强度解析
    var signalStrength = '0A010115'
    var splitSignal = signalStrength.split('')
    var mSignalStrength = parseInt(splitSignal.slice(6, 8).join(''), 16)
    console.log(mSignalStrength）


   	//sn解析

   	var sn = '0D0101344334383441333833303330333233'
    var splitSn = sn.split('')
    var hexSn = parseInt(splitSn.slice(6, 36).join(''), 16)
    console.log(hexSn）



   	var hexStr = hexCharCodeToStr(hexSn)
    console.log(hexSn)

    function hexCharCodeToStr(hexCharCodeStr) {
      　　var trimedStr = hexCharCodeStr.trim();
      　　var rawStr =
        　　trimedStr.substr(0, 2).toLowerCase() === "0x"
          　　?
          　　trimedStr.substr(2)
          　　:
          　　trimedStr;
      　　var len = rawStr.length;
      　　if (len % 2 !== 0) {
        　　　　alert("Illegal Format ASCII Code!");
        　　　　return "";
      　　}
      　　var curCharCode;
      　　var resultStr = [];
      　　for (var i = 0; i < len; i = i + 2) {
        　　　　curCharCode = parseInt(rawStr.substr(i, 2), 16); // ASCII Code Value
        　　　　resultStr.push(String.fromCharCode(curCharCode));
      　　}
      　　return resultStr.join("");
    }

    //时间解析
    var repoTime = '2001015A66C2FC'

    var splitTime = repoTime.split('')
    var unixTime = parseInt(splitTime.slice(6, 14).join(''), 16)
    var mTime = FormatDateTime(unixTime.toString()+'000')
    console.log(mTime)


    function FormatDateTime(UnixTime) {
      var a = UnixTime.replace("/Date(", "").replace(")/", "");
      var date = new Date(parseInt(a));
      var y = date.getFullYear();
      var m = date.getMonth() + 1;
      m = m < 10 ? ('0' + m) : m;
      var d = date.getDate();
      d = d < 10 ? ('0' + d) : d;
      var h = date.getHours();
      h = h < 10 ? ('0' + h) : h;
      var minute = date.getMinutes();
      var second = date.getSeconds();
      minute = minute < 10 ? ('0' + minute) : minute;
      second = second < 10 ? ('0' + second) : second;
      return y + '-' + m + '-' + d + ' ' + h + ':' + minute + ':' + second;
   Imsi

    //imsi解析

    var imsi = '120101343630313131313136383531343031';
    var splitImsi = imsi.split('');
    var hexImsi = splitImsi.slice(6, 36).join('');
    var mImsi = hexCharCodeToStr(hexImsi);
    console.log(mImsi)











//分割字符
  analyData: function() {

    var originData = "000100000001040049031201013436303131313137343233353633380D010134433438344133383330333033323309010101000A010100070101015E010101096020010192B56C0D0601010000001301010000";
    var spliteData = originData.split("")

    //2
    var reserved = spliteData.slice(0, 2).join('');
    var version = spliteData.slice(2, 4);
    var seq = spliteData.slice(4, 12);
    var oid = spliteData.slice(12, 14);
    var length = spliteData.slice(14, 18);
    var msgid = spliteData.slice(18, 20);


    console.log(reserved)
    console.log(version)
    console.log(seq)
    console.log(oid)
    console.log(length)
    console.log(msgid)

    if (reserved == "00") {
      console.log("yea")
    } else {
      console.log("nooo")
    }


    var i = 20;
    var deviceType = [];
    var imsi = "";

    var sn = '';
  coreVersion = '';
    var signalStrength = '';
    var energy = '';
    var temp = '';
    var repoTime = '';
    var gravitySensor = '';
    var water = '';

    var len = spliteData.length;

    for (var i = 20; i < len;) {
      deviceType = spliteData.slice(i, i + 2).join('')
      //imsi
      if (deviceType == "12") {
        imsi = spliteData.slice(i, i + 36).join('')
        i = i + 36
      }
      //sn
      else if (deviceType == "0D") {
        sn = spliteData.slice(i, i + 36).join('')
        i = i + 36

      }
      //
      else if (deviceType == "09") {
        coreVersion = spliteData.slice(i, i + 10).join('')
        i = i + 10

      } else if (deviceType == "0A") {
        signalStrength = spliteData.slice(i, i + 8).join('')
        i = i + 8

      } else if (deviceType == "07") {
        energy = spliteData.slice(i, i + 10).join('')
        i = i + 10

      } else if (deviceType == "01") {
        temp = spliteData.slice(i, i + 10).join('')
        i = i + 10

      } else if (deviceType == "20") {
        repoTime = spliteData.slice(i, i + 14).join('')
        i = i + 14

      } else if (deviceType == "06") {
        gravitySensor = spliteData.slice(i, i + 12).join('')
        i = i + 12

      } else if (deviceType == "13") {
        water = spliteData.slice(i, i + 10).join('')
        i = i + 10

      } else {
        console.log('数据错误')
      }


    }


    console.log(imsi)
    console.log(water)

  },