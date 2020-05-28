<template>
    <div class="allHeight">
		<div class="crumbs">
			<el-breadcrumb separator-class="el-icon-arrow-right">
				<el-breadcrumb-item>
					{{ $t('common.gameGroupMant') }}
				</el-breadcrumb-item>
				<el-breadcrumb-item>
					{{ $t('common.robotMant') }}
				</el-breadcrumb-item>
			</el-breadcrumb>
		</div>
		<div class="container">
			<div class="search-box" v-if="token.isAdmin === 1">
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
				<!-- <div class="pk-inp-box pk-select">
					<label>{{ $t('common.gameName') }}:</label>
					<el-select v-model="query.status" :placeholder="$t('common.all')" class="selbox">
						<el-option v-for="item in fData.gameNameOp" :key="item.key" :label="item.value" :value="item.key"> </el-option>
					</el-select>
				</div> -->
               
				<div class="fl">
					<el-button type="primary" icon="el-icon-search" @click="handleSearch">{{
						$t('common.search')
					}}</el-button>
					<el-button @click="reset">{{ $t('common.reset') }}</el-button>
				</div>
				<div class="clearboth"></div>
			</div>
            <!-- <div class="handle-box flex">
                <div class="handle-box flex">
                    <el-button type="primary" plain @click="handDel(2)" >{{
                        $t('common.total_del')
                    }}</el-button>
                    <el-button type="primary" plain @click="handcreRobot()">{{ $t('common.creRobot') }}</el-button>-->
                    <!-- <div class="flex" style="padding-top: 5px;">
                        <div>{{ $t('common.isUseRob') }}</div>
                        <el-switch
                            style="display: block;"
                            v-model="statuspro"
                            active-color="#13ce66"
                            inactive-color="#ff4949"
                            :active-text="$t('common.able')"
                            :inactive-text="$t('common.disable')"
                            @change="handuseAble()"
                        >
                        </el-switch>
                    </div> -->
               <!--  </div>
            </div>-->
			<el-table
                :data="tableData"
                border
                :height="fData.tHeightOne()-10"
                class="table"
                ref="multipleTable"
                header-cell-class-name="table-header"
                @selection-change="handleSelectionChange"
            >
                <el-table-column type="selection" width="55" align="center"></el-table-column>
                <el-table-column prop="agencyId" :label="$t('common.siteId')" align="center"></el-table-column>
                <el-table-column prop="account" :label="$t('common.robotAct')" align="center"></el-table-column>
                <el-table-column :label="$t('common.operating')" width="200" align="center">
                    <template slot-scope="scope">
                        <el-button
                            type="danger"
                            plain
                            @click="handDel(1,scope.$index, scope.row)"
                        >{{$t('common.del')}}</el-button>
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
		<!-- <el-dialog :title="ruleForms.formTitles" :visible.sync="editVisibles" width="30%" @close="resetEdits('ruleForms')">
			<el-form :model="ruleForms" :rules="redConfig" ref="ruleForms">
				<el-form-item :label="$t('common.redConfTit')" prop="robotSendPacketTime">
					<input class="dis-none" type="text" v-model="ruleForms.robotSendPacketTime" />
				</el-form-item>
				<el-form-item label="" prop="robotSendPacketTime">
					<el-select v-model="ruleForms.robotSendPacketTime" :placeholder="$t('common.all')" class="selbox pull-width">
						<el-option v-for="item in fData.redTimeArr" :key="item.key" :label="item.value" :value="item.key"> </el-option>
					</el-select>
				</el-form-item>
			</el-form>
			<span slot="footer" class="dialog-footer">
				<el-button @click="resetEdits('ruleForms')">{{ $t('common.cancel') }}</el-button>
				<el-button type="primary" @click="saveEdits('ruleForms')">{{ $t('common.ok') }}</el-button>
			</span>
		</el-dialog> -->
		<!-- 生成机器人 -->
		<el-dialog :title="$t('common.creRobot')" :visible.sync="iscreRobot" width="35%" @close="resetCreate('formNomal')">
			<el-form :model="formNomal" label-width="150px" :rules="creRobotConfig" ref="formNomal">
				<el-form-item :label="$t('common.creRobot')+$t('common.nums')" prop="num">
					<div class="flex">
						<el-input v-model.number="formNomal.num" :placeholder="$t('common.p_nums')"> </el-input>
					</div>
				</el-form-item>
				<el-form-item :label="$t('common.siteName')" prop="agencyId"  v-if="token.isAdmin===1">
                    <div class="flex">
                        <el-select
                            filterable
							v-model="formNomal.agencyId"
							:placeholder="$t('common.siteName')"
							class="selbox pull-width"
						>
							<el-option v-for="item in agenList" :key="item.account" :label="item.account" :value="item.account">
							</el-option>
						</el-select>
					</div>
				</el-form-item>
                <el-form-item>
				    <el-button type="primary" @click="saveCreate('formNomal')">{{ $t('common.creRobot') }}</el-button>
                </el-form-item>
			</el-form>
            <el-table
                :data="tabData"
                border
                class="table"
                ref="tabData"
                height="200px"
                header-cell-class-name="table-header"
            >
                <el-table-column prop="account" :label="$t('common.robotAct')" align="center"></el-table-column>
            </el-table>

			<span slot="footer" class="dialog-footer">
				<el-button @click="savesCreate('formNomal')">{{ $t('common.ok') }}</el-button>
			</span>
		</el-dialog>
	</div>
</template>
<script>
import fData from '@/app.config';
import {
    agentRobotList,
    agentRobotAct,
    agentRobotInsert,
    agentRobotDel,
    getAgeList
} from '@/api/account'
import Pagination from '@/components/common/Pagination'
import { getAgencyId } from "@/mixins/initAgentList";
import { getLineIds } from '@/api/line';
export default {
    components: { Pagination },
    mixins: [ getAgencyId ],
    data() {
        return {
            query: {
                pageIndex: 1,
                pageSize: fData.pageSize,
                agencyId: '',
                lineId: ''
            },
            fData: fData,
            pageTotal: 0,
            tableData: [],
            multipleSelection: [],
            statuspro: true,
            iscreRobot: false,
            formNomal:{
                num: '',
                agencyId: '',
            },
            creRobotConfig:{
                num: [
                    { required: true, message: this.$t('common.mustY'), trigger: 'blur' },
                    { type: 'number', message: this.$t('common.mustNum'), trigger: 'blur'}
                ],
                agencyId: fData.MUST,
            },
            tabData: [],
            lineIdArrAll: [],

        }
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
    created(){
        this.getLineIdWay();
        this.getData()
    },
    methods: {
        initFormData(){
            this.formNomal = {
                num: '',
                agencyId: this.token.isAdmin===1?this.agenList[0].account:null,
            }
            this.tabData=[]
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
            if(params){
                this.query.pageIndex = params.page;
                this.query.pageSize = params.limit;
            }
            var post = {};
			this.$.extend(post, this.query);
            post.agencyId = this.checkAgenId(post.agencyId)
            if(post.agencyId === this.$t('common.all')){
                post.agencyId = ''
            }
			agentRobotList(post).then(res => {
				if(res.success){
                    this.tableData = res.data.data;
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
                agencyId: '',
                pageIndex: 1,
                pageSize: fData.pageSize,
                lineId: ''
            }
        },
        handDel(status,index,row){
            let name;
            let post={};
            if(status===1){
                // name = row.account;
                post.ids = row.id+''
            }else if(status===2){
                let nameArr=[]
                let ids = []
                this.multipleSelection.map(({id,account})=>{
                    nameArr.push(account)
                    ids.push(id)
                })
            //    name = nameArr.join(',')
               post.ids = ids.join(',')
            }

            this.$confirm(this.$t('common.trueStrmem'), this.$t('common.prompt'), {
                type: 'warning'
            })
                .then(() => {
                    agentRobotDel(post).then(res => {
                        if(res.success){
                            this.$message.success(this.$t('common.success'))
                            this.getData();
                        }else{
                            this.$message.error(res.message)
                        }
                    })
                })
                .catch(() => {});
        },
        // 多选操作
        handleSelectionChange(val) {
            this.multipleSelection = val;
            var checkedArr = []
            val.map(({id}) => {
                 checkedArr.push(id)
            })
            this.checkedArr = checkedArr
            console.log(val,'checkboxs',this.checkedArr)
        },
        handcreRobot(){
            this.initFormData()
            this.iscreRobot = true;
        },
        saveCreate(formName){
            this.$refs[formName].validate(valid => {
				if (valid) {
                    let post = {}
                    this.$.extend(post,this.formNomal)
                    post.num*=1
                    post.agencyId=this.checkAgenId(post.agencyId)
                    agentRobotAct(post).then(res => {
                        if (res.success) {
                            this.$message.success(this.$t('common.success'));
                            this.tabData = res.data;
                        } else {
                            this.$message.error(res.message);
                        }
                    });
                }
            })
        },
        resetCreate(formName){
            this.iscreRobot = false;
            this.$refs[formName].resetFields();
            this.initFormData()
            this.getData()
        },
        savesCreate(formName){
            let post = {
                accounts: '',
                agencyId: this.checkAgenId(this.formNomal.agencyId)
            }
            let accounts=[];
            this.tabData.map(v => {
                accounts.push(v.account)
            })
            post.accounts = accounts.join(',')
            agentRobotInsert(post).then(res => {
                if (res.success) {
                    this.$message.success(this.$t('common.success'));
                    this.resetCreate(formName)
                } else {
                    this.$message.error(res.message);
                }
            })
        }
        
    },
    
}
</script>
