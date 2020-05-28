import axios from '../utils/request';
import api from './index';

function gameList(post) {
    return axios.post(api.SYSTEM_QUERYGAMELIST, post).then(res => {
        return res.data
    })
}

function addGame(postdata) {
    return axios.post(api.SYSTEM_ADDGAME,postdata).then(res => {
        return res.data
    })
}
function editGame(postdata) {
    return axios.post(api.SYSTEM_EDITGAME,postdata).then(res => {
        return res.data
    })
}
function editGameStatus(postdata) {
    return axios.post(api.SYSTEM_EDITGAMESTATUS,postdata).then(res => {
        return res.data
    })
}

function redSline(postdata){
    return axios.post(api.SYSTEM_ORDER_STATISTICAL, postdata).then(res => {
        return res.data
    })
}

export {
    gameList,
    addGame,
    editGame,
    editGameStatus,
    redSline
}