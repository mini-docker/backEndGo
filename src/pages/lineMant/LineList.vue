<template>
	<div class="lineList allHeight">
		<div class="crumbs">
			<el-breadcrumb separator-class="el-icon-arrow-right">
				<el-breadcrumb-item> 
                    <!-- <i class="el-icon-lx-people"></i>  -->
                {{ $t('common.lineMant') }} </el-breadcrumb-item>
				<el-breadcrumb-item> 
                    <!-- <i class="el-icon-lx-people"></i>  -->
                {{ $t('common.lineList') }} </el-breadcrumb-item>
			</el-breadcrumb>
		</div>
		<div class="container">
			<div class="search-box">
				<!-- <div class="pk-inp-box pk-select">
					<label>{{ $t('common.line') }}:</label>
					<el-select v-model="query.lineId" :placeholder="$t('common.all')" class="selbox">
						<el-option v-for="item in lineIdArrAll" :key="item.lineId" :label="item.lineId" :value="item.lineId"> </el-option>
					</el-select>
				</div> -->
				<div class="pk-inp-box pk-select">
					<label>{{ $t('common.status') }}:</label>
					<el-select v-model="query.status" :placeholder="$t('common.all')" class="selbox">
						<el-option v-for="item in fData.lineStatusOp" :key="item.key" :label="item.value" :value="item.key"> </el-option>
					</el-select>
				</div>
				<div class="pk-inp-box pk-select">
					<label>{{ $t('common.doMonMode') }}:</label>
					<el-select v-model="query.transType" :placeholder="$t('common.all')" class="selbox">
						<el-option v-for="item in fData.doMonModeOp" :key="item.key" :label="item.value" :value="item.key"> </el-option>
					</el-select>
				</div>
				<div class="pk-inp-box">
					<label>{{ $t('common.lineName') }}:</label>
					<el-input v-model="query.lineName" :placeholder="$t('common.p_lineName')" class="selbox"></el-input>
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
			<el-table :height="fData.onlyOneHeight()" :data="tableData" border class="table" ref="multipleTable" header-cell-class-name="table-header">
				<el-table-column prop="lineId" :label="$t('ID')" width="75" align="center"></el-table-column>
				<el-table-column prop="lineName" :label="$t('common.lineName')" align="center"></el-table-column>
				<el-table-column prop="limitCost" :label="$t('common.quota')" align="center"></el-table-column>
				<el-table-column prop="status" :label="$t('common.lineStatus')" align="center">
					<template slot-scope="scope">
						<el-tag :type="scope.row.status === 1 ? 'success' : scope.row.status === 2 ? 'danger' : ''">{{
							scope.row.status | filterLineStatus
						}}</el-tag>
					</template>
				</el-table-column>
				<el-table-column prop="transType" :label="$t('common.payMode')" align="center">
					<template slot-scope="scope">
						<span>{{ scope.row.transType | filterTransType }}</span>
					</template>
				</el-table-column>
				<el-table-column prop="domain" :label="$t('common.local')" align="center"></el-table-column>
				<el-table-column prop="createTime" :label="$t('common.addTime')" align="center" width="180">
					<template slot-scope="scope">
						<span>{{ scope.row.createTime | filterDate }}</span>
					</template>
				</el-table-column>
				<el-table-column prop="editTime" :label="$t('common.modifyTime')" align="center" width="180">
					<template slot-scope="scope">
						<span>{{ scope.row.editTime | filterDate }}</span>
					</template>
				</el-table-column>
				<el-table-column :label="$t('common.operating')" width="230" align="center">
					<template slot-scope="scope">
						<el-button type="text" icon="el-icon-edit" @click="statusEdit(scope.$index, scope.row)">{{
							$t('common.updStatus')
						}}</el-button>
						<el-button type="text" icon="el-icon-edit" @click="handleEdit(2, scope.$index, scope.row)">{{
							$t('common.updLine')
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
		<el-dialog :title="ruleForm.formTitle" :visible.sync="editVisible" @close="resetEdit('ruleForm')" width="35%">
			<el-form :model="ruleForm" label-width="120px" :rules="rules" ref="ruleForm">
				<el-form-item v-show="formStatus === 1" label-width="40px" label="" class="mgt-20 mgb0">
					<p class="red">{{ $t('common.lineListStr') }}</p>
				</el-form-item>
				<el-form-item :label="$t('common.lineId')" prop="lineId">
					<!-- <el-select v-model="ruleForm.lineId" :placeholder="$t('common.p_sel')" class="selbox">
						<el-option v-for="item in lineIdArr" :key="item.lineId" :label="item.lineId" :value="item.lineId"> </el-option>
					</el-select> -->
					<el-input :disabled="formStatus === 2" v-model="ruleForm.lineId" :placeholder="$t('common.p_lineName')"></el-input>
				</el-form-item>
				<el-form-item :label="$t('common.lineName')" prop="lineName">
					<el-input v-model="ruleForm.lineName" :placeholder="$t('common.p_lineName')"></el-input>
				</el-form-item>
				<el-form-item :label="$t('common.lineCoast')" prop="limitCost">
					<el-input type="limitCost" v-model.number="ruleForm.limitCost" :placeholder="$t('common.p_lineName')"></el-input>
				</el-form-item>
				<el-form-item :label="$t('common.package')" prop="mealId">
					<el-select v-model="ruleForm.mealId" :placeholder="$t('common.p_sel')" class="selbox">
						<el-option v-for="item in packArr" :key="item.id" :label="item.mealName" :value="item.id"> </el-option>
					</el-select>
				</el-form-item>
				<el-form-item :label="$t('common.local')" prop="domain">
					<el-input v-model="ruleForm.domain" :placeholder="$t('common.p_local')"></el-input>
				</el-form-item>
				<el-form-item label="md5key" prop="md5key">
					<el-input v-model="ruleForm.md5key" :placeholder="$t('common.p_md5')"></el-input>
				</el-form-item>
				<el-form-item label="rsaPubKey" prop="rsaPubKey">
					<el-input v-model="ruleForm.rsaPubKey" :placeholder="$t('common.p_rsaPubKey')"></el-input>
				</el-form-item>
				<el-form-item label="rsaPriKey" prop="rsaPriKey">
					<el-input v-model="ruleForm.rsaPriKey" :placeholder="$t('common.p_rsaPriKey')"></el-input>
				</el-form-item>
				<el-form-item :label="$t('common.payMode')" prop="transType">
					<el-radio v-for="item in walitOptions" v-model="ruleForm.transType" :label="item.key" :key="item.key">{{
						item.value
					}}</el-radio>
				</el-form-item>
				<el-form-item v-show="ruleForm.transType === 1" label="API URL" prop="apiUrl">
					<el-input v-model="ruleForm.apiUrl" :placeholder="$t('common.p_confirPwd')"></el-input>
				</el-form-item>
				<el-form-item :label="$t('common.status')" prop="status">
					<el-select v-model="ruleForm.status" :placeholder="$t('common.all')" class="selbox">
						<el-option v-for="item in lineStatusOppro" :key="item.key" :label="item.value" :value="item.key"> </el-option>
					</el-select>
				</el-form-item>
				<el-form-item v-show="formStatus === 2" :label="$t('common.addTime')">
					<span>{{ ruleForm.createTime | filterDate }}</span>
				</el-form-item>
				<el-form-item v-show="formStatus === 2" :label="$t('common.modifyTime')">
					<span>{{ ruleForm.editTime | filterDate }}</span>
				</el-form-item>
			</el-form>
			<span slot="footer" class="dialog-footer">
				<el-button @click="resetEdit('ruleForm')">{{ $t('common.cancel') }}</el-button>
				<el-button type="primary" @click="saveEdit('ruleForm')">{{ $t('common.ok') }}</el-button>
			</span>
		</el-dialog>

		<el-dialog :title="$t('common.updStatus')" :visible.sync="statusVisible" width="30%" @close="resetStatus('ruleForms')">
			<el-form :model="ruleForms" label-width="90px" :rules="rules" ref="ruleForms">
				<el-form-item :label="$t('common.lineStatus')" prop="status">
					<el-select v-model="ruleForms.status" :placeholder="$t('common.p_sel')" class="selbox">
						<el-option v-for="item in lineStatusOppro" :key="item.key" :label="item.value" :value="item.key"> </el-option>
					</el-select>
				</el-form-item>
			</el-form>
			<span slot="footer" class="dialog-footer">
				<el-button @click="resetStatus('ruleForms')">{{ $t('common.cancel') }}</el-button>
				<el-button type="primary" @click="saveStatus('ruleForms')">{{ $t('common.ok') }}</el-button>
			</span>
		</el-dialog>
	</div>
</template>

<script>
import Pagination from '@/components/common/Pagination'
import fData from '@/app.config';
import { getLineList, addLine, getLineOne, getLineIds, updLine, updLineStatus,getpackArr } from '@/api/line';
export default {
	name: 'lineList',
    components: { Pagination },
	data() {
		return {
			query: {
				lineId: '',
				lineName: '',
				status: 0,
				transType: 0, //value值
				pageIndex: 1,
				pageSize: fData.pageSize
			},
			tableData: [],
			editVisible: false,
			statusVisible: false,
			pageTotal: 0,
			fData: fData,
			walitOptions: [],
			statusOptionspro: [],
			lineStatusOppro: [],
			lineIdArrAll: [],
			lineIdArr: [],
			ruleForm: {
				formTitle: '', //模态框title
				lineId: '', //
				lineName: '',
				limitCost: '',
				mealId: '', //
				domain: '',
				transType: 1, //
				apiUrl: '',
				md5key: '',
				rsaPubKey: '',
				rsaPriKey: '',
				status: '',
				createTime: 0,
				editTime: 0
			},
			ruleForms: {
				status: fData.MUST
			},
			formStatus: 1, //1添加 2修改
			status2: true,
			rules: {
				lineId: fData.MUST,
				lineName: fData.MUST,
				limitCost: [
					{ required: true, message: this.$t('common.mustY'), trigger: 'blur' },
					{ type: 'number', message: this.$t('common.mustNumY') }
				],
				mealId: fData.MUST,
				domain: fData.MUST,
				transType: fData.MUST,
				md5key: fData.MUST,
				rsaPubKey: fData.MUST,
				rsaPriKey: fData.MUST,
				status: fData.MUST
			},
			packArr: []
		};
	},
	created() {
		this.getData();
        // this.getLineIdWay();
        this.getPack();
		this.makeOp();
	},
	methods: {
		// 套餐列表下拉
		getPack() {
			getpackArr().then(res => {
				if (res.success) {
                    this.packArr = res.data;
				} else {
					this.$message.error(res.message);
				}
			});
		},
		//线路下啦框
		// getLineIdWay() {
		// 	getLineIds().then(res => {
		// 		if (res.success) {
		// 			this.lineIdArr = res.data;
		// 			this.lineIdArrAll = [
		// 				{
		// 					lineId: '全部'
		// 				}
		// 			];
		// 			res.data.map(i => {
		// 				this.lineIdArrAll.push(i);
		// 			});
		// 		} else {
		// 			this.$message.error(res.message);
		// 		}
		// 	});
		// },
		makeOp() {
			this.walitOptions = this.$.extend(this.walitOptions, this.fData.doMonModeOp);
			this.walitOptions.shift();
			this.statusOptionspro = this.$.extend(this.statusOptionspro, this.fData.statusOptions);
			this.statusOptionspro.shift();
			this.lineStatusOppro = this.$.extend(this.lineStatusOppro, this.fData.lineStatusOp);
			this.lineStatusOppro.shift();
		},
		// 更改radio样式
		makeRadio() {
			let _this = this;
			setTimeout(function() {
				_this.$('.el-radio__label').css({
					'font-weight': '400',
					'font-size': '14px',
					'padding-left': '10px'
				});
			}, 200);
		},

		getData(params) {
             if(params){
                this.query.pageIndex = params.page;
                this.query.pageSize = params.limit;
            }
			getLineList(this.query).then(res => {
				if (res.success) {
					console.log(res, 'resssss');
					this.tableData = res.data.data;
					this.pageTotal = res.data.count || 0;
				} else {
					this.$message.error(res.message);
				}
			});
		},
		// 触发搜索按钮
		handleSearch() {
			var post = {};
			this.$.extend(post, this.query);
			console.log('post', post);
			// this.$set(this.query, 'pageIndex', 2);
			this.getData();
		},

		// 编辑操作
		handleEdit(status, index, row) {
			this.formStatus = status;
			this.editVisible = true;
			if (status === 2) {
				this.idx = index;
				// 需要继承row的数据进行验证
				this.ruleForm = this.$.extend(this.ruleForm, row);
				this.ruleForm.formTitle = this.$t('common.updLine');
				this.rules.rsaPubKey = null;
				this.rules.rsaPriKey = null;
			} else if (status === 1) {
				this.initFormData();
				this.rules.rsaPubKey = fData.MUST;
				this.rules.rsaPriKey = fData.MUST;
			}
			this.makeRadio();
		},
		initFormData() {
			this.ruleForm = {
				formTitle: this.$t('common.addLine'),
				lineId: '',
				lineName: '',
				limitCost: '',
				mealId: '',
				domain: '',
				transType: 1, //
				apiUrl: '',
				md5key: '',
				rsaPubKey: '',
				rsaPriKey: '',
				status: this.lineStatusOppro[0].key,
				createTime: 0,
				editTime: 0
            };
            this.ruleForm.mealId = this.packArr[0].id;
            this.ruleForm.status = this.lineStatusOppro[0].key;
            // this.ruleForm.lineId = this.lineIdArr[0].lineId;
		},

		// 保存编辑
		saveEdit(formName) {
			this.$refs[formName].validate(valid => {
				if (valid) {
					let func;
					if (this.formStatus === 2) {
						func = updLine;
						// this.$set(this.tableData, this.idx, this.form);
					} else {
						func = addLine;
					}
					this.ruleForm.limitCost *= 1;
					func(this.ruleForm).then(res => {
						if (res.success) {
							this.$message.success(this.$t('common.success'));
							this.editVisible = false;
							this.resetEdit(formName);
                            this.getData();
                            this.getPack();
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
			this.initFormData();
			this.$refs[formName].resetFields();
		},
		statusEdit(index, row) {
			this.statusVisible = true;
			this.ruleForms = this.$.extend(this.ruleForms, row);
		},
		saveStatus(form) {
			updLineStatus(this.ruleForms).then(res => {
				if (res.success) {
					this.$message.success(this.$t('common.success'));
					this.resetStatus(form);
					this.getData();
				} else {
					this.$message.error(res.message);
				}
			});
		},
		resetStatus(formName) {
			this.statusVisible = false;
			this.ruleForms = {
				status: ''
			};
			this.$refs[formName].resetFields();
		},
		reset() {
			this.query = {
				lineId: '',
				lineName: '',
				status: 0,
				transType: 0, //value值

				pageIndex: 1,
				pageSize: fData.pageSize
			};
		}
	}
};
</script>
