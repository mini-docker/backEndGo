/*
 * @Author: your name
 * @Date: 2019-12-16 10:26:09
 * @LastEditTime: 2019-12-16 16:19:14
 * @LastEditors: Please set LastEditors
 * @Description: In User Settings Edit
 * @FilePath: /redEnvelope-skin/src/main.js
 */
import Vue from 'vue';
import App from './App.vue';
import router from './router';
import ElementUI from 'element-ui';
import i18n from './i18n';
import DonMessage from '@/components/common/message'

import 'element-ui/lib/theme-chalk/index.css'; // 默认主题
// import './assets/css/theme-green/index.css'; // 浅绿色主题
import './assets/css/icon.css';
import './assets/css/scss/common.scss';
import './components/common/directives';
import 'babel-polyfill';

Vue.config.productionTip = false;
Vue.use(ElementUI, {
    size: 'small'
});

import myCharts from './components/common/myCharts'
Vue.use(myCharts)

import $ from 'jquery';
Vue.prototype.$ = $;
Vue.prototype.$jq = $;
Vue.prototype.$message = new DonMessage()

//过滤器
import * as filters from './filter';
Object.keys(filters).forEach(k => Vue.filter(k, filters[k])) //注册过滤器
Vue.prototype.filterDate = filters.filterDate; //时间过滤方法
Vue.prototype.filterTimeLine = filters.filterTimeLine; //时间过滤方法


//使用钩子函数对路由进行权限跳转
router.beforeEach((to, from, next) => {
    document.title = `${to.meta.title} | 后台管理系统`;
    const role = localStorage.getItem('ms_username');
    if (!role && to.path !== '/login') {
        next('/login');
    } else if (to.meta.permission) {
        // 如果是管理员权限则可进入，这里只是简单的模拟管理员权限而已
        role === 'admin' ? next() : next('/403');
    } else {
        // 简单的判断IE10及以下不进入富文本编辑器，该组件不兼容
        if (navigator.userAgent.indexOf('MSIE') > -1 && to.path === '/editor') {
            Vue.prototype.$alert('vue-quill-editor组件不兼容IE10及以下浏览器，请使用更高版本的浏览器查看', '浏览器不兼容通知', {
                confirmButtonText: '确定'
            });
        } else {
            next();
        }
    }
});


new Vue({
    router,
    i18n,
    render: h => h(App)
}).$mount('#app');
