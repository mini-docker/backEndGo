import axios from "../utils/request";
import api from "./index";

function sysRegister(postdata) {
	return axios.post(api.newApi.AUTH_REGISTER, postdata).then((res) => {
		return res.data;
	});
}
function sysLogin(postdata) {
	return axios.post(api.newApi.AUTH_LOGIN, postdata).then((res) => {
		return res.data;
	});
}



export {
    sysRegister,
    sysLogin,

}