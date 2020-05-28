<template>
<!-- allHeight -->
    <div class="chartline ">
        <div class="crumbs">
            <el-breadcrumb  separator-class="el-icon-arrow-right">
                <el-breadcrumb-item>
                    <!-- <i class="el-icon-lx-people"></i>  -->
                    {{$t('common.statistics')}}
                </el-breadcrumb-item>
                <el-breadcrumb-item>{{$t('common.getGoods')}}</el-breadcrumb-item>
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
                <div class="timesr mgr10">
                    <el-button-group>
                        <el-button type="primary" v-for="(item,i) in dateArr" :key="i" @click="setDate(item,i)" :class="{'active': isNow === i}">{{item.name}}</el-button>
                    </el-button-group>
                </div>
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
                    <label>{{$t('common.gameType')}}:</label>
                    <el-select v-model="query.gameType" :placeholder="$t('common.all')" class="selbox">
                        <el-option
                            v-for="(item) in gameNameOppro"
                            :key="item.key"
                            :label="item.value"
                            :value="item.key">
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
            <div class="getgoods">
                <div>
                    <p class="pt">{{$t('common.fvaildMember')}}</p>
                    <p class="pb">{{listdata.validMember}}</p>
                </div>
                <div>
                    <p class="pt">{{$t('common.fvalidBet')}}</p>
                    <p class="pb">{{listdata.validBet | currency}}</p>
                </div>
                <div>
                    <p class="pt">{{$t('common.fredNum')}}</p>
                    <p class="pb">{{listdata.redNum}}</p>
                </div>
                <div>
                    <p class="pt">{{$t('common.forderNum')}}</p>
                    <p class="pb">{{listdata.orderNum}}</p>
                </div>
                <div>
                    <p class="pt">{{$t('common.ftotalWin')}}</p>
                    <p class="pb">{{listdata.totalWin | currency}}</p>
                </div>
                <div>
                    <p class="pt">{{$t('common.froyaltyMoney')}}</p>
                    <p class="pb">{{listdata.royaltyMoney | currency}}</p>
                </div>
                <!--<div>
                    <p class="pt">{{$t('common.ffreeDeathWin')}}</p>
                    <p class="pb">{{listdata.freeDeathWin | currency}}</p>
                </div>-->
                <div>
                    <p class="pt">{{$t('common.frobotWin')}}</p>
                    <p class="pb">{{listdata.robotWin | currency}}</p>
                </div>
            </div>
            <div id="chart1"></div>
            <p class="ptit">{{$t('common.statisForm')}}</p>
            <el-table
                :data="tableData"
                :height="tableData.length>10?fData.onlyOneHeight():300"
                border
                class="table mgb10"
                ref="multipleTable"
                header-cell-class-name="table-header"
            >
                <el-table-column prop="agencyId" :label="$t('common.siteId')" align="center"></el-table-column>

                <el-table-column prop="validMember" :label="$t('common.fvaildMember')" align="center">
                    <!-- <template slot-scope="scope">
                        <div>
                            {{scope.row.validMember|currency}}
                        </div>
                    </template> -->
                </el-table-column>
                <el-table-column prop="validBet" :label="$t('common.fvalidBet')" align="center">
                    <template slot-scope="scope">
                        <div>
                            {{scope.row.validBet|currency}}
                        </div>
                    </template>
                </el-table-column>
                <el-table-column prop="redNum" :label="$t('common.fredNum')" align="center">
                    <!-- <template slot-scope="scope">
                        <div>
                            {{scope.row.redNum|currency}}
                        </div>
                    </template> -->
                </el-table-column>
                <el-table-column prop="orderNum" :label="$t('common.forderNum')" align="center">
                    <!-- <template slot-scope="scope">
                        <div>
                            {{scope.row.orderNum|currency}}
                        </div>
                    </template> -->
                </el-table-column>
                <el-table-column prop="royaltyMoney" :label="$t('common.froyaltyMoney')" align="center">
                    <template slot-scope="scope">
                        <div>
                            {{scope.row.royaltyMoney|currency}}
                        </div>
                    </template>
                </el-table-column>
                <!--<el-table-column prop="freeDeathWin" :label="$t('common.ffreeDeathWin')" align="center">
                    <template slot-scope="scope">
                        <div>
                            {{scope.row.freeDeathWin|currency}}
                        </div>
                    </template>
                </el-table-column> -->
                <el-table-column prop="robotWin" :label="$t('common.frobotWin')" align="center">
                    <template slot-scope="scope">
                        <div>
                            {{scope.row.robotWin|currency}}
                        </div>
                    </template>
                </el-table-column>
                <el-table-column prop="totalWin" :label="$t('common.ftotalWin')" align="center">
                    <template slot-scope="scope">
                        <div>
                            {{scope.row.totalWin|currency}}
                        </div>
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
import {redSline} from '@/api/red';
import { getLineIds } from '@/api/line';
import { getDate,Timestamp} from '@/filter.js';
import { getAgencyId } from "@/mixins/initAgentList";
export default {
    name: 'site',
    mixins: [ getAgencyId ],
	components: { Pagination },
    data() {
        return {
            query: {
                gameType: '', //
                status: 0,
                pageIndex: 1,
                pageSize: fData.pageSize,
                agencyId: '',// 站点id
            },
            lineIdArrAll:[],
            tableData: [],
            pageTotal: 0,
            fData: fData,
            voptions: null,
            selTimes:[],
            listdata:{},
            dateArr: fData.dateArr,
            isNow: 2,
            gameNameOppro: []
        };
    },
    watch:{
        'query.lineId':function(val){
            if(this.query.lineId === this.$t('common.all')){
                this.query.lineId = ''
            }
            this.query.agencyId=''
            this.getAenList(val);
        }
    },
    created() {
        this.getLineIdWay();
    },
    mounted(){
       this.$.extend(this.gameNameOppro, this.fData.gameNameOp);
       this.gameNameOppro.pop();
       this.setDate(this.dateArr[this.isNow],this.isNow)
       this.getData();
        
    },
    methods: {
        makeLine(dataTitle,dataTime,seriesLineArr){
            this.voptions = {
                color: ['#4ca3f4', "#fb6637", "#b089fc"], //三个折线图背景颜色
                title: {
                    text: '盈利分析',
                    left: '2.7%',
                    top: '5%',
                    textStyle: {
                        color: "#333",
                        fontWeight: "normal",
                        fontSize: "22",
                    }
                },
                legend: {
                    icon: "rect",
                    itemHeight: 2, // 设置高度
                    itemGap: 20, //设置间距
                    textStyle: {
                        color: "#757575"
                    },
                    left: '2.7%',
                    top: "14%",
                    // data: ['有效人数', '有效打码', '总局数', ]
                    data: dataTitle
                },
                tooltip: {
                    trigger: "axis",
                    axisPointer: { // 坐标轴指示器，坐标轴触发有效
                        type: 'line' // 默认为直线，可选为：'line' | 'shadow'
                    }
                },
                grid: {
                    left: '2.7%',
                    top: "28%",
                    containLabel: true,
                    borderColor: "#eaeaea"
                },
                xAxis: {
                    type: "category",
                    // data: [
                    //     "2020-02-21",
                    //     "2020-02-22"
                    // ],
                    data: dataTime,
                    axisLine: {
                        lineStyle: {
                            color: "#eaeaea" //x轴线 和 文字颜色
                        }
                    },
                    axisLabel: {
                        textStyle: {
                            color: "#757575" //x轴线下的文字颜色
                        }
                    },

                },
                yAxis: {
                    type: "value",
                    name: '单位：元',
                    minInterval: 1,
                    nameTextStyle: {
                        color: "#757575"
                    },
                    axisLine: {
                        lineStyle: {
                            color: "#eaeaea"
                        }
                    },
                    axisLabel: {
                        textStyle: {
                            color: "#757575"
                        }
                    },
                    splitLine: {
                        show: true,
                        lineStyle: {
                            color: "#eaeaea",
                            type: 'dashed'
                        }
                    }
                },
                series: seriesLineArr,
            //     series: [
            //         {
            //         "name":"有效人数",
            //         "type":"line",
            //         "stack":"总数",
            //         "data":[
            //             0,
            //             0
            //         ]
            //     },
            //     {
            //         "name":"有效打码",
            //         "type":"line",
            //         "stack":"总数",
            //         "data":[
            //             2762.96,
            //             2662.96
            //         ]
            //     },
            //     {
            //         "name":"总局数",
            //         "type":"line",
            //         "stack":"总数",
            //         "data":[
            //             1973,
            //             1718
            //         ]
            //     },
            //     {
            //         "name":"总注单",
            //         "type":"line",
            //         "stack":"总数",
            //         "data":[
            //             6151,
            //             5386
            //         ]
            //     },
            //     {
            //         "name":"总抽水",
            //         "type":"line",
            //         "stack":"总数",
            //         "data":[
            //             196.9,
            //             194.9
            //         ]
            //     },
            //     {
            //         "name":"免死号盈利",
            //         "type":"line",
            //         "stack":"总数",
            //         "data":[
            //             578.2,
            //             518.2
            //         ]
            //     },
            //     {
            //         "name":"机器人盈利",
            //         "type":"line",
            //         "stack":"总数",
            //         "data":[
            //             -558.24,
            //             -558.24
            //         ]
            //     },
            //     {
            //         "name":"总盈利",
            //         "type":"line",
            //         "stack":"总数",
            //         "data":[
            //             216.86,
            //             154.86
            //         ]
            //     }
            // ]
            }
        },
        getData(params) {
            this.$chart.line1('chart1',{},true);
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
            if(post.gameType===''){
                post.gameType = 0
            }
            redSline(post).then(res => {
                if(res.success){
                    console.log(res,'resssss');
                    let data = res.data;
                    this.listdata = data.totalData;
                    this.tableData = data.orderStatistical || [];
                    let orderSeries = data.orderSeries;
                    this.makeLine(orderSeries.nameData,orderSeries.data,orderSeries.series)
                    this.$chart.line1('chart1',this.voptions,false);
                }else{
                    this.$message.error(res.message)
                }
            });
        },
        setDate(item, idx, cb) {
            this.isNow = idx;
            switch (item.value) {
                case "today":
                    this.selTimes = [getDate().today.start *1000,getDate().today.end *1000];
                    break;
                case "yesterday":
                    this.selTimes = [getDate().yesterday.start *1000,getDate().yesterday.end *1000];
                    break;
                case "last7days":
                    this.selTimes = [getDate().last7days.start *1000,getDate().last7days.end *1000];
                    break;
                case "thisMonth":
                    this.selTimes = [getDate().thisMonth.start *1000,getDate().thisMonth.end *1000];
                    break;
                case "lastMonth":
                    this.selTimes = [getDate().lastMonth.start *1000,getDate().lastMonth.end *1000];
                    break;
            }
            cb ? cb() : '';
        },
        // 触发搜索按钮
        handleSearch() {
            this.$set(this.query, 'pageIndex', 1);
            this.getData();
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
        reset(){
            this.query = {
                gameType: '', //value值
                status: 0,
                pageIndex: 1,
                pageSize: fData.pageSize,
                agencyId: '',// 站点id
            }
            this.isNow = 2;
            this.setDate(this.dateArr[this.isNow], this.isNow);
        }
    }
};
</script>
<style lang="scss" scoped>
.ptit{
    color: #666;
    font-size: 16px;
    padding-bottom: 8px;
}
.timesr{
    button{
        background: #66b1ff!important;
        border-color: #66b1ff!important;
    }
    .active{
        background-color: #409EFF!important;
        border-color: #409EFF!important;
    }
}
.getgoods{
    width: 100%;
    padding: 10px 0;
    display: flex;
    flex-wrap: wrap;
    align-items: center;
    div{
        transition: all .5s ease;
        background-color: #409EFF;
        color: #fff;
        width: 24.5%;
        height: 90px;
        margin-right: 8px;
        margin-bottom: 8px;
        display: flex;
        flex-direction: column;
        justify-content: center;
        &:nth-child(4n+4){
            margin-right: 0;
        }
        &:hover{
            // box-shadow: 0 4px 6px 1px rgba(158,158,158,.35);
            transform: scale(1.05);
        }
        p{
            padding-left: 10px;
            &.pt{
                font-size: 14px;
            }
            &.pb{
                font-size: 20px;                
            }
        }
    }
}
#chart1 {
    width: 100%;
    height: 600px;
  }
</style>
