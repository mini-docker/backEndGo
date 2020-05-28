import axios from 'axios';
import Vue from 'vue';
import router from '../router';
import { Loading } from 'element-ui';

let loading        //定义loading变量

function startLoading() {    //使用Element loading-start 方法
    loading = Loading.service({
        lock: true,
        text: '加载中……',
        background: 'rgba(0, 0, 0, 0.7)'
    })
}
function endLoading() {    //使用Element loading-close 方法
    loading.close()
}
//那么 showFullScreenLoading() tryHideFullScreenLoading() 要干的事儿就是将同一时刻的请求合并。
//声明一个变量 needLoadingRequestCount，每次调用showFullScreenLoading方法 needLoadingRequestCount + 1。
//调用tryHideFullScreenLoading()方法，needLoadingRequestCount - 1。needLoadingRequestCount为 0 时，结束 loading。
let needLoadingRequestCount = 0
export function showFullScreenLoading() {
    if (needLoadingRequestCount === 0) {
        startLoading()
    }
    needLoadingRequestCount++
}

export function tryHideFullScreenLoading() {
    if (needLoadingRequestCount <= 0) return
    needLoadingRequestCount--
    if (needLoadingRequestCount === 0) {
        endLoading()
    }
}

const vue = new Vue({
    router
});

let baseURL = "/api"

const service = axios.create({
    // process.env.NODE_ENV === 'development' 来判断是否开发环境
    // easy-mock服务挂了，暂时不使用了
    // baseURL: 'https://www.easy-mock.com/mock/592501a391470c0ac1fab128',
    // timeout: 5000
});

service.interceptors.request.use(
    config => {
        config.baseURL = baseURL;
        config.timeout = 60 * 1000; // Timeout
        showFullScreenLoading()
        return config
    },
    error => {
        console.log(error);
        return Promise.reject();
    }
);

service.interceptors.response.use(
    response => {
        let code = response.data.code;
        if (code === 404) {
            // sessionStorage.removeItem('token');
            vue.$router.push({
                name: '404'
            });
        }
        if (code === 1008) {
            vue.$router.push({
                name: 'login'
            });
        }
        tryHideFullScreenLoading()
        return response;
    },
    error => {
        let status = error.response.status;
        switch (status) {
            case 403:
                vue.$router.push({
                    name: '403'
                });  
                break;
            case 404:
                vue.$router.push({
                    name: '404s'
                });
                break;
            default:
                vue.$message.error("服务器连接异常");
                vue.$router.push({
                    name: 'login'
                });
                break;
        }
        tryHideFullScreenLoading()
        return Promise.reject();
    }
);

const post = (url, data, isUploadFile = false) => {
    let TOKEN = JSON.parse(decodeURIComponent(sessionStorage.getItem("token")));
    console.log(TOKEN,'TOKEN')
    let lang = localStorage.getItem('local') || 'zh';

    return service({
        method: 'post',
        url,
        headers: {
            'Accept': 'application/json, text/plain, */*',
            'Content-Type': 'application/json;charset=utf-8;',
            // 'data': dataStr,
            'platform': "PC",
            'sid': TOKEN&&TOKEN.sessionId,
            'lang': lang,
            'Authorization': 'Bearer '+TOKEN
        },
        data: isUploadFile ? data : JSON.stringify(data),
    }).then(response => {
        return response;
    })
}

//上传文件
const form = (url, data) => {
    return post(url, data, true);
}


export default {
    post,
    form
}
