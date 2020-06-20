# 项目总后台 （admin）

* [1，侧边栏的折叠展开](#1)
* [2，多文件vue全局功能的应用](#2)
* [3，filter文件和i18n(国际化)的组合使用](#3)
* [4，Pagination组件使用](#4)
* [5，路由拦截](#5)
* [6，message方法只弹出一次](#6)
* [7，element 表单验证](#7)
* [8，form复合框的全部折叠和展开](#8)
* [9，mixins的使用](#9)
<!-- * [本地文件链接](#5) -->
<!-- <h3 id="3">表格的使用</h3>
<h3 id="4">页内链接跳转</h3>
<h3 id="5">本地文件链接</h3>
<h2 id="6">软件推荐</h2>
<h2 id="7">参考资料</h2> -->

<h3 id="1">1，侧边栏的折叠展开</h2>
- 文件地址 `src/components/common/Header`

```js
data() {
        return {
            collapse: true,
                ...

```
<h3 id="2">2，多文件vue全局功能的应用</h3>
- 文件地址 `src/utils/request.js` `src/app.config.js`

```js
    import Vue from 'vue';
    import router from '../router';
    const vue = new Vue({
        router
    });

    import i18n from './i18n';
    const vues = new Vue({
        i18n
    });

    // 使用
    vue.$router.push({
        name: 'login'
    });
    vues.$t('common.accountCheck')
```
<h3 id="3">3，filter文件和i18n(国际化)的组合使用</h3>
- 文件地址 `src/filter.js` `src/i18n/module/common/zh.js` `main.js`

```js
    const local = localStorage.getItem('local') ? localStorage.getItem('local') : 'zh';
    const lang = require(`@/i18n/module/common/${local}.js`);
    const common = lang.default;
    export const filtergameTypes = ((value) => {
        let obj = common.filter.gameTypes;
        if (value) {
            return obj[value];
        } else {
            return "";
        }
    })
    // i18n
    const common = {
        filter:{
            gameTypes: {
                        1: "牛牛红包",
                        2: "扫雷红包",
                    },
            }
        }
    }
    //过滤器
    import * as filters from './filter';
    Object.keys(filters).forEach(k => Vue.filter(k, filters[k])) //注册过滤器

    // 使用
    {{2|filtergameTypes}}


```

<h3 id="4">4，Pagination组件使用</h3>
- 文件地址 `src/components/common/Pagination.vue` `src/pages/redEnveGMant/RedEnvNote.vue`

```html
    <pagination
        v-show="pageTotal > 0"
        :total="pageTotal"
        :page.sync="query.pageIndex"
        :limit.sync="query.pageSize"
        @pagination="getData"
    />
    <!-- vue -->
    data(){
        query: {
				pageIndex: 1,
				pageSize: fData.pageSize,
        },
        pageTotal: 0,
    }


```


<h3 id="5">5，路由拦截</h3>
- 文件地址 `src/main.js` `src/utils/request.js`

```js
//使用钩子函数对路由进行权限跳转
router.beforeEach((to, from, next) => {
    document.title = `${to.meta.title} | vue-manage-system`;
    const role = localStorage.getItem('ams_username');
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


```

<h3 id="6">6，message方法只弹出一次</h3>
- 文件地址 `src/main.js`

```js
// 通常都是在main.js中处理
import { Message } from 'element-ui'
// 为了实现Class的私有属性
const showMessage = Symbol('showMessage')
/** 
 *  重写ElementUI的Message
 *  single默认值true，因为项目需求，默认只弹出一个，可以根据实际需要设置
 */
export default class DonMessage {
    success(options, single = true) {
        this[showMessage]('success', options, single)
    }
    warning(options, single = true) {
        this[showMessage]('warning', options, single)
    }
    info(options, single = true) {
        this[showMessage]('info', options, single)
    }
    error(options, single = true) {
        this[showMessage]('error', options, single)
    }

    [showMessage](type, options, single) {
        if (single) {
            // 判断是否已存在Message
            if (document.getElementsByClassName('el-message').length === 0) {
                Message[type](options)
            }
        } else {
            Message[type](options)
        }
    }
}

// main.js
import DonMessage from '@/components/common/message'
Vue.prototype.$message = new DonMessage()

```

<h3 id="7">7，element 表单验证</h3>
- 文件地址 `src/main.js`

```html
    <!-- 编辑弹出框 -->
    <el-dialog :title="ruleForm.formTitle" :visible.sync="editVisible" width="30%">
        <el-form :model="ruleForm" label-width="90px" :rules="rules" ref="ruleForm">
            <el-form-item :label="$t('common.rolename')" prop="name">
                <el-input v-model="ruleForm.name" :placeholder="$t('common.p_name')"></el-input>
            </el-form-item>
            <el-form-item :label="$t('common.remark')" prop="address">
                <el-input v-model="ruleForm.address" :placeholder="$t('common.p_remark')"></el-input>
            </el-form-item>
        </el-form>
        <span slot="footer" class="dialog-footer">
            <el-button @click="resetEdit('ruleForm')">{{ $t('common.cancel') }}</el-button>
            <el-button type="primary" @click="saveEdit('ruleForm')">{{ $t('common.ok') }}</el-button>
        </span>
    </el-dialog>


    data(){
        return{
            ruleForm: {
                formTitle: '', //模态框title
                name: '',
                address: ''
            },
            rules: {
                name: [
                    { required: true, message: this.$t('common.p_name'), trigger: 'blur' },
                    { min: 2, max: 20, message: this.$t('common.str_len'), trigger: 'blur' }
                ]
            }
        }
    }
    methods:{
        saveEdit(){
            this.$refs[formName].validate(valid => {
				if (valid) {
					this.editVisible = false;
					if (this.formStatus === 2) {
						this.$message.success(`修改第 ${this.idx + 1} 行成功`);
						this.$set(this.tableData, this.idx, this.form);
					}
					this.resetEdit(formName);
					this.getData();
				} else {
					console.error('error submit!!');
					return false;
				}
			});
        }
    }

```

<h3 id="8">8，form复合框的全部折叠和展开</h3>
- 文件地址 `src/pages/privilege/FuncMenu.vue` 

```html
        <el-button type="primary" :icon="!collpase?'el-icon-lx-add':'el-icon-lx-move'" @click="toggleCollpase()">{{ collpase?$t('common.collapseAll'):$t('common.expandAll')}}</el-button>
            <el-table
                    ref="multipleTable"
					:data="tableData"
					style="width: 100%;margin-bottom: 20px;"
					border
                    :row-key="getRowKeys"
					:tree-props="{ children: 'children', hasChildren: 'hasChildren' }"
				>
					<el-table-column prop="name" :label="$t('common.menuName')" width="180"> </el-table-column>
					<el-table-column prop="route" :label="$t('common.menuAddr')" align="center"> </el-table-column>
					<el-table-column prop="level" :label="$t('common.menuLevel')" align="center"> 
                        <template slot-scope="scope">
                            <span>{{scope.row.level | filterLevel}}{{$t('common.ji')}}</span>
                        </template>
                    </el-table-column>
					<el-table-column prop="status" :label="$t('common.status')" align="center"> 
                        <template slot-scope="scope">
                            <el-tag
                            :type="scope.row.status===1?'success':(scope.row.status===2?'danger':'')"
                        >{{scope.row.status | filterValid}}</el-tag>
                        </template>
                    </el-table-column>
					<el-table-column prop="isShow" :label="$t('common.isPageVisible')" align="center"> 
                        <template slot-scope="scope">
                            <el-tag
                            :type="scope.row.isShow===1?'success':(scope.row.isShow===2?'danger':'')"
                        >{{scope.row.isShow | filterShow}}</el-tag>
                        </template>
                    </el-table-column>
					<el-table-column prop="sort" :label="$t('common.sortY')" align="center"> </el-table-column>
                    <el-table-column :label="$t('common.operating')" width="230" align="center">
						<template slot-scope="scope">
							<el-button type="text" icon="el-icon-edit" @click="handleEdit(2, scope.$index, scope.row)">{{
								$t('common.modify')
							}}</el-button>
						</template>
					</el-table-column>
            </el-table>
```
```js
    data() {
		return {
            getRowKeys(row) {
                return row.id;
            },
            expandRows...
            collpase...
        }
    }
    methods: {
        getData(){
            getMenuList().then(res => {
                if(res.success){
                    console.log(res,'res');
                    this.tableData = res.data;
                    this.getExpandRows();
                }else{
                    this.$message.error(res.message);
                }
            })
        },
        getExpandRows(){
             this.tableData.map(v=>{
                 if(v.children){
                     this.expandRows.push(v)
                     v.children.map(v2=>{
                         this.expandRows.push(v2)
                     })
                 }
             })
            console.log(this.expandRows,'this.expandRows')
        },
        // 菜单展开全部
        toggleCollpase(){
            let rows = this.expandRows || [];
            if (rows) {
                this.collpase = !this.collpase
                rows.forEach(row => {
                    this.$refs.multipleTable.toggleRowExpansion(row,this.collpase);
                });
            }
        },
    }

```

<h3 id="9">9，mixins的使用</h3>

- 文件地址 `src/pages/account/AgencyMant.vue` `src/mixins`
- 作用相当于合并两个vue，组成新的vue对象，方法按原组件调用即可

```js
import fData from '@/app.config';
import { getAgeList } from '@/api/account';
export const getAgencyId = {
    data() {
        return {
            agenListpro: [],
            token: fData.token(),
        }
    },
    created() {
        if (this.token.isAdmin === 1) {
            this.getAenList();
        }
    },
    // watch: {
    //     page: 'loadData'
    // },
    methods: {
        // 查询代理列表
        getAenList() {
            getAgeList().then(res => {
                if (res.success) {
                    this.agenListpro.push({ agencyId: '', account: this.$t('common.all') }, ...res.data)
                } else {
                    this.$message.error(res.message);
                }
            });
        },

    }
}


--- 
<div class="pk-inp-box pk-select">
    <label>{{ $t('common.siteId') }}:</label>
    <el-select filterable v-model="query.agencyId" :placeholder="$t('common.all')" class="selbox pull-width">
        <el-option
            v-for="(item) in agenListpro"
            :key="item.account" :label="item.account" :value="item.account">
        </el-option>
    </el-select>
</div>

import { getAgencyId } from "@/mixins/initAgentList";
mixins: [ getAgencyId ],
if(this.query.agencyId === this.$t('common.all')){
    this.query.agencyId = ''
}


```

<!-- <h3 id="7">7，element 表单验证</h3>
- 文件地址 `src/main.js`

```js

```

<h3 id="7">7，element 表单验证</h3>
- 文件地址 `src/main.js` `src/components/common/message.js`

```js

```

<h3 id="7">7，element 表单验证</h3>
- 文件地址 `src/main.js` `src/components/common/message.js`

```js

```

<h3 id="7">7，element 表单验证</h3>
- 文件地址 `src/main.js` `src/components/common/message.js`

```js

```

<h3 id="7">7，element 表单验证</h3>
- 文件地址 `src/main.js` `src/components/common/message.js`

```js

``` -->