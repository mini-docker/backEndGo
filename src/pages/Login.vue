<template>
    <div class="login-wrap">
        <div class="ms-login">
            <div class="ms-title">{{$t('common.backMantSys')}}</div>
            <el-form :model="param" :rules="rules" ref="login" label-width="0px" class="ms-content">
                <el-form-item prop="account">
                    <el-input v-model="param.account" :placeholder="$t('common.p_act')">
                        <el-button slot="prepend" icon="el-icon-lx-people"></el-button>
                    </el-input>
                </el-form-item>
                <el-form-item prop="password">
                    <el-input
                        type="password"
                        :placeholder="$t('common.p_pwd')"
                        v-model="param.password"
                        @keyup.enter.native="submitForm()"
                    >
                        <el-button slot="prepend" icon="el-icon-lx-lock"></el-button>
                    </el-input>
                </el-form-item>
                <div class="login-btn">
                    <el-button type="primary" @click="submitForm()">{{$t('common.login_btn')}}</el-button>
                </div>
            </el-form>
        </div>
    </div>
</template>

<script>
import {getLogin,getMenuOwn} from '@/api/auth'
import bus from '@/components/common/bus';
// import {sysApi} from '@/api/apiPro'
export default {
    data: function() {
        return {
            param: {
                account: '',
                password: '',
                tableData: [],
                firstRoute: null,
                flag: true,
                // account: 'pkplusadmin',
                // password: '#123456',
            },
            rules: {
                account: [{ required: true, message: this.$t('common.p_act'), trigger: 'blur' }],
                password: [{ required: true, message: this.$t('common.p_pwd'), trigger: 'blur' }],
            },
        };
    },
    methods: {
        submitForm() {
            let _this = this;
            this.$refs.login.validate(valid => {
                if (valid) {
                    getLogin(_this.param).then(res=>{
                        console.log(res,'resssss')
                        if (res.success) {
                            let token = res.data;
                            sessionStorage.setItem("token", encodeURIComponent(JSON.stringify(token)));
                            _this.$message.success(this.$t('common.sucLogin'));
                            localStorage.setItem('ms_username', _this.param.account);
                            // _this.getData();
                            this.$router.push({name:'dashboard'});
                        }else{
                            _this.$message.error(res.message);
                        }
                    })
                } else {
                    this.$message.error(this.$t('common.p_actpwd'));
                    console.log('error submit!!');
                    return false;
                }
            });
        },
        getData(){
            getMenuOwn().then(res => {
                if(res.success){
                    this.tableData = res.data;
                    this.emitFirstRoute(this.tableData)
                }else{
                    this.$message.error(res.message);
                }
            })
        },
        emitFirstRoute(tableData){
            let flag = true
            tableData&&tableData.length>0&&tableData.map((v,i)=> {
                if(v.isShow===1&&flag){
                    if(v.children&&v.children.length>0){
                        this.firstRoute = v.children[0].route
                    }else{
                        this.firstRoute=v.route
                    }
                    flag=false
                }
            })
            this.$router.push({name:this.firstRoute});
            bus.$emit('firstRoute', this.firstRoute);
            bus.$emit('routeItems', tableData);
        },
    },
};
</script>

<style scoped>
.login-wrap {
    position: relative;
    width: 100%;
    height: 100%;
    background-image: url(../assets/img/login-bg.jpg) !important;
    background-size: 100%;
}
.ms-title {
    width: 100%;
    line-height: 50px;
    text-align: center;
    font-size: 20px;
    color: #fff;
    border-bottom: 1px solid #ddd;
}
.ms-login {
    position: absolute;
    left: 50%;
    top: 50%;
    width: 350px;
    margin: -190px 0 0 -175px;
    border-radius: 5px;
    background: rgba(255, 255, 255, 0.3);
    overflow: hidden;
}
.ms-content {
    padding: 30px 30px;
}
.login-btn {
    text-align: center;
}
.login-btn button {
    width: 100%;
    height: 36px;
    margin-bottom: 10px;
}
.login-tips {
    font-size: 12px;
    line-height: 30px;
    color: #fff;
}
</style>