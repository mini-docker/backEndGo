<template>
	<div class="eventPic allHeight">
		<div class="crumbs">
			<el-breadcrumb separator-class="el-icon-arrow-right">
				<el-breadcrumb-item> 
                    <!-- <i class="el-icon-lx-people"></i>  -->
                {{ $t('common.consultingMant') }} </el-breadcrumb-item>
				<el-breadcrumb-item> 
                    <!-- <i class="el-icon-lx-people"></i>  -->
                {{ $t('common.announceMant') }} </el-breadcrumb-item>
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
                <div class="pk-inp-box pk-select">
					<label>{{ $t('common.siteId') }}:</label>
                    <el-select filterable v-model="query.agencyId" :placeholder="$t('common.all')" class="selbox pull-width">
                        <el-option
                            v-for="(item) in agenListpro"
                            :key="item.account" :label="item.account" :value="item.account">
                        </el-option>
                    </el-select>
                </div>
				<div class="pk-inp-box pk-select">
					<label>{{ $t('common.status') }}:</label>
					<el-select v-model="query.status" :placeholder="$t('common.all')" class="selbox">
						<el-option v-for="item in fData.statusOptions" :key="item.key" :label="item.value" :value="item.key"> </el-option>
					</el-select>
				</div>
				<div class="pk-inp-box">
					<label>{{ $t('common.announceTit') }}:</label>
					<el-input v-model="query.title" :placeholder="$t('common.p_KeywordS')" class="selbox"></el-input>
				</div>
				<div class="fl">
					<el-button type="primary" icon="el-icon-search" @click="handleSearch">{{
						$t('common.search')
					}}</el-button>
					<el-button @click="reset">{{ $t('common.reset') }}</el-button>
				</div>
				<div class="clearboth"></div>
			</div>
			<el-table :height="fData.onlyOneHeight()" :data="tableData" border class="table" ref="multipleTable" header-cell-class-name="table-header">
				<el-table-column prop="lineId" :label="$t('common.line')" align="center"></el-table-column> 				
                <el-table-column prop="agencyId" :label="$t('common.siteId')" align="center"></el-table-column>
				<el-table-column prop="title" :label="$t('common.announceTit')" align="center"></el-table-column>

				<el-table-column prop="" :label="$t('common.playTime')" align="center">
					<template slot-scope="scope">
						<div>
							<span>{{ $t('common.start') }}：</span><span>{{ scope.row.startTime | filterDate }}</span>
						</div>
						<div>
							<span>{{ $t('common.end') }}：</span><span>{{ scope.row.endTime | filterDate }}</span>
						</div>
					</template>
				</el-table-column>
				<el-table-column prop="name" :label="$t('common.playOrder')" align="center">
					<template slot-scope="scope">
						<el-input-number
							disabled
							:min="1"
							:max="99999999"
							size="small"
							v-model="scope.row.sort"
							@change="handleChange(row)"
						></el-input-number>
					</template>
				</el-table-column>

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
				<el-table-column :label="$t('common.operating')" width="120" align="center">
					<template slot-scope="scope">
						<el-button type="primary" plain @click="handleEdit(scope.row)">{{ $t('common.look') }}</el-button>
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
		<el-dialog title="查看" :visible.sync="editVisible" width="35%">
			<el-form :model="ruleForm" label-width="90px" ref="ruleForm">
				<el-form-item :label="$t('common.announceTit')">
					<el-input v-model="ruleForm.title" disabled></el-input>
				</el-form-item>
				<el-form-item :label="$t('common.annoTime')">
					<div>
						<div>
							<span>{{ ruleForm.startTime | filterDate }}</span
							>&nbsp;&nbsp;~&nbsp;&nbsp;<span>{{ ruleForm.endTime | filterDate }}</span>
						</div>
					</div>
				</el-form-item>
				<el-form-item :label="$t('common.annoCon')">
					<template slot-scope="scope">
						<el-input
							disabled
							v-model="ruleForm.content"
							:autosize="{ minRows: 2, maxRows: 10 }"
							type="textarea"
							:placeholder="$t('common.p_Con')"
						>
						</el-input>
					</template>
				</el-form-item>
				<el-form-item :label="$t('common.status')">
					<el-tag :type="ruleForm.status === 1 ? 'success' : ruleForm.status === 2 ? 'danger' : ''">{{
						ruleForm.status | filterLineStatus
					}}</el-tag>
				</el-form-item>
			</el-form>
			<span slot="footer" class="dialog-footer">
				<el-button @click="editVisible = false">{{ $t('common.return') }}</el-button>
			</span>
		</el-dialog>
	</div>
</template>

<script>
import Pagination from '@/components/common/Pagination'
import fData from '@/app.config';
import { getAnno, getAnnoOne, editAnnoStatus } from '@/api/announce';
import { getLineIds } from '@/api/line';
import { getAgencyId } from "@/mixins/initAgentList";
export default {
    name: 'announcemant',
    mixins: [ getAgencyId ],
    components: { Pagination },
	data() {
		let MUST = [{ required: true, message: this.$t('common.mustY'), trigger: 'blur' }];
		return {
			query: {
				lineId: '',
				title: '',
				status: 0,
                pageIndex: 1,
                agencyId: '',
				pageSize: fData.pageSize
			},
			tableData: [],
			editVisible: false,
			pageTotal: 0,
			fData: fData,
			ruleForm: {},
			formStatus: 1, //1添加 2修改
			lineIdArrAll: []
		};
	},
	created() {
		this.getData();
		this.getLineIdWay();
    },
    watch:{
        'query.lineId':function(val){
            if(val === this.$t('common.all')){
				val = ""
            }
            this.query.agencyId=''
            this.getAenList(val)
        }
    },
	methods: {
		getData(params) {
            if(params){
                this.query.pageIndex = params.page;
                this.query.pageSize = params.limit;
            }
            if(this.query.agencyId === this.$t('common.all')){
                this.query.agencyId = ''
            }
            var post = {};
			this.$.extend(post, this.query);
            post.agencyId = this.checkAgenId(post.agencyId)
			getAnno(post).then(res => {
				if (res.success) {
					this.tableData = res.data.data;
					this.pageTotal = res.data.count || 0;
					this.tableData.map(v => {
						v.statuspro = v.status === 1;
					});
				} else {
					this.$message.error(res.message);
				}
			});
		},
		//线路下啦框
		getLineIdWay() {
			getLineIds().then(res => {
				if (res.success) {
					this.lineIdArrAll = [
						{
							lineId: this.$t('common.all')
						}
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
		handleEdit(row) {
			this.editVisible = true;
			getAnnoOne({ id: row.id }).then(res => {
				if (res.success) {
					this.ruleForm = res.data;
				} else {
					this.$message.error(res.message);
				}
			});
		},
		handuseAble(row) {
			let post = {};
			this.$.extend(post, row);
			post.status = post.statuspro ? 1 : 2;
			editAnnoStatus(post).then(res => {
				if (res.success) {
					this.$message.success(this.$t('common.success'));
					this.getData();
				} else {
					row.statuspro = row.status === 1;
					this.$message.error(res.message);
				}
			});
		},
		handleChange(value) {
			console.log(value);
		},
		reset() {
			this.query = {
				lineId: '',
				title: '',
                status: 0,
                agencyId: '',
				pageIndex: 1,
				pageSize: fData.pageSize
			};
		}
	}
};
</script>
