<template>
	<div class="role">
		<div class="crumbs">
			<el-breadcrumb separator-class="el-icon-arrow-right">
				<el-breadcrumb-item> 
                    <!-- <i class="el-icon-lx-people"></i>  -->
                {{ $t('common.actMant') }} </el-breadcrumb-item>
				<el-breadcrumb-item>{{ $t('common.funcMenu') }}</el-breadcrumb-item>
			</el-breadcrumb>
		</div>
		<div class="container">
			<div class="handle-box flex-end">
				<el-button type="primary" @click="handleEdit(1)">{{ $t('common.addTo') }}</el-button>
				<el-button type="primary" :icon="!collpase?'el-icon-lx-add':'el-icon-lx-move'" @click="toggleCollpase()">{{ collpase?$t('common.collapseAll'):$t('common.expandAll')}}</el-button>
			</div>
			<div>
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
			</div>
		</div>

		<!-- 编辑弹出框 -->
		<el-dialog :title="ruleForm.formTitle" :visible.sync="editVisible" @close="resetEdit('ruleForm')"  width="40%">
			<el-form :model="ruleForm" label-width="100px" :rules="rules" ref="ruleForm">
				<el-form-item :label="$t('common.parentMenu')" prop="parentId" class="w200" v-show="pMenu.length>0&&formStatus===1">
					<el-select v-model="ruleForm.parentId" :placeholder="$t('common.p_sel')" class="selbox">
						<el-option v-for="item in pMenu" :key="item.id" :label="item.name" :value="item.id"> </el-option>
					</el-select>
				</el-form-item>
                <el-form-item :label="$t('common.parentMenu')" prop="parentId" class="w200" v-show="pMenu.length>0&&formStatus===2&&parId!==0">
                    <el-select disabled v-model="parId" :placeholder="$t('common.p_sel')" class="selbox">
						<el-option v-for="item in pMenu" :key="item.id" :label="item.name" :value="item.id"> </el-option>
					</el-select>
				</el-form-item>

				<el-form-item :label="$t('common.menuName')" prop="name">
					<el-input v-model="ruleForm.name" :placeholder="$t('common.p_menuName')"></el-input>
				</el-form-item>
				<el-form-item :label="$t('common.menuAddr')" prop="route">
					<el-input v-model="ruleForm.route" :placeholder="$t('common.p_menuAddr')"></el-input>
				</el-form-item>
				<el-form-item :label="$t('common.iconClass')" prop="icon">
					<el-input v-model="ruleForm.icon" :placeholder="$t('common.p_iconClass')"></el-input>
				</el-form-item>
				<el-form-item label="" prop="" class="mgb0">
					{{ $t('common.referUrl') }}：<span class="c-red">https://www.iteblog.com/ace/buttons.html</span>
				</el-form-item>
				<el-form-item :label="$t('common.status')" prop="status">
					<el-radio v-for="item in fData.ableOptions" v-model="ruleForm.status" :label="item.key" :key="item.key">{{ item.value }}</el-radio>
				</el-form-item>
				<el-form-item :label="$t('common.isVisible')" prop="isShow">
					<el-radio v-for="item in fData.visableOptions" v-model="ruleForm.isShow" :label="item.key" :key="item.key">{{ item.value }}</el-radio>
				</el-form-item>

				<el-form-item :label="$t('common.sortY')" prop="sort" class="w200">
					<el-input v-model="ruleForm.sort" :placeholder="$t('common.p_Sort')"></el-input>
				</el-form-item>
			</el-form>
			<span slot="footer" class="dialog-footer">
				<el-button type="primary" @click="saveEdit('ruleForm')">{{ $t('common.save') }}</el-button>
			</span>
		</el-dialog>
	</div>
</template>

<script>
import fData from '@/app.config';

import { getMenuList,
addMenu,getPMenu,getPMenuById,updMenu } from '@/api/auth'
export default {
	name: 'funcMenu',
	data() {
		return {
            getRowKeys(row) {
                return row.id;
            },
			query: {
				status: '', //value值
				name: '',
				pageIndex: 1,
				pageSize: fData.pageSize
			},
			tableData: [],
			delList: [],
			editVisible: false,
			pageTotal: 0,
			form: {},
			idx: -1,
            id: -1,
            fData: fData,
			ruleForm: {
				formTitle: '', //模态框title
				parentId: '',
                name: '',
                route: '',
                icon: '',
                status: 1,
                isShow: 1,
                sort: 1,
			},
			formStatus: 1,
			status2: true,
			rules: {
                name: [
                    { required: true, message: this.$t('common.p_menuName'), trigger: 'blur' },
                    { min: 2, max: 20, message: this.$t('common.str_len'), trigger: 'blur' }
                ],
                parentId: [{ required: true, message: this.$t('common.p_selParMenu'), trigger: 'blur' }],
                route: [{ required: true, message: this.$t('common.p_menuAddr'), trigger: 'blur' }],
                status: [{ required: true, message: this.$t('common.p_selstatus'), trigger: 'blur' }],
                isShow: [{ required: true, message: this.$t('common.p_selstatus'), trigger: 'blur' }],
                sort: [{ required: true, message: this.$t('common.p_Sort'), trigger: 'blur' }],
			},
			valuesf: 1,
            collpase: false,
            expandRows: [],//tree-table 展开行id数组
            pMenu: [],
            parId: 0,

		};
	},
	created() {
        this.getData();
        this.getPMenu();
    },
	methods: {
        // 更改radio样式
        makeRadio(){
            let _this = this;
            setTimeout(function(){
                console.log(_this.$(".el-radio__label"),'22222')
                _this.$(".el-radio__label").css({
                    "font-weight": "400",
                    "font-size": "14px",
                    "padding-left": "10px",
                })
            },200)
        },
        getPMenu(status,id){
            var post = {};
            if(status===2){
                post.id = id;
                getPMenuById(post).then(res => {
                    if(res.success){
                        this.parId = res.data.parentId;
                    }else{
                        this.$message.error(res.message);
                    }
                })
            }else{
                post.id = 0;  
                getPMenu(post).then(res => {
                    if(res.success){
                        this.pMenu = res.data;
                        
                        console.log(this.pMenu ,'this.pMenu ')
                    }else{
                        this.$message.error(res.message);
                    }
                })              
            }
        },
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
		// 触发搜索按钮
		handleSearch() {
			// var post = {}
			// this.$.extend(post, this.query)
			// console.log("post",post)
			this.$set(this.query, 'pageIndex', 2);
		},

		// 编辑操作
		handleEdit(status, index, row) {
            this.formStatus = status;
            this.editVisible = true;
			if (status === 2) {
                this.getPMenu(status,row.id);
				this.idx = index;
				this.ruleForm = this.$.extend(this.ruleForm, row);
				this.ruleForm.formTitle = this.$t('common.editMenu');
			} else if (status === 1) {
				this.ruleForm = {
					formTitle: this.$t('common.addMenu'),
					parentId: '',
                    name: '',
                    route: '',
                    icon: '',
                    status: 1,
                    isShow: 1,
                    sort: 1,
				};
            }
            this.pMenu.length>0?this.ruleForm.parentId = this.pMenu[0].id :null 
            this.makeRadio()           
		},
		// 保存编辑
		saveEdit(formName) {
            console.log(this.ruleForm,'this.ruleForm')
            
			this.$refs[formName].validate(valid => {
				if (valid) {
                    let func = this.formStatus === 2?updMenu:addMenu;
                    this.ruleForm.sort*=1
                    // 修改
                    func(this.ruleForm).then(res => {
                            if(res.success){
                                this.editVisible = false;
                                this.resetEdit(formName);
                                this.$message.success(this.$t('common.success'));
                                this.getData();
                            }else{
                                this.$message.error(res.message);
                            }
                        })
				} else {
					console.error('error submit!!');
					return false;
				}
			});
		},
		//取消编辑
		resetEdit(formName) {
            this.editVisible = false;
            this.ruleForm = {
					formTitle: this.$t('common.addMenu'),
					parentId: '',
                    name: '',
                    route: '',
                    icon: '',
                    status: 1,
                    isShow: 1,
                    sort: 1,
				};
			this.$refs[formName].resetFields();
		},
		reset() {
			this.query = {
				status: '', //value值
				name: '',
				pageIndex: 1,
				pageSize: fData.pageSize
			};
        },
        toggleSelection(rows) {
            if (rows) {
                rows.forEach(row => {
                    this.$refs.multipleTable.toggleRowSelection(row);
                });
                } else {
                this.$refs.multipleTable.clearSelection();
            }
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
        }
	}
};
</script>
