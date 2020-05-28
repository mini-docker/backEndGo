<template>
	<div class="sysAct allHeight">
		<div class="crumbs">
			<el-breadcrumb separator-class="el-icon-arrow-right">
				<el-breadcrumb-item> 
                    <!-- <i class="el-icon-lx-people"></i> -->
                 {{ $t('common.actMant') }} </el-breadcrumb-item>
				<el-breadcrumb-item>
                    <!-- <i class="el-icon-lx-people"></i> -->
                     {{ $t('common.system') }}{{ $t('common.actMant') }}
				</el-breadcrumb-item>
			</el-breadcrumb>
		</div>
		<div class="container">
			<div class="search-box">
				<div class="pk-inp-box time-d-width">
					<label>{{ $t('common.addTime') }}:</label>
					<el-date-picker
						v-model="selTimes"
						type="datetimerange"
						align="right"
						:start-placeholder="$t('common.startTime')"
						:end-placeholder="$t('common.endTime')"
						format="yyyy-MM-dd HH:mm:ss"
						value-format="timestamp"
						:default-time="['00:00:00', '23:59:59']"
					>
					</el-date-picker>
				</div>
				<div class="pk-inp-box pk-select">
					<label>{{ $t('common.role') }}:</label>
					<el-select v-model="query.roleId" :placeholder="$t('common.all')" class="selbox">
						<el-option v-for="item in roleIdList" :key="item.id" :label="item.roleName" :value="item.id"> </el-option>
					</el-select>
				</div>
				<div class="pk-inp-box pk-select">
					<label>{{ $t('common.onlineStatus') }}:</label>
					<el-select v-model="query.isOnline" :placeholder="$t('common.all')" class="selbox">
						<el-option v-for="item in fData.memAgencOp" :key="item.key" :label="item.value" :value="item.key"> </el-option>
					</el-select>
				</div>
				<div class="pk-inp-box">
					<label>{{ $t('common.act') }}:</label>
					<el-input v-model="query.account" :placeholder="$t('common.p_act')" class="selbox"></el-input>
				</div>
				<div class="fl">
					<el-button type="primary" icon="el-icon-search" @click="handleSearch">{{
						$t('common.search')
					}}</el-button>
					<el-button @click="reset">{{ $t('common.reset') }}</el-button>
					<el-button type="primary" icon="el-icon-lx-add" @click="handleEdit(1)">{{ $t('common.add') }}</el-button>
				</div>
				<div class="clearboth"></div>
			</div>
			<el-table
				:data="tableData"
				border
                :height="fData.tHeightOne()"
				class="table"
				ref="multipleTable"
				header-cell-class-name="table-header"
			>
				<el-table-column prop="id" label="ID" width="55" align="center"></el-table-column>
				<el-table-column prop="account" :label="$t('common.act')" align="center"></el-table-column>
				<el-table-column prop="roleName" :label="$t('common.rolename')" align="center"></el-table-column>
				<el-table-column :label="$t('common.status')" align="center">
					<template slot-scope="scope">
						<el-tag :type="scope.row.isOnline === '1' ? 'success' : scope.row.isOnline === '2' ? 'danger' : ''">{{
							scope.row.isOnline | isOnline
						}}</el-tag>
					</template>
				</el-table-column>
				<el-table-column :label="$t('common.addTime')" align="center">
					<template slot-scope="scope">
						{{ scope.row.createTime | filterDate }}
					</template>
				</el-table-column>
				<el-table-column :label="$t('common.operating')" width="230" align="center">
					<template slot-scope="scope">
						<el-button type="text" icon="el-icon-edit" @click="handleEdit(2, scope.$index, scope.row)">{{
							$t('common.modify')
						}}</el-button>
						<el-button type="text" icon="el-icon-edit" @click="handleInit(scope.row)">{{ $t('common.init') }}</el-button>
						<el-button type="text" icon="el-icon-delete" class="red" @click="handleDelete(scope.$index, scope.row)">{{
							$t('common.del')
						}}</el-button>
					</template>
				</el-table-column>
			</el-table>
			<pagination
                v-show="pageTotal > 0"
                :total="pageTotal"
                :page.sync="query.pageIndex"
                :limit.sync="query.pageSize"
                @pagination="getData"
            />
		</div>

		<!-- 编辑弹出框 -->
		<el-dialog :title="ruleForm.formTitle" :visible.sync="editVisible" width="30%" @close="resetEdit('ruleForm')">
			<el-form :model="ruleForm" label-width="90px" :rules="rules" ref="ruleForm">
				<el-form-item :label="$t('common.role')" prop="roleId">
					<el-select v-model="ruleForm.roleId" :placeholder="$t('common.all')" class="selbox">
						<el-option v-for="item in roleIdsleect" :key="item.id" :label="item.roleName" :value="item.id"> </el-option>
					</el-select>
				</el-form-item>

				<el-form-item :label="$t('common.act')" prop="account">
					<el-input v-model="ruleForm.account" :placeholder="$t('common.p_act')" :disabled="formStatus === 2" auto-complete="new-password"></el-input>
				</el-form-item>
				<el-form-item :label="$t('common.loginPwd')" prop="password">
					<el-input type="password" v-model="ruleForm.password" :placeholder="$t('common.p_loginPwd')" auto-complete="new-password"></el-input>
				</el-form-item>
				<el-form-item :label="$t('common.confirPwd')" prop="confirmPassword">
					<el-input type="password" v-model="ruleForm.confirmPassword" :placeholder="$t('common.p_confirPwd')"></el-input>
				</el-form-item>
			</el-form>
			<span slot="footer" class="dialog-footer">
				<el-button @click="resetEdit('ruleForm')">{{ $t('common.cancel') }}</el-button>
				<el-button type="primary" @click="saveEdit('ruleForm')">{{ $t('common.ok') }}</el-button>
			</span>
		</el-dialog>
	</div>
</template>

<script>
import fData from '@/app.config';
import Pagination from '@/components/common/Pagination'
import { adminList, queryRoleCode, editAdmin, resetPwd, addAdmin, delAdmin } from '@/api/pvivilege';
import { getDate,Timestamp} from '@/filter.js';
export default {
	name: 'SysAct',
    components: { Pagination },
	data() {
		let validatePass = (rule, value, callback) => {
			if (value === '') {
				callback(new Error(this.$t('common.mustY')));
			} else if (!fData.operationpassError.test(value)) {
				callback(new Error(this.$t('common.pwd_str')));
			} else {
				if (this.ruleForm.confirmPassword !== '') {
					this.$refs.ruleForm.validateField('confirmPassword');
				}
				callback();
			}
		};
		let validatePass2 = (rule, value, callback) => {
			if (value === '') {
				callback(new Error(this.$t('common.againInpPwd')));
			} else if (value !== this.ruleForm.password) {
				callback(new Error(this.$t('common.noSamePwd')));
			} else {
				callback();
			}
		};
		let password = [
			{ required: true, message: this.$t('common.mustY'), trigger: 'blur' },
			{ validator: validatePass, trigger: 'blur' }
		];
		let confirmPassword = [
			{ required: true, message: this.$t('common.mustY'), trigger: 'blur' },
			{ validator: validatePass2, trigger: 'blur' }
		];
		return {
			query: {
				isOnline: 0, //value值
				account: '',
				pageIndex: 1,
				pageSize: fData.pageSize,
				roleId: 0,
				startTime: 0,
				addTime: 0,
				endTime: 0
            },
            selTimes: [],
			tableData: [],
			delList: [],
			editVisible: false,
			pageTotal: 0,
			fData: fData,
			roleIdList: [],
			roleIdsleect: [],
			ruleForm: {
				formTitle: '', //模态框title
				password: '',
				confirmPassword: '',
				roleId: '',
				account: ''
			},
			password: password,
			confirmPassword: confirmPassword,
			formStatus: 1, //1添加 2修改
			rules: {
				roleId: fData.MUST,
				account: [
					{ required: true, message: this.$t('common.mustY'), trigger: 'blur' },
					{ validator: fData.actValidate, trigger: 'blur' }
				],
				password: password,
				confirmPassword: confirmPassword
			},
			pickerOptions: {
				disabledDate(time) {
					return time.getTime() > Date.now() + 5.64e7; //如果没有后面的-8.64e6就是不可以选择今天的
				}
			}
		};
	},
	created() {
		this.getData();
		this.queryRoleCodeList();
	},
	methods: {
		getData(params) {
            if(params){
                this.query.pageIndex = params.page;
                this.query.pageSize = params.limit;
            }
			var post = {};
			this.$.extend(post, this.query);
            post.startTime = this.selTimes[0]
            post.endTime = this.selTimes[1]
			post.startTime = parseInt((post.startTime / 1000) || 0)
            post.endTime = parseInt((post.endTime / 1000) || 0)
            post.startTime = Timestamp(post.startTime)
            post.endTime = Timestamp(post.endTime)
			console.log('post', post);
			adminList(post).then(res => {
				if (res.success) {
					console.log(res, 'resss');
					this.tableData = res.data.data;
					this.pageTotal = res.data.count || 0;
				} else {
					this.$message.error(res.message);
				}
			});
		},
		//角色下拉框
		queryRoleCodeList() {
			queryRoleCode().then(res => {
				if (res.success) {
					console.log(res);
					this.roleIdList = [
						{
							id: 0,
							roleName: this.$t('common.all')
						}
					];
					res.data.map(i => {
						this.roleIdList.push(i);
					});
					this.roleIdsleect = res.data;
				}
			});
		},
		// 触发搜索按钮
		handleSearch() {
			this.$set(this.query, 'pageIndex', 1);
			this.getData();
		},
		// 删除操作
		handleDelete(index, row) {
			console.log(index, row);
			// 二次确认删除
			this.$confirm(this.$t('common.doSureDel'), this.$t('common.prompt'), {
				type: 'warning'
			})
				.then(() => {
					let postData = {
						id: row.id
					};
					delAdmin(postData).then(res => {
						if (res.success) {
							this.$message.success(this.$t('common.sucDel'));
							this.tableData.splice(index, 1);
						} else {
							this.$message.error(res.message);
						}
					});
				})
				.catch(() => {});
		},
		// 初始化
		handleInit(data) {
			this.$confirm(this.$t('common.init_str', [123456]), this.$t('common.prompt'), {
				type: 'warning'
			})
				.then(() => {
					let postData = {
						id: data.id
					};
					resetPwd(postData).then(res => {
						if (res.success) {
							this.$message.success(this.$t('common.sucModify'));
						}
					});
				})
				.catch(() => {});
		},
		// 编辑操作
		handleEdit(status, index, row) {
			this.formStatus = status;
			if (status === 2) {
				this.idx = index;
				this.ruleForm = this.$.extend(this.ruleForm, row);
				this.ruleForm.formTitle = this.$t('common.modifyAct');
				this.editVisible = true;
				this.rules.password = null;
				this.rules.confirmPassword = null;
			} else if (status === 1) {
				this.editVisible = true;
				this.ruleForm = {
					formTitle: this.$t('common.addAct'),
					id: '',
					account: '',
					password: '',
                    confirmPassword: '',
                    roleId: this.roleIdsleect[0].id
                };
                this.rules.password = this.password
                this.rules.confirmPassword = this.confirmPassword
			}
		},
		// 保存编辑
		saveEdit(formName) {
			this.$refs[formName].validate(valid => {
				if (valid) {
					let postData = {
						id: this.ruleForm.id,
						password: this.ruleForm.password,
						confirmPassword: this.ruleForm.confirmPassword,
						roleId: this.ruleForm.roleId,
						account: this.ruleForm.account
                    };
                    let func;
					if (this.formStatus === 1) {
						func = addAdmin
					} else {
						func = editAdmin
                    }
                    func(postData).then(res => {
                        if (res.success) {
                            this.$message.success(this.$t('common.success'));
                            this.editVisible = false;
                            this.getData();
                        } else {
                            this.$message.error(res.message);
                        }
                    });
				}
			});
		},
		//取消编辑
		resetEdit(formName) {
            this.editVisible = false;
            // 属性必须重置完整，否则由于 对应key没有绑定值 下拉或者输入框不会绑定值而动态改变
			this.ruleForm = {
				formTitle: '', //模态框title
				password: '',
				confirmPassword: '',
				roleId: '',
				account: ''
			}
			this.$refs[formName].resetFields();
		},
		reset() {
			this.query = {
				status: '', //value值
				name: '',
				pageIndex: 1,
				pageSize: fData.pageSize,
				addTime: '',
				startTime: 0,
				endTime: 0
            };
            this.selTimes = []
		}
	}
};
</script>
