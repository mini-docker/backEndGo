import Vue from 'vue';
import i18n from './i18n';
const vue = new Vue({
    i18n
});

let actValidateError = /^(?=.*\d)(?=.*[a-zA-Z])(?=.*)[a-zA-Z0-9]{5,16}$/;
let operationpassError = /^(?=.*\d)(?=.*[a-zA-Z])(?=.*)[a-zA-Z0-9]{6,16}$/;
var actValidate = (rule, value, callback) => {
    if (value === '') {
        callback(new Error(vue.$t('common.mustY')));
    } else if (!actValidateError.test(value)) {
        callback(new Error(vue.$t('common.accountCheck')));
    } else {
        callback();
    }
};
let groupNameV = /^.{1,16}$/; //聊天室名称
let gNameValid = (rule, value, callback) => {
    if (value === '') {
        callback(new Error(vue.$t('common.mustY')));
    } else if (!groupNameV.test(value)) {
        callback(new Error(vue.$t('common.gNameValid')));
    } else {
        callback();
    }
};
let MUST = [{ required: true, message: vue.$t('common.mustY'), trigger: 'blur' }]
let moneyFee = /^(?:(?!0\d)\d{1,2}(?:\.\d{1,2})?|100(?:\.0{1,2})?)$/ //0.00-100.00的百分比

let royalty = (rule, value, callback) => {
    if (value === '') {
        callback(new Error(vue.$t('common.mustY')));
    } else if (!moneyFee.test(value)) {
        callback(new Error(vue.$t('common.moneyFee')));
    } else {
        callback();
    }
};

let DOC_HEIGHT = () => {
    return document.body.clientHeight;
}
 //可视区域高度
let clientHeight = () => {
    return DOC_HEIGHT() ;
}
 //2行搜索
let tableHeight = () => {
    return DOC_HEIGHT()  - 260 - 85 + 40;
}
 //一行搜索
let tHeightOne = () => {
    return DOC_HEIGHT()  - 260 + 40;
}
 //一个筛选 一个搜索行
let tHBatchOne = () => {
    return DOC_HEIGHT()  - 260 - 38 + 40;
}
let tHpro = () => {
    return DOC_HEIGHT()  - 350 + 40; 
}
 //只有一行 不用换行
let onlyOneHeight = () => {
    return DOC_HEIGHT()  - 220 + 40;
}


export default {
    // validate
    actValidateError, //账号校验规则 5-16字母数字组合
    operationpassError, //密码校验规则 6-16字母数字组合
    actValidate, //账号校验方法
    groupNameV, //聊天室名称规则
    gNameValid, //聊天室名称校验方法
    moneys: /^(-?)\d{1,8}(\.\d{1,2})?$/, //0.00-99999999.99的金额
    moneyInt1: /^[1-9][0-9]{0,7}?$/, //1-99999999
    moneyFee, //0-100校验规则
    royalty, //0-100校验方法
    MUST,
    pageSize: 10,
    // clientHeight: document.body.clientHeight,
    // tableHeight: document.body.clientHeight - 450, //2行搜索
    // tHeightOne: document.body.clientHeight - 290, //一行搜索
    // tHBatchOne: document.body.clientHeight - 400, //一个筛选 一个搜索行
    // tHpro: document.body.clientHeight - 350,
    //
    // 窗口高度
    clientHeight,
    tableHeight,
    tHeightOne,
    tHBatchOne,
    tHpro,
    onlyOneHeight,

    dateArr: [
        {
            name: '今天',
            value: 'today'
        },
        {
            name: '昨天',
            value: 'yesterday'
        },
        {
            name: '近7天',
            value: 'last7days'
        },
        {
            name: '本月',
            value: 'thisMonth'
        },
        {
            name: '上月',
            value: 'lastMonth'
        }
    ],
    booleanOp: [
        {
            key: 0,
            value: '全部'
        },
        {
            key: 1,
            value: '是'
        },
        {
            key: 2,
            value: '否'
        }
    ],
    statusOptions: [
        {
            key: 0,
            value: '全部'
        },
        {
            key: 1,
            value: '启用'
        },
        {
            key: 2,
            value: '停用'
        }
    ],
    memAgencOp: [
        {
            key: 0,
            value: '全部'
        },
        {
            key: 1,
            value: '在线'
        },
        {
            key: 2,
            value: '离线'
        }
    ],
    gameNameOp: [
        {
            key: 0,
            value: '全部'
        },
        {
            key: 2,
            value: '经典扫雷'
        },
        {
            key: 1,
            value: '经典牛牛'
        },
        {
            key: 3,
            value: '平倍牛牛'
        },
        {
            key: 4,
            value: '超级牛牛'
        },
        {
            key: 5,
            value: '接龙红包'
        },
        {
            key: 6,
            value: '猜大小红包'
        },
        {
            key: -1,
            value: '普通红包'
        }
    ],
    lineStatusOp: [
        {
            key: 0,
            value: '全部'
        },
        {
            key: 1,
            value: '启用'
        },
        {
            key: 2,
            value: '停用'
        },
        {
            key: 3,
            value: '维护'
        }
    ],
    doMonModeOp: [
        {
            key: 0,
            value: '全部'
        },
        {
            key: 1,
            value: '钱包模式'
        },
        {
            key: 2,
            value: '额度转换'
        }
    ],
    packOp: [
        {
            key: 1,
            value: 'PK线路'
        },
        {
            key: 2,
            value: 'aaa专线'
        }
    ],
    redStatusOp: [
        {
            key: 0,
            value: '全部'
        },
        {
            key: 1,
            value: '进行中'
        },
        {
            key: 2,
            value: '已结算'
        },
        {
            key: 3,
            value: '已返还'
        }
    ],
    // 接龙
    connetRed: [
        {
            key: 10,
            value: '全部'
        },
        {
            key: 0,
            value: '未结算'
        },
        {
            key: 2,
            value: '已结算'
        },
        {
            key: 3,
            value: '无效'
        },
        {
            key: 4,
            value: '流局'
        }
    ],
    orderRedfi: [
        {
            key: 10,
            value: '全部'
        },
        {
            key: 0,
            value: '未结算'
        },
        {
            key: 1,
            value: '赢'
        },
        {
            key: 2,
            value: '输'
        },
        {
            key: 3,
            value: '无效'
        }
    ],
    // 扫雷
    ordersfi: [
        {
            key: 10,
            value: '全部'
        },
        {
            key: 0,
            value: '未结算'
        },
        {
            key: 2,
            value: '已结算'
        },
        {
            key: 3,
            value: '已返还'
        },
        {
            key: 4,
            value: '流局'
        }
    ],
    // 牛牛
    ordersfipro: [
        {
            key: 10,
            value: '全部'
        },
        {
            key: 0,
            value: '未结算'
        },
        {
            key: 1,
            value: '赢'
        },
        {
            key: 2,
            value: '输'
        },
        {
            key: 3,
            value: '无效'
        },
        {
            key: 4,
            value: '流局'
        }
    ],

    redInpOp: [
        {
            key: 1,
            value: '用户名'
        },
        {
            key: 2,
            value: '发包者'
        }
    ],
    ableOptions: [
        {
            key: 1,
            value: '启用'
        },
        {
            key: 2,
            value: '停用'
        }
    ],
    visableOptions: [
        {
            key: 1,
            value: '可见'
        },
        {
            key: 2,
            value: '不可见'
        }
    ],
    isOnlineStatus: [
        {
            key: 1,
            value: '正常'
        },
        {
            key: 2,
            value: '停用'
        }
    ],
    gameType: [
        {
            key: 1,
            value: '红包'
        }
    ],
    logTypesOp: [
        {
            key: 0,
            value: '全部'
        },
        {
            key: 1,
            value: '登录日志'
        },
        {
            key: 2,
            value: '操作日志'
        }
    ],
    nomalStatusOp: [
        {
            key: 10,
            value: '全部'
        },
        // {
        //     key: 1,
        //     value: '进行中'
        // },
        {
            key: 2,
            value: '已结束'
        },
        {
            key: 3,
            value: '无效'
        }
        // {
        //     key: 4,
        //     value: '已领完'
        // },
        // {
        //     key: 5,
        //     value: '未开始'
        // }
    ],
    nomalStatusOpf: [
        {
            key: 10,
            value: '全部'
        },
        {
            key: 1,
            value: '进行中'
        },
        {
            key: 2,
            value: '已结束'
        },
        {
            key: 3,
            value: '无效'
        },
        {
            key: 4,
            value: '已领完'
        },
        {
            key: 5,
            value: '未开始'
        }
    ],
    payOutStatusOp: [
        {
            key: 0,
            value: '全部'
        },
        {
            key: 1,
            value: '正常'
        },
        {
            key: 2,
            value: '异常'
        }
    ]
};




