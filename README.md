# 小程序标记日历插件

####一、调用方法(.wxml)：

     <markerCalendar marker="{{markerData}}"
                  id="markerCalendar"
                 bind:markerEvent="outputMarker">
     </markerCalendar>


// marker：传入一个Marker列表，如：[{ 'date': '2018/7/30', 'num': 6 },{ 'date': '2018/7/5', 'num': 2 },{ 'date': '2018/7/6', 'num': 1 }];

// bind:markerEvent:点击marker日历后的回调，参数：markerDate，所在的日期。tiketNum：票数；通过e.detail.ticketInfo获取

----------

####二、JSON(.json)：

    {
      "navigationBarTitleText": "测试",
      "usingComponents": {
        "markerCalendar": "/components/calendar"
      }
    }


----------

####三、js实例化(.js)：
有时候数据通过后台传入，为了方便组件的及时更新，可调用一下方法进行刷新：

    this.selectComponent('#markerCalendar').setMarker();


