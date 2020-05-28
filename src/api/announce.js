
import axios from '../utils/request';
import api from './index';

function getAnno(post) {
    return axios.post(api.SYSTEM_QUERY_POST_LIST, post).then(res => {
        return res.data
    })
}
function getAnnoOne(post) {
    return axios.post(api.SYSTEM_QUERY_POST_BY_ID, post).then(res => {
        return res.data
    })
}
function editAnnoStatus(post) {
    return axios.post(api.SYSTEM_EDIT_POST_STATUS, post).then(res => {
        return res.data
    })
}

function getActivity(post) {
    return axios.post(api.SYSTEM_QUERY_ACTIVE_LIST, post).then(res => {
        return res.data
    })
}
function getActivityOne(post) {
    return axios.post(api.SYSTEM_QUERY_ACTIVE_BY_ID, post).then(res => {
        return res.data
    })
}
function editActivityStatus(post) {
    return axios.post(api.SYSTEM_EDIT_ACTIVE_STATUS, post).then(res => {
        return res.data
    })
}





export {
    getAnno,
    getAnnoOne,
    editAnnoStatus,
    getActivity,
    getActivityOne,
    editActivityStatus
}