<template>
	<div class="role allHeight">
		<div class="crumbs">
			<el-breadcrumb separator-class="el-icon-arrow-right">
				<el-breadcrumb-item> 
                    <!-- <i class="el-icon-lx-people"></i>  -->
                {{ $t('common.actMant') }} </el-breadcrumb-item>
				<el-breadcrumb-item>{{ $t('common.agencyMant') }}</el-breadcrumb-item>
			</el-breadcrumb>
		</div>
		<div class="container">
			<div class="search-box">
				<div class="pk-inp-box pk-select">
                    <label>{{$t('common.line')}}:</label>
                    <el-select v-model="query.lineId" :placeholder="$t('common.all')" class="selbox">
                        <el-option
                            v-for="(item) in lineIdArrAll"
                            :key="item.lineId"
                            :label="item.lineId"
                            :value="item.lineId">
                        </el-option>
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
					<el-select v-model="query.isOnline" :placeholder="$t('common.all')" class="selbox">
						<el-option v-for="item in statusOptions" :key="item.key" :label="item.value" :value="item.key"> </el-option>
					</el-select>
				</div>
				<div class="pk-inp-box">
					<label>{{ $t('common.act') }}:</label>
					<el-input v-model="query.account" :placeholder="$t('common.p_act')" class="selbox"></el-input>
				</div>
				<div class="fl">
                    <el-button type="primary" icon="el-icon-search" @click="handleSearch">{{ $t('common.search') }}</el-button>
				    <el-button @click="reset">{{ $t('common.reset') }}</el-button>
                </div>
                <div class="clearboth"></div>
			</div>
			<el-table :data="tableData" :height="fData.tHeightOne()" border class="table" ref="multipleTable" header-cell-class-name="table-header">
				<el-table-column prop="id" label="ID" width="55" align="center"></el-table-column>
				<el-table-column prop="lineId" :label="$t('common.line')" align="center"></el-table-column>
				<el-table-column prop="agencyId" :label="$t('common.siteId')" align="center"></el-table-column>
				<el-table-column prop="account" :label="$t('common.act')" align="center"></el-table-column>
				<!-- <el-table-column prop="limit" :label="$t('common.quota')" align="center"></!--> -->
				<el-table-column :label="$t('common.status')" align="center">
					<template slot-scope="scope">
						<el-switch
							style="display: block"
							v-model="scope.row.statuspro"
							active-color="#13ce66"
							inactive-color="#ff4949"
							:active-text="$t('common.able')"
							:inactive-text="$t('common.disable')"
							@change="handuseAble(3, scope.$index, scope.row)"
						>
						</el-switch>
					</template>
				</el-table-column>
				<el-table-column :label="$t('common.addTime')" align="center">
					<template slot-scope="scope">
						{{scope.row.createTime | filterDate}}
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
	</div>
</template>

<script>
import Pagination from '@/components/common/Pagination'
import { agencyList,editAgencyStatus } from '@/api/account';
import { getLineIds } from '@/api/line';
import fData from '@/app.config';
import { getAgencyId } from "@/mixins/initAgentList";
export default {
    name: 'agencyMant',
    mixins: [ getAgencyId ],
    components: { Pagination },
	data() {
		return {
			query: {
				isOnline: 0, //value值
				account: '',
				lineId:"",
                pageIndex: 1,
                agencyId: '',
				pageSize: fData.pageSize
			},
			tableData: [],
			lineIdArrAll:[],
            pageTotal: 0,
            fData: fData,
			statusOptions: fData.statusOptions
		};
	},
	created() {
		console.log(this.agenListpro,"agenListpro")
		this.getLineIdWay();
		this.getData();
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
        refresh() {
            this.$router.push({
                name: 'agencyMant                                                                                                                       ',
            })
        },
		gorolePower() {
			this.$router.push({ name: 'roleTopower' });
		},

		handuseAble(status, index, row) {
			let newStatus = row.statuspro === true ? 1 : 2;
			let postdata = {
				id:row.id,
				status:newStatus
			}
			editAgencyStatus(postdata).then(res => {
				if(res.success){
					this.$message.success(this.$t('common.success'));
					this.getData();
				}else{
                    row.statuspro = row.status === 1;
                    this.$message.error(res.message)
				}
			})
			
		},
		
		getData(params) {
			if(this.query.lineId === this.$t('common.all')){
				this.query.lineId = ""
            }
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
			agencyList(post).then(res =>{
				if(res.success){
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
		//线路下啦框
        getLineIdWay(){
            getLineIds().then(res=>{
                if(res.success){
                    this.lineIdArrAll = [{
                        lineId: this.$t('common.all')
                    }]
                    res.data.map(i =>{
                        this.lineIdArrAll.push(i)
                    })
                }else{
                    this.$message.error(res.message)
                }
            })
        },
		// 触发搜索按钮
		handleSearch() {
			this.$set(this.query, 'pageIndex', 1);
            this.getData();
		},
		reset() {
			this.query = {
				isOnline: 0, //value值
				account: '',
				lineId:"",
                pageIndex: 1,
                agencyId: '',
				pageSize: fData.pageSize
			};
		}
	}
};
</script>
