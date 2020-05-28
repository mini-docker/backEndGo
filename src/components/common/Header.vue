<template>
    <div class="header">
        <!-- 折叠按钮 -->
        <div class="collapse-btn" @click="collapseChage">
            <i v-if="!collapse" class="el-icon-s-fold"></i>
            <i v-else class="el-icon-s-unfold"></i>
        </div>
        <div class="logo">{{$t('common.backMantSys')}}</div>
        <div class="header-right">
            <div class="header-user-con">
                <!-- 全屏显示 -->
                <div class="btn-fullscreen" @click="handleFullScreen">
                    <el-tooltip effect="dark" :content="fullscreen?$t('common.unfullScreen'):$t('common.fullScreen')" placement="bottom">
                        <i class="el-icon-rank"></i>
                    </el-tooltip>
                </div>
                <!-- <div class="btn-fullscreen" @click="handleFullScreen">
                    <el-tooltip effect="dark" :content="fullscreen?$t('common.unfullScreen'):$t('common.fullScreen')" placement="bottom">
                        <i class="el-icon-rank"></i>
                    </el-tooltip>
                </div> -->
                <!-- 消息中心 -->
                <!-- <div class="btn-bell">
                    <el-tooltip effect="dark" :content="message?$t('common.hasmsgNum',[message]):$t('common.msgCenter')" placement="bottom">
                        <router-link to="/tabs">
                            <i class="el-icon-bell"></i>
                        </router-link>
                    </el-tooltip>
                    <span class="btn-bell-badge" v-if="message"></span>
                </div> -->
                <!-- 用户头像 -->
                <!-- <div class="user-avator">
                    <img src="@/assets/img/img.jpg" />
                </div> -->
                <!-- 用户名下拉菜单 -->
                <el-dropdown class="user-name" trigger="click" @command="handleCommand">
                    <span class="el-dropdown-link">
                        {{username}}
                        <i class="el-icon-caret-bottom"></i>
                    </span>
                    <el-dropdown-menu slot="dropdown">
                        <!-- <a href="https://github.com/lin-xin/vue-manage-system" target="_blank">
                            <el-dropdown-item>项目仓库</el-dropdown-item>
                        </a> -->
                        <el-dropdown-item v-show="this.token.isAdmin*1 !== 1" command="modifyPwd">{{ $t('common.modify') + $t('common.pwd') }}</el-dropdown-item>
                        <el-dropdown-item divided command="loginout">{{$t('common.logout')}}</el-dropdown-item>
                    </el-dropdown-menu>
                </el-dropdown>
            </div>
        </div>
        <!-- 编辑弹出框 -->
		<el-dialog :title="ruleForm.formTitle" :visible.sync="editVisible" width="30%" @close="resetEdit('ruleForm')">
			<el-form :model="ruleForm" label-width="90px" :rules="rules" ref="ruleForm">
                <el-form-item :label="$t('common.act')">
					<el-input v-model="act" disabled></el-input>
				</el-form-item>
				<el-form-item :label="$t('common.oldPwd')" prop="oldPwd">
					<el-input type="password"  auto-complete="new-password" v-model="ruleForm.oldPwd" show-password :placeholder="$t('common.p_oldPwd')"></el-input>
				</el-form-item>
				<el-form-item :label="$t('common.loginPwd')" prop="loginPwd">
					<el-input  type="password" auto-complete="new-password" v-model="ruleForm.loginPwd" show-password :placeholder="$t('common.p_loginPwd')"></el-input>
				</el-form-item>
				<el-form-item :label="$t('common.confirPwd')" prop="confirmPassword">
					<el-input  type="password" auto-complete="new-password" v-model="ruleForm.confirmPassword" show-password :placeholder="$t('common.p_confirPwd')"></el-input>
				</el-form-item>
			</el-form>
			<span slot="footer" class="dialog-footer">
				<el-button @click="resetEdit('ruleForm')">{{ $t('common.cancel') }}</el-button>
				<el-button type="primary" @click="saveEdit('ruleForm')">{{ $t('common.ok') }}</el-button>
			</span>
		</el-dialog>
    </div>
</template>
<script>
import bus from './bus';
import {logOut,modifyPwd} from '@/api/auth'
import fData from '@/app.config';
export default {
    data() {
        let validatePass = (rule, value, callback) => {
			if (value === '') {
				callback(new Error(this.$t('common.mustY')));
			} else if (!fData.operationpassError.test(value)) {
				callback(new Error(this.$t('common.pwd_str')));
			} else {
				if (this.ruleForm.confirmPassword !== '') {
					this.$refs.ruleForm.validateField('confirmPassword');
				}
				callback();
			}
		};
		let validatePass2 = (rule, value, callback) => {
			if (value === '') {
				callback(new Error(this.$t('common.againInpPwd')));
			} else if (value !== this.ruleForm.loginPwd) {
				callback(new Error(this.$t('common.noSamePwd')));
			} else {
				callback();
			}
		};
		let password = [
			{ required: true, message: this.$t('common.mustY'), trigger: 'blur' },
			{ validator: validatePass, trigger: 'blur' }
		];
		let confirmPassword = [
			{ required: true, message: this.$t('common.mustY'), trigger: 'blur' },
			{ validator: validatePass2, trigger: 'blur' }
		];
        return {
            collapse: true,
            fullscreen: false,
            editVisible: false,
            name: '',
            message: 2,
            ruleForm: {
				formTitle: this.$t('common.modify')+this.$t('common.pwd'), //模态框title
				oldPwd: '',
				loginPwd: '',
				confirmPassword: '',
			},
			rules: {
				oldPwd: fData.MUST,
				loginPwd: password,
				confirmPassword: confirmPassword
            },
            act: localStorage.getItem('ms_username'),
            token: JSON.parse(decodeURIComponent(sessionStorage.getItem('token'))),
        };
    },
    computed: {
        username() {
            let username = localStorage.getItem('ms_username');
            return username ? username : this.name;
        }
    },
    methods: {
        initFormData(){
            this.ruleForm = {
				formTitle: this.$t('common.modify')+this.$t('common.pwd'), //模态框title
				oldPwd: '',
				loginPwd: '',
				confirmPassword: '',
			}
        },
        saveEdit(formName){
            this.$refs[formName].validate(valid => {
				if (valid) {
                    // 后端接收参数不一样 
                    this.ruleForm.oldPassword = this.ruleForm.oldPwd
                    this.ruleForm.password = this.ruleForm.loginPwd
                    this.ruleForm.confirmPassword = this.ruleForm.confirmPassword
                    modifyPwd(this.ruleForm).then(res => {
                        if(res.success){
                            this.$message.success(this.$t('common.success'));
                            let _this = this;
                            setTimeout(function(){
                                _this.$router.push('/login');
                            },200)
                        }else{
                            this.$message.error(res.message);
                        }
                    })
                }
			});
        },
        resetEdit(formName){
            this.editVisible = false;
			this.$refs[formName].resetFields();
            this.initFormData();
        },
        // 用户名下拉菜单选择事件
        handleCommand(command) {
            if (command == 'loginout') {
                logOut().then(res => {
                    if(res.success){
                        this.$message.success(this.$t('common.sucLogout'));
                        localStorage.removeItem('ms_username');
                        this.$router.push('/login')
                    }else{
                         this.$message.error(res.message);
                    }
                })
            }
            if (command == 'modifyPwd') {
                this.initFormData()
                this.editVisible = true;
			}
        },
        // 侧边栏折叠
        collapseChage() {
            this.collapse = !this.collapse;
            bus.$emit('collapse', this.collapse);
        },
        // 全屏事件
        handleFullScreen() {
            let element = document.documentElement;
            if (this.fullscreen) {
                if (document.exitFullscreen) {
                    document.exitFullscreen();
                } else if (document.webkitCancelFullScreen) {
                    document.webkitCancelFullScreen();
                } else if (document.mozCancelFullScreen) {
                    document.mozCancelFullScreen();
                } else if (document.msExitFullscreen) {
                    document.msExitFullscreen();
                }
            } else {
                if (element.requestFullscreen) {
                    element.requestFullscreen();
                } else if (element.webkitRequestFullScreen) {
                    element.webkitRequestFullScreen();
                } else if (element.mozRequestFullScreen) {
                    element.mozRequestFullScreen();
                } else if (element.msRequestFullscreen) {
                    // IE11
                    element.msRequestFullscreen();
                }
            }
            this.fullscreen = !this.fullscreen;
        }
    },
    mounted() {
        if (document.body.clientWidth < 1500) {
            this.collapseChage();
        }
    }
};
</script>
<style scoped>
.header {
    position: relative;
    box-sizing: border-box;
    width: 100%;
    height: 40px;
    font-size: 22px;
    color: #fff;
}
.collapse-btn {
    float: left;
    padding: 0 21px;
    cursor: pointer;
    line-height: 40px;
}
.header .logo {
    float: left;
    width: 250px;
    line-height: 40px;
}
.header-right {
    float: right;
    padding-right: 50px;
}
.header-user-con {
    display: flex;
    height: 40px;
    align-items: center;
}
.btn-fullscreen {
    transform: rotate(45deg);
    margin-right: 5px;
    font-size: 24px;
}
.btn-bell,
.btn-fullscreen {
    position: relative;
    width: 30px;
    height: 30px;
    text-align: center;
    border-radius: 15px;
    cursor: pointer;
}
.btn-bell-badge {
    position: absolute;
    right: 0;
    top: -2px;
    width: 8px;
    height: 8px;
    border-radius: 4px;
    background: #f56c6c;
    color: #fff;
}
.btn-bell .el-icon-bell {
    color: #fff;
}
.user-name {
    margin-left: 10px;
}
.user-avator {
    margin-left: 20px;
}
.user-avator img {
    display: block;
    width: 40px;
    height: 40px;
    border-radius: 50%;
}
.el-dropdown-link {
    color: #fff;
    cursor: pointer;
}
.el-dropdown-menu__item {
    text-align: center;
}
</style>
