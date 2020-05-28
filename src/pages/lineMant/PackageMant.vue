<template>
	<div class="packageMant allHeight">
		<div class="crumbs">
			<el-breadcrumb  separator-class="el-icon-arrow-right">
                <el-breadcrumb-item> 
                    <!-- <i class="el-icon-lx-people"></i> -->
                 {{$t('common.lineMant')}} </el-breadcrumb-item>
				<el-breadcrumb-item> 
                    <!-- <i class="el-icon-lx-people"></i>  -->
                {{$t('common.packageMant')}} </el-breadcrumb-item>
			</el-breadcrumb>
		</div>
		<div class="container">
			<div class="search-box">
				<div class="fr">
                    <el-button type="primary" icon="el-icon-lx-add" @click="handleEdit(1)">{{$t('common.add')}}</el-button>
                </div>
                <div class="clearboth"></div>
			</div>
			<el-table
				:data="tableData"
				border
                :height="fData.onlyOneHeight()"
				class="table"
				ref="multipleTable"
				header-cell-class-name="table-header"
			>
				<el-table-column prop="id" :label="$t('common.packageId')" width="75" align="center"></el-table-column>
				<el-table-column prop="mealName" :label="$t('common.packageName')" align="center"></el-table-column>
				<el-table-column prop="nnRoyalty" :label="$t('common.nnredTakePer')" align="center"></el-table-column>
				<el-table-column prop="slRoyalty" :label="$t('common.slredTakePer')" align="center"></el-table-column>
				<el-table-column prop="createTime" :label="$t('common.addTime')" align="center">
                    <template slot-scope="scope">
                        <span>{{scope.row.createTime | filterDate  }}</span>
                    </template>
                </el-table-column>
				<el-table-column prop="editTime" :label="$t('common.modifyTime')" align="center">
                    <template slot-scope="scope">
                        <span>{{scope.row.editTime | filterDate  }}</span>
                    </template>
                </el-table-column>
				<el-table-column :label="$t('common.operating')" width="230" align="center">
					<template slot-scope="scope">
						<el-button type="text" icon="el-icon-edit" @click="handleEdit(2, scope.$index, scope.row)">{{$t('common.modify')}}</el-button>
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
		<el-dialog :title="ruleForm.formTitle" :visible.sync="editVisible" width="30%">
			<el-form :model="ruleForm" label-width="150px" :rules="rules" ref="ruleForm">
				<el-form-item :label="$t('common.packName')" prop="mealName">
					<el-input v-model="ruleForm.mealName" :placeholder="$t('common.p_packName')"></el-input>
				</el-form-item>
				<el-form-item :label="$t('common.nnredPM')" prop="nnRoyalty">
					<el-input v-model.number="ruleForm.nnRoyalty" :placeholder="$t('common.p_nnredPM')"><template slot="append">%</template></el-input>
				</el-form-item>
                <el-form-item :label="$t('common.slredPM')" prop="slRoyalty">
					<el-input v-model.number="ruleForm.slRoyalty" :placeholder="$t('common.p_slredPM')"><template slot="append">%</template></el-input>
				</el-form-item>
			</el-form>
			<span slot="footer" class="dialog-footer">
				<el-button @click="resetEdit('ruleForm')">{{$t('common.cancel')}}</el-button>
				<el-button type="primary" @click="saveEdit('ruleForm')">{{$t('common.ok')}}</el-button>
			</span>
		</el-dialog>
	</div>
</template>

<script>
import fData from '@/app.config';
import {
    getPackageList,
    addPackage,
    getPackInfo,
    updPackage,
} from '@/api/line';
import Pagination from '@/components/common/Pagination'
export default {
    name: 'packageMant',
    components: { Pagination },
	data() {
		return {
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
			fData: fData,
			ruleForm: {
				formTitle: '', //模态框title
				mealName: '',
                nnRoyalty: '',
                slRoyalty: '',
			},
			formStatus: 1, //1添加 2修改
			status2: true,
			rules: {
				mealName: fData.MUST,
                nnRoyalty:  [
					{ required: true, message: this.$t('common.mustY'), trigger: 'blur' },
					{ validator: fData.royalty, trigger: 'blur' }
                ],
                slRoyalty: [
					{ required: true, message: this.$t('common.mustY'), trigger: 'blur' },
					{ validator: fData.royalty, trigger: 'blur' }
                ],
			},
		};
	},
	created() {
		this.getData();
	},
	methods: {
		getData(params) {
            if(params){
                this.query.pageIndex = params.page;
                this.query.pageSize = params.limit;
            }
			getPackageList(this.query).then(res => {
				if(res.success){
                    console.log(res, 'resssss');
                    this.tableData = res.data.data;
                    this.pageTotal = res.data.count || 0;
                }else{
                    this.$message.error(res.message)
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
				this.ruleForm.formTitle = this.$t('common.modifyPackName');
			} else if (status === 1) {
                this.initFormData()
			}
		},
		// 保存编辑
		saveEdit(formName) {
			this.$refs[formName].validate(valid => {
				if (valid) {
                    let func;
					if (this.formStatus === 2) {
                        func = updPackage
						// this.$set(this.tableData, this.idx, this.form);
					}else{
                        func = addPackage
                    }
                    func(this.ruleForm).then(res => {
                        if(res.success){
                            this.resetEdit(formName);
                            this.$message.success(this.$t('common.success'))
                            this.getData();
                        }else{
                            this.$message.error(res.message)
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
            this.initFormData()
			this.$refs[formName].resetFields();
		},
        initFormData(){
            this.ruleForm = {
				formTitle: this.$t('common.addPackName'),
				mealName: '',
                nnRoyalty: '',
                slRoyalty: '',
			}
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
		}
	}
};
</script>
