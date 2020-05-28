<template>
	<div class="allHeight">
		<div class="crumbs">
			<el-breadcrumb separator-class="el-icon-arrow-right">
				<el-breadcrumb-item> 
                    <!-- <i class="el-icon-lx-people"></i>  -->
                {{ $t('common.gameGroupMant') }} </el-breadcrumb-item>
				<el-breadcrumb-item> 
                    <!-- <i class="el-icon-lx-people"></i>  -->
                {{ $t('common.gameGroupList') }} </el-breadcrumb-item>
			</el-breadcrumb>
		</div>
		<div class="container">
			<div class="search-box">
				<!-- <div class="pk-inp-box time-d-width">
					<label>{{ $t('common.dataSel') }}:</label>
					<el-date-picker
						v-model="query.addTime"
						type="datetimerange"
						align="right"
						:start-placeholder="$t('common.startTime')"
						:end-placeholder="$t('common.endTime')"
						format="yyyy-MM-dd HH:mm:ss"
						value-format="timestamp"
						:default-time="['00:00:00', '23:59:59']"
					>
					</el-date-picker>
				</div> -->
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
				<div class="fl">
					<el-button type="primary" icon="el-icon-search" @click="handleSearch">{{
						$t('common.search')
					}}</el-button>
					<el-button @click="reset">{{ $t('common.reset') }}</el-button>
				</div>
				<div class="clearboth"></div>
			</div>
			<div class="handle-box">
				<el-tabs v-model="activeName" type="card" @tab-click="getData" class="pull-width">
					<el-tab-pane v-for="item in gameNameOppro" :label="item.value" :key="item.key" :name="item.value">
						<!-- 牛牛 -->
                        <div v-show="item.key === 1||item.key === 3||item.key === 4">
							<el-table fixed :data="tableData" border class="table" :height="fData.tHeightOne()-8" ref="multipleTables" header-cell-class-name="table-header">
                                <el-table-column prop="lineId" :label="$t('common.line')" align="center"></el-table-column>
				                <el-table-column prop="agencyId" :label="$t('common.siteId')" align="center"></el-table-column>
								<el-table-column prop="roomName" :label="$t('common.groupName')" width="75" align="center"></el-table-column>
								<el-table-column prop="gameType" :label="$t('common.game')" align="center">
                                    <template slot-scope="scope">
                                        <span>{{scope.row.gameType|filtergameTypes}}</span>
                                    </template>
                                </el-table-column>
                                <el-table-column prop="roomNo" :label="$t('common.gId')" align="center"></el-table-column>
                                <el-table-column prop="roomType" :label="$t('common.gType')" align="center">
                                    <template slot-scope="scope">
										<span>{{ scope.row.roomType | filterRoomType }}</span>
									</template>
                                </el-table-column>
                                <!-- <el-table-column prop="gamePlay" :label="$t('common.playMethods')" align="center">
                                   <template slot-scope="scope">
                                        <span>{{scope.row.gamePlay|filterRedPlayType}}</span>
                                    </template>
                                </el-table-column> -->
								<el-table-column prop="minMoney" :label="$t('common.redEnvMinAmt')" align="center"></el-table-column>
								<el-table-column prop="maxMoney" :label="$t('common.redEnvMaxAmt')" align="center"></el-table-column>
								<el-table-column prop="redMinNum" :label="$t('common.redMinNum')" align="center"></el-table-column>
								<el-table-column prop="redNum" :label="$t('common.redMaxNum')" align="center"></el-table-column>
								
								<el-table-column prop="royalty" :label="$t('common.pumpingRatio')" align="center"></el-table-column>
								<!-- <el-table-column prop="royaltyMoney" :label="$t('common.pumpingAmount')" align="center"></el-table-column> -->
								<el-table-column prop="gameTime" :label="$t('common.gameTime')" align="center">
									<template slot-scope="scope">
										<span>{{ scope.row.gameTime }}{{ $t('common.mintus') }}</span>
									</template>
								</el-table-column>
								<el-table-column prop="freeFromDeath" :label="$t('common.tuDieStatus')" align="center" width="120">
                                    <template slot-scope="scope">
                                        <el-tag :type="scope.row.freeFromDeath === 1 ? 'success' : scope.row.freeFromDeath === 2 ? 'danger' : ''">{{
                                            scope.row.freeFromDeath | filterLineStatus
                                        }}</el-tag>
                                    </template>
                                </el-table-column>
								<el-table-column prop="robotSendPacket" :label="$t('common.raSendpStatus')" align="center" width="120">
                                    <template slot-scope="scope">
                                        <el-tag :type="scope.row.robotSendPacket === 1 ? 'success' : scope.row.robotSendPacket === 2 ? 'danger' : ''">{{
                                            scope.row.robotSendPacket | filterLineStatus
                                        }}</el-tag>
                                    </template>
                                </el-table-column>
								<el-table-column prop="robotGrabPacket" :label="$t('common.raQdbStatus')" align="center" width="120">
                                    <template slot-scope="scope">
                                        <el-tag :type="scope.row.robotGrabPacket === 1 ? 'success' : scope.row.robotGrabPacket === 2 ? 'danger' : ''">{{
                                            scope.row.robotGrabPacket | filterLineStatus
                                        }}</el-tag>
                                    </template>
                                </el-table-column>
                                <!-- <el-table-column prop="controlKill" :label="$t('common.controlKill')" align="center" width="150">
									<template slot-scope="scope">
										<el-tag :type="scope.row.controlKill === 1 ? 'success' : scope.row.controlKill === 2 ? 'danger' : ''">{{
                                            scope.row.controlKill | filterLineStatus
                                        }}</el-tag>
									</template>
								<el-table-column/>-->
								<!-- <el-table-column prop="createTime" :label="$t('common.addTime')" align="center" width="100">
                                    <template slot-scope="scope">
                                        <span>{{scope.row.createTime| filterDate  }}</span>
                                    </template>
                                </el-table-column> -->
								<el-table-column prop="roomSort" :label="$t('common.sortY')" align="center" width="120">
									<template slot-scope="scope">
                                                <!-- <el-input
                                                class="inputs"
                                                size="small"
                                                v-model.number="scope.row.roomSort"
                                                disabled
                                            ></el-input> -->
                                        <span>{{scope.row.roomSort}}</span>
									</template>
								</el-table-column>
                                <el-table-column prop="statuspro" :label="$t('common.status')" align="center" width="180">
									<template slot-scope="scope">
										<el-switch
											style="display: block;"
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
							</el-table>
						</div>
                        <!-- 扫雷 -->
						<div v-show="item.key === 2">
							<el-table fixed :data="tableData" :height="fData.tHeightOne()-8" border class="table" ref="multipleTable" header-cell-class-name="table-header">
								<el-table-column prop="lineId" :label="$t('common.line')" align="center"></el-table-column>
				                <el-table-column prop="agencyId" :label="$t('common.siteId')" align="center"></el-table-column>
                                <el-table-column prop="roomName" :label="$t('common.groupName')" width="75" align="center"></el-table-column>
								<el-table-column prop="gameType" :label="$t('common.game')" align="center">
                                     <template slot-scope="scope">
                                        <span>{{scope.row.gameType|filtergameTypes}}</span>
                                    </template>
                                </el-table-column>
                                <el-table-column prop="roomNo" :label="$t('common.gId')" align="center"></el-table-column>
                                <el-table-column prop="roomType" :label="$t('common.gType')" align="center">
                                    <template slot-scope="scope">
										<span>{{ scope.row.roomType | filterRoomType }}</span>
									</template>
                                </el-table-column>
								<!-- <el-table-column prop="gamePlay" :label="$t('common.playMethods')" align="center">
                                   <template slot-scope="scope">
                                        <span>{{scope.row.gamePlay|filteroddTypes}}</span>
                                    </template>
                                </el-table-column> -->
								<el-table-column prop="minMoney" :label="$t('common.redEnvMinAmt')" align="center"></el-table-column>
								<el-table-column prop="maxMoney" :label="$t('common.redEnvMaxAmt')" align="center"></el-table-column>
								<el-table-column prop="redMinNum" :label="$t('common.redMinNum')" align="center"></el-table-column>
								<el-table-column prop="redNum" :label="$t('common.redMaxNum')" align="center"></el-table-column>
								<el-table-column prop="royalty" :label="$t('common.pumpingRatio')" align="center">
                                    <template slot-scope="scope">
                                        <span>{{scope.row.royalty}}</span>
                                    </template>
                                </el-table-column>
								<!-- <el-table-column prop="royaltyMoney" :label="$t('common.pumpingAmount')" align="center"></el-table-column> -->

								<el-table-column prop="gameTime" :label="$t('common.gameTime')" align="center">
									<template slot-scope="scope">
										<span>{{ scope.row.gameTime }}{{ $t('common.mintus') }}</span>
									</template>
								</el-table-column>
								<el-table-column prop="freeFromDeath" :label="$t('common.tuDieStatus')" align="center" width="120">
                                    <template slot-scope="scope">
                                        <el-tag :type="scope.row.freeFromDeath === 1 ? 'success' : scope.row.freeFromDeath === 2 ? 'danger' : ''">{{
                                            scope.row.freeFromDeath | filterLineStatus
                                        }}</el-tag>
                                    </template>
                                </el-table-column>
								<el-table-column prop="robotSendPacket" :label="$t('common.raSendpStatus')" align="center" width="120">
                                    <template slot-scope="scope">
                                        <el-tag :type="scope.row.robotSendPacket === 1 ? 'success' : scope.row.robotSendPacket === 2 ? 'danger' : ''">{{
                                            scope.row.robotSendPacket | filterLineStatus
                                        }}</el-tag>
                                    </template>
                                </el-table-column>
								<el-table-column prop="robotGrabPacket" :label="$t('common.raQdbStatus')" align="center" width="120">
                                    <template slot-scope="scope">
                                        <el-tag :type="scope.row.robotGrabPacket === 1 ? 'success' : scope.row.robotGrabPacket === 2 ? 'danger' : ''">{{
                                            scope.row.robotGrabPacket | filterLineStatus
                                        }}</el-tag>
                                    </template>
                                </el-table-column>
                                <!-- <el-table-column prop="controlKill" :label="$t('common.controlKill')" align="center" width="150">
									<template slot-scope="scope">
										<el-tag :type="scope.row.controlKill === 1 ? 'success' : scope.row.controlKill === 2 ? 'danger' : ''">{{
                                            scope.row.controlKill | filterLineStatus
                                        }}</el-tag>
									</template>
								</!-->
								<!-- <el-table-column prop="createTime" :label="$t('common.addTime')" align="center">
                                    <template slot-scope="scope">
                                        <span>{{scope.row.createTime| filterDate  }}</span>
                                    </template>
                                </el-table-column> -->
								<el-table-column prop="roomSort" :label="$t('common.sortY')" align="center" width="120">
									<template slot-scope="scope">
										<span>{{scope.row.roomSort}}</span>
									</template>
								</el-table-column>
                                <el-table-column prop="statuspro" :label="$t('common.status')" align="center" width="180">
									<template slot-scope="scope">
										<el-switch
											style="display: block;"
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
							</el-table>
						</div>
                        <!-- 接龙 -->
                        <div v-show="item.key === 5">
							<el-table fixed :data="tableData" border class="table" :height="fData.tHeightOne()-8" ref="multipleTables" header-cell-class-name="table-header">
                                <el-table-column prop="lineId" :label="$t('common.line')" align="center"></el-table-column>
				                <el-table-column prop="agencyId" :label="$t('common.siteId')" align="center"></el-table-column>
								<el-table-column prop="roomName" :label="$t('common.groupName')" width="75" align="center"></el-table-column>
								<el-table-column prop="gameType" :label="$t('common.game')" align="center">
                                    <template slot-scope="scope">
                                        <span>{{scope.row.gameType|filtergameTypes}}</span>
                                    </template>
                                </el-table-column>
                                <el-table-column prop="roomNo" :label="$t('common.gId')" align="center"></el-table-column>
                                <el-table-column prop="roomType" :label="$t('common.gType')" align="center">
                                    <template slot-scope="scope">
										<span>{{ scope.row.roomType | filterRoomType }}</span>
									</template>
                                </el-table-column>
                                
								<el-table-column prop="maxMoney" :label="$t('common.redAmts')" align="center"></el-table-column>
								<el-table-column prop="redNum" :label="$t('common.sendGe')" align="center"></el-table-column>
								<el-table-column prop="royalty" :label="$t('common.pumpingRatio')" align="center"></el-table-column>
								<el-table-column prop="gameTime" :label="$t('common.gameTime')" align="center">
									<template slot-scope="scope">
										<span>{{ scope.row.gameTime }}{{ $t('common.mintus') }}</span>
									</template>
								</el-table-column>
                                <el-table-column prop="roomRule" :label="$t('common.send_method')" align="center" width="100">
									<template slot-scope="scope">
										<span>{{ scope.row.roomRule | filtersendStatusOp }}</span>
									</template>
								</el-table-column>
								
								<el-table-column prop="robotSendPacket" :label="$t('common.raSendpStatus')" align="center" width="120">
                                    <template slot-scope="scope">
                                        <el-tag :type="scope.row.robotSendPacket === 1 ? 'success' : scope.row.robotSendPacket === 2 ? 'danger' : ''">{{
                                            scope.row.robotSendPacket | filterLineStatus
                                        }}</el-tag>
                                    </template>
                                </el-table-column>
								<el-table-column prop="robotGrabPacket" :label="$t('common.raQdbStatus')" align="center" width="120">
                                    <template slot-scope="scope">
                                        <el-tag :type="scope.row.robotGrabPacket === 1 ? 'success' : scope.row.robotGrabPacket === 2 ? 'danger' : ''">{{
                                            scope.row.robotGrabPacket | filterLineStatus
                                        }}</el-tag>
                                    </template>
                                </el-table-column>
								<el-table-column prop="roomSort" :label="$t('common.sortY')" align="center" width="120">
									<template slot-scope="scope">
                                                <!-- <el-input
                                                class="inputs"
                                                size="small"
                                                v-model.number="scope.row.roomSort"
                                                disabled
                                            ></el-input> -->
                                        <span>{{scope.row.roomSort}}</span>
									</template>
								</el-table-column>
                                <el-table-column prop="statuspro" :label="$t('common.status')" align="center" width="180">
									<template slot-scope="scope">
										<el-switch
											style="display: block;"
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
							</el-table>
						</div>
                        <!-- 骰子 -->
						<div v-show="item.key === 6">
							<el-table fixed :data="tableData" :height="fData.tHeightOne()-8" border class="table" ref="multipleTable" header-cell-class-name="table-header">
								<el-table-column prop="lineId" :label="$t('common.line')" align="center"></el-table-column>
				                <el-table-column prop="agencyId" :label="$t('common.siteId')" align="center"></el-table-column>
                                <el-table-column prop="roomName" :label="$t('common.groupName')" width="75" align="center"></el-table-column>
								<el-table-column prop="gameType" :label="$t('common.game')" align="center">
                                     <template slot-scope="scope">
                                        <span>{{scope.row.gameType|filtergameTypes}}</span>
                                    </template>
                                </el-table-column>
                                <el-table-column prop="roomNo" :label="$t('common.gId')" align="center"></el-table-column>
                                <el-table-column prop="roomType" :label="$t('common.gType')" align="center">
                                    <template slot-scope="scope">
										<span>{{ scope.row.roomType | filterRoomType }}</span>
									</template>
                                </el-table-column>
								
								<el-table-column prop="minMoney" :label="$t('common.redEnvMinAmt')" align="center"></el-table-column>
								<el-table-column prop="maxMoney" :label="$t('common.redEnvMaxAmt')" align="center"></el-table-column>
								<el-table-column prop="redMinNum" :label="$t('common.redMinNum')" align="center"></el-table-column>
								<el-table-column prop="redNum" :label="$t('common.redMaxNum')" align="center"></el-table-column>

								<el-table-column prop="royalty" :label="$t('common.pumpingRatio')" align="center">
                                    <template slot-scope="scope">
                                        <span>{{scope.row.royalty}}</span>
                                    </template>
                                </el-table-column>
								<el-table-column prop="gameTime" :label="$t('common.gameTime')" align="center">
									<template slot-scope="scope">
										<span>{{ scope.row.gameTime }}{{ $t('common.mintus') }}</span>
									</template>
								</el-table-column>
								<el-table-column prop="robotSendPacket" :label="$t('common.raSendpStatus')" align="center" width="120">
                                    <template slot-scope="scope">
                                        <el-tag :type="scope.row.robotSendPacket === 1 ? 'success' : scope.row.robotSendPacket === 2 ? 'danger' : ''">{{
                                            scope.row.robotSendPacket | filterLineStatus
                                        }}</el-tag>
                                    </template>
                                </el-table-column>
								<el-table-column prop="robotGrabPacket" :label="$t('common.raQdbStatus')" align="center" width="120">
                                    <template slot-scope="scope">
                                        <el-tag :type="scope.row.robotGrabPacket === 1 ? 'success' : scope.row.robotGrabPacket === 2 ? 'danger' : ''">{{
                                            scope.row.robotGrabPacket | filterLineStatus
                                        }}</el-tag>
                                    </template>
                                </el-table-column>
								<el-table-column prop="roomSort" :label="$t('common.sortY')" align="center" width="120">
									<template slot-scope="scope">
										<span>{{scope.row.roomSort}}</span>
									</template>
								</el-table-column>
                                <el-table-column prop="statuspro" :label="$t('common.status')" align="center" width="180">
									<template slot-scope="scope">
										<el-switch
											style="display: block;"
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
							</el-table>
						</div>
                        <pagination
                            v-show="pageTotal > 0"
                            :total="pageTotal"
                            :page.sync="query.pageIndex"
                            :limit.sync="query.pageSize"
                            @pagination="getData"
                        />
					</el-tab-pane>
				</el-tabs>
			</div>
		</div>
	</div>
</template>

<script>
import Pagination from '@/components/common/Pagination'
import fData from '@/app.config';
import {
    getGGlist,
    updGGStatus,
} from '@/api/account'
import { getAgencyId } from "@/mixins/initAgentList";
import { getLineIds } from '@/api/line';
import { makeGameType} from '@/filter.js';
export default {
    name: 'LineComm',
    mixins: [ getAgencyId ],
    components: { Pagination },
	data() {
		return {
			query: {
				pageIndex: 1,
				pageSize: fData.pageSize,
				addTime: '',
				startTime: 0,
				endTime: 0,
                status: 0,
                agencyId: '',
                gameType: 2,
                lineId: ''
            },
			activeName: this.$t('common.slred'),
			tableData: [],
			pageTotal: 0,
			formStatus: 1, //1添加 2修改
            fData: fData,
            lineIdArrAll: [], // 搜索线路下来框数组
			lineIdArr: [], // 添加线路下来框数组
            gameNameOppro: [],
            agenListpro: [],
		};
	},
	created() {
        this.getLineIdWay();        
		this.getData();
		this.makeOp();
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
        //线路下啦框
		getLineIdWay() {
			getLineIds().then(res => {
				if (res.success) {
					this.lineIdArr = res.data;
					this.lineIdArrAll = [
						{lineId: this.$t('common.all')},
					];
					res.data.map(i => {
						this.lineIdArrAll.push(i);
					});
					
				} else {
					this.$message.error(res.message);
				}
			});
		},
		makeOp() {
			this.$.extend(this.gameNameOppro, this.fData.gameNameOp);
			this.gameNameOppro.shift();
            this.gameNameOppro.pop();
		},
		getData(params) {
            if(params){
                this.query.pageIndex = params.page;
                this.query.pageSize = params.limit;
            }
            this.query.gameType = makeGameType(this.activeName);
            if(!this.query.pageIndex){
                this.query.pageIndex = 1
            }
            if(!this.query.pageSize){
                this.query.pageSize = fData.pageSize
            }
            if(this.query.agencyId === this.$t('common.all')){
                this.query.agencyId = ''
            }
            var post = {};
			this.$.extend(post, this.query);
            post.agencyId = this.checkAgenId(post.agencyId)
            console.log(this.query,'query')
            // post.startTime = (this.query.addTime[0] / 1000) || 0;
            // post.endTime = (this.query.addTime[1] / 1000) || 0;
            // post.startTime = parseInt(post.startTime)
            // post.endTime = parseInt(post.endTime)
			getGGlist(post).then(res => {
                if(res.success){
                    console.log(res, 'resssss');
                    this.tableData = res.data.data;
                    this.pageTotal = res.data.count || 0;
                    this.tableData.map(v=>{
                        v.statuspro = v.status === 1
                    })
                }else{
                    this.$message.error(res.message)
                }
			});
        },
        handuseAble(index,row){
            let post = {
                id: row.id
            }
            post.status = row.statuspro === true?1:2;
            updGGStatus(post).then(res => {
                if(res.success){
                    this.$message.success(this.$t('common.success'))
                    this.getData()
                }else{
                    row.statuspro = row.status === 1;
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
                agencyId: '',
				pageIndex: 1,
                pageSize: fData.pageSize,
                addTime: "",
                startTime: 0,
                endTime: 0,
                status: 0,
                lineId: ''
            };
		}
	}
};
</script>