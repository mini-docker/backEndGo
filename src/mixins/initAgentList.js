// import fData from '@/app.config';
import { getAgeList } from '@/api/account';
export const getAgencyId = {
    data() {
        return {
            agenListpro: [],
            agenList: [],
            token: JSON.parse(decodeURIComponent(sessionStorage.getItem('token'))),
        }
    },
    created() {
        // if (this.token.isAdmin === 1) {
            this.getAenList();
        // }
    },
    // watch: {
    //     page: 'loadData'
    // },
    methods: {
        // 查询代理列表
        getAenList(lineId='') {
            if (!lineId)return
            getAgeList({ lineId }).then(res => {
                if (res.success) {
                    this.agenList = res.data;
                    // sessionStorage.setItem('agenIds', this.agenList[0].account)
                    this.agenListpro = [{ agencyId: '', account: this.$t('common.all') }, ...res.data]
                } else {
                    this.$message.error(res.message);
                }
            });
        },
        checkAgenId(account) {
            if (!account)return ''
            let a;
            this.agenListpro.map(v => {
                if (v.account == account) {
                    a = v.agencyId;
                }
            });
            return a;
        },

    }
}



