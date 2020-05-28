
import axios from '../utils/request';
import api from './index';


function getPackageList(post){
    return axios.post(api.SYSTEM_QUERY_LINE_MEAL_LIST, post).then(res => {
        return res.data
    })
}
function addPackage(post){
    return axios.post(api.SYSTEM_ADD_LINE_MEAL, post).then(res => {
        return res.data
    })
}
function getPackInfo(post){
    return axios.post(api.SYSTEM_QUERY_LINE_MEAL_ONE, post).then(res => {
        return res.data
    })
}
function updPackage(post) {
    return axios.post(api.SYSTEM_EDIT_LINE_MEAL, post).then(res => {
        return res.data
    })
}

function getLineList(post) {
    return axios.post(api.SYSTEM_QUERY_LINE_LIST, post).then(res => {
        return res.data
    })
}
function getLineIds(post) {
    return axios.post(api.SYSTEM_QUERY_LINE_CODE, post).then(res => {
        return res.data
    })
}
function addLine(post) {
    return axios.post(api.SYSTEM_ADD_LINE, post).then(res => {
        return res.data
    })
}
function getLineOne(post) {
    return axios.post(api.SYSTEM_QUERY_LINE_ONE, post).then(res => {
        return res.data
    })
}
function updLine(post) {
    return axios.post(api.SYSTEM_EDIT_LINE, post).then(res => {
        return res.data
    })
}
function updLineStatus(post) {
    return axios.post(api.SYSTEM_EDIT_LINE_STATUS, post).then(res => {
        return res.data
    })
}
function getLineRoy(post) {
    return axios.post(api.SYSTEM_QUERY_LINE_ROYALTY, post).then(res => {
        return res.data
    })
}
function getLineAgeRoy(post) {
    return axios.post(api.SYSTEM_QUERY_LINE_AGENCY_ROYALTY, post).then(res => {
        return res.data
    })
}
function getpackArr(post) {
    return axios.post(api.SYSTEM_QUERY_LINE_MEAL_CODE, post).then(res => {
        return res.data
    })
}




export {
    getPackageList,
    addPackage,
    getPackInfo,
    updPackage,
    getpackArr,
    getLineList,
    getLineIds,
    addLine,
    getLineOne,
    updLine,
    updLineStatus,
    getLineRoy,
    getLineAgeRoy,
}