<template>
    <div class="sidebar">
        <el-menu class="sidebar-el-menu" :default-active="onRoutes" :collapse="collapse" unique-opened router>
            <template v-for="item in items" v-show="item.isShow===1">
                <template v-if="item.children">
                    <el-submenu :index="item.route" :key="item.id">
                        <template slot="title">
                            <i :class="item.icon"></i>
                            <span slot="title">{{ item.name }}</span>
                        </template>
                        <template v-for="subItem in item.children" v-show="subItem.isShow===1">
                            <el-submenu v-if="subItem.children" :index="subItem.route" :key="subItem.id">
                                <template slot="title">{{ subItem.name }}</template>
                                <el-menu-item v-for="(threeItem,i) in subItem.children" :key="i" :index="threeItem.route" v-show="threeItem.isShow===1">
                                    {{ threeItem.name }}</el-menu-item>
                            </el-submenu>
                            <el-menu-item v-else :index="subItem.route" :key="subItem.id" v-show="subItem.isShow===1">{{ subItem.name }}
                            </el-menu-item>
                        </template>
                    </el-submenu>
                </template>
                <template v-else>
                    <el-menu-item :index="item.route" :key="item.id">
                        <i :class="item.icon"></i>
                        <span slot="title">{{ item.name }}</span>
                    </el-menu-item>
                </template>
            </template>
        </el-menu>
    </div>
</template>

<script>
import bus from './bus';
import { getMenuOwn } from '@/api/auth'
export default {
    data() {
        return {
            collapse: false,
            tableData: [],
            items: [
                {
                    icon: 'el-icon-lx-home',
                    route: 'dashboard',
                    name: '系统首页'
                },
                {
                    icon: 'el-icon-lx-rankfill',
                    route: '2',
                    name: '权限管理',
                    children: [
                        {
                            route: 'role',
                            name: '角色管理'
                        },
                        {
                            route: 'sysAct',
                            name: '系统账号管理'
                        },
                        {
                            route: 'funcMenu',
                            name: '功能菜单'
                        }
                    ]
                },
                {
                    icon: 'el-icon-lx-people',
                    route: '4',
                    name: '账号管理',
                    children: [
                        {
                            route: 'memMant',
                            name: '会员管理'
                        },
                        {
                            route: 'supAdminMant',
                            name: '超级管理员管理'
                        },
                        {
                            route: 'agencyMant',
                            name: '代理管理'
                        }
                    ]
                },
                {
                    icon: 'el-icon-lx-global',
                    route: '5',
                    name: '线路管理',
                    children: [
                        {
                            route: 'packageMant',
                            name: '套餐管理'
                        },
                        {
                            route: 'lineList',
                            name: '线路列表'
                        },
                        // {
                        //     route: 'lineComm',
                        //     name: '线路提成'
                        // }
                    ]
                },
                {
                    icon: 'el-icon-lx-group',
                    route: '8',
                    name: '游戏群管理',
                    children: [
                        {
                            route: 'gameGroupList',
                            name: '游戏群列表'
                        }
                    ]
                },
                {
                    icon: 'el-icon-lx-vipcard',
                    route: '9',
                    name: '红包游戏管理',
                    children: [
                        // {
                        //     route: 'gameMant',
                        //     name: '游戏管理'
                        // },
                        {
                            route: 'redEnvNote',
                            name: '红包注单'
                        }
                    ]
                },
                // {
                //     icon: 'el-icon-lx-friend',
                //     route: '10',
                //     name: '咨询管理',
                //     children: [
                //         {
                //             route: 'eventPicMant',
                //             name: '活动图片管理'
                //         },
                //         {
                //             route: 'announceMant',
                //             name: '公告管理'
                //         }
                //     ]
                // },
            ],
            // items: [
			// 	{
			// 		icon: 'el-icon-lx-home',
			// 		index: 'dashboard',
			// 		title: this.$t('common.sysIndex')
			// 	},
			// 	{
			// 		icon: 'el-icon-lx-cascades',
			// 		index: 'sys',
			// 		title: this.$t('common.sysMant'),
			// 		children: [
			// 			{
			// 				index: 'siteMant',
			// 				title: this.$t('common.siteMant')
            //             },
            //             {
			// 				index: 'log',
			// 				title: this.$t('common.operLog')
            //             },
            //             {
			// 				index: 'sysConf',
			// 				title: this.$t('common.sysConf')
            //             },
			// 		]
			// 	},
			// 	{
			// 		icon: 'el-icon-lx-people',
			// 		index: '4',
			// 		title: this.$t('common.actMant'),
			// 		children: [
			// 			{
			// 				index: 'memMant',
			// 				title: this.$t('common.memMant')
			// 			},
			// 			{
			// 				index: 'agencyMant',
			// 				title: this.$t('common.agencyMant')
            //             }
			// 		]
			// 	},
			// 	{
			// 		icon: 'el-icon-lx-group',
			// 		index: '8',
			// 		title: this.$t('common.gameGroupMant'),
			// 		children: [
			// 			{
			// 				index: 'gameGroupList',
			// 				title: this.$t('common.gameGroupList')
			// 			}
			// 		]
			// 	},
			// 	{
			// 		icon: 'el-icon-lx-vipcard',
			// 		index: '9',
			// 		title: this.$t('common.redEnveGMant'),
			// 		children: [
			// 			{
			// 				index: 'redEnvNote',
			// 				title: this.$t('common.redEnvNote')
			// 			},
			// 			{
			// 				index: 'normalRed',
			// 				title: this.$t('红包管理')
			// 			},
			// 			{
			// 				index: 'gamerobotMant',
			// 				title: this.$t('机器人管理')
			// 			}
			// 		]
			// 	},
			// 	{
			// 		icon: 'el-icon-lx-friend',
			// 		index: '10',
			// 		title: this.$t('common.consultingMant'),
			// 		children: [
			// 			{
			// 				index: 'eventPicMant',
			// 				title: this.$t('common.eventPicMant')
			// 			},
			// 			{
			// 				index: 'announceMant',
			// 				title: this.$t('common.announceMant')
			// 			}
			// 		]
            //     },
            //     {
            //         icon: 'el-icon-lx-rank',
			// 		index: '11',
			// 		title: this.$t('common.statistics'),
			// 		children: [
			// 			{
			// 				index: 'chartline',
			// 				title: this.$t('common.getGoods')
			// 			},
						
			// 		],
            //     }
            // ],
            flag: true,
            firstRoute: null
        };
    },
    computed: {
        onRoutes() {
            return this.$route.path.replace('/', '');
        }
    },
    created() {
        // this.getData()
        // 通过 Event Bus 进行组件间通信，来折叠侧边栏
        bus.$on('collapse', msg => {
            this.collapse = msg;
            bus.$emit('collapse-content', msg);
        });
    },
    methods: {
        // getData(){
        //     getMenuOwn().then(res => {
        //         if(res.success){
        //             this.tableData = res.data;
        //             this.tableData = this.fuadds(this.tableData)
        //             this.emitFirstRoute(this.tableData)
        //         }else{
        //             this.$message.error(res.message);
        //         }
        //     })
        // },
        // emitFirstRoute(tableData){
        //     tableData&&tableData.length>0&&tableData.map((v,i)=> {
        //         if(v.isShow===1&&this.flag){
        //             this.flag=false
        //             if(v.children&&v.children.length>0){
        //                 this.firstRoute = v.children[0].route
        //             }else{
        //                 this.firstRoute=v.route
        //             }
        //         }
        //     })
        //     bus.$emit('firstRoute', this.firstRoute);
        // },
        // // 不让route父级菜单重名
        // fuadds(arr) {
        //     let a = 0;
        //     for (let i = 0; i < arr.length; i++) {
        //         if(arr[i].route==="#"){
        //             a++
        //             arr[i].route="#"+a
        //         }
        //         if (arr[i].children) {
        //             this.fuadds(arr[i].children);
        //         }
        //     }
        //     return arr
        // },
    },
};
</script>

<style scoped>
.sidebar {
    display: block;
    position: absolute;
    left: 0;
    top: 40px;
    bottom: 0;
    overflow-y: scroll;
}
.sidebar::-webkit-scrollbar {
    width: 0;
}
.sidebar-el-menu:not(.el-menu--collapse) {
    width: 186px;
}
.sidebar > ul {
    height: 100%;
}
</style>
