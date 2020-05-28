
import moment from 'moment'
const local = localStorage.getItem('local') ? localStorage.getItem('local') : 'zh';
const lang = require(`@/i18n/module/common/${local}.js`);
const common = lang.default;
import Vue from 'vue';
import i18n from './i18n';
const i18ns = new Vue({
    i18n
});

export const makeGameType = ((value) => {
    let key = '';
    if (value == i18ns.$t('common.nnred')) {
        key = 1
    } else if (value == i18ns.$t('common.slred')) {
        key = 2
    } else if (value == i18ns.$t('common.pbnnred')) {
        key = 3
    } else if (value == i18ns.$t('common.cjnnred')) {
        key = 4
    } else if (value == i18ns.$t('common.connetred')) {
        key = 5
    } else if (value == i18ns.$t('common.sievered')) {
        key = 6
    }
    else if (value == i18ns.$t('common.nNorRed')) {
        key = -1
    }
    return key;
})
export const getDate = () => {
    var result = {
        today: {
            //今天
            start: moment()
                .startOf("day")
                .unix(),
            end: moment()
                .endOf("day")
                .unix(),
        },
        yesterday: {
            //昨天
            start: moment()
                .subtract(1, "days")
                .startOf("day")
                .unix(),
            end: moment()
                .subtract(1, "days")
                .endOf("day")
                .unix(),
        },
        tomorrow: {
            start: moment()
                .subtract(-1, "days")
                .startOf("day")
                .unix(),
            end: moment()
                .subtract(-1, "days")
                .endOf("day")
                .unix(),
        },
        last7days: {
            //近7天
            start: moment()
                .subtract(1, "weeks")
                .startOf("day")
                .unix(),
            end: moment()
                .subtract(1, "days")
                .endOf("day")
                .unix(),
        },
        thisMonth: {
            //本月
            start: moment(
                moment()
                    .subtract("month", 0)
                    .format("YYYY-MM") + "-01"
            ).unix(),
            end: moment()
                .endOf("day")
                .unix(),
        },
        lastMonth: {
            //上月
            start: moment(
                moment()
                    .subtract("month", 1)
                    .format("YYYY-MM") + "-01"
            ).unix(),
            end: moment(
                moment()
                    .subtract("month", 1)
                    .format("YYYY-MM") + "-01"
            )
                .subtract("month", -1)
                .add("days", -1)
                .endOf("day")
                .unix(),
        },
    };
    return result;
}
export const currency = (num) => {
    // if(!num)return
    if (typeof (num) == 'undefined') {
        return 0
    }
    num = num.toString().replace(/\$|\,/g, '');
    if (isNaN(num))
        num = "0";
    let sign = (num == (num = Math.abs(num)));
    num = Math.floor(num * 100 + 0.50000000001);
    let cents = num % 100;
    num = Math.floor(num / 100).toString();
    if (cents < 10)
        cents = "0" + cents;
    for (var i = 0; i < Math.floor((num.length - (1 + i)) / 3); i++)
        num = num.substring(0, num.length - (4 * i + 3)) + ',' +
            num.substring(num.length - (4 * i + 3));
    return (((sign) ? '' : '-') + num + '.' + cents);
}
export const filterDatepro = (val, fmt = 'YYYY-MM-DD HH:mm:ss') => {
    if (isNaN(val) || val === null || val===0) {
        return ''
    }
    let str = moment(val * 1000).format(fmt);
    return str;
}
//过滤时间
export const filterDate = (date, fmt = 'YYYY-MM-DD HH:mm:ss') => {
    /**
     * 
     * date 1.支持10位unix时间戳 
     *      2.支持 new Date()
     *      3.fmt 默认返回格式'YYYY-MM-DD HH:mm' 可自行传递。
     */
    // if (status === 1) {
    //     return filterDatepro(date, fmt)
    // }
    var timezone = 8; //目标时区时间，东八区
    var offset_GMT = new Date().getTimezoneOffset(); // 本地时间和格林威治的时间差，单位为分钟
    if (!date) {
        return '';
    }
    if (typeof date === 'number') {
        date = new Date(date * 1000);
    }
    var nowDate = date.getTime(); // 本地时间距 1970 年 1 月 1 日午夜（GMT 时间）之间的毫秒数
    var targetDate = new Date(nowDate + offset_GMT * 60 * 1000 + timezone * 60 * 60 * 1000);

    var o = {
        'M+': targetDate.getMonth() + 1,
        'D+': targetDate.getDate(),
        'h+': targetDate.getHours() % 12 === 0 ? 12 : targetDate.getHours() % 12,
        'H+': targetDate.getHours(),
        'm+': targetDate.getMinutes(),
        's+': targetDate.getSeconds(),
        'q+': Math.floor((targetDate.getMonth() + 3) / 3),
        'S': targetDate.getMilliseconds()
    }
    var week = {
        '0': '\u65e5',
        '1': '\u4e00',
        '2': '\u4e8c',
        '3': '\u4e09',
        '4': '\u56db',
        '5': '\u4e94',
        '6': '\u516d'
    }
    if (/(Y+)/.test(fmt)) {
        fmt = fmt.replace(RegExp.$1, (targetDate.getFullYear() + '').substr(4 - RegExp.$1.length))
    }
    if (/(E+)/.test(fmt)) {
        fmt = fmt.replace(RegExp.$1, ((RegExp.$1.length > 1) ? (RegExp.$1.length > 2 ? '\u661f\u671f' : '\u5468') : '') + week[date.getDay() + ''])
    }
    for (var k in o) {
        if (new RegExp('(' + k + ')').test(fmt)) {
            fmt = fmt.replace(RegExp.$1, (RegExp.$1.length === 1) ? (o[k]) : (('00' + o[k]).substr(('' + o[k]).length)))
        }
    }
    return fmt
}
//初始化时间方法
export const forMataDates = (data) => {
    if (data == 1) {
        function formatTimeaa(i) {
            //参数i为时区值数字，比如北京为东八区则输进8,西5输入-5
            if (typeof i !== "number") return;
            var d = new Date();
            //得到1970年一月一日到现在的秒数
            var len = d.getTime();
            //本地时间与GMT时间的时间偏移差
            var offset = d.getTimezoneOffset() * 60000;
            //得到现在的格林尼治时间
            var utcTime = len + offset;
            var time = new Date(utcTime + 3600000 * i);
            var yy = time.getFullYear();
            var MM = time.getMonth() + 1;
            MM = MM < 10 ? "0" + MM : MM;
            var dd = time.getDate();
            dd = dd < 10 ? "0" + dd : dd;
            var hh = time.getHours();
            hh = hh < 10 ? "0" + hh : hh;
            var mm = time.getMinutes();
            mm = mm < 10 ? "0" + mm : mm;
            var ss = time.getSeconds();
            ss = ss < 10 ? "0" + ss : ss;
            var date = yy + "-" + MM + "-" + dd + " " + "00" + ":" + "00" + ":" + "00";
            var timer = {
                year: yy,
                month: MM,
                date: dd,
                hours: 0,
                minutes: 0,
                seconds: 0,
                time: date,
            };
            return timer;
        }
        var sTime = formatTimeaa(8);
        return toFormatDate(sTime, "");
    } else {
        function formatTimeend(i) {
            //参数i为时区值数字，比如北京为东八区则输进8,西5输入-5
            if (typeof i !== "number") return;
            var d = new Date();

            //得到1970年一月一日到现在的秒数

            var len = d.getTime();

            //本地时间与GMT时间的时间偏移差

            var offset = d.getTimezoneOffset() * 60000;
            var utcTime = len + offset;
            var time = new Date(utcTime + 3600000 * i);
            //输出时间
            var yy = time.getFullYear();
            var MM = time.getMonth() + 1;
            MM = MM < 10 ? "0" + MM : MM;
            var dd = time.getDate();
            dd = dd < 10 ? "0" + dd : dd;
            var hh = time.getHours();
            hh = hh < 10 ? "0" + hh : hh;
            var mm = time.getMinutes();
            mm = mm < 10 ? "0" + mm : mm;
            var ss = time.getSeconds();
            ss = ss < 10 ? "0" + ss : ss;
            var date = yy + "-" + MM + "-" + dd + " " + "23" + ":" + "59" + ":" + "59";
            var timer = {
                year: yy,
                month: MM,
                date: dd,
                hours: 23,
                minutes: 59,
                seconds: 59,
                time: date,
            };
            return timer;
        }

        var eTime = formatTimeend(8);
        return toFormatDate(eTime, "");
    }
}
//提交修改时间戳
export const Timestamp = (data) =>{
    // return data;
    //算出本地时间与北京时间的偏差
    var piancha = new Date().getTimezoneOffset() / 60;
    if (piancha > 0) {
        var offsetTime = 8 - piancha;
        var offsetTime = offsetTime * 60 * 60;
        var s = data - offsetTime - 46800 + offsetTime;
    } else {
        var offsetTime = 8 + piancha;
        var offsetTime = offsetTime * 60 * 60;
        var s = data - offsetTime;
    }
    return s < 0 ? 0 : s;
}

export const filterTimeLine = (time) => {
    if (time){
        return Math.round((new Date(time).getTime()) / 1000)
    }else{
        return time
    }
}

// 时间字符串转换为时间戳
export const makeTimes = (value) => {
    value = value.replace(/-/g, "/");
    var str = Math.round(parseInt((new Date(value)).valueOf()) / 1000);
    if (isNaN(str)) {
        str = 0
    }
    return str
}
// 时分秒的格式化 1为原时间转换，2为将字符串转换为北京时间戳
export const filterTimeStamp = (date, status = 1, fmt = 'YYYY-MM-DD HH:mm:ss') => {
    var str = date;
    if (status === 1) {
        if (isNaN(str)) {
            str = 0
        }
        str = Math.round(parseInt(date.valueOf()) / 1000);
        str = moment(str * 1000).format(fmt);
    } else if (status === 2) {
        str = makeTimes(filterDate(makeTimes(str)));
    }
    return str;
}
export const filterShow = ((value) => {
    let obj = common.filter.isShowStatus;
    if (value) {
        return obj[value];
    } else {
        return "";
    }
})
export const filterValid = ((value) => {
    let obj = common.filter.isValidStatus;
    if (value) {
        return obj[value];
    } else {
        return "";
    }
})
export const filterLevel = ((value) => {
    let obj = common.filter.levelArr;
    if (value) {
        return obj[value];
    } else {
        return "";
    }
})
export const filterLineStatus = ((value) => {
    let obj = common.filter.lineStatus;
    if (value) {
        return obj[value];
    } else {
        return "";
    }
})
export const filterTransType = ((value) => {
    let obj = common.filter.transType;
    if (value) {
        return obj[value];
    } else {
        return "";
    }
})

export const filterIsOnline = ((value) => {
    let obj = common.filter.isOnline;
    if (value) {
        return obj[value];
    } else {
        return "";
    }
})
export const filtergameTypes = ((value) => {
    let obj = common.filter.gameTypes;
    if (value) {
        return obj[value];
    } else {
        return "";
    }
})
export const filteroddTypes = ((value) => {
    let obj = common.filter.oddsTypes;
    if (value) {
        return obj[value];
    } else {
        return "";
    }
})
export const filterorderRedfi = ((value) => {
    let obj = common.filter.orderRedfi;
    if (value === 0 || value) {
        return obj[value];
    } else {
        return "";
    }
})
export const filterorderRed = ((value) => {
    let obj = common.filter.orderRed;
    if (value === 0 || value) {
        return obj[value];
    } else {
        return "";
    }
})

export const filteruseStatus = ((value) => {
    let obj = common.filter.useStatus;
    if (value === 0 || value) {
        return obj[value];
    } else {
        return "";
    }
})


export const isOnline = ((value) => {
    if (value) {
    var status = "";
    if (value === 1) {
        status = "在线";
    } else if (value === 2) {
        status = "离线";
    }
    return status;
    }
})


export const isStatus = ((value) => {
    if (value) {
    var status = "";
    if (value === 1) {
        status = "启用";
    } else if (value === 2) {
        status = "停用";
    }
    return status;
    }
})

export const gameTypa = ((value) => {
    if (value) {
    var status = "";
    if (value === 1) {
        status = "红包";
    }
    return status;
    }
})
export const isPositive = ((value) => {
    value = value * 1
    let obj;
    if (value > 0) {
        obj = "+" + value;
    } else if (value < 0) {
        obj = value;
    } else {
        return value
    }
    return obj
})
export const filterRoomType = ((value) => {
    let obj = common.filter.roomTypes;
    if (value === 0 || value) {
        return obj[value];
    } else {
        return value;
    }
})
export const filterRedPlayType = ((value) => {
    let obj = common.filter.redPlayType;
    if (value === 0 || value) {
        return obj[value];
    } else {
        return value;
    }
})

export const filterRedOrderTypes = ((value) => {
    let obj = common.filter.redOrderTypes;
    if (value === 0 || value) {
        return obj[value];
    } else {
        return value;
    }
})

export const filterIsTrue = ((value) => {
    let obj = common.filter.isTrue;
    if (value === 0 || value) {
        return obj[value];
    } else {
        return value;
    }
})

export const filterLogTypes = ((value) => {
    let obj = common.filter.logTypes;
    if (value === 0 || value) {
        return obj[value];
    } else {
        return value;
    }
})

export const filterNormalRed = ((value) => {
    let obj = common.filter.nomalredStatus;
    if (value === 0 || value) {
        return obj[value];
    } else {
        return value;
    }
})
export const filterNormalRedf = ((value) => {
    let obj = common.filter.nomalredStatusf;
    if (value === 0 || value) {
        return obj[value];
    } else {
        return value;
    }
})
export const filterOrderConnetRed = ((value) => {
    let obj = common.filter.orderConnetRed;
    if (value === 0 || value) {
        return obj[value];
    } else {
        return value;
    }
})
export const filtersendStatusOp = ((value) => {
    let obj = common.filter.sendStatusOp;
    if (value === 0 || value) {
        return obj[value];
    } else {
        return value;
    }
})
export const filterszStatusOp = ((value) => {
    let obj = common.filter.szStatusOp;
    if (value === 0 || value) {
        return obj[value];
    } else {
        return value;
    }
})

export const filterpayOutStatusOp = value => {
    let obj = common.filter.payOutStatusOp;
    if (value === 0 || value) {
        return obj[value];
    } else {
        return value;
    }
};
