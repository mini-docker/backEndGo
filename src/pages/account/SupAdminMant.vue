<template>
	<div class="role allHeight">
		<div class="crumbs">
			<el-breadcrumb separator-class="el-icon-arrow-right">
				<el-breadcrumb-item> 
                    <!-- <i class="el-icon-lx-people"></i> -->
                 {{ $t('common.actMant') }} </el-breadcrumb-item>
				<el-breadcrumb-item>{{ $t('common.supMMant') }}</el-breadcrumb-item>
			</el-breadcrumb>
		</div>
		<div class="container">
			<div class="search-box">
				<div class="pk-inp-box pk-select">
					<label>{{ $t('common.line') }}:</label>
					<el-select v-model="query.lineId" :placeholder="$t('common.all')" class="selbox">
						<el-option v-for="item in lineIdArrAll" :key="item.lineId" :label="item.lineId" :value="item.lineId"> </el-option>
					</el-select>
				</div>
                <!-- <div class="pk-inp-box pk-select">
					<label>{{ $t('common.siteId') }}:</label>
                    <el-select filterable v-model="query.agencyId" :placeholder="$t('common.all')" class="selbox pull-width">
                        <el-option
                            v-for="(item) in agenListpro"
                            :key="item.account" :label="item.account" :value="item.account">
                        </el-option>
                    </el-select>
                </div> -->
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
                    <el-button type="primary" icon="el-icon-search" @click="handleSearch">{{ $t('common.search') }}</el-button>
                    <el-button @click="reset">{{ $t('common.reset') }}</el-button>
                    <el-button type="primary" icon="el-icon-lx-add" @click="handleEdit(1)">{{ $t('common.add') }}</el-button>
                </div>
                <div class="clearboth"></div>
			</div>
			<el-table :data="tableData" :height="fData.tHeightOne()" border class="table" ref="multipleTable" header-cell-class-name="table-header">
				<el-table-column prop="id" label="ID" width="55" align="center"></el-table-column>
				<el-table-column prop="lineId" :label="$t('common.line')" align="center"></el-table-column>
				<el-table-column prop="account" :label="$t('common.act')" align="center"></el-table-column>
				<el-table-column prop="whiteIpAddress" :label="$t('common.whiteIpAddress')" align="center"></el-table-column>
				<el-table-column :label="$t('common.isOnline')" align="center">
					<template slot-scope="scope">
						<el-tag :type="scope.row.isOnline === 1 ? 'success' : scope.row.isOnline === 2 ? 'danger' : ''">{{
							scope.row.isOnline | isOnline
						}}</el-tag>
					</template>
				</el-table-column>
				<el-table-column :label="$t('common.status')" align="center">
					<template slot-scope="scope">
						<el-tag :type="scope.row.status === 1 ? 'success' : scope.row.status === 2 ? 'danger' : ''">{{
							scope.row.status | isStatus
						}}</el-tag>
					</template>
				</el-table-column>
				<el-table-column :label="$t('common.addTime')"  width="180" align="center">
					<template slot-scope="scope">
						{{ scope.row.createTime | filterDate }}
					</template>
				</el-table-column>
				<el-table-column :label="$t('common.modifyTime')"  width="180" align="center">
					<template slot-scope="scope">
						{{ scope.row.editTime | filterDate }}
					</template>
				</el-table-column>

				<el-table-column :label="$t('common.operating')" align="center">
					<template slot-scope="scope">
						<el-button type="text" icon="el-icon-edit" @click="handleEdit(2, scope.$index, scope.row)">{{
							$t('common.modify')
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
				<el-form-item :label="$t('common.selLine')" prop="lineId">
					<el-select v-model="ruleForm.lineId" :placeholder="$t('common.all')" class="selbox" :disabled="formStatus === 2">
						<el-option v-for="item in lineIdArr" :key="item.lineId" :label="item.lineId" :value="item.lineId"> </el-option>
					</el-select>
				</el-form-item>
				<el-form-item :label="$t('common.act')" prop="account">
					<el-input v-model="ruleForm.account" :placeholder="$t('common.p_act')" :disabled="formStatus === 2" auto-complete="new-password"></el-input>
				</el-form-item>
				<el-form-item :label="$t('common.loginPwd')" prop="password">
					<el-input type="password" v-model="ruleForm.password" :placeholder="$t('common.p_loginPwd')" auto-complete="new-password"></el-input>
				</el-form-item>
				<el-form-item :label="$t('common.confirPwd')" prop="confirmPassword">
					<el-input type="password" v-model="ruleForm.confirmPassword" :placeholder="$t('common.p_confirPwd')" auto-complete="new-password"></el-input>
				</el-form-item>
				<el-form-item :label="$t('common.status')" prop="status">
                    <!-- {{ruleForm.status}} -->
					<el-select v-model="ruleForm.status" :placeholder="$t('common.all')" class="selbox">
						<el-option v-for="item in fData.isOnlineStatus" :key="item.key" :label="item.value" :value="item.key"> </el-option>
					</el-select>
				</el-form-item>
                <el-form-item :label="$t('common.whiteIpAddress')" prop="whiteIpAddress">
					<el-input 
                        :autosize="{ minRows: 2, maxRows: 10 }"
                        type="textarea" 
                        v-model="ruleForm.whiteIpAddress" 
                        :placeholder="$t('common.p_whiteIpAddress')"></el-input>
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
import { agencyAdminList, addAgencyAdminList, editAgencyAdminList } from '@/api/account';
import { getLineIds } from '@/api/line';
import fData from '@/app.config';
import { getAgencyId } from "@/mixins/initAgentList";
export default {
    name: 'superAdmin',
    mixins: [ getAgencyId ],
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
            ]
        let confirmPassword = [
            { required: true, message: this.$t('common.mustY'), trigger: 'blur' },
            { validator: validatePass2, trigger: 'blur' }
        ]
		return {
			query: {
				isOnline: 0, //value值
				account: '',
                lineId: '',
                // agencyId: '',
				pageIndex: 1,
				pageSize: fData.pageSize
			},
			tableData: [],
			editVisible: false,
			pageTotal: 0,
			lineIdArrAll: [], // 搜索线路下来框数组
			lineIdArr: [], // 添加线路下来框数组
			fData: fData,
			ruleForm: {
				formTitle: '', //模态框title
				account: '',
				lineId: '',
				password: '',
				confirmPassword: '',
                status: 0,
                whiteIpAddress: ''
			},
            formStatus: 1,
            password: password,
            confirmPassword: confirmPassword,
			rules: {
                status: [{ required: true, message: this.$t('common.mustY'), trigger: 'blur' }],
				lineId: [{ required: true, message: this.$t('common.mustY'), trigger: 'blur' }],
				account: [
					{ required: true, message: this.$t('common.mustY'), trigger: 'blur' },
					{ validator: fData.actValidate, trigger: 'blur' }
                ],
                whiteIpAddress: fData.MUST,
				password: password,
				confirmPassword: confirmPassword
			}
		};
	},
	created() {
		this.getData();
		this.getLineIdWay();
    },
    watch: {
        // 'query.lineId':function(val){
        //     if(val === this.$t('common.all')){
		// 		val = ""
        //     }
        //     this.query.agencyId=''
        //     this.getAenList(val)
        // },
        formStatus(val){
            if(val===1){
                this.rules.password = this.password
                this.rules.confirmPassword = this.confirmPassword
            }else{
                this.rules.password = null
                this.rules.confirmPassword = null
            }   
        }
    },
	methods: {
		getData(params) {
            if(params){
                this.query.pageIndex = params.page;
                this.query.pageSize = params.limit;
            }
            // if(this.query.agencyId === this.$t('common.all')){
            //     this.query.agencyId = ''
            // }
			var post = {};
			this.$.extend(post, this.query);
            // post.agencyId = this.checkAgenId(post.agencyId)
            if(post.lineId===this.$t('common.all')){
                post.lineId=''
            }
			agencyAdminList(post).then(res => {
				if (res.success) {
					console.log(res);
					this.tableData = res.data.data;
					this.pageTotal = res.data.count || 0;
				} else {
					this.$message.error(res.message);
				}
			});
		},
		//线路下啦框
		getLineIdWay() {
			getLineIds().then(res => {
				if (res.success) {
					this.lineIdArr = res.data;
					this.lineIdArrAll = [
						{lineId: this.$t('common.all')},
					];
					res.data.map(i => {
						this.lineIdArrAll.push(i);
					});
					
				} else {
					this.$message.error(res.message);
				}
			});
		},

		// 触发搜索按钮
		handleSearch() {
			this.$set(this.query, 'pageIndex', 1);
			this.getData();
		},
		// 编辑操作
		handleEdit(status, index, row) {
			console.log(status, index, row);
			this.formStatus = status;
			if (status === 2) {
				this.idx = index;
				this.ruleForm = this.$.extend(this.ruleForm, row);
				this.ruleForm.formTitle = this.$t('common.modify') + this.$t('common.superAct');
				this.ruleForm.password = '';
				this.ruleForm.confirmPassword = '';
				this.editVisible = true;
			} else if (status === 1) {
				this.editVisible = true;
				this.ruleForm = {
					formTitle: this.$t('common.add') + this.$t('common.superAct'),
					account: '',
					lineId: this.lineIdArr[0].lineId,
					password: '',
					confirmPassword: '',
					status: 1,
                    id: '',
                    whiteIpAddress: ''
				};
            }
		},
		// 保存编辑
		saveEdit(formName) {
			this.$refs[formName].validate(valid => {
				if (valid) {
					if (this.formStatus === 1) {
						addAgencyAdminList(this.ruleForm).then(res => {
							if (res.success) {
								console.log(res);
								this.$message.success(this.$t('common.success'));
								this.editVisible = false;
								this.getData();
							} else {
								this.$message.error(res.message);
							}
						});
					} else {
						editAgencyAdminList(this.ruleForm).then(res => {
							if (res.success) {
								this.$message.success(this.$t('common.success'));
								this.editVisible = false;
								this.getData();
							} else {
								this.$message.error(res.message);
							}
						});
					}
				}
			});
		},
		//取消编辑
		resetEdit(formName) {
			this.editVisible = false;
			this.$refs[formName].resetFields();
		},
		reset() {
			this.query = {
                // agencyId: '',
				isOnline: 0, //value值
				account: '',
				lineId: '',
				pageIndex: 1,
				pageSize: fData.pageSize,
			};
		}
	}
};
</script>
