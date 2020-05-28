import axios from '../utils/request';
import api from './index';


function getLogin(post) {
    return axios.post(api.SYSTEM_LOGIN,post).then(res => {
        return res.data
    })
}
function logOut(post){
    return axios.post(api.SYSTEM_LOGOUT,post).then(res => {
        return res.data 
    })
}
function getMenuOwn(){
    return axios.post(api.SYSTEM_OWNER).then(res => {
        return res.data
    })
}
function getMenuList() {
    return axios.post(api.SYSTEM_MENULIST).then(res => {
        return res.data
    })
}
function addMenu(post){
    return axios.post(api.SYSTEM_ADD_MENU, post).then(res => {
        return res.data
    })
}
function getPMenu(post){
    return axios.post(api.SYSTEM_QUERCHDL, post).then(res => {
        return res.data
    })
}
function getPMenuById(post){
    return axios.post(api.SYSTEM_QUERY_MENU_ONE, post).then(res => {
        return res.data
    })
}
function updMenu(post) {
    return axios.post(api.SYSTEM_EDIT_MENU, post).then(res => {
        return res.data
    })
}
function modifyPwd(post) {
    return axios.post(api.MODIFY_PWD, post).then(res => {
        return res.data
    })
}




export {
    modifyPwd,
    getLogin,
    logOut,
    getMenuOwn,
    getMenuList,
    addMenu,
    getPMenu,
    getPMenuById,
    updMenu
}