<template>
	<div class="eventPic allHeight">
		<div class="crumbs">
			<el-breadcrumb separator-class="el-icon-arrow-right">
				<el-breadcrumb-item> 
                    <!-- <i class="el-icon-lx-people"></i> -->
                 {{ $t('common.consultingMant') }} </el-breadcrumb-item>
				<el-breadcrumb-item> 
                    <!-- <i class="el-icon-lx-people"></i>  -->
                {{ $t('common.eventPicMant') }} </el-breadcrumb-item>
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
					<label>{{ $t('common.advName') }}:</label>
					<el-input v-model="query.activeName" :placeholder="$t('common.p_KeywordS')" class="selbox"></el-input>
				</div>
				<div class="fl">
					<el-button type="primary" icon="el-icon-search" @click="handleSearch">{{
						$t('common.search')
					}}</el-button>
					<el-button @click="reset">{{ $t('common.reset') }}</el-button>
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
				<el-table-column prop="lineId" :label="$t('common.line')" align="center"></el-table-column> 				<el-table-column prop="agencyId" :label="$t('common.siteId')" align="center"></el-table-column>
				<el-table-column prop="activeName" :label="$t('common.mName')" align="center"></el-table-column>
				<el-table-column prop="picture" :label="$t('common.adPic')" align="center">
                    <template slot-scope="scope">
                        <el-image 
                            style="width: 100px; height: 100px"
                            :src="scope.row.picture" 
                            :lazy='true'
                            @click="handlePreview(scope.row.picture)"
                            >
                        </el-image>
                    </template>
                </el-table-column>
				<el-table-column prop="" :label="$t('common.playTime')" align="center">
                    <template slot-scope="scope">
                        <div><span>{{$t('common.start')}}：</span><span>{{scope.row.startTime | filterDate}}</span></div>
                        <div><span>{{$t('common.end')}}：</span><span>{{scope.row.endTime | filterDate}}</span></div>
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
							@change="handuseAble(scope.$index, scope.row)"
						>
						</el-switch>
					</template>
				</el-table-column>
				<el-table-column :label="$t('common.operating')" width="120" align="center">
					<template slot-scope="scope">
						<el-button type="primary" plain @click="handleEdit(scope.row)">{{
							$t('common.look')
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
		<el-dialog :title="$t('common.look')" :visible.sync="editVisible" width="35%">
			<el-form :model="ruleForm" label-width="90px" ref="ruleForm">
				<el-form-item :label="$t('common.mName')+':'">
					<el-input v-model="ruleForm.lineId" disabled></el-input>
				</el-form-item>
				<el-form-item :label="$t('common.playTime')+':'">
                    <div>
                        <div><span>{{ruleForm.startTime|filterDate}}</span>&nbsp;&nbsp;~&nbsp;&nbsp;<span>{{ruleForm.endTime|filterDate}}</span></div>
                    </div>
				</el-form-item>
				<el-form-item :label="$t('common.img')+':'">
                    <el-image 
                        style="width: 100px; height: 100px"
                        :src="ruleForm.picture" 
                        :lazy="true"
                        @click="$event.preventDefault()"
                        >
                    </el-image>
				</el-form-item>
				<el-form-item :label="$t('common.status')+':'">
                    <el-tag
                         :type="ruleForm.status===1?'success':ruleForm.status===2?'danger':''">
                            {{ruleForm.status|filterLineStatus}}
                        </el-tag>
                </el-form-item>
			</el-form>
			<span slot="footer" class="dialog-footer">
				<el-button @click="editVisible=false">{{ $t('common.return') }}</el-button>
			</span>
		</el-dialog>
        <el-dialog :visible.sync="dialogVisible">
            <img width="100%" :src="dialogImageUrl" alt="">
        </el-dialog>
	</div>
</template>

<script>
import { 
    getActivity,
    getActivityOne,
    editActivityStatus
} from '@/api/announce';
import { getLineIds } from '@/api/line';
import Pagination from '@/components/common/Pagination'
import fData from '@/app.config';
import { getAgencyId } from "@/mixins/initAgentList";
export default {
    name: 'EventPciMant',
    mixins: [ getAgencyId ],
    components: { Pagination },
	data() {
		return {
			query: {
                lineId: '',
                activeName: '',
                status: 0,
                pageIndex: 1,
                agencyId: '',
				pageSize: fData.pageSize,
			},
			tableData: [],
			lineIdArrAll: [],
			editVisible: false,
			pageTotal: 0,
			dialogImageUrl: '',
            dialogVisible: false,
			fData: fData,
			ruleForm: {},
			formStatus: 1, //1添加 2修改
			statusOptionspro: [],
		};
	},
	created() {
        this.getData();
        this.getLineIdWay();
        this.statusOptionspro = this.$.extend(this.statusOptionspro, this.fData.statusOptions);
        this.statusOptionspro.shift();
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
			getActivity(post).then(res => {
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
        handlePreview(url) {
            this.dialogImageUrl = url;
            this.dialogVisible = true;
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
            getActivityOne({ id: row.id }).then(res => {
				if (res.success) {
					this.ruleForm = res.data;
				} else {
					this.$message.error(res.message);
				}
			});
		},
		handuseAble(index, row) {
			let post = {};
			this.$.extend(post, row);
			post.status = post.statuspro ? 1 : 2;
			editActivityStatus(post).then(res => {
				if (res.success) {
					this.$message.success(this.$t('common.success'));
					this.getData();
				} else {
					row.statuspro = row.status === 1;
					this.$message.error(res.message);
                }
            })
		},
		reset() {
			this.query = {
                lineId: '',
                activeName: '',
                status: 0,
                pageIndex: 1,
                agencyId: '',
				pageSize: fData.pageSize,
			};
		}
	}
};
</script>
