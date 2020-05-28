<template>
    <div class="role allHeight">
        <div class="crumbs">
            <el-breadcrumb  separator-class="el-icon-arrow-right">
                <el-breadcrumb-item>
                    <!-- <i class="el-icon-lx-people"></i> -->
                     {{$t('common.actMant')}}
                </el-breadcrumb-item>
                <el-breadcrumb-item>{{$t('common.memMant')}}</el-breadcrumb-item>
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
                    <label>{{$t('common.status')}}:</label>
                    <el-select v-model="query.status" :placeholder="$t('common.all')" class="selbox">
                        <el-option
                            v-for="(item) in statusOptions"
                            :key="item.key"
                            :label="item.value"
                            :value="item.key">
                        </el-option>
                    </el-select>
                </div>
                <div class="pk-inp-box pk-select">
                    <label>{{$t('common.onlineStatus')}}:</label>
                    <el-select v-model="query.isOnline" :placeholder="$t('common.all')" class="selbox">
                        <el-option
                            v-for="(item) in memAgencOp"
                            :key="item.key"
                            :label="item.value"
                            :value="item.key">
                        </el-option>
                    </el-select>
                </div>
                <div class="pk-inp-box">
                    <label>{{$t('common.memAct')}}:</label>
                    <el-input v-model="query.account" :placeholder="$t('common.p_memAct')" class="selbox"></el-input>
                </div>
                <!-- <div class="pk-inp-box">
                    <label>{{$t('common.agenceAct')}}:</label>
                    <el-input v-model="query.name" :placeholder="$t('common.p_agenceAct')" class="selbox"></el-input>
                </div> -->
                <div class="fl">
                    <el-button type="primary" icon="el-icon-search" @click="handleSearch">{{$t('common.search')}}</el-button>
                    <el-button @click="reset">{{$t('common.reset')}}</el-button>
                </div>
                <div class="clearboth"></div>
            </div>
            <div class="handle-box">
                <!-- <el-button type="primary" @click="handleSearch">{{$t('批量踢线')}}</el-button> -->
                <el-button type="primary" plain @click="handkickLine(2)" :disabled="!checkedArr.length>0">{{$t('common.total_kickLine')}}</el-button>
                <el-button type="primary" plain @click="handuseAble(1)" :disabled="!checkedArr.length>0">{{$t('common.total_able')}}</el-button>
                <el-button type="primary" plain @click="handuseAble(2)" :disabled="!checkedArr.length>0">{{$t('common.total_disable')}}</el-button>
            </div>
            <el-table
                :data="tableData"
                border
                class="table"
                :height="fData.tHBatchOne()"
                ref="multipleTable"
                header-cell-class-name="table-header"
                @selection-change="handleSelectionChange"
            >
                <el-table-column type="selection" width="55" align="center"></el-table-column>
                <el-table-column prop="lineId" :label="$t('common.line')" align="center"></el-table-column>
				<el-table-column prop="agencyId" :label="$t('common.siteId')" align="center"></el-table-column>
                <el-table-column prop="account" :label="$t('common.memAct')" align="center"></el-table-column>
                <el-table-column prop="balance" :label="$t('common.balance')" align="center"></el-table-column>
                <el-table-column prop="createTime" :label="$t('common.regisTime')" align="center"></el-table-column>
                <el-table-column prop="ip" :label="$t('common.regisIp')" align="center"></el-table-column>
                <el-table-column prop="status" :label="$t('common.status')" align="center" width="200">
                    <template slot-scope="scope">
                        <el-switch
                            style="display: block"
                            v-model="scope.row.statuspro"
                            active-color="#13ce66"
                            inactive-color="#ff4949"
                            :active-text="$t('common.able')"
                            :inactive-text="$t('common.disable')"
                            @change="handuseAble(3,scope.$index, scope.row)"
                            >
                        </el-switch>
                    </template>
                </el-table-column>
                <el-table-column prop="isOnline" :label="$t('common.isOnline')" align="center">
                    <template slot-scope="scope">
                        <el-tag
                         :type="scope.row.isOnline===1?'success':scope.row.isOnline===2?'danger':''">
                            {{scope.row.isOnline|filterIsOnline}}
                        </el-tag>
                    </template>
                </el-table-column>
                <el-table-column :label="$t('common.operating')" width="200" align="center">
                    <template slot-scope="scope">
                        <el-button
                            type="primary"
                            plain
                            @click="handkickLine(1,scope.$index, scope.row)"
                        >{{$t('common.kickLine')}}</el-button>
                        <el-button
                            type="primary"
                            plain
                            @click="opensendCai(scope.row)"
                        >{{$t('common.handleCai')}}</el-button>
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
            <!-- 编辑弹出框 -->
            <el-dialog :title="$t('common.handleCai')" :visible.sync="editVisible" width="30%" @close="resetSendCai('ruleForm')">
                <el-form :model="ruleForm" label-width="90px" :rules="rules" ref="ruleForm">
                    <el-form-item :label="$t('common.sendCaiMoney')" prop="money">
                        <el-input v-model="ruleForm.money" :placeholder="$t('common.p_sendCaiMoney')"></el-input>
                    </el-form-item>
                    <el-form-item :label="$t('common.sendCaiRemark')" >
                        <el-input
                                v-model="ruleForm.remark"
                                :autosize="{ minRows: 2, maxRows: 10}"
                                type="textarea"
                                :placeholder="$t('common.p_remark')">
                            </el-input>
                    </el-form-item>
                </el-form>
                <span slot="footer" class="dialog-footer">
                    <el-button @click="resetSendCai('ruleForm')">{{$t('common.cancel')}}</el-button>
                    <el-button type="primary" @click="unnorsendCai('ruleForm')">{{$t('common.ok')}}</el-button>
                </span>
            </el-dialog>
        </div>
    </div>
</template>

<script>
import Pagination from '@/components/common/Pagination'
import fData from '@/app.config';
import { getLineIds } from '@/api/line';
import {
    memList,
    memKickLine,
    memStatus,
    memmanualHandOut
} from '@/api/account'
import { getAgencyId } from "@/mixins/initAgentList";
export default {
    name: 'memMant',
    mixins: [ getAgencyId ],
    components: { Pagination },
    data() {
        let mones = (rule, value, callback) => {
			if (value === '') {
				callback(new Error(this.$t('common.mustY')));
			} else if (!fData.moneys.test(value)) {
				callback(new Error(this.$t('common.err_moneys')));
			} else {
				callback();
			}
		};

        return {
            query: {
                pageIndex: 1,
                pageSize: fData.pageSize,
                status: 0,
                isOnline: 0,
                account: '',
                agencyId: '',
                lineId: '',
            },
            tableData: [],
            pageTotal: 0,
            statusOptions: fData.statusOptions,
            memAgencOp: fData.memAgencOp,
            formStatus: 1,
            checkedArr: [],
            lineIdArrAll: [],
            fData: fData,
            ruleForm: {
                money: '',
                remark: '',
            },
            rules: {
                money: [{ required: true, message: this.$t('common.mustY'), trigger: 'blur' }, { validator: mones, trigger: 'blur' }],
            },
            checkedArr: [],
            editVisible: false,
            item: {},
        };
    },
    created() {
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
            if(this.query.agencyId === this.$t('common.all')){
                this.query.agencyId = ''
            }
            var post = {};
			this.$.extend(post, this.query);
            post.agencyId = this.checkAgenId(post.agencyId)
            if(post.lineId === this.$t('common.all')){
				post.lineId = ""
            }
            memList(post).then(res => {
                if(res.success){
                    console.log(res,'resssss');
                    this.tableData = res.data.data;
                    this.pageTotal = res.data.count || 0;
                    this.tableData.map(v=>{
                        v.statuspro = v.status === 1;
                    })
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
        makeContentp(){
            let p = this.$(".el-message-box__wrapper .el-message-box__message").find('p')[0];
            this.$(p).css({"overflow-wrap":"break-word"})
        },
        // 编辑操作
        handkickLine(status,index,row){
            let name;
            let post={};
            if(status===1){
                name = row.account;
                post.ids = row.id+''
            }else if(status===2){
                let nameArr=[]
                let ids = []
                this.multipleSelection.map(({id,account})=>{
                    nameArr.push(account)
                    ids.push(id)
                })
               name = nameArr.join(',')
               post.ids = ids.join(',')
            }
            let _this = this;
            setTimeout(()=>{
                _this.makeContentp();
            },22)
            this.$confirm(this.$t('common.kickLineStrmem',[name]), this.$t('common.prompt'), {
                type: 'warning'
            })
                .then(() => {
                    // this.$(".el-message-box__message").css({"overflow-wrap":"break-word"})
                    memKickLine(post).then(res => {
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
        
        // 启停用
        handuseAble(status,index,row){
            let name,statusStr;
            let post = {};
            if(status===3){
                name = row.account;
                post.ids = row.id+''
                post.status = row.statuspro === true ?  1: 2;
                statusStr =post.status?'common.ableStrmem':'common.unAbleStrmem'
            }else if(status===1||status===2){
                let nameArr=[]
                let ids = []
                this.multipleSelection.map(({account,id})=>{
                    nameArr.push(account)
                    ids.push(id)
                })
               post.status = status
               name = nameArr.join(',');
               statusStr =status===1?'common.ableStrmem':'common.unAbleStrmem'
               post.ids = ids.join(',')
            }
            let _this = this;
            setTimeout(()=>{
                _this.makeContentp();
            },22)
            this.$confirm(this.$t(statusStr,[name]), this.$t('common.prompt'), {
                type: 'warning'
            })
                .then(() => {
                     memStatus(post).then(res => {
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
        // 复选框
        toggleSelection() {
           this.$refs.multipleTable.clearSelection();
        },
        reset(){
            this.query = {
                agencyId: '',
                pageIndex: 1,
                pageSize: fData.pageSize,
                status: 0,
                isOnline: 0,
                account: '',
                lineId: '',
            }
            this.toggleSelection()
        },
        // 手动派彩
        opensendCai(row){
            this.initFormData()
            this.$.extend(this.item, row)
            this.editVisible = true
        },
        // 提交
        unnorsendCai(formName){
            let an = () => {
                this.$confirm(this.$t('common.ok_sendCai'), this.$t('common.prompt'), {
                    type: 'warning'
                }).then(() => {
                    let post = {
                        id: this.item.id*1,
                        money: this.ruleForm.money*1,
                        remark: this.ruleForm.remark,
                    }
                    memmanualHandOut(post).then(res=>{
                        if(res.success){
                            this.$message.success(this.$t('common.success'));
                            this.getData();
                            this.resetSendCai(formName);
                        }else{
                            this.$message.error(res.message)
                        }
                    })

                }).catch(() => {});
            }
            this.$refs[formName].validate((valid) => {
                if (valid) {
                    an()
                } else {
                    console.error('error submit!!');
                    return false;
                }
            });
        },
        initFormData(){
            this.ruleForm = {
                money: '',
                remark: '',
            }
        },
        // 重置
        resetSendCai(formName){
            this.editVisible = false;
			this.initFormData();
			this.$refs[formName].resetFields();
        },
    }
};
</script>
