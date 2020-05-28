import axios from '../utils/request';
import api from './index';


function agencyAdminList(postdata) {
    return axios.post(api.SYSTEM_AGENCYADMINLIST,postdata).then(res => {
        return res.data
    })
}
function addAgencyAdminList(postdata) {
    return axios.post(api.SYSTEM_ADDAGENCYADMINLIST,postdata).then(res => {
        return res.data
    })
}

function editAgencyAdminList(postdata) {
    return axios.post(api.SYSTEM_EDITAGENCYADMINLIST,postdata).then(res => {
        return res.data
    })
}

function agencyList(postdata) {
    return axios.post(api.SYSTEM_AGENCYLIST,postdata).then(res => {
        return res.data
    })
}

function editAgencyStatus(postdata) {
    return axios.post(api.SYSTEM_EDITAGENCYSTATUS,postdata).then(res => {
        return res.data
    })
}

function memList(postdata) {
    return axios.post(api.SYSTEM_QUERY_USER_LIST, postdata).then(res => {
        return res.data
    })
}

function memKickLine(postdata) {
    return axios.post(api.SYSTEM_KICK_USERS, postdata).then(res => {
        return res.data
    })
}

function memStatus(postdata) {
    return axios.post(api.SYSTEM_EDIT_USERS_STATUS, postdata).then(res => {
        return res.data
    })
}
function getGGlist(postdata) {
    return axios.post(api.SYSTEM_QUERY_ROOM_LIST, postdata).then(res => {
        return res.data
    })
}
function updGGStatus(postdata) {
    return axios.post(api.SYSTEM_EDIT_ROOM_STATUS, postdata).then(res => {
        return res.data
    })
}
function getRedOrderList(postdata) {
    return axios.post(api.SYSTEM_QUERY_RED_ORDER_RECORD_LIST, postdata).then(res => {
        return res.data
    })
}
function getRedOrderDet(postdata) {
    return axios.post(api.SYSTEM_RED_INFO, postdata).then(res => {
        return res.data
    })
}
function getAgeList(post) {
    return axios.post(api.SYSTEM_LIST, post).then(res => {
        return res.data
    })
}
function getRoomCode(post) {
    return axios.post(api.SYSTEM_ROOM_CODE, post).then(res => {
        return res.data
    })
}
function manualHandOut(post) {
    return axios.post(api.SYSTEM_MANUAL_HAND_OUT, post).then(res => {
        return res.data
    })
}
function memmanualHandOut(post) {
    return axios.post(api.SYSTEM_MEM_MANUAL, post).then(res => {
        return res.data
    })
}
// 红包管理 start
function agentNormalList(post) {
    return axios.post(api.SYSTEM_ORDINARY_RED_LIST, post).then(res => {
        return res.data
    })
}

function agentNormalEdit(postdata) {
    return axios.post(api.SYSTEM_ORDINARY_RED_EDIT, postdata).then(res => {
        return res.data
    })
}

function agentNormalInfo(postdata) {
    return axios.post(api.SYSTEM_ORDINARY_RED_INFO, postdata).then(res => {
        return res.data
    })
}
function agentNormalDel(post) {
    return axios.post(api.SYSTEM_ORDINARY_RED_DEL, post).then(res => {
        return res.data
    })
}
// 红包管理 end

// 机器人管理 start
function agentRobotList(post) {
    return axios.post(api.SYSTEM_ROBOT_LIST, post).then(res => {
        return res.data
    })
}

function agentRobotAct(postdata) {
    return axios.post(api.SYSTEM_ROBOT_GET_ROBOT_ACCOUNTS, postdata).then(res => {
        return res.data
    })
}

function agentRobotInsert(postdata) {
    return axios.post(api.SYSTEM_ROBOT_INSERT_ROBOTS, postdata).then(res => {
        return res.data
    })
}
function agentRobotDel(post) {
    return axios.post(api.SYSTEM_ROBOT_DEL_ROBOTS, post).then(res => {
        return res.data
    })
}
// 机器人管理 end


export {
    getAgeList,
    agencyAdminList,
    addAgencyAdminList,
    editAgencyAdminList,
    agencyList,
    editAgencyStatus,
    memList,
    memKickLine,
    memStatus,
    getGGlist,
    updGGStatus,
    getRedOrderList,
    getRedOrderDet,
    getRoomCode,
    manualHandOut,
    memmanualHandOut,
    agentNormalList,
    agentNormalEdit,
    agentNormalInfo,
    agentNormalDel,
    agentRobotList,
    agentRobotAct,
    agentRobotInsert,
    agentRobotDel,
    
}