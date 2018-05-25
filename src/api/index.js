// view数据接口
import http from './public.js'
const baseUrl = '/api'

// 登录接口
export const userLogin = (params) => {
    return http.fetchPost(`${baseUrl}/users/login`,params);
}

//退出登录接口
export const loginOut = (params) => {
    return http.fetchPost(`${baseUrl}/users/loginOut`,params);
}

//用户信息接口
export const userInfo = (params) => {
    return http.fetchPost(`${baseUrl}/users/userInfo`,params);
}

//注册账号接口
export const register = (params) => {
    return http.fetchPost('/users/register',params);
}

//上传图片接口
export const upload = (params) => {
    return http.fetchPost('/users/upload',params);
}

// 修改头像
export const updateheadimage = (params) => {
    return http.fetchPost('/users/updateheadimage',params);
}

// 首页接口
export const productHome = (params) => {
    return http.fetchGet(`${baseUrl}/goods/productHome`,params);
}