<template>
	<div class="lineList">
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
            <div class="handle-box flex-end">
			</div>
			<div class="search-box">
				<div class="pk-inp-box time-d-width">
					<label>{{ $t('common.addTime') }}:</label>
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
				<div class="fl">
					<el-button type="primary" icon="el-icon-search" @click="handleSearch">{{
						$t('common.search')
					}}</el-button>
					<el-button @click="reset">{{ $t('common.reset') }}</el-button>
				    <!-- <el-button type="primary" :icon="!collpase?'el-icon-lx-add':'el-icon-lx-move'" @click="toggleCollpase()">{{ collpase?$t('common.collapseAll'):$t('common.expandAll')}}</el-button> -->
				</div>
				<div class="clearboth"></div>
			</div>
            
            <div class="el-table multipleTable el-table--fit el-table--border el-table--enable-row-hover el-table--enable-row-transition el-table--small" style="width: 100%">
                <div class="hidden-columns">
                    <div></div>
                    <div></div>
                    <div></div>
                    <div></div>
                </div>
                <div class="el-table__header-wrapper">
                    <table cellspacing="0" cellpadding="0" border="0" class="el-table__header" style="width:100%">
                        <colgroup>
                            <col class="el-table_1_column_1" width="48">
                            <col class="el-table_1_column_2" width="416">
                            <col class="el-table_1_column_3" width="414">
                            <col class="el-table_1_column_4" width="414">
                        </colgroup>
                        <thead>
                            <tr>
                                <th colspan="1" rowspan="1" class="el-table_1_column_1 el-table__expand-column  is-leaf"><div class="cell"></div></th>
                                <th colspan="1" rowspan="1" class="el-table_1_column_2  is-leaf"><div class="cell">{{$t('common.lineId')}}</div></th>
                                <th colspan="1" rowspan="1" class="el-table_1_column_3  is-leaf"><div class="cell">{{$t('common.nnredGprofit')}}</div></th>
                                <th colspan="1" rowspan="1" class="el-table_1_column_4  is-leaf"><div class="cell">{{$t('common.slredGprofit')}}</div></th>
                            </tr>
                        </thead>
                    </table>
                </div>
                <div class="el-table__body-wrapper ">
                    <table cellspacing="0" cellpadding="0" border="0" class="el-table__body" style="width: 100%;">
                        <colgroup>
                            <col class="el-table_1_column_1" width="48">
                            <col class="el-table_1_column_2" width="416">
                            <col class="el-table_1_column_3" width="414">
                            <col class="el-table_1_column_4" width="414">
                        </colgroup>
                        <tbody v-for="(item,i) in tableData" :key="i">
                            <tr class="el-table__row" :class="{'expanded':item.isShow}">
                                <td @click="load(item)" rowspan="1" colspan="1" class="el-table_1_column_1  el-table__expand-column">
                                    <div class="cell">
                                        <div class="el-table__expand-icon" :class="{'el-table__expand-icon--expanded':item.isShow}">
                                            <i class="el-icon el-icon-arrow-right"></i>
                                        </div>
                                    </div>
                                </td>
                                <td rowspan="1" colspan="1" class="el-table_1_column_2 ">
                                    <div class="cell">{{item.lineId}}</div>
                                </td>
                                <td rowspan="1" colspan="1" class="el-table_1_column_3 ">
                                    <div class="cell">{{item.nnRoyalty}}</div>
                                </td>
                                <td rowspan="1" colspan="1" class="el-table_1_column_4 ">
                                    <div class="cell">{{item.slRoyalty}}</div>
                                </td>
                            </tr>
                            <tr v-show="item.isShow">
                                <td colspan="4" class="el-table__expanded-cell">
                                    <div>
                                        <div class="handle-box">
                                            <el-button type="primary" plain @click="exportExcel(item)">{{ $t('common.exportExcel') }}</el-button>
                                        </div>
                                        <div class="el-table table el-table--fit el-table--border el-table--enable-row-hover el-table--enable-row-transition el-table--small">
                                            <div class="hidden-columns">
                                                <div></div>
                                                <div></div>
                                                <div></div>
                                            </div>
                                            <div class="el-table__header-wrapper">
                                                <table cellspacing="0" cellpadding="0" border="0" class="el-table__header" style="width:100%">
                                                    <colgroup>
                                                        <div class="el-table_2_column_5" width="398"></div>
                                                        <div class="el-table_2_column_6" width="396"></div>
                                                        <div class="el-table_2_column_7" width="396"></div>
                                                    </colgroup>
                                                    <thead>
                                                        <tr>
                                                            <th colspan="1" rowspan="1" class="el-table_2_column_5  is-center   is-leaf table-header">
                                                                <div class="cell">{{$t('common.agencyName')}}</div>
                                                            </th>
                                                            <th colspan="1" rowspan="1" class="el-table_2_column_6  is-center   is-leaf table-header">
                                                                <div class="cell">{{$t('common.nnredGprofit')}}</div>
                                                            </th>
                                                            <th colspan="1" rowspan="1" class="el-table_2_column_7  is-center   is-leaf table-header">
                                                                <div class="cell">{{$t('common.slredGprofit')}}</div>
                                                            </th>
                                                        </tr>
                                                    </thead>
                                                </table>
                                            </div>
                                            <div class="el-table__body-wrapper is-scrolling-none">
                                                <table cellspacing="0" cellpadding="0" border="0" class="el-table__body" style="width:100%">
                                                    <colgroup>
                                                        <col class="el-table_2_column_5" width="398">
                                                        <col class="el-table_2_column_6" width="396">
                                                        <col class="el-table_2_column_7" width="396">
                                                    </colgroup>
                                                    <tbody>
                                                        <tr class="el-table__row" v-for="(ite,sk) in item.childrens" :key="sk">
                                                            <td rowspan="1" colspan="1" class="el-table_2_column_5 is-center ">
                                                                <div class="cell">{{ite.agencyAccount}}</div>
                                                            </td>
                                                            <td rowspan="1" colspan="1" class="el-table_2_column_6 is-center ">
                                                                <div class="cell">{{ite.nnRoyalty}}</div>
                                                            </td>
                                                            <td rowspan="1" colspan="1" class="el-table_2_column_7 is-center ">
                                                                <div class="cell">{{ite.slRoyalty}}</div>
                                                            </td>
                                                        </tr>
                                                    </tbody>
                                                </table>
                                                <div class="el-table__empty-block" v-show="item.childrens&&item.childrens.length===0">
                                                    <div class="el-table__empty-text">{{$t('common.noData')}}</div>
                                                </div>
                                            </div>
                                        </div>
                                    </div>
                                </td>
                            </tr>
                        </tbody>
                    </table>
                    <div class="el-table__empty-block" v-show="tableData.length===0">
                        <div class="el-table__empty-text">{{$t('common.noData')}}</div>
                    </div>
                </div>
            </div>
			<table class="collpaseTab" style="display:none;">
                    <thead>
                        <tr>
                            <td style="width: 50px;"></td>
                            <td>{{$t('common.lineId')}}</td>
                            <td>{{$t('common.nnredGprofit')}}</td>
                            <td>{{$t('common.slredGprofit')}}</td>
                        </tr>
                    </thead>
                    <tbody>
                        <tr v-for="(item,i) in tableData" :key="i">
                            <td style="width: 50px;"></td>
                            <td @click="load(item)">{{item.lineId}}</td>
                            <td>{{item.nnRoyalty}}</td>
                            <td>{{item.slRoyalty}}</td>
                            <td>
                                <tbody v-show="item.isShow">
                                    <div>
                                        <div class="handle-box">
                                                <el-button type="primary" plain @click="exportExcel(props.row)">{{ $t('common.exportExcel') }}</el-button>
                                            </div>
                                    </div>
                                    <tr v-for="(ite,is) in item.childrens" :key="is">
                                        <td>{{ite.agencyAccount}}{{item.isShow}}</td>
                                            <td>{{ite.nnRoyalty}}</td>
                                            <td>{{ite.slRoyalty}}</td>
                                    </tr>
                                </tbody>
                            </td>
                        </tr>
                    </tbody>
                    
            </table>
			<div class="handle-box mgt20">
				<p class="color666">{{ $t('common.lineCommStr') }}</p>
			</div>
		</div>
	</div>
</template>

<script>
import {
    getLineRoy,
    getLineAgeRoy
} from '@/api/line'
import { getDate,Timestamp} from '@/filter.js';
import fData from '@/app.config';
let startTime = getDate().last7days.start * 1000;
let endTime = getDate().last7days.end * 1000;
export default {
	name: 'LineComm',
	data() {
		return {
            getRowKeys(row) {
                return row.id;
            },
			query: {
				pageIndex: 1,
				pageSize: fData.pageSize,
				addTime: [startTime,endTime],
				startTime: startTime,
			    endTime: endTime,
            },
            selTimes: [startTime,endTime],
			formStatus: 1, //1添加 2修改
            collpase: false,
            expandRows: [],//tree-table 展开行id数组
            tableData: [],
            tableData2: [],
		};
	},
	created() {
        this.getData();
        this.getExpandRows();
    },
	methods: {
		
		getData() {
            var post = {};
			this.$.extend(post, this.query);
            post.startTime = this.selTimes[0]
            post.endTime = this.selTimes[1]
			post.startTime = parseInt((post.startTime / 1000) || 0)
            post.endTime = parseInt((post.endTime / 1000) || 0)
            post.startTime = Timestamp(post.startTime)
            post.endTime = Timestamp(post.endTime)
			getLineRoy(post).then(res => {
                this.tableData = res.data || [];
                this.tableData.map(v=>{
                    v.childrens = []
                    v.isShow = false
                    return v
                })
			});
        },
		// 触发搜索按钮
		handleSearch() {
			this.$set(this.query, 'pageIndex', 1);
			this.getData();
		},
		reset() {
			this.query = {
				pageIndex: 1,
				pageSize: fData.pageSize,
				addTime: [startTime,endTime],
				startTime: startTime,
			    endTime: endTime,
            };
            this.selTimes = [startTime,endTime]
		},
		exportExcel(row) {
            console.log(row.lineId,'rowID')
			this.$confirm(this.$t('common.lineComExpStr'), this.$t('common.prompt'), {
				type: 'warning'
			})
				.then(() => {
					this.$message.success(this.$t('common.success'));
				})
				.catch(() => {
                    console.log('777778888')
                });
        },
        toggleSelection(rows) {
            if (rows) {
                rows.forEach(row => {
                    this.$refs.multipleTable.toggleRowSelection(row);
                });
            } else {
                this.$refs.multipleTable.clearSelection();
            }
        },
        load(row){
            row.isShow=!row.isShow
            this.$set(row,"isShow",row.isShow)
            let post = {}
            let _this = this;
            _this.$.extend(post,_this.query)
            post.lineId = row.lineId
			post.startTime = this.selTimes[0]
            post.endTime = this.selTimes[1]
			post.startTime = parseInt((post.startTime / 1000) || 0)
            post.endTime = parseInt((post.endTime / 1000) || 0)
            post.startTime = Timestamp(post.startTime)
            post.endTime = Timestamp(post.endTime)
            getLineAgeRoy(post).then(res => {
                if(res.success){
                    row.childrens = res.data;
                }else{
                    _this.$message.error(res.message)
                }
            })
        },
        
        // 菜单展开全部
        toggleCollpase(){
            let rows = this.expandRows || [];
            if (rows) {
                this.collpase = !this.collpase
                rows.forEach(row => {
                    this.$refs.multipleTable.toggleRowExpansion(row,this.collpase);
                    // console.log(row,'row')
                    // if(row.childrens&&row.childrens.length>0){
                    //     row.childrens.forEach(item => {
                    //         this.$refs.multipleTable.toggleRowExpansion(item,this.collpase);
                    //         console.log(item,'item')
                    //     })
                    // }
                });
            }
        },
        getExpandRows(){
             this.tableData2.map(v=>{
                 if(v.childrens){
                     this.expandRows.push(v)
                     v.childrens.map(v2=>{
                         this.expandRows.push(v2)
                        //  if(v2.childrens){
                        //     v2.childrens.map(v3=>{
                        //         this.expandRows.push(v3)
                        //     })
                        //  }
                     })
                 }
             })
            console.log(this.expandRows,'this.expandRows')
        }
	}
};
</script>
<style>
	.demo-table-expand {
		font-size: 0;
	}
	.demo-table-expand label {
		width: 90px;
		color: #99a9bf;
	}
	.demo-table-expand .el-form-item {
		margin-right: 0;
		margin-bottom: 0;
		width: 50%;
	}
</style>