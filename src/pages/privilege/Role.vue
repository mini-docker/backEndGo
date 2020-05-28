<template>
	<div class="role allHeight">
		<div class="crumbs">
			<el-breadcrumb separator-class="el-icon-arrow-right">
				<el-breadcrumb-item> 
                    <!-- <i class="el-icon-lx-people"></i> -->
                 {{ this.$t('common.actMant') }} </el-breadcrumb-item>
				<el-breadcrumb-item>{{ this.$t('common.roleMant') }}</el-breadcrumb-item>
			</el-breadcrumb>
		</div>
		<div class="container">
			<div class="handle-box">
				<div class="pk-inp-box pk-select">
					<label>{{ $t('common.status') }}:</label>
					<el-select v-model="query.status" :placeholder="$t('common.all')" class="selbox">
						<el-option v-for="item in fData.statusOptions" :key="item.key" :label="item.value" :value="item.key"> </el-option>
					</el-select>
				</div>
				<div class="pk-inp-box">
					<label>{{ $t('common.rolename') }}:</label>
					<el-input v-model="query.roleName" :placeholder="$t('common.p_name')" class="selbox"></el-input>
				</div>
				<el-button type="primary" icon="el-icon-search" @click="handleSearch">{{ $t('common.search') }}</el-button>
				<el-button @click="reset">{{ $t('common.reset') }}</el-button>
				<el-button type="primary" icon="el-icon-lx-add" @click="handleEdit(1)">{{ $t('common.add') }}</el-button>
			</div>
			<el-table
				:data="tableData"
				border
                 :height="fData.onlyOneHeight()"
				class="table"
				ref="multipleTable"
				header-cell-class-name="table-header"
				@selection-change="handleSelectionChange"
			>
				<el-table-column prop="id" label="ID" width="55" align="center"></el-table-column>
				<el-table-column prop="roleName" :label="$t('common.rolename')" align="center"></el-table-column>
				<el-table-column prop="remark" :label="$t('common.remark')" align="center"></el-table-column>
				<el-table-column prop="createTime" :label="$t('common.addTime')" align="center">
					<template slot-scope="scope">
						<span>{{ scope.row.createTime | filterDate   }}</span>
					</template>
				</el-table-column>
				<el-table-column :label="$t('common.status')" align="center">
					<template slot-scope="scope">
						<!-- <el-tag
                            :type="scope.row.state==='成功'?'success':(scope.row.state==='失败'?'danger':'')"
                        >{{scope.row.state}}</el-tag> -->
						<el-switch
							style="display: block"
							v-model="scope.row.statuspro"
							active-color="#13ce66"
							inactive-color="#ff4949"
							:active-text="$t('common.able')"
							:inactive-text="$t('common.disable')"
							@change="handuseAble(scope.row)"
						>
						</el-switch>
					</template>
				</el-table-column>
				<el-table-column :label="$t('common.operating')" width="230" align="center">
					<template slot-scope="scope">
						<el-button type="text" icon="el-icon-edit" @click="handleEdit(2, scope.$index, scope.row)">{{
							$t('common.modify')
						}}</el-button>
						<el-button type="text" icon="el-icon-edit" @click="gorolePower(scope.row)">{{ $t('common.rolePower') }}</el-button>
						<el-button v-show="scope.row.id!==1" type="text" icon="el-icon-delete" class="red" @click="handleDelete(scope.row)">{{
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
		<el-dialog :title="ruleForm.formTitle" :visible.sync="editVisible" @close="resetEdit('ruleForm')" width="30%">
			<el-form :model="ruleForm" label-width="90px" :rules="rules" ref="ruleForm">
				<el-form-item :label="$t('common.rolename')" prop="roleName">
					<el-input v-model="ruleForm.roleName" :placeholder="$t('common.p_name')"></el-input>
				</el-form-item>
				<el-form-item :label="$t('common.remark')" prop="remark">
					<el-input v-model="ruleForm.remark" :placeholder="$t('common.p_remark')"></el-input>
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
import Pagination from '@/components/common/Pagination'
import { getRoleList, addRole, getRoleOne, updRole, updRoleStatus, delRole } from '@/api/pvivilege';
import fData from '@/app.config';
export default {
	name: 'role',
    components: { Pagination },
	data() {
		return {
			query: {
				status: 0, //value值
				roleName: '',
				pageIndex: 1,
				pageSize: fData.pageSize
			},
			tableData: [],
			editVisible: false,
			pageTotal: 0,
			fData: fData,
			ruleForm: {
				formTitle: '', //模态框title
				roleName: '',
				remark: ''
			},
			formStatus: 1,
			rules: {
				roleName: fData.MUST
			}
		};
	},
	created() {
		this.getData();
	},
	methods: {
        gorolePower(row) {
            this.$router.push({
				name: "roleTopower",
				query: {
					id:row.id
				}
			});
        },
		handuseAble(row) {
			let status = row.statuspro === true ? 1 : 2;
			updRoleStatus({ id: row.id, status }).then(res => {
				if (res.success) {
					this.$message.success(this.$t('common.success'));
					this.getData();
				} else {
					row.statuspro = row.status === 1;
					this.$message.error(res.message);
				}
			});
		},
		getData(params) {
            if(params){
                this.query.pageIndex = params.page;
                this.query.pageSize = params.limit;
            }
			getRoleList(this.query).then(res => {
				if(res.success){
                    console.log(res, 'resssss');
                    this.tableData = res.data.data;
                    this.pageTotal = res.data.count || 0;
                    this.tableData.map(v => {
                        v.statuspro = v.status === 1;
                    });
                }else{
                    this.$message.error(res.message)
                }
			});
		},
		// 触发搜索按钮
		handleSearch() {
			this.$set(this.query, 'pageIndex', 1);
			this.getData();
		},
		// 删除操作
		handleDelete(row) {
			// 二次确认删除
			this.$confirm(this.$t('common.doSureDel'), this.$t('common.prompt'), {
				type: 'warning'
			})
				.then(() => {
					delRole({ id: row.id }).then(res => {
						if (res.success) {
							this.$message.success(this.$t('common.success'));
							this.getData();
						} else {
							row.statuspro = row.status === 1;
							this.$message.error(res.message);
						}
					});
					
				})
				.catch(() => {});
		},
		// 多选操作
		handleSelectionChange(val) {
			this.multipleSelection = val;
		},

		// 编辑操作
		handleEdit(status, index, row) {
			this.formStatus = status;
			if (status === 2) {
				this.idx = index;
				this.ruleForm = this.$.extend(this.ruleForm, row);
				this.ruleForm.formTitle = this.$t('common.updRole');
				this.editVisible = true;
			} else if (status === 1) {
				this.editVisible = true;
				this.ruleForm = {
					formTitle: this.$t('common.addRole'),
					roleName: '',
					remark: ''
				};
			}
		},
		// 保存编辑
		saveEdit(formName) {
			this.$refs[formName].validate(valid => {
				if (valid) {
					this.editVisible = false;
					// if(this.formStatus===2){
					//     this.$message.success(`修改第 ${this.idx + 1} 行成功`);
					//     this.$set(this.tableData, this.idx, this.form);
					// }
					let func = this.formStatus === 2 ? updRole : addRole;
					func(this.ruleForm).then(res => {
						if (res.success) {
							this.resetEdit(formName);
							this.$message.success(this.$t('common.success'));
							this.getData();
						} else {
							this.$message.error(res.message);
						}
					});
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
				formTitle: '', //模态框title
				roleName: '',
				remark: ''
			};
			this.$refs[formName].resetFields();
		},
		reset() {
			this.query = {
				status: 0, //value值
				name: '',
				pageIndex: 1,
				pageSize: fData.pageSize
			};
		}
	}
};
</script>
