
import axios from '../utils/request';
import api from './index';

// function agencySiteList(post) {
//     return axios.post(api.AGENCY_SITE_LIST, post).then(res => {
//         return res.data
//     })
// }
// function agencySiteAddSite(post) {
//     return axios.post(api.AGENCY_SITE_ADD_SITE, post).then(res => {
//         return res.data
//     })
// }
// function agencySiteEditSite(post) {
//     return axios.post(api.AGENCY_SITE_EDIT_SITE, post).then(res => {
//         return res.data
//     })
// }

// function agencySiteEditSiteStatus(post) {
//     return axios.post(api.AGENCY_SITE_EDIT_SITE_STATUS, post).then(res => {
//         return res.data
//     })
// }
// function agencySiteDelSite(post) {
//     return axios.post(api.AGENCY_SITE_DEL_SITE, post).then(res => {
//         return res.data
//     })
// }
function getLogList(post) {
    return axios.post(api.SYSTEM_LOG_LIST, post).then(res => {
        return res.data
    })
}



export {
    // agencySiteEditSiteStatus,
    // agencySiteDelSite,
    // agencySiteList,
    // agencySiteAddSite,
    // agencySiteEditSite,
    getLogList
}




