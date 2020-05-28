<template>
	<div class="allHeight">
		<div class="crumbs">
			<el-breadcrumb separator-class="el-icon-arrow-right">
				<el-breadcrumb-item> 
                    <!-- <i class="el-icon-lx-people"></i> -->
                 {{ $t('common.redEnveGMant') }} </el-breadcrumb-item>
				<el-breadcrumb-item> 
                    <!-- <i class="el-icon-lx-people"></i> -->
                 {{ $t('common.redEnvNote') }} </el-breadcrumb-item>
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
					<label>{{ $t('common.groupName') }}:</label>
                    <el-select v-model="query.roomId" :placeholder="$t('common.all')" class="selbox pull-width">
                        <el-option
                            v-for="(item) in roomIdArr"
                            :key="item.id" :label="item.roomName" :value="item.id">
                        </el-option>
                    </el-select>
                </div>
                <div class="pk-inp-box pk-select">
					<label>{{ $t('common.status') }}:</label>
                    <el-select v-model="query.status" :placeholder="$t('common.all')" class="selbox">
                        <el-option v-for="item in gameStatus" :key="item.key" :label="item.value" :value="item.key"> </el-option>
                    </el-select>
				</div>
                <div class="pk-inp-box pk-select">
					<label>{{ $t('common.paicStatus') }}:</label>
                    <el-select v-model="query.payOutStatus" :placeholder="$t('common.all')" class="selbox">
                        <el-option v-for="item in fData.payOutStatusOp" :key="item.key" :label="item.value" :value="item.key"> </el-option>
                    </el-select>
				</div>
				
				<div class="pk-inp-box">
					<label>{{ $t('common.orderNum') }}:</label>
					<el-input v-model="query.orderNo" :placeholder="$t('common.p_orderNum')" class="selbox"></el-input>
				</div>
                <div class="pk-inp-box">
					<label>{{ $t('common.juNum') }}:</label>
					<el-input v-model="query.redId" :placeholder="$t('common.p_juNum')" class="selbox"></el-input>
				</div>
				<div class="pk-inp-box">
					<div class="dis-inb mr10">
						<el-select v-model="inpstrStatus" :placeholder="$t('common.p_sel')" class="selbox w100 mgr0" @change="changeInps">
							<el-option v-for="item in fData.redInpOp" :key="item.key" :label="item.value" :value="item.key"> </el-option>
						</el-select>
					</div>
					<el-input v-model="query.inpstr" :placeholder="$t('common.p_KeywordS')" class="selbox dis-inb"></el-input>
				</div>
                <div class="pk-inp-box pk-select">
					<label>{{ $t('common.robotOrder') }}:</label>
                    <el-select v-model="query.isRobot" :placeholder="$t('common.all')" class="selbox pull-width">
                        <el-option
                            v-for="(item) in fData.booleanOp"
                            :key="item.key" :label="item.value" :value="item.key">
                        </el-option>
                    </el-select>
                </div>
				<div class="fl">
					<el-button type="primary" icon="el-icon-search" @click="handleSearch">{{
						$t('common.search')
					}}</el-button>
					<el-button @click="reset">{{ $t('common.reset') }}</el-button>
                    <el-button type="primary" plain @click="handuseAble()" :disabled="this.checkedArr.length<1">{{$t('common.handleCai')}}</el-button>
				</div>
				<div class="clearboth"></div>
			</div>
			<div class="handle-box">
				<el-tabs v-model="activeName" type="card" @tab-click="makeStatus();getData();" class="pull-width">
					<el-tab-pane v-for="item in gameNameOppro" :label="item.value" :key="item.key" :name="item.value">
						<!-- 牛牛 -->
                        <div v-show="item.key === 1||item.key === 3||item.key === 4">
							<el-table :data="tableData" border  @selection-change="handleSelectionChange" class="table" :height="fData.tableHeight()+10" ref="multipleTable" header-cell-class-name="table-header">
                                <el-table-column type="selection" width="55" align="center"></el-table-column>
								<el-table-column prop="lineId" :label="$t('common.line')" align="center"></el-table-column>
				                <el-table-column prop="agencyId" :label="$t('common.siteId')" align="center"></el-table-column>
                                <el-table-column prop="account" :label="$t('common.userName')" align="center"></el-table-column>
								<el-table-column prop="redSender" :label="$t('common.senderPack')" align="center"></el-table-column>
								<el-table-column prop="gameType" :label="$t('common.gameN')" align="center">
                                    <template slot-scope="scope">
                                        <span>{{scope.row.gameType|filtergameTypes}}</span>
                                    </template>
                                </el-table-column>
								<el-table-column prop="roomName" :label="$t('common.groupName')" align="center"></el-table-column>
								<el-table-column prop="redId" :label="$t('common.juNum')" align="center"></el-table-column>
								<el-table-column prop="orderNo" :label="$t('common.orderNum')" align="center"></el-table-column>
								<el-table-column prop="redMoney" :label="$t('common.redAmt')" align="center"></el-table-column>
								<el-table-column prop="redNum" :label="$t('common.redBagNum')" align="center"></el-table-column>
								<el-table-column prop="receiveMoney" :label="$t('common.getAmt')" align="center"></el-table-column>
								<el-table-column prop="royalty" :label="$t('common.pumpingRatio')" align="center"></el-table-column>
								<el-table-column prop="royaltyMoney" :label="$t('common.pumpingAmount')" align="center"></el-table-column>
								<!-- <el-table-column prop="odds" :label="$t('common.odds')" align="center"></el-table-column> -->
                                <el-table-column prop="memberNum" :label="$t('common.playNnum')" align="center"></el-table-column>
								<el-table-column prop="adminNum" :label="$t('common.bankerNnum')" align="center"></el-table-column>
								<el-table-column prop="money" :label="$t('common.winOLosAmt')" align="center">
                                    <template slot-scope="scope">
                                        <el-tag
                                            :type="scope.row.money>0?'success':scope.row.money<0?'danger':''"
                                        >{{scope.row.money|isPositive}}</el-tag>
                                    </template>
                                </el-table-column>
								<el-table-column prop="realMoney" :label="$t('common.actwinOLos')" align="center">
                                    <template slot-scope="scope">
                                        <el-tag
                                            :type="scope.row.realMoney>0?'success':scope.row.realMoney<0?'danger':''"
                                        >{{scope.row.realMoney|isPositive}}</el-tag>
                                    </template>
                                </el-table-column>
								<el-table-column prop="gameTime" :label="$t('common.gameTime')" align="center">
                                    <template slot-scope="scope">
                                        <span>{{scope.row.gameTime}}{{$t('common.mintus')}}</span>
                                    </template>
                                </el-table-column>
								<el-table-column prop="redStartTime" :label="$t('common.redStartTime')" align="center">
                                    <template slot-scope="scope">
                                        <span>{{scope.row.redStartTime| filterDate  }}</span>
                                    </template>
                                </el-table-column>
								<el-table-column prop="status" :label="$t('common.status')" align="center">
									<template slot-scope="scope">
										<el-tag
                                            :type="scope.row.status===0?'info':scope.row.status===1?'success':(scope.row.status===2?'danger':'')"
                                        >{{scope.row.status|filterorderRedfi}}</el-tag>
									</template>
								</el-table-column>
                                <el-table-column prop="payOutStatus" :label="$t('common.paicStatus')" align="center">
                                    <template slot-scope="scope">
                                        <el-tag
                                            :type="scope.row.payOutStatus>0?'success':scope.row.payOutStatus<0?'danger':''"
                                        >{{scope.row.payOutStatus|filterpayOutStatusOp}}</el-tag>
                                    </template>
                                </el-table-column>
                                <!-- <el-table-column prop="isRobot" :label="$t('common.robotOrder')" align="center">
                                    <template slot-scope="scope">
                                        <el-tag
                                            :type="scope.row.isRobotPro?'success':'danger'"
                                        >{{scope.row.isRobot|isTrue}}</el-tag>
                                    </template>
                                </el-table-column> -->
								<el-table-column :label="$t('common.detail')" align="center" width="120">
									<template slot-scope="scope">
										<el-button type="primary" plain @click="handleEdit(scope.row)">{{
											$t('common.lookredDet')
										}}</el-button>
									</template>
								</el-table-column>
							</el-table>
						</div>
                        <!-- 扫雷 -->
						<div v-show="item.key === 2">
							<el-table :data="tableData"  @selection-change="handleSelectionChange" border :height="fData.tableHeight()+10" class="table" ref="multipleTable" header-cell-class-name="table-header">
                                <el-table-column type="selection" width="55" align="center"></el-table-column>
                                <el-table-column prop="lineId" :label="$t('common.line')" align="center"></el-table-column>
				                <el-table-column prop="agencyId" :label="$t('common.siteId')" align="center"></el-table-column>
                                <el-table-column prop="account" :label="$t('common.userName')" align="center"></el-table-column>
								<el-table-column prop="redSender" :label="$t('common.senderPack')" align="center"></el-table-column>
								<el-table-column prop="gameType" :label="$t('common.gameN')" align="center">
                                    <template slot-scope="scope">
                                        <span>{{scope.row.gameType|filtergameTypes}}</span>
                                    </template>
                                </el-table-column>
								<el-table-column prop="roomName" :label="$t('common.groupName')" align="center"></el-table-column>
								<!-- <el-table-column prop="gamePlay" :label="$t('common.playMethods')" align="center">
                                    <template slot-scope="scope">
                                        <span>{{scope.row.gamePlay|filteroddTypes}}</span>
                                    </template>
                                </el-table-column> -->
								<el-table-column prop="redId" :label="$t('common.juNum')" align="center"></el-table-column>
								<el-table-column prop="orderNo" :label="$t('common.orderNum')" align="center"></el-table-column>
								<el-table-column prop="redMoney" :label="$t('common.redAmt')" align="center"></el-table-column>
								<el-table-column prop="redNum" :label="$t('common.redBagNum')" align="center"></el-table-column>
								<el-table-column prop="receiveMoney" :label="$t('common.getAmt')" align="center"></el-table-column>
								<el-table-column prop="royalty" :label="$t('common.pumpingRatio')" align="center"></el-table-column>
								<el-table-column prop="royaltyMoney" :label="$t('common.pumpingAmount')" align="center"></el-table-column>
								<el-table-column prop="odds" :label="$t('common.odds')" align="center"></el-table-column>
								<el-table-column prop="thunderNum" :label="$t('common.leiValue')" align="center"></el-table-column>
								
								<el-table-column prop="money" :label="$t('common.winOLosAmt')" align="center">
                                    <template slot-scope="scope">
                                        <el-tag
                                            :type="scope.row.money>0?'success':scope.row.money<0?'danger':''"
                                        >{{scope.row.money|isPositive}}</el-tag>
                                    </template>
                                </el-table-column>
								<el-table-column prop="realMoney" :label="$t('common.actwinOLos')" align="center">
                                    <template slot-scope="scope">
                                        <el-tag
                                            :type="scope.row.realMoney>0?'success':scope.row.realMoney<0?'danger':''"
                                        >{{scope.row.realMoney|isPositive}}</el-tag>
                                    </template>
                                </el-table-column>

								<el-table-column prop="gameTime" :label="$t('common.gameTime')" align="center">
                                    <template slot-scope="scope">
                                        <span>{{scope.row.gameTime}}{{$t('common.mintus')}}</span>
                                    </template>
                                </el-table-column>
								<el-table-column prop="redStartTime" :label="$t('common.redStartTime')" align="center">
                                    <template slot-scope="scope">
                                        <span>{{scope.row.redStartTime| filterDate  }}</span>
                                    </template>
                                </el-table-column>
								<el-table-column prop="status" :label="$t('common.status')" align="center">
									<template slot-scope="scope">
										<el-tag
                                            :type="scope.row.status===1?'success':(scope.row.status===2?'danger':'')"
                                        >{{scope.row.status|filterorderRed}}</el-tag>
									</template>
								</el-table-column>
                                <el-table-column prop="payOutStatus" :label="$t('common.paicStatus')" align="center">
                                    <template slot-scope="scope">
                                        <el-tag
                                            :type="scope.row.payOutStatus>0?'success':scope.row.payOutStatus<0?'danger':''"
                                        >{{scope.row.payOutStatus|filterpayOutStatusOp}}</el-tag>
                                    </template>
                                </el-table-column>
                                <!-- <el-table-column prop="isRobot" :label="$t('common.robotOrder')" align="center">
                                    <template slot-scope="scope">
                                        <el-tag
                                            :type="scope.row.isRobotPro?'success':'danger'"
                                        >{{scope.row.isRobot|isTrue}}</el-tag>
                                    </template>
                                </el-table-column> -->
								<el-table-column :label="$t('common.detail')" align="center" width="120">
									<template slot-scope="scope">
										<el-button type="primary" plain @click="handleEdit(scope.row)">{{
											$t('common.lookredDet')
										}}</el-button>
									</template>
								</el-table-column>
							</el-table>
						</div>
                        <!-- 接龙红包 -->
                        <div v-show="item.key === 5">
							<el-table :data="tableData" border  class="table" :height="fData.tableHeight()+10" ref="multipleTable" header-cell-class-name="table-header">
								<el-table-column prop="lineId" :label="$t('common.line')" align="center"></el-table-column>
				                <el-table-column prop="agencyId" :label="$t('common.siteId')" align="center"></el-table-column>
                                <el-table-column prop="account" :label="$t('common.userName')" align="center"></el-table-column>
								<el-table-column prop="redSender" :label="$t('common.senderPack')" align="center"></el-table-column>
								<el-table-column prop="gameType" :label="$t('common.gameN')" align="center">
                                    <template slot-scope="scope">
                                        <span>{{scope.row.gameType|filtergameTypes}}</span>
                                    </template>
                                </el-table-column>
								<el-table-column prop="roomName" :label="$t('common.groupName')" align="center"></el-table-column>
								<el-table-column prop="redId" :label="$t('common.juNum')" align="center"></el-table-column>
								<el-table-column prop="orderNo" :label="$t('common.orderNum')" align="center"></el-table-column>
								<el-table-column prop="redMoney" :label="$t('common.redAmt')" align="center"></el-table-column>
								<el-table-column prop="redNum" :label="$t('common.redBagNum')" align="center"></el-table-column>
								<el-table-column prop="receiveMoney" :label="$t('common.getAmt')" align="center"></el-table-column>
								<el-table-column prop="royalty" :label="$t('common.pumpingRatio')" align="center"></el-table-column>
								<el-table-column prop="royaltyMoney" :label="$t('common.pumpingAmount')" align="center"></el-table-column>
                                <el-table-column prop="memberNum" :label="$t('common.playNnum')" align="center"></el-table-column>
								<el-table-column prop="adminNum" :label="$t('common.bankerNnum')" align="center"></el-table-column>
								<el-table-column prop="money" :label="$t('common.winOLosAmt')" align="center">
                                    <template slot-scope="scope">
                                        <el-tag
                                            :type="scope.row.money>0?'success':scope.row.money<0?'danger':''"
                                        >{{scope.row.money|isPositive}}</el-tag>
                                    </template>
                                </el-table-column>
								<el-table-column prop="realMoney" :label="$t('common.actwinOLos')" align="center">
                                    <template slot-scope="scope">
                                        <el-tag
                                            :type="scope.row.realMoney>0?'success':scope.row.realMoney<0?'danger':''"
                                        >{{scope.row.realMoney|isPositive}}</el-tag>
                                    </template>
                                </el-table-column>
								<el-table-column prop="gameTime" :label="$t('common.gameTime')" align="center">
                                    <template slot-scope="scope">
                                        <span>{{scope.row.gameTime}}{{$t('common.mintus')}}</span>
                                    </template>
                                </el-table-column>
								<el-table-column prop="redStartTime" :label="$t('common.redStartTime')" align="center">
                                    <template slot-scope="scope">
                                        <span>{{scope.row.redStartTime| filterDate  }}</span>
                                    </template>
                                </el-table-column>
								<el-table-column prop="status" :label="$t('common.status')" align="center">
									<template slot-scope="scope">
										<el-tag
                                            :type="scope.row.status===0?'info':scope.row.status===1?'success':(scope.row.status===2?'danger':'')"
                                        >{{scope.row.status|filterOrderConnetRed}}</el-tag>
									</template>
								</el-table-column>
                                <el-table-column prop="payOutStatus" :label="$t('common.paicStatus')" align="center">
                                    <template slot-scope="scope">
                                        <el-tag
                                            :type="scope.row.payOutStatus>0?'success':scope.row.payOutStatus<0?'danger':''"
                                        >{{scope.row.payOutStatus|filterpayOutStatusOp}}</el-tag>
                                    </template>
                                </el-table-column>
								<el-table-column :label="$t('common.detail')" align="center" width="120">
									<template slot-scope="scope">
										<el-button type="primary" plain @click="handleEdit(scope.row)">{{
											$t('common.lookredDet')
										}}</el-button>
									</template>
								</el-table-column>
							</el-table>
						</div>
                        <!-- 骰子红包 -->
						<div v-show="item.key === 6">
							<el-table :data="tableData" :height="fData.tableHeight()+10"  @selection-change="handleSelectionChange" border class="table" ref="multipleTable" header-cell-class-name="table-header">
                                <el-table-column type="selection" width="55" align="center"></el-table-column>
								<el-table-column prop="agencyId" :label="$t('common.siteId')" align="center"></el-table-column>
                                <el-table-column prop="roomName" :label="$t('common.groupName')" align="center"></el-table-column>
                                <el-table-column prop="gameType" :label="$t('common.gameN')" align="center">
                                    <template slot-scope="scope">
                                        <span>{{scope.row.gameType|filtergameTypes}}</span>
                                    </template>
                                </el-table-column>
								<el-table-column prop="account" :label="$t('common.userName')" align="center"></el-table-column>
								<el-table-column prop="redSender" :label="$t('common.senderPack')" align="center"></el-table-column>
								<el-table-column prop="redId" :label="$t('common.juNum')" align="center"></el-table-column>
								<el-table-column prop="orderNo" :label="$t('common.orderNum')" align="center"></el-table-column>
								<!-- <el-table-column prop="roundNo" :label="$t('common.turnNum')" align="center"></el-table-column> -->
								<el-table-column prop="redMoney" :label="$t('common.redAmt')" align="center"></el-table-column>
								<el-table-column prop="redNum" :label="$t('common.redBagNum')" align="center"></el-table-column>
								<el-table-column prop="receiveMoney" :label="$t('common.getAmt')" align="center"></el-table-column>
								<el-table-column prop="royalty" :label="$t('common.pumpingRatio')" align="center"></el-table-column>
								<el-table-column prop="royaltyMoney" :label="$t('common.pumpingAmount')" align="center"></el-table-column>
								<el-table-column prop="odds" :label="$t('common.odds')" align="center"></el-table-column>
								<el-table-column prop="betType" :label="$t('common.betType')" align="center">
                                    <template slot-scope="scope">
                                        <span>{{scope.row.betType|filterszStatusOp}}</span>
                                    </template>
                                </el-table-column>
								<el-table-column prop="money" :label="$t('common.winOLosAmt')" align="center">
                                    <template slot-scope="scope">
                                        <el-tag
                                            :type="scope.row.money>0?'success':scope.row.money<0?'danger':''"
                                        >{{scope.row.money|isPositive}}</el-tag>
                                    </template>
                                </el-table-column>
								<el-table-column prop="realMoney" :label="$t('common.actwinOLos')" align="center">
                                    <template slot-scope="scope">
                                        <el-tag
                                            :type="scope.row.realMoney>0?'success':scope.row.realMoney<0?'danger':''"
                                        >{{scope.row.realMoney|isPositive}}</el-tag>
                                    </template>
                                </el-table-column>

								<el-table-column prop="gameTime" :label="$t('common.gameTime')" align="center">
                                    <template slot-scope="scope">
                                        <span>{{scope.row.gameTime}}{{$t('common.mintus')}}</span>
                                    </template>
                                </el-table-column>
								<el-table-column prop="redStartTime" :label="$t('common.redStartTime')" align="center">
                                    <template slot-scope="scope">
                                        <span>{{scope.row.redStartTime|filterDate}}</span>
                                    </template>
                                </el-table-column>
								<el-table-column prop="status" :label="$t('common.status')" align="center">
									<template slot-scope="scope">
										<el-tag
                                            :type="scope.row.status===1?'success':(scope.row.status===2?'danger':'')"
                                        >{{scope.row.status|filterorderRedfi}}</el-tag>
									</template>
								</el-table-column>
                                <el-table-column prop="payOutStatus" :label="$t('common.paicStatus')" align="center">
                                    <template slot-scope="scope">
                                        <el-tag
                                            :type="scope.row.payOutStatus>0?'success':scope.row.payOutStatus<0?'danger':''"
                                        >{{scope.row.payOutStatus|filterpayOutStatusOp}}</el-tag>
                                    </template>
                                </el-table-column>
								<el-table-column :label="$t('common.detail')" align="center" width="120">
									<template slot-scope="scope">
										<el-button type="primary" plain @click="handleEdit(scope.row)">{{
											$t('common.lookredDet')
										}}</el-button>
									</template>
								</el-table-column>
							</el-table>
						</div>
                        <!-- 普通红包 -->
                        <div v-show="item.key === -1">
							<el-table :data="tableData" border  @selection-change="handleSelectionChange" class="table" :height="fData.tableHeight()+10" ref="multipleTable" header-cell-class-name="table-header">
                                <el-table-column type="selection" width="55" align="center"></el-table-column>
								<el-table-column prop="lineId" :label="$t('common.line')" align="center"></el-table-column>
				                <el-table-column prop="agencyId" :label="$t('common.siteId')" align="center"></el-table-column>
                                <el-table-column prop="account" :label="$t('common.userName')" align="center"></el-table-column>
								<el-table-column prop="redSender" :label="$t('common.senderPack')" align="center"></el-table-column>
								<!-- <el-table-column prop="gameType" :label="$t('common.gameN')" align="center">
                                    <template slot-scope="scope">
                                        <span>{{scope.row.gameType|filtergameTypes}}</span>
                                    </template>
                                </el-table-column>-->
								<el-table-column prop="roomName" :label="$t('common.groupName')" align="center"></el-table-column>
								<el-table-column prop="redId" :label="$t('common.juNum')" align="center"></el-table-column>
								<el-table-column prop="orderNo" :label="$t('common.orderNum')" align="center"></el-table-column>
								<el-table-column prop="redMoney" :label="$t('common.redAmt')" align="center"></el-table-column>
								<el-table-column prop="redNum" :label="$t('common.redBagNum')" align="center"></el-table-column>
								<el-table-column prop="receiveMoney" :label="$t('common.getAmt')" align="center"></el-table-column>
								<el-table-column prop="royalty" :label="$t('common.pumpingRatio')" align="center"></el-table-column>
								<el-table-column prop="royaltyMoney" :label="$t('common.pumpingAmount')" align="center"></el-table-column>
								<!-- <el-table-column prop="odds" :label="$t('common.odds')" align="center"></el-table-column> -->
                                <!-- <el-table-column prop="memberNum" :label="$t('common.playNnum')" align="center"></el-table-column>-->
								<!-- <el-table-column prop="adminNum" :label="$t('common.bankerNnum')" align="center"></el-table-column>-->
								<el-table-column prop="money" :label="$t('common.winOLosAmt')" align="center">
                                    <template slot-scope="scope">
                                        <el-tag
                                            :type="scope.row.money>0?'success':scope.row.money<0?'danger':''"
                                        >{{scope.row.money|isPositive}}</el-tag>
                                    </template>
                                </el-table-column>
								<el-table-column prop="realMoney" :label="$t('common.actwinOLos')" align="center">
                                    <template slot-scope="scope">
                                        <el-tag
                                            :type="scope.row.realMoney>0?'success':scope.row.realMoney<0?'danger':''"
                                        >{{scope.row.realMoney|isPositive}}</el-tag>
                                    </template>
                                </el-table-column>
								<el-table-column prop="gameTime" :label="$t('common.gameTime')" align="center">
                                    <template slot-scope="scope">
                                        <span>{{scope.row.gameTime}}{{$t('common.mintus')}}</span>
                                    </template>
                                </el-table-column>
								<el-table-column prop="redStartTime" :label="$t('common.redStartTime')" align="center">
                                    <template slot-scope="scope">
                                        <span>{{scope.row.redStartTime| filterDate  }}</span>
                                    </template>
                                </el-table-column>
								<el-table-column prop="status" :label="$t('common.status')" align="center">
									<template slot-scope="scope">
										<el-tag
                                            :type="scope.row.status===0?'info':scope.row.status===1?'success':(scope.row.status===2?'danger':'')"
                                        >{{scope.row.status|filterNormalRed}}</el-tag>
									</template>
								</el-table-column>
                                <el-table-column prop="payOutStatus" :label="$t('common.paicStatus')" align="center">
                                    <template slot-scope="scope">
                                        <el-tag
                                            :type="scope.row.payOutStatus>0?'success':scope.row.payOutStatus<0?'danger':''"
                                        >{{scope.row.payOutStatus|filterpayOutStatusOp}}</el-tag>
                                    </template>
                                </el-table-column>
								<el-table-column :label="$t('common.detail')" align="center" width="120">
									<template slot-scope="scope">
										<el-button type="primary" plain @click="handleEdit(scope.row)">{{
											$t('common.lookredDet')
										}}</el-button>
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
        <el-dialog :title="$t('common.detRedGet')" :visible.sync="dialogTableVisible">
                <el-table border :data="rows">
                    <el-table-column :label="$t('common.userName')" align="center" width="200">
                        <template slot-scope="scope">
                            <div>
                                {{scope.row.account}}
                                <el-tag v-show="scope.row.infoType&&scope.row.infoType>0"
                                    :type="scope.row.infoType==1?'#fdfdff':scope.row.infoType===2?'warning':'danger'"
                                >{{scope.row.infoType|filterRedOrderTypes}}</el-tag>
                                <el-tag
                                    v-show="scope.row.dragonBest"
                                    :type="scope.row.dragonBest==1?'success':scope.row.dragonBest==2?'danger':''"
                                >{{ scope.row.dragonBest | filtersendStatusOp }}</el-tag>
                            </div>
                        </template>
                    </el-table-column>
                    <el-table-column property="receiveMoney" :label="$t('common.getAmt')" align="center"></el-table-column>
                    <el-table-column property="money" :label="$t('common.winOLosAmt')" align="center">
                        <template slot-scope="scope">
                            <el-tag
                                :type="scope.row.money>0?'success':scope.row.money<0?'danger':''"
                            >{{scope.row.money|isPositive}}</el-tag>
                        </template>
                    </el-table-column>
                    <el-table-column property="receiveTime" :label="$t('common.getMTime')" align="center">
                        <template slot-scope="scope">
                            <span>{{scope.row.receiveTime| filterDate  }}</span>
                        </template>
                    </el-table-column>
                    <el-table-column property="royaltyMoney" :label="$t('common.pumpingAmount')" align="center"></el-table-column>
                    <el-table-column property="realMoney" :label="$t('common.actwinOLos')" align="center">
                        <template slot-scope="scope">
                            <el-tag
                                :type="scope.row.realMoney>0?'success':scope.row.realMoney<0?'danger':''"
                            >{{scope.row.realMoney|isPositive}}</el-tag>
                        </template>
                    </el-table-column>
                </el-table>
            </el-dialog>
	</div>
</template>

<script>
import fData from '@/app.config';
import Pagination from '@/components/common/Pagination'
import {
    getRedOrderList,
    getRedOrderDet,
    getRoomCode,
    manualHandOut,
} from '@/api/account'
import { getAgencyId } from "@/mixins/initAgentList";
import { getLineIds } from '@/api/line';
import { getDate,Timestamp,makeGameType} from '@/filter.js';
let startTime = getDate().today.start * 1000;
 let endTime = getDate().today.end * 1000;
export default {
    name: 'redEnvNote',
    mixins: [ getAgencyId ],
    components: { Pagination },
	data() {
		return {
			query: {
				pageIndex: 1,
				pageSize: fData.pageSize,
				addTime: [startTime,endTime],
				startTime: 0,
				endTime: 0,
				status: 10,
				gameType: 2, //2扫雷 1牛牛
                orderNo: '',
                agencyId: '',
                inpstr: '',
                redSender: '',
                account: '',
                redId: '',
                roomId: '',
                isRobot: '',
                lineId: '',
                payOutStatus: 0,
            },
            selTimes: [startTime,endTime],
            rows: [],
			inpstrStatus: 1,
			activeName: this.$t('common.slred'),
            tableData: [],
            lineIdArrAll:[],
			pageTotal: 0,
			formStatus: 1, //1添加 2修改
            dialogTableVisible: false,
            fData: fData,
            gameNameOppro: [],
            roomIdArr: [],
            checkedArr: [],
            gameStatus: fData.ordersfi,
		};
	},
	created() {
        this.getLineIdWay();
        this.getRoomCode();
        this.getData();
		this.makeOp();
    },
    watch:{
        'query.gameType':function(val) {
            this.query.status = 10 //全部
            this.query.roomId = '';
            this.checkedArr = [] //复选框清空
            this.getRoomCode()
            this.$set(this.query, 'pageIndex', 1);
            if(val===1||val===3||val===4){
                this.gameStatus = fData.ordersfipro
            }else if(val===2){
                this.gameStatus = fData.ordersfi
            }else if(val===5){
                this.gameStatus = fData.connetRed
            }else if(val===6){
                this.gameStatus = fData.ordersfipro
            }else if(val===-1){
                this.gameStatus = fData.nomalStatusOp
            }
            // setTimeout(()=>{
            //     this.query.status = this.query.gameType===3?0:10;
            // },200)
		},
        'query.agencyId':function(val){
            this.query.roomId = '';
            this.getRoomCode()
        },
        'query.lineId':function(val){
            if(this.query.lineId === this.$t('common.all')){
                this.query.lineId = ''
            }
            this.query.roomId = '';
            this.query.agencyId=''
            this.getRoomCode();
            this.getAenList(val);
        },

    },
	methods: {
		makeOp() {
			this.$.extend(this.gameNameOppro, this.fData.gameNameOp);
			this.gameNameOppro.shift();
        },
        handleEdit(row){
            getRedOrderDet({redId:row.redId}).then(res => {
                if(res.success){
                    this.dialogTableVisible = true;
                    this.rows = res.data;
                }else{
                    this.$message.error(res.message)
                }
            })
        },
        makeStatus(){
            this.makeGameType();
            // setTimeout(()=>{
            //     this.query.status = this.query.gameType===3?0:10;
            // },200)
            // console.log(this.query.status,'this.query.status')
        },
        getRoomCode(){
            if(this.query.agencyId === this.$t('common.all')){
                this.query.agencyId = ''
            }
            if(this.query.agencyId == '')return
            this.makeGameType()
            var post = {};
			this.$.extend(post, this.query);
            getRoomCode(post).then(res=>{
                if(res.success){
                    this.roomIdArr =[{id:0,roomName:this.$t('common.all')}, ...res.data]
                }else{
                    this.$message.error(res.message)
                }
            })
        },
		getData(params) {
            if(params){
                this.query.pageIndex = params.page;
                this.query.pageSize = params.limit;
            }
            if(!/^[0-9]*$/.test(this.query.redId)){
                return this.$message.error("搜索局号应为数字")
            }
            if(!this.query.pageIndex){
                this.query.pageIndex = 1
            }
            if(!this.query.pageSize){
                this.query.pageSize = fData.pageSize
            }
            if(this.inpstrStatus===1){
                this.query.account = this.query.inpstr
                this.query.redSender = ""
            }else{
                this.query.redSender = this.query.inpstr
                this.query.account = ""
            }
            this.makeGameType()
            if(this.query.agencyId === this.$t('common.all')){
                this.query.agencyId = ''
            }
            var post = {};
			this.$.extend(post, this.query);
            post.agencyId = this.checkAgenId(post.agencyId)
            post.startTime = this.selTimes[0]
            post.endTime = this.selTimes[1]
			post.startTime = parseInt((post.startTime / 1000) || 0)
            post.endTime = parseInt((post.endTime / 1000) || 0)
            post.startTime = Timestamp(post.startTime)
            post.endTime = Timestamp(post.endTime)
            if(post.redId===''){
                post.redId=0
            }
            if( post.roomId===''){
                post.roomId=0
            }
            if(post.isRobot===''){
                post.isRobot=0
            }
            post.redId*=1
			getRedOrderList(post).then(res => {
				if(res.success){
                    this.tableData = res.data.data;
                    this.pageTotal = res.data.count || 0;
                    // this.tableData.map(v => {
                    //     v.isRobotPro = v.isRobot === 1
                    //     return v
                    // })
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
		changeInps(val) {
			this.query.inpstr = '';
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
		reset() {
			this.query = {
				pageIndex: 1,
				pageSize: fData.pageSize,
				addTime: [startTime,endTime],
				startTime: 0,
				endTime: 0,
				status: 10,
				orderNo: '',
                inpstr: '',
                agencyId: '',
                redId: '',
                roomId: '',
                isRobot: '',
                lineId: '',
                payOutStatus: 0
            };
            this.selTimes = [startTime,endTime]
            this.inpstrStatus = 1
			this.makeGameType()
		},
        makeGameType(){
            this.query.gameType = makeGameType(this.activeName)
        },
        // 多选操作
        handleSelectionChange(val) {
            this.multipleSelection = val;
            var checkedArr = []
            val.map(({id}) => {
                 checkedArr.push(id)
            })
            this.checkedArr = checkedArr
        },
        handuseAble(){
            let idArr=[]
            if(this.multipleSelection.length>1){
               return this.$message.error('只能选择一条数据')
            }
            this.multipleSelection.map( i =>{
                idArr.push(i.id)
            })
            let id = idArr.join(',');
            let post = {
                id : id*1
            }
            this.$confirm(this.$t('common.trueStrmem'), this.$t('common.prompt'), {
                type: 'warning'
            }).then(() => {
                    manualHandOut(post).then(res => {
                        if(res.success){
                            this.$message.success(this.$t('common.success'));
                            this.getData();
                        }else{
                            this.$message.error(res.message)
                        }
                    })
                    
                })
                .catch(() => {});

        }
	}
};
</script>
