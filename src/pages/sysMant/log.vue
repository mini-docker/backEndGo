<template>
    <div class="role allHeight">
        <div class="crumbs">
            <el-breadcrumb  separator-class="el-icon-arrow-right">
                <el-breadcrumb-item>
                    <!-- <i class="el-icon-lx-people"></i>  -->
                    {{$t('common.sysMant')}}
                </el-breadcrumb-item>
                <el-breadcrumb-item>{{$t('common.operLog')}}</el-breadcrumb-item>
            </el-breadcrumb>
        </div>
        <div class="container">
            <div class="search-box">
				<div class="pk-inp-box time-d-width">
					<label>{{ $t('common.dataSel') }}:</label>
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
                <div class="pk-inp-box pk-select" v-if="token.isAdmin === 1">
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
                <div class="pk-inp-box pk-select" v-if="token.isAdmin === 1">
					<label>{{ $t('common.siteId') }}:</label>
                    <el-select filterable v-model="query.agencyId" :placeholder="$t('common.all')" class="selbox pull-width">
                        <el-option
                            v-for="(item) in agenListpro"
                            :key="item.account" :label="item.account" :value="item.account">
                        </el-option>
                    </el-select>
                </div>
                <div class="pk-inp-box pk-select">
					<label>{{ $t('common.logType') }}:</label>
                    <el-select v-model="query.logType" :placeholder="$t('common.all')" class="selbox pull-width">
                        <el-option
                            v-for="(item) in fData.logTypesOp"
                            :key="item.key" :label="item.value" :value="item.key">
                        </el-option>
                    </el-select>
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
                <el-table-column prop="lineId" :label="$t('common.lineId')" align="center"></el-table-column>
                <el-table-column prop="agencyId" :label="$t('common.siteId')" align="center"></el-table-column>
                <el-table-column prop="logType" :label="$t('common.logType')" align="center">
                    <template slot-scope="scope">
                        <span>{{scope.row.logType|filterLogTypes}}</span>
                    </template>
                </el-table-column>
                <el-table-column prop="remark" :label="$t('common.log')" align="center" width="400"></el-table-column>
                <el-table-column prop="creator" :label="$t('common.doer')" align="center"></el-table-column>
                <el-table-column prop="creatorIp" :label="$t('common.doerIp')" align="center"></el-table-column>
                <el-table-column prop="createTime" :label="$t('common.createTime')" align="center" width="200">
                    <template slot-scope="scope">
                        <span>{{scope.row.createTime|filterDate}}</span>
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
import fData from '@/app.config';
import Pagination from '@/components/common/Pagination';
import {
    getLogList
} from '@/api/site'
import { getAgencyId } from "@/mixins/initAgentList";
import { getDate,Timestamp} from '@/filter.js';
import { getLineIds } from '@/api/line';

export default {
    name: 'site',
    mixins: [ getAgencyId ],
	components: { Pagination },
    data() {
        return {
            query: {
                siteName: '', //value值
                status: 0,
                pageIndex: 1,
                pageSize: fData.pageSize,
                agencyId: '',// 站点id
                logType: 0,// 日志类型
                addTime: '',
                startTime: 0,
				endTime: 0,
                lineId: ''
            },
            selTimes:[],
            tableData: [],
            pageTotal: 0,
            fData: fData,
            lineIdArrAll: [],
            // logTypesOppro: [],
        };
    },
     watch:{
        'query.lineId':function(val){
            if(this.query.lineId === this.$t('common.all')){
                this.query.lineId = ''
            }
            this.query.agencyId=''
            this.getAenList(val);
        },
    }, 
    created() {
        this.getLineIdWay();
        this.getData();
        // this.logTypesOppro = this.fData.logTypesOp.slice(1,this.fData.logTypesOp.length)
    },
    methods: {
        //线路下啦框
        getLineIdWay(){
            getLineIds().then(res=>{
                if(res.success){
                    // this.lineIdArrAll = [{
                    //     lineId: this.$t('common.all')
                    // }]
                    // res.data.map(i =>{
                    //     this.lineIdArrAll.push(i)
                    // })
                    this.lineIdArrAll = [{lineId: this.$t('common.all')},...res.data]
                    console.log(this.lineIdArrAll,'this.lineIdArrAll')
                }else{
                    this.$message.error(res.message)
                }
            })
        },
        getData(params) {
            if(this.query.agencyId === this.$t('common.all')){
                this.query.agencyId = ''
            }
            if(params){
                this.query.pageIndex = params.page;
                this.query.pageSize = params.limit;
            }
            if(!this.query.pageIndex){
                this.query.pageIndex = 1
            }
            if(!this.query.pageSize){
                this.query.pageSize = fData.pageSize
            }
            var post = {};
			this.$.extend(post, this.query);
            post.agencyId = this.checkAgenId(post.agencyId)
            console.log(this.query,'query',this.query.status)
            post.startTime = this.selTimes[0]
            post.endTime = this.selTimes[1]
            post.startTime = parseInt((post.startTime / 1000) || 0)
            post.endTime = parseInt((post.endTime / 1000) || 0)
            post.startTime = Timestamp(post.startTime)
            post.endTime = Timestamp(post.endTime)
            getLogList(post).then(res => {
                if(res.success){
                    console.log(res,'resssss');
                    this.tableData = res.data.data || [];
                    this.pageTotal = res.data.count || 0;
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
        reset(){
            this.query = {
                siteName: '', //value值
                status: 0,
                pageIndex: 1,
                pageSize: fData.pageSize,
                agencyId: '',// 站点id
                logType: 0,// 日志类型
                addTime: '',
                startTime: 0,
				endTime: 0,
                lineId: ''
            },
            this.selTimes = []
        }
    }
};
</script>
