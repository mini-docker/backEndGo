<template>
	<div class="allHeight">
		<div class="crumbs">
			<el-breadcrumb separator-class="el-icon-arrow-right">
				<el-breadcrumb-item> 
                    <!-- <i class="el-icon-lx-people"></i>  -->
                {{ $t('common.redEnveGMant') }} </el-breadcrumb-item>
				<el-breadcrumb-item> 
                    <!-- <i class="el-icon-lx-people"></i>  -->
                {{ $t('common.gameMant') }} </el-breadcrumb-item>
			</el-breadcrumb>
		</div>
		<div class="container">
			<div class="search-box">
				<div class="fr">
					<el-button type="primary" icon="el-icon-lx-add" @click="handleEdit(1)">{{ $t('common.add') }}</el-button>
				</div>
				<div class="clearboth"></div>
			</div>
			<el-table :height="fData.onlyOneHeight()" :data="tableData" border class="table" ref="multipleTable" header-cell-class-name="table-header">
				<el-table-column :label="$t('common.gameType')" align="center">
					<template slot-scope="scope">
						{{scope.row.gameType | gameTypa}}
					</template>
				</el-table-column>
				<el-table-column prop="gameName" :label="$t('common.gameName')" align="center"></el-table-column>
				<el-table-column :label="$t('common.status')" align="center">
					<template slot-scope="scope">
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
					</template>
				</el-table-column>
			</el-table>
            <pagination
                v-show="pageTotal > 0"
                :total="pageTotal"
                :page.sync="ruleForm.pageIndex"
                :limit.sync="ruleForm.pageSize"
                @pagination="getData"
            />
		</div>

		<!-- 编辑弹出框 -->
		<el-dialog :title="ruleForm.formTitle" :visible.sync="editVisible" @close="resetEdit('ruleForm')" width="30%">
			<el-form :model="ruleForm" label-width="90px" :rules="rules" ref="ruleForm">
				<el-form-item :label="$t('common.gameType')" prop="gameType">
					<el-select v-model="ruleForm.gameType" :placeholder="$t('common.gameType')" class="selbox pull-width">
                        <el-option
                            v-for="(item) in fData.gameType"
                            :key="item.key"
                            :label="item.value"
                            :value="item.key">
                        </el-option>
                    </el-select>
				</el-form-item>
				<el-form-item :label="$t('common.gameName')" prop="gameName">
					<el-input v-model="ruleForm.gameName" :placeholder="$t('common.p_remark')"></el-input>
				</el-form-item>
				<el-form-item :label="$t('common.status')" prop="status">
					<el-select v-model="ruleForm.status" :placeholder="$t('common.all')" class="selbox pull-width">
						<el-option v-for="item in statusOptionspro" :key="item.key" :label="item.value" :value="item.key"> </el-option>
					</el-select>
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
import { gameList, addGame,editGame,editGameStatus } from '@/api/red';
export default {
    components: { Pagination },
	data() {
		return {
			pageTotal: 0,
			tableData: [],
			ruleForm: {
				formTitle: '', //模态框title
				gameName: '',
				gameType: '',
				status:'',
                id:0,
                pageIndex: 1,
				pageSize: fData.pageSize,
			},
			editVisible: false,
			rules: {
                gameType: fData.MUST,
                gameName: fData.MUST,
                // [
				// 	{ required: true, message: this.$t('common.mustY'), trigger: 'blur' },
				// 	{ min:5, max:10, message: this.$t('common.len_gName'), trigger: 'blur' }
				// ],
                status: fData.MUST,
			},
            fData: fData,
			statusOptionspro: []
		};
	},
	created() {
		this.getData();
		this.$.extend(this.statusOptionspro, this.fData.ableOptions);
		this.ruleForm.gameType = fData.gameType[0].key;
	},

	methods: {
		handuseAble(row) {
			let newStatus = row.statuspro === true ? 1 : 2;
			let postdata = {
				id:row.id,
				status:newStatus
			}
			editGameStatus(postdata).then(res => {
				if(res.success){
					this.$message.success(this.$t('common.success'));
					this.getData();
				}else{
                    this.$message.error(res.message)
				}
			})
			
		},
		getData(params) {
            if(params){
                this.ruleForm.pageIndex = params.page;
                this.ruleForm.pageSize = params.limit;
            }
			gameList(this.ruleForm).then(res =>{
				if(res.success){
					this.tableData = res.data.data;
					this.tableData.map(v => {
						v.statuspro = v.status === 1;
                    });
                    this.pageTotal = res.data.count;
				}else{
					this.$message.error(res.message);
				}
			})
		},
		// 编辑操作
		handleEdit(status, index, row) {
            this.formStatus = status;
            this.editVisible = true;
			if (status === 2) {
				this.idx = index;
				this.ruleForm = this.$.extend(this.ruleForm, row);
				this.ruleForm.formTitle = this.$t('common.modify')+this.$t('common.game');
			} else if (status === 1) {
				this.initFormData()
			}
		},

		// 保存编辑
		saveEdit(formName) {
			this.$refs[formName].validate(valid => {
                if(valid){
                    let func;
                    if(this.formStatus===1){
                        func = addGame
                    }else{
                        func = editGame
                    }
                    func(this.ruleForm).then(res => {
                        if(res.success){
                            this.editVisible = false;
                            this.$message.success(this.$t('common.success'));
                            this.getData();
                        }else{
                            this.$message.error(res.message)
                        }
                    })
                }
            })
        },
        initFormData(){
            this.ruleForm = {
                formTitle: this.$t('common.add')+this.$t('common.game'),
                gameName: '',
                gameType: fData.gameType[0].key,
                status:this.fData.ableOptions[0].key,
                id:''
            };
        },
		//取消编辑
		resetEdit(formName) {
			this.editVisible = false;
            this.$refs[formName].resetFields();
            this.initFormData()
		}
	}
};
</script>
