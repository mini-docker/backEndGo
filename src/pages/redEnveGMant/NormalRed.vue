<template>
	<div class="allHeight">
		<div class="crumbs">
			<el-breadcrumb separator-class="el-icon-arrow-right">
				<el-breadcrumb-item>
					{{ $t('common.gameGroupMant') }}
				</el-breadcrumb-item>
				<el-breadcrumb-item>
					{{ $t('common.nomalRed') }}
				</el-breadcrumb-item>
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
                <div class="pk-inp-box pk-select" v-if="token.isAdmin === 1">
					<label>{{ $t('common.siteId') }}:</label>
                    <el-select filterable v-model="query.agencyId" :placeholder="$t('common.all')" class="selbox pull-width">
                        <el-option
                            v-for="(item) in agenListpro"
                            :key="item.account" :label="item.account" :value="item.account">
                        </el-option>
                    </el-select>
                </div>
				<!-- <div v-show="slnn" class="pk-inp-box pk-select">
					<label>{{ $t('common.status') }}:</label>
                    <el-select v-show="selFlag" v-model="query.status" :placeholder="$t('common.all')" class="selbox">
                        <el-option v-for="item in fData.ordersfipro" :key="item.key" :label="item.value" :value="item.key"> </el-option>
                    </el-select>
                    <el-select v-show="!selFlag" v-model="query.status" :placeholder="$t('common.all')" class="selbox">
                        <el-option v-for="item in fData.ordersfi" :key="item.key" :label="item.value" :value="item.key"> </el-option>
                    </el-select>
				</div> -->
                <div class="pk-inp-box pk-select">
					<label>{{ $t('common.status') }}:</label>
                    <el-select v-model="query.status" :placeholder="$t('common.all')" class="selbox">
                        <el-option v-for="item in fData.nomalStatusOpf" :key="item.key" :label="item.value" :value="item.key"> </el-option>
                    </el-select>
				</div>
				<div class="pk-inp-box">
					<label>{{ $t('common.groupName') }}:</label>
					<el-input v-model="query.roomName" :placeholder="$t('common.p_KeywordS')" class="selbox"></el-input>
				</div>
				<div class="fl">
					<el-button type="primary" icon="el-icon-search" @click="handleSearch()">{{ $t('common.search') }}</el-button>
					<el-button @click="reset">{{ $t('common.reset') }}</el-button>
				</div>
				<div class="clearboth"></div>
			</div>

			
			
            <div class="handle-box">
            <!-- -->
                <el-tabs v-model="activeName" type="card"  @tab-click="makeStatus();getData()" class="pull-width">
					<el-tab-pane v-for="item in gameNameOppro" :label="item.value" :key="item.key" :name="item.value">
						<!-- 牛牛 -->
                        <div v-show="item.key === 1||item.key === 3||item.key === 4">
							<el-table :data="tableData" :height="fData.tableHeight()+10" border class="table" ref="multipleTable" header-cell-class-name="table-header">
                                <el-table-column prop="lineId" :label="$t('common.line')" align="center"></el-table-column>
                                <el-table-column prop="agencyId" :label="$t('common.siteId')" align="center"></el-table-column>
                                <el-table-column prop="account" :label="$t('common.gameN')" align="center"></el-table-column>
                                <el-table-column prop="roomName" :label="$t('common.groupName')" align="center"></el-table-column>
                                <el-table-column prop="redEnvelopeAmount" :label="$t('common.redAmts')" align="center"></el-table-column>
                                <el-table-column prop="redEnvelopesNum" :label="$t('common.redBagNum')" align="center"></el-table-column>
                                <el-table-column prop="receiveMoney" :label="$t('common.getAmt')" align="center"></el-table-column>
                                <el-table-column prop="receiveNum" :label="$t('common.getGe')" align="center"></el-table-column>
                                <el-table-column prop="returnMoney" :label="$t('common.lastMoney')" align="center"></el-table-column>
                                <el-table-column prop="returnNum" :label="$t('common.lastGe')" align="center"></el-table-column>
                                <!--<el-table-column prop="isAuto" :label="$t('common.isAuto')" align="center">
                                    <template slot-scope="scope">
                                        {{ scope.row.isAuto | filterIsTrue }}
                                    </template>
                                </el-table-column>
                                <el-table-column prop="autoTime" :label="$t('common.sendBagTime')" align="center" width="180">
                                    <template slot-scope="scope">
                                        {{ scope.row.autoTime | filterDate }}
                                    </template>
                                </el-table-column>-->
                                <el-table-column prop="endTime" :label="$t('common.overdueTiem')" align="center" width="180">
                                    <template slot-scope="scope">
                                        {{ scope.row.endTime | filterDate }}
                                    </template>
                                </el-table-column>
                                <el-table-column prop="status" :label="$t('common.status')" align="center">
                                    <template slot-scope="scope">
                                        {{ scope.row.status | filterNormalRedf }}
                                    </template>
                                </el-table-column>
                                <el-table-column :label="$t('common.operating')" width="230" align="center">
                                    <template slot-scope="scope">
                                        <el-button type="primary" plain @click="handInfo(scope.row)">{{ $t('common.look') }}</el-button>
                                        <!--<el-button v-show="scope.row.status===5" type="danger" plain @click="handDel(1, scope.$index, scope.row)">{{ $t('common.del') }}</el-button>
                                        <el-button v-show="scope.row.status===5" type="warning" plain @click="handEdit(scope.row)">{{ $t('common.modify') }}</el-button>-->
                                    </template>
                                </el-table-column>
                            </el-table>
						</div>
                        <!-- 扫雷 -->
						<div v-show="item.key === 2">
							<el-table :data="tableData" :height="fData.tableHeight()+10" border class="table" ref="multipleTable" header-cell-class-name="table-header">
                                <el-table-column prop="lineId" :label="$t('common.line')" align="center"></el-table-column>
                                <el-table-column prop="agencyId" :label="$t('common.siteId')" align="center"></el-table-column>
                                <el-table-column prop="account" :label="$t('common.gameN')" align="center"></el-table-column>
                                <el-table-column prop="roomName" :label="$t('common.groupName')" align="center"></el-table-column>
                                <el-table-column prop="redEnvelopeAmount" :label="$t('common.redAmts')" align="center"></el-table-column>
                                <el-table-column prop="redEnvelopesNum" :label="$t('common.redBagNum')" align="center"></el-table-column>
                                <el-table-column prop="receiveMoney" :label="$t('common.getAmt')" align="center"></el-table-column>
                                <el-table-column prop="receiveNum" :label="$t('common.getGe')" align="center"></el-table-column>
                                <el-table-column prop="returnMoney" :label="$t('common.lastMoney')" align="center"></el-table-column>
                                <el-table-column prop="returnNum" :label="$t('common.lastGe')" align="center"></el-table-column>
                                <!-- <el-table-column prop="isAuto" :label="$t('common.isAuto')" align="center">
                                    <template slot-scope="scope">
                                        {{ scope.row.isAuto | filterIsTrue }}
                                    </template>
                                </el-table-column>
                                <el-table-column prop="autoTime" :label="$t('common.sendBagTime')" align="center" width="180">
                                    <template slot-scope="scope">
                                        {{ scope.row.autoTime | filterDate }}
                                    </template>
                                </el-table-column>-->
                                <el-table-column prop="endTime" :label="$t('common.overdueTiem')" align="center" width="180">
                                    <template slot-scope="scope">
                                        {{ scope.row.endTime | filterDate }}
                                    </template>
                                </el-table-column>
                                <el-table-column prop="status" :label="$t('common.status')" align="center">
                                    <template slot-scope="scope">
                                        {{ scope.row.status | filterNormalRedf }}
                                    </template>
                                </el-table-column>
                                <el-table-column :label="$t('common.operating')" width="230" align="center">
                                    <template slot-scope="scope">
                                        <el-button type="primary" plain @click="handInfo(scope.row)">{{ $t('common.look') }}</el-button>
                                    </template>
                                </el-table-column>
                            </el-table>
						</div>
                        <!-- 接龙 -->
                        <div v-show="item.key === 5">
							<el-table :data="tableData" :height="fData.tableHeight()+10" border class="table" ref="multipleTable" header-cell-class-name="table-header">
                                <el-table-column prop="lineId" :label="$t('common.line')" align="center"></el-table-column>
                                <el-table-column prop="agencyId" :label="$t('common.siteId')" align="center"></el-table-column>
                                <el-table-column prop="account" :label="$t('common.gameN')" align="center"></el-table-column>
                                <el-table-column prop="roundNo" :label="$t('common.turnNum')" align="center"></el-table-column>
                                <el-table-column prop="roomName" :label="$t('common.groupName')" align="center"></el-table-column>
                                <el-table-column prop="redEnvelopeAmount" :label="$t('common.redAmts')" align="center"></el-table-column>
                                <el-table-column prop="redEnvelopesNum" :label="$t('common.redBagNum')" align="center"></el-table-column>
                                <el-table-column prop="receiveMoney" :label="$t('common.getAmt')" align="center"></el-table-column>
                                <el-table-column prop="receiveNum" :label="$t('common.getGe')" align="center"></el-table-column>
                                <el-table-column prop="returnMoney" :label="$t('common.lastMoney')" align="center"></el-table-column>
                                <el-table-column prop="returnNum" :label="$t('common.lastGe')" align="center"></el-table-column>
                                <el-table-column prop="endTime" :label="$t('common.overdueTiem')" align="center" width="180">
                                    <template slot-scope="scope">
                                        {{ scope.row.endTime | filterDate }}
                                    </template>
                                </el-table-column>
                                <el-table-column prop="status" :label="$t('common.status')" align="center">
                                    <template slot-scope="scope">
                                        {{ scope.row.status | filterNormalRedf }}
                                    </template>
                                </el-table-column>
                                <el-table-column :label="$t('common.operating')" width="230" align="center">
                                    <template slot-scope="scope">
                                        <el-button type="primary" plain @click="handInfo(scope.row)">{{ $t('common.look') }}</el-button>
                                        <!--<el-button v-show="scope.row.status===5" type="danger" plain @click="handDel(1, scope.$index, scope.row)">{{ $t('common.del') }}</el-button>
                                        <el-button v-show="scope.row.status===5" type="warning" plain @click="handEdit(scope.row)">{{ $t('common.modify') }}</el-button>-->
                                    </template>
                                </el-table-column>
                            </el-table>
						</div>
                        <!-- 骰子 -->
						<div v-show="item.key === 6">
							<el-table :data="tableData" :height="fData.tableHeight()+10" border class="table" ref="multipleTable" header-cell-class-name="table-header">
                                <el-table-column prop="lineId" :label="$t('common.line')" align="center"></el-table-column>
                                <el-table-column prop="agencyId" :label="$t('common.siteId')" align="center"></el-table-column>
                                <el-table-column prop="account" :label="$t('common.gameN')" align="center"></el-table-column>
                                <el-table-column prop="roomName" :label="$t('common.groupName')" align="center"></el-table-column>
                                <el-table-column prop="redEnvelopeAmount" :label="$t('common.redAmts')" align="center"></el-table-column>
                                <el-table-column prop="redEnvelopesNum" :label="$t('common.redBagNum')" align="center"></el-table-column>
                                <el-table-column prop="receiveMoney" :label="$t('common.getAmt')" align="center"></el-table-column>
                                <el-table-column prop="receiveNum" :label="$t('common.getGe')" align="center"></el-table-column>
                                <el-table-column prop="returnMoney" :label="$t('common.lastMoney')" align="center"></el-table-column>
                                <el-table-column prop="returnNum" :label="$t('common.lastGe')" align="center"></el-table-column>
                                <el-table-column prop="endTime" :label="$t('common.overdueTiem')" align="center" width="180">
                                    <template slot-scope="scope">
                                        {{ scope.row.endTime | filterDate }}
                                    </template>
                                </el-table-column>
                                <el-table-column prop="status" :label="$t('common.status')" align="center">
                                    <template slot-scope="scope">
                                        {{ scope.row.status | filterNormalRedf }}
                                    </template>
                                </el-table-column>
                                <el-table-column :label="$t('common.operating')" width="230" align="center">
                                    <template slot-scope="scope">
                                        <el-button type="primary" plain @click="handInfo(scope.row)">{{ $t('common.look') }}</el-button>
                                    </template>
                                </el-table-column>
                            </el-table>
						</div>

                        <!-- 普通红包 -->
                        <div v-show="item.key === -1">
                            <el-table :data="tableData" :height="fData.tableHeight()+10" border class="table" ref="multipleTable" header-cell-class-name="table-header">
                                <el-table-column prop="lineId" :label="$t('common.line')" align="center"></el-table-column>
                                <el-table-column prop="agencyId" :label="$t('common.siteId')" align="center"></el-table-column>
                                <el-table-column prop="account" :label="$t('common.gameN')" align="center"></el-table-column>
                                <el-table-column prop="roomName" :label="$t('common.groupName')" align="center"></el-table-column>
                                <el-table-column prop="redEnvelopeAmount" :label="$t('common.redAmts')" align="center"></el-table-column>
                                <el-table-column prop="redEnvelopesNum" :label="$t('common.redBagNum')" align="center"></el-table-column>
                                <el-table-column prop="receiveMoney" :label="$t('common.getAmt')" align="center"></el-table-column>
                                <el-table-column prop="receiveNum" :label="$t('common.getGe')" align="center"></el-table-column>
                                <el-table-column prop="returnMoney" :label="$t('common.lastMoney')" align="center"></el-table-column>
                                <el-table-column prop="returnNum" :label="$t('common.lastGe')" align="center"></el-table-column>
                                <el-table-column prop="isAuto" :label="$t('common.isAuto')" align="center">
                                    <template slot-scope="scope">
                                        {{ scope.row.isAuto | filterIsTrue }}
                                    </template>
                                </el-table-column>
                                <el-table-column prop="autoTime" :label="$t('common.sendBagTime')" align="center" width="180">
                                    <template slot-scope="scope">
                                        {{ scope.row.autoTime | filterDate }}
                                    </template>
                                </el-table-column> 
                                <el-table-column prop="endTime" :label="$t('common.overdueTiem')" align="center" width="180">
                                    <template slot-scope="scope">
                                        {{ scope.row.endTime | filterDate }}
                                    </template>
                                </el-table-column>
                                <el-table-column prop="status" :label="$t('common.status')" align="center">
                                    <template slot-scope="scope">
                                        {{ scope.row.status | filterNormalRedf }}
                                    </template>
                                </el-table-column>
                                <el-table-column :label="$t('common.operating')" width="230" align="center">
                                    <template slot-scope="scope">
                                        <el-button type="primary" plain @click="handInfo(scope.row)">{{ $t('common.look') }}</el-button>
                                        <!--<el-button v-show="scope.row.status===5" type="danger" plain @click="handDel(1, scope.$index, scope.row)">{{ $t('common.del') }}</el-button>
                                        <el-button v-show="scope.row.status===5" type="warning" plain @click="handEdit(scope.row)">{{ $t('common.modify') }}</el-button>-->
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
		<!-- 普通红包领取详情 -->
		<el-dialog :title="$t('common.nomalRedInfo')" :visible.sync="infoStatus" width="60%" @close="resetInfo('normalReds')">
			<el-table :data="tableDataInfo" border class="table" header-cell-class-name="table-header">
				<el-table-column prop="account" :label="$t('common.userName')" align="center">
                    <template slot-scope="scope">
                        <div>
                            {{scope.row.account}}
                            <el-tag
                                v-show="scope.row.dragonBest"
                                :type="scope.row.dragonBest==1?'success':scope.row.dragonBest==2?'danger':''"
                            >{{ scope.row.dragonBest | filtersendStatusOp }}</el-tag>
                        </div>
                    </template>
                </el-table-column>
				<el-table-column prop="receiveMoney" :label="$t('common.getAmt')" align="center"></el-table-column>
				<el-table-column prop="receiveTime" :label="$t('common.getMTime')" align="center">
					<template slot-scope="scope">
						{{ scope.row.receiveTime | filterDate }}
					</template>
				</el-table-column>
			</el-table>
			<span slot="footer" class="dialog-footer">
				<el-button type="primary" @click="resetInfo('normalReds')">{{ $t('common.ok') }}</el-button>
			</span>
		</el-dialog>
		<!-- 修改普通红包 -->
		<el-dialog :title="$t('common.sendNormalRed')" :visible.sync="editStatus" width="35%" @close="resetNormal('formNomal')">
			<el-form :model="normalRed" label-width="150px" :rules="normalConf" ref="normalConf">
				<el-form-item :label="$t('common.redAmts')" prop="redEnvelopeAmount">
					<div class="flex">
						<el-input v-model.number="normalRed.redEnvelopeAmount" :placeholder="$t('common.redAmts')"> </el-input>
						<span class="mgl10">{{ $t('common.yuan') }}</span>
					</div>
				</el-form-item>
				<el-form-item :label="$t('common.redBagNum')" prop="redEnvelopesNum">
					<div class="flex">
						<el-input v-model.number="normalRed.redEnvelopesNum" :placeholder="$t('common.redBagNum')"> </el-input>
						<span class="mgl10">{{ $t('common.ge') }}</span>
					</div>
				</el-form-item>
				<el-form-item :label="$t('common.redTimeValid')" prop="endTime">
					<div class="flex">
						<el-input v-model.number="normalRed.endTimes" :placeholder="$t('common.redTimeValid')"> </el-input>
						<span class="mgl10 w40">{{ $t('common.hour') }}</span>
					</div>
				</el-form-item>
				<el-form-item>
					<p class="red">{{ $t('common.redNormalStr') }}</p>
				</el-form-item>
				<el-form-item :label="$t('common.isAutoSendRed')" prop="status">
					<el-radio v-for="item in fData.freeFromDeathsOps" v-model="normalRed.statuss" :label="item.key" :key="item.key">{{
						item.value
					}}</el-radio>
				</el-form-item>
				<el-form-item v-show="normalRed.statuss === 1" :label="$t('common.setAutoSendTime')" prop="autoTime">
					<el-date-picker
						class="pull-width"
						v-model="normalRed.autoTimes"
						type="datetime"
						align="right"
						:placeholder="$t('common.dataSel')"
						format="yyyy-MM-dd HH:mm:ss"
						value-format="timestamp"
						default-time="00:00:00"
						:pickerOptions="pickerOptions"
					>
					</el-date-picker>
				</el-form-item>
			</el-form>
			<span slot="footer" class="dialog-footer">
				<el-button @click="resetNormal('normalConf')">{{ $t('common.cancel') }}</el-button>
				<el-button type="primary" @click="saveNormal('normalConf')">{{ $t('common.ok') }}</el-button>
			</span>
		</el-dialog>

	</div>
</template>
<script>
import fData from '@/app.config';
import Pagination from '@/components/common/Pagination';
import { getDate,Timestamp,makeGameType} from '@/filter.js';
import { agentNormalList, agentNormalEdit, agentNormalInfo, agentNormalDel } from '@/api/account';
import { getAgencyId } from "@/mixins/initAgentList";
import { getLineIds } from '@/api/line';
let nowDate = Math.round(parseInt(new Date().valueOf()));
let startTime = getDate().today.start * 1000;
 let endTime = getDate().today.end * 1000;
export default {
    mixins: [ getAgencyId ],
	components: { Pagination },
	data() {
		let MUST = [{ required: true, message: this.$t('common.mustY'), trigger: 'blur' }];
		return {
			query: {
				status: 10,
				roomName: '',
				addTime: '',
				startTime: 0,
                endTime: 0,
                agencyId: '',
				pageIndex: 1,
                lineId: '',
                redType: 0,
				pageSize: fData.pageSize
			},
            slnn: true,
            lineIdArrAll: [],
			fData: fData,
			pageTotal: 0,
            selTimes: [startTime,endTime],
			tableData: [],
			tableDataInfo: [],
			statuspro: false,
			infoStatus: false,
			delStatus: false,
			editStatus: false,
			multipleSelection: [],
			checkedArr: [],
			isnormalRed: false,
            gameNameOppro: [],
            activeName: this.$t('common.slred'),
            selFlag: false,
			normalRed: {
				redEnvelopeAmount: '',
				redEnvelopesNum: '',
				endTime: '',
				statuss: 1,
				autoTimes: nowDate,
				endTimes: ''
			},
			normalConf: {
				redEnvelopeAmount: MUST,
				redEnvelopesNum: MUST,
				endTime: MUST,
				status: MUST
			},
			pickerOptions: {
				disabledDate(time) {
					return time.getTime() < nowDate; //如果没有后面的-8.64e6就是不可以选择今天的
					//   return time.getTime() < Date.now() - 8.64e7;//如果没有后面的-8.64e7就是不可以选择今天的
				}
			}
		};
	},
    watch:{
        'query.redType':function(val) {
            this.query.status = 10 //全部
            // this.selFlag = val===1;
            // this.slnn = val!==3;
            // this.query.roomId = '';
            // this.checkedArr = [] //复选框清空
            // this.getRoomCode()
            console.log(val,'val')
            this.$set(this.query, 'pageIndex', 1);
            // setTimeout(()=>{
            //     this.query.status = this.query.redType===3?0:10;
            // },200)
        },
        // 'query.agencyId':function(val){
        //     this.query.roomId = '';
        //     this.getRoomCode()
        // },
        'query.lineId':function(val){
            if(this.query.lineId === this.$t('common.all')){
                this.query.lineId = ''
            }
            // this.query.roomId = '';
            this.query.agencyId=''
            // this.getRoomCode();
            //站点id接口
            this.getAenList(val); 
            
        },
    },
	created() {
        this.getLineIdWay();
        this.makeOp();
		this.getData();
	},
	methods: {
        makeOp() {
			this.$.extend(this.gameNameOppro, this.fData.gameNameOp);
			this.gameNameOppro.shift();
        },
        handleSearch(){
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
		getData(params) {
			if (params) {
				this.query.pageIndex = params.page;
				this.query.pageSize = params.limit;
            }
            this.makeRedType()
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
			agentNormalList(post).then(res => {
				if (res.success) {
					this.tableData = res.data.data || [];
					this.pageTotal = res.data.count || 0;
				} else {
					this.$message.error(res.message);
				}
			});
		},
        makeStatus(){
            this.makeRedType();
            // setTimeout(()=>{
            //     console.log(this.query.redType,'this.query.redType')
            //     this.query.status = this.query.redType===3?0:10;
            //     console.log(this.query.status,'this.query.status')
            // },200)
            
        },
		reset() {
			this.query = {
				status: 10,
                roomName: '',
                agencyId: '',
				pageIndex: 1,
				pageSize: fData.pageSize,
				startTime: 0,
				endTime: 0,
				addTime: '',
                lineId: ''
            };
            this.makeRedType();
            this.selTimes = [startTime,endTime]
		},
        makeRedType(){
            this.query.redType = makeGameType(this.activeName)
        },
		handDel(status, index, row) {
			this.$confirm(this.$t('common.trueStrmem', [name]), this.$t('common.prompt'), {
				type: 'warning'
			})
				.then(() => {
					agentNormalDel({ id: row.id }).then(res => {
						if (res.success) {
							this.$message.success(this.$t('common.success'));
							this.getData();
						} else {
							this.$message.error(res.message);
						}
					});
				})
				.catch(() => {});
		},
		handInfo(row) {
			agentNormalInfo({ redId: row.id }).then(res => {
				if (res.success) {
					this.tableDataInfo = res.data || [];
					this.infoStatus = true;
				} else {
					this.$message.error(res.message);
				}
			});
		},
		resetInfo() {
			this.infoStatus = false;
		},
		initFormDate() {
			this.normalRed = {
				redEnvelopeAmount: '',
				redEnvelopesNum: '',
				endTime: '',
				statuss: 1,
				autoTimes: Math.round(parseInt(new Date().valueOf())),
				endTimes: 0
			};
		},
		handEdit(row) {
			this.initFormDate();
			this.$.extend(this.normalRed, row);
			this.editStatus = true;
			// agentNormalInfo({redId:row.id}).then(res=>{
			//     if(res.success){
			//         = res.data || [];
			//         this.normalRed.autoTime *= 1000;

			//     }else{
			//         this.$message.error(res.message)
			//     }
			// })
		},

		handuseAble() {
			let status = this.statuspro === true ? 1 : 2;
			updAgeGStatus(post).then(res => {
				if (res.success) {
					this.$message.success(this.$t('common.success'));
					this.getData();
				} else {
					this.$message.error(res.message);
				}
			});
		},
		handcreRobot() {
			updAgeGStatus().then(res => {
				if (res.success) {
					this.$message.success(this.$t('common.success'));
					this.getData();
				} else {
					this.$message.error(res.message);
				}
			});
		},
		saveNormal(formName) {
			this.$refs[formName].validate(valid => {
				if (valid) {
                    let post = {}
                    this.$.extend(post,this.normalRed)
                    post.redNum = post.redEnvelopesNum*1
                    post.redAmount = post.redEnvelopeAmount+''
                    post.isAuto = post.statuss
                    post.gameTime = post.endTimes
                    // post.endTime=post.endTimes
                    post.autoTime=Math.floor(post.autoTimes/1000) || 0
                    agentNormalEdit(post).then(res => {
                        if (res.success) {
							this.$message.success(this.$t('common.success'));
							this.editStatus = false;
                            this.getData();
                        } else {
                            this.$message.error(res.message);
                        }
                    })
				} else {
					console.error('error submit!!');
					return false;
				}
			});
		},
		resetNormal() {
			this.editStatus = false;
			this.initFormDate();
		}
	}
};
</script>
