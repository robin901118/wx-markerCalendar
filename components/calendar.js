Component({
  // 公有属性
  properties: {
    //标记数组
    marker:{type: Array,value:[]}
  },
  // 私有数据，可用于模版渲染
  data: {
    monthArr: ['一', '二', '三', '四', '五', '六', '七', '八', '九', '十', '十一', '十二'],
    year: '',
    month: '',
    day: '',
    monthIndex: 0,
    date: [],
    tag:[],
    disabledPrevYear: true,//禁用上一年按钮
    disabledPrevMonth: true//禁用上一月按钮
  },
  //方法集合
  methods: {
    /**
    * 设置Marker
    */
    setMarker:function(){
      let date = new Date();
      let markerList = this.properties.marker;
      this.setData({
        tag: markerList
      });
      this.setCalendar(date.getFullYear(), date.getMonth(), date.getDate());
    },
    /**
    * 设置年份
    */
    setYear: function (e) {
      let BtnType = e.currentTarget.dataset.type;
      let year = parseInt(this.data['year']);
      let day = parseInt(this.data['day']);
      let monthIndex = parseInt(this.data['monthIndex']);
      if (BtnType === 'prevYear') {
        this.setCalendar(--year, monthIndex, day);
      } else {
        this.setCalendar(++year, monthIndex, day);
      }
    },
    /**
     * 设置月份
     */
    setMonth: function (e) {
      let BtnType = e.currentTarget.dataset.type,
          year = parseInt(this.data['year']),
          day = parseInt(this.data['day']),
          monthIndex = parseInt(this.data['monthIndex']);
      if (BtnType === 'prevMonth') {
        if (--monthIndex < 0) {
          year--;
          monthIndex = this.data.monthArr.length - 1;
        }
        this.setCalendar(year, monthIndex, day);
      } else {
        if (++monthIndex >= this.data.monthArr.length) {
          year++;
          monthIndex = 0;
        }
        this.setCalendar(year, monthIndex, day);
      }
    },
    /**
     * 日历初始化（设置日历）
     */
    setCalendar: function (Y, M, D) {
      let setMonthStr = this.data.monthArr[M],
        obj = this.getDateInfo(Y, M),
        dateList = [],
        NOW = new Date(),
        NOWYEAR = NOW.getFullYear(),
        NOWMONTH = NOW.getMonth(),
        tagList = this.data.tag;
      for (let i = 1; i <= obj['lastDate']; i++) {
        let s = {};
        s['date'] = i;
        //设置今天
        let TIME3 = new Date(`${Y}/${M}/${D}`).getTime(),
          TIME4 = new Date(`${NOWYEAR}/${NOWMONTH}/${i}`).getTime();
        if (TIME3 === TIME4) {
          s['nowDate'] = true;
        } else {
          s['nowDate'] = false;
        }
        s['hasTag'] = false;
        s['tiketNum'] = '';
        s['markerDate'] = '';
        //设置tag
        for (let k = 0; k < tagList.length; k++) {
          let TIME = new Date(`${Y}/${M + 1}/${i}`).getTime(),
            TIME2 = new Date(tagList[k]['date']).getTime();
          if (TIME === TIME2) {
            s['hasTag'] = true;
            s['tiketNum'] = tagList[k]['num'];
            s['markerDate'] = tagList[k]['date'];
          }
        }
        s['disabled'] = false;
        dateList.push(s);
      }
      for (let i = 1; i <= obj['week']; i++) {
        let s = {};
        s['date'] = obj['prevMonthLastDate']--;
        s['nowDate'] = false;
        s['hasTag'] = false;
        s['disabled'] = true;
        s['tiketNum'] = "";
        s['markerDate'] = '';
        dateList.unshift(s);
      }
      let k = 0;
      while (!(dateList.length % 7 === 0)) {
        let s = {};
        s['date'] = ++k;
        s['nowDate'] = false;
        s['hasTag'] = false;
        s['disabled'] = true;
        s['tiketNum'] = "";
        s['markerDate'] = '';
        dateList.push(s);
      }
      /**
      * 判断月份是否小于当前月
      */
      let isMinMonth = true,
        isMinYear = true;
      if (Y > NOWYEAR) {
        isMinMonth = false;
        if (M >= NOWMONTH || Y - 1 > NOWYEAR) {
          isMinYear = false;
        }
      } else if (M > NOWMONTH) {
        isMinMonth = false;
      }
      this.setData({
        year: Y,
        month: setMonthStr,
        date: dateList,
        monthIndex: M,
        day: D,
        disabledPrevYear: isMinYear,
        disabledPrevMonth: isMinMonth
      });
    },
    /**
     * 获取当前月有多少天，1号在周几
     */
    getDateInfo: function (y, m) {
      let date = new Date(y, m, 1);
      let week = date.getDay();
      let lastDate = new Date(y, m + 1, 0).getDate();
      let prevMonthLastDate = new Date(y, m, 0).getDate();
      return {
        'week': week,
        'lastDate': lastDate,
        'prevMonthLastDate': prevMonthLastDate
      };
    },
    //点击日历的事件
    calendarEvent: function (e) {
      let hasMarker = e.currentTarget.dataset.hastag,//是否有标签
        tiketNum = e.currentTarget.dataset.tiketnum,//有多少张票
        markerDate = e.currentTarget.dataset.markerdate;//marker日期
      if (!hasMarker) return false;
      this.triggerEvent('markerEvent', { "markerDate": markerDate, "tiketNum": tiketNum});
    }
  }
})