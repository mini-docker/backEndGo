<template>
	<div class="sysConf allHeight">
		<div class="crumbs">
			<el-breadcrumb separator-class="el-icon-arrow-right">
				<el-breadcrumb-item>
					<!-- <i class="el-icon-lx-people"></i>  -->
					{{ $t('common.sysMant') }}
				</el-breadcrumb-item>
				<el-breadcrumb-item>{{ $t('common.sysConf') }}</el-breadcrumb-item>
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
                            v-for="(item) in agenLs"
                            :key="item.account" :label="item.account" :value="item.account">
                        </el-option>
                    </el-select>
                </div>
                <div>
                    <el-button type="primary" icon="el-icon-search" @click="handleSearch">{{
						$t('common.search')
					}}</el-button>
                    <el-button @click="reset">{{ $t('common.reset') }}</el-button>
                </div>
            </div>

			<div class="search-box">
                <div class="pk-inp-box">
					<label>{{ $t('common.controlKills') }}:</label>
                    <el-tag
                        class="mgt5"
                        :type="systemConf.controlKill===1?'success':(systemConf.controlKill===2?'danger':'')"
                    >{{systemConf.controlKill|filterLineStatus}}</el-tag>
				</div>
				<div class="pk-inp-box lineheight30">
					<label>{{ $t('common.profitsStart') }}:</label>
					<el-input disabled v-model="systemConf.winRatioStart" :placeholder="$t('common.p_Number')" class="selbox">
                        <template slot="append">%</template>
                    </el-input>
				</div>
				<!-- <div class="pk-inp-box lineheight30 mgl10">
					<label>{{ $t('common.profitEnd') }}:</label>
					<el-input disabled v-model="systemConf.winRatioEnd" :placeholder="$t('common.p_Number')" class="selbox">
                        <template slot="append">%</template>
                    </el-input>
				</div>-->
                <div class="pk-inp-box lineheight30 mgl10">
					<label>{{ $t('common.curRadio') }}:</label>
					<p class="f16 red lineheight30" v-show="systemConf.currentRatio||systemConf.currentRatio==0">{{parseInt(systemConf.currentRatio*100)}}%</p>
				</div>
				<!-- <div>
					<el-button type="primary" @click="handleEdit()">{{ $t('common.submit') }}</el-button>
				</div> -->
			</div>
			<div class="search-box mgt10">
                <h3 class="f16 mgr10">控杀会员列表</h3>
				<!-- <el-button v-if="token.isAdmin !== 1" type="primary" @click="addMem()">{{ $t('common.addMem') }}</el-button> -->
            </div>
			<el-table
				:data="tableData"
				border
				class="table"
                :height="fData.tHeightOne()"
				ref="multipleTable"
				header-cell-class-name="table-header"
			>
            
				<el-table-column prop="agencyId" :label="$t('common.siteId')" align="center"></el-table-column>
				<el-table-column prop="account" :label="$t('common.memAct')" align="center"></el-table-column>
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
import fData from '@/app.config';
import Pagination from '@/components/common/Pagination';
import { getAgencyId } from '@/mixins/initAgentList';
import { userList } from '@/api/account';
import { sysqueSys } from '@/api/system';
import { getLineIds } from '@/api/line';
import { getAgeList } from '@/api/account';
export default {
	name: 'sysConf',
	mixins: [getAgencyId],
	components: { Pagination },
	data() {
		return {
			query: {
				agencyId: '',
                pageIndex: 1,
                lineId: '',
				pageSize: fData.pageSize
            },
            querys: {
                pageIndex: 1,
                pageSize: fData.pageSize
            },
            editVisible: false,
            pageTotal: 0,
            fData: fData,
            tableData: [],
			systemConf: {
				winRatioStart: '',
				winRatioEnd: '',
                controlKill: 1,
            },
            ruleForm: {
                memAct: ''
            },
            // 会员列表
            tableDatas: [],
            pageTotals: 0,
            checkedArr: [],
            lineIdArrAll: [], // 搜索线路下来框数组
			lineIdArr: [], // 添加线路下来框数组
			first: true,
			agenLs: [],
			cacheAccount: '',
		};
	},
    mounted(){
		this.getLineIdWay()
		
    },
    watch:{
        'query.lineId':function(val){
            if(val === this.$t('common.all')){
                val = ""
            }
            getAgeList({ lineId:val }).then(res => {
                if (res.success) {
					var blis = res.data;
					this.agenLs = blis;
					this.query.agencyId = blis[0].account
                    if(this.first){
						this.cacheAccount = blis[0].account
                        this.first=false;
                        this.getData();
                    }
                } else {
                    this.$message.error(res.message);
                }
            });
        }
    },
	methods: {
        //线路下啦框
		getLineIdWay() {
			getLineIds().then(res => {
				if (res.success) {
					this.lineIdArr = res.data;
					// this.lineIdArrAll = [
					// 	{lineId: this.$t('common.all')},
					// ];
					res.data.map(i => {
						this.lineIdArrAll.push(i);
					});
					this.query.lineId = this.lineIdArr[0].lineId
				} else {
					this.$message.error(res.message);
				}
			});
		},
		checkAgenId(account) {
            if (!account)return ''
            let a;
            this.agenListpro.map(v => {
                if (v.account == account) {
                    a = v.agencyId;
                }
            });
            return a;
        },
		getData(params) {
			if (this.query.agencyId === this.$t('common.all')) {
				this.query.agencyId = '';
			}
			if (params) {
				this.query.pageIndex = params.page;
				this.query.pageSize = params.limit;
			}
			if (!this.query.pageIndex) {
				this.query.pageIndex = 1;
			}
			if (!this.query.pageSize) {
				this.query.pageSize = fData.pageSize;
			}
			var post = {};
			this.$.extend(post, this.query);
			// post.agencyId = this.checkAgenId(this.query.agencyId);
			// console.log(post,'post',this.query.agencyId)
			sysqueSys(post).then(res => {
				if (res.success) {
					this.pageTotal = res.data.count || 0;
					this.systemConf = res.data.systemConf;
                    this.tableData = res.data.controlKillUsers || [];
                    
					console.log(res, 'ressssss');
				} else {
					this.$message.error(res.message);
				}
			});
        },
        handleSearch() {
            this.$set(this.query, 'pageIndex', 1);
            this.getData();
        },
        
        reset(){
            this.query = {
                agencyId: this.cacheAccount,
                pageIndex: 1,
                lineId: this.lineIdArr[0].lineId,
				pageSize: fData.pageSize
			}
        },
	}
};
</script>
