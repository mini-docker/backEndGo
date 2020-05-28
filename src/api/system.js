
import axios from '../utils/request';
import api from './index';

function sysqueSys(post) {
    return axios.post(api.SYSTEM_QUERY_SYSTEM_CONF, post).then(res => {
        return res.data
    })
}





export {
    sysqueSys,

    
}
