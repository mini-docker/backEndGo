
import axios from '../utils/request';
import api from './index';

function getRoleList(post) {
    return axios.post(api.SYSTEM_QUERY_ROLE_LIST, post).then(res => {
        return res.data
    })
}

function getAdminList(post) {
    return axios.post(api.SYSTEM_QUERY_ADMIN_LIST, post).then(res => {
        return res.data
    })
}
function addRole(post) {
    return axios.post(api.SYSTEM_ADD_ROLE, post).then(res => {
        return res.data
    })
}
function getRoleOne(post) {
    return axios.post(api.SYSTEM_QUERY_ROLE_ONE, post).then(res => {
        return res.data
    })
}
function updRole(post) {
    return axios.post(api.SYSTEM_EDIT_ROLE, post).then(res => {
        return res.data
    })
}
function updRoleStatus(post) {
    return axios.post(api.SYSTEM_EDIT_ROLE_STATUS, post).then(res => {
        return res.data
    })
}
function getPower(post) {
    return axios.post(api.SYSTEM_SET_ROLE_PERMISSION, post).then(res => {
        return res.data
    })
}
function delRole(post) {
    return axios.post(api.SYSTEM_DEL_ROLE, post).then(res => {
        return res.data
    })
}
function getRolePerm(post){
    return axios.post(api.SYSTEM_QUERY_ROLE_PERMISSION, post).then(res => {
        return res.data
    })
}

function adminList(postData) {
    return axios.post(api.SYSTEM_ADMINLIST, postData).then(res => {
        return res.data
    })
}
function queryRoleCode() {
    return axios.post(api.SYSTEM_ROLECODE).then(res => {
        return res.data
    })
}
function editAdmin(postData) {
    return axios.post(api.SYSTEM_EDITADMIN,postData).then(res => {
        return res.data
    })
}
function resetPwd(postData) {
    return axios.post(api.SYSTEM_RESETPASSWORD,postData).then(res => {
        return res.data
    })
}
function addAdmin(postData) {
    return axios.post(api.SYSTEM_ADDADMIN,postData).then(res => {
        return res.data
    })
}
function delAdmin(postData) {
    return axios.post(api.SYSTEM_DELADMIN,postData).then(res => {
        return res.data
    })
}

export {
    getRoleList,
    getAdminList,
    addRole,
    getRoleOne,
    updRole,
    updRoleStatus,
    getPower,
    delRole,
    adminList,
    queryRoleCode,
    editAdmin,
    resetPwd,
    addAdmin,
    delAdmin,
    getRolePerm,

}
