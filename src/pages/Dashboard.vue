<template>
    <div>
        <el-row :gutter="24">
            <el-col :span="8">
                <el-card shadow="hover" class="mgb20" style="height:100%;">
                    <div class="user-info">
                        <!-- <img src="@/assets/img/img.jpg" class="user-avator" alt /> -->
                        <div class="user-info-cont">
                            <div class="user-info-name">{{token.user.account}}</div>
                            <div>{{token.user.roleName}}</div>
                        </div>
                    </div>
                    <div class="user-info-list">
                        {{$t('common.lastLoginTime')}}：
                        <span>{{token.user.lastLoginTime|filterDate}}</span>
                    </div>
                    <div class="user-info-list">
                        {{$t('common.lastLoginIp')}}：
                        <span>{{token.user.lastIp}}</span>
                    </div>
                </el-card>
            </el-col>
        </el-row>
    </div>
</template>

<script>
// import Schart from 'vue-schart';
import bus from '@/components/common/bus';
export default {
    name: 'dashboard',
    data() {
        return {
            name: localStorage.getItem('ms_username'),
            token: JSON.parse(decodeURIComponent(sessionStorage.getItem("token"))),
        };
    },
    computed: {
        // role() {
        //     return this.name === 'admin' ? '超级管理员' : '普通用户';
        // }
    },
    methods: {
        changeDate() {
            const now = new Date().getTime();
            this.data.forEach((item, index) => {
                const date = new Date(now - (6 - index) * 86400000);
                item.name = `${date.getFullYear()}/${date.getMonth() + 1}/${date.getDate()}`;
            });
        }
    }
};
</script>


<style scoped>
.el-row {
    margin-bottom: 20px;
}

.grid-content {
    display: flex;
    align-items: center;
    height: 100px;
}

.grid-cont-right {
    flex: 1;
    text-align: center;
    font-size: 14px;
    color: #999;
}

.grid-num {
    font-size: 30px;
    font-weight: bold;
}

.grid-con-icon {
    font-size: 50px;
    width: 100px;
    height: 100px;
    text-align: center;
    line-height: 100px;
    color: #fff;
}

.grid-con-1 .grid-con-icon {
    background: rgb(45, 140, 240);
}

.grid-con-1 .grid-num {
    color: rgb(45, 140, 240);
}

.grid-con-2 .grid-con-icon {
    background: rgb(100, 213, 114);
}

.grid-con-2 .grid-num {
    color: rgb(45, 140, 240);
}

.grid-con-3 .grid-con-icon {
    background: rgb(242, 94, 67);
}

.grid-con-3 .grid-num {
    color: rgb(242, 94, 67);
}

.user-info {
    display: flex;
    align-items: center;
    padding-bottom: 20px;
    border-bottom: 2px solid #ccc;
    margin-bottom: 20px;
}

.user-avator {
    width: 120px;
    height: 120px;
    border-radius: 50%;
}

.user-info-cont {
    padding-left: 50px;
    flex: 1;
    font-size: 14px;
    color: #999;
}

.user-info-cont div:first-child {
    font-size: 30px;
    color: #222;
}

.user-info-list {
    font-size: 14px;
    color: #999;
    line-height: 25px;
}

/* .user-info-list span {
    margin-left: 70px;
} */

.mgb20 {
    margin-bottom: 20px;
}

.todo-item {
    font-size: 14px;
}

.todo-item-del {
    text-decoration: line-through;
    color: #999;
}

.schart {
    width: 100%;
    height: 300px;
}
</style>
