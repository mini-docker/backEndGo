import Vue from 'vue';
import Router from 'vue-router';

Vue.use(Router);

export default new Router({
    routes: [
        {
            path: '/',
            redirect: '/login'
        },
        {
            path: '/',
            component: () => import(/* webpackChunkName: "home" */ '../components/common/Home.vue'),
            meta: { title: '自述文件' },
            children: [
                {
                    path: '/dashboard',
                    name: 'dashboard',
                    component: () => import(/* webpackChunkName: "dashboard" */ '../pages/Dashboard.vue'),
                    meta: { title: '系统首页' }
                },
                {
                    path: '/role',
                    name: 'role',
                    component: () => import(/* webpackChunkName: "privilege" */ '../pages/privilege/Role.vue'),
                    meta: { title: '角色管理' }
                },
                {
                    path: '/roleTopower',
                    name: 'roleTopower',
                    component: () => import(/* webpackChunkName: "privilege" */ '../pages/privilege/RoleTopower.vue'),
                    meta: { title: '角色赋权' }
                },
                {
                    path: '/sysAct',
                    name: 'sysAct',
                    component: () => import(/* webpackChunkName: "privilege" */ '../pages/privilege/SysAct.vue'),
                    meta: { title: '系统账号管理' }
                },
                {
                    path: '/funcMenu',
                    name: 'funcMenu',
                    component: () => import(/* webpackChunkName: "privilege" */ '../pages/privilege/FuncMenu.vue'),
                    meta: { title: '功能菜单' }
                },
                {
                    path: '/memMant',
                    name: 'memMant',
                    component: () => import(/* webpackChunkName: "account" */ '../pages/account/MemMant.vue'),
                    meta: { title: '会员管理' }
                },
                {
                    path: '/supAdminMant',
                    name: 'supAdminMant',
                    component: () => import(/* webpackChunkName: "account" */ '../pages/account/SupAdminMant.vue'),
                    meta: { title: '超级管理员管理' }
                },
                {
                    path: '/agencyMant',
                    name: 'agencyMant',
                    component: () => import(/* webpackChunkName: "account" */ '../pages/account/AgencyMant.vue'),
                    meta: { title: '代理管理' }
                },

                {
                    path: '/packageMant',
                    name: 'packageMant',
                    component: () => import(/* webpackChunkName: "lineMant" */ '../pages/lineMant/PackageMant.vue'),
                    meta: { title: '套餐管理' }
                },
                {
                    path: '/lineList',
                    name: 'lineList',
                    component: () => import(/* webpackChunkName: "lineMant" */ '../pages/lineMant/LineList.vue'),
                    meta: { title: '线路列表' }
                },
                {
                    path: '/lineComm',
                    name: 'lineComm',
                    component: () => import(/* webpackChunkName: "lineMant" */ '../pages/lineMant/LineComm.vue'),
                    meta: { title: '线路提成' }
                },

                {
                    path: '/gameGroupList',
                    name: 'gameGroupList',
                    component: () => import(/* webpackChunkName: "gameGroupMant" */ '../pages/gameGroupMant/GameGroupList.vue'),
                    meta: { title: '游戏群列表' }
                },
                {
                    path: '/gamerobotMant',
                    name: 'gamerobotMant',
                    component: () => import(/* webpackChunkName: "gameMant" */ '../pages/gameGroupMant/GamerobotMant.vue'),
                    meta: { title: '机器人管理' }
                },

                {
                    path: '/gameMant',
                    name: 'gameMant',
                    component: () => import(/* webpackChunkName: "redEnveGMant" */ '../pages/redEnveGMant/GameMant.vue'),
                    meta: { title: '游戏管理' }
                },
                {
                    path: '/redEnvNote',
                    name: 'redEnvNote',
                    component: () => import(/* webpackChunkName: "redEnveGMant" */ '../pages/redEnveGMant/RedEnvNote.vue'),
                    meta: { title: '注单管理' }
                },
                {
                    path: '/normalRed',
                    name: 'normalRed',
                    component: () => import(/* webpackChunkName: "redEnveGMant" */ '../pages/redEnveGMant/NormalRed.vue'),
                    meta: { title: '红包管理' }
                },

                {
                    path: '/eventPicMant',
                    name: 'eventPicMant',
                    component: () => import(/* webpackChunkName: "consultingMant" */ '../pages/consultingMant/EventPicMant.vue'),
                    meta: { title: '活动图片管理' }
                },
                {
                    path: '/announceMant',
                    name: 'announceMant',
                    component: () => import(/* webpackChunkName: "consultingMant" */ '../pages/consultingMant/AnnounceMant.vue'),
                    meta: { title: '公告管理' }
                },
                {
                    path: '/sysConf',
                    name: 'sysConf',
                    component: () => import(/* webpackChunkName: "sysMant" */ '../pages/sysMant/sysConf.vue'),
                    meta: { title: '系统配置' }
                },
                {
                    path: '/log',
                    name: 'log',
                    component: () => import(/* webpackChunkName: "sysMant" */ '../pages/sysMant/log.vue'),
                    meta: { title: '操作日志' }
                },
                {
                    path: '/chartline',
                    name: 'chartline',
                    component: () => import(/* webpackChunkName: "statistics" */ '../pages/statistics/chartline.vue'),
                    meta: { title: '盈利分析' }
                },
                {
                    path: '/404',
                    name: '404',
                    component: () => import(/* webpackChunkName: "404" */ '../pages/404.vue'),
                    meta: { title: '404' }
                },
                {
                    path: '/404s',
                    name: '404s',
                    component: () => import(/* webpackChunkName: "404" */ '../pages/404s.vue'),
                    meta: { title: '404s' }
                },
                {
                    path: '/403',
                    name: '403',
                    component: () => import(/* webpackChunkName: "403" */ '../pages/403.vue'),
                    meta: { title: '403' }
                },
            ]
        },
        {
            path: '/login',
            name: 'login',
            component: () => import(/* webpackChunkName: "login" */ '../pages/Login.vue'),
            meta: { title: '登录' }
        },
        {
            path: '*',
            redirect: '/404'
        }
    ]
});
