import Vue from 'vue'
import Vuex from 'vuex'
import mutations from './mutations.js'
import action from './action.js'

Vue.use(Vuex);

const state = {

    // 登录
    login:null,

    // 用户信息
    userInfo:null,

    // 加入购物车列表
    cartList:[],

    // 飞入图片地址
    moveImgUrl: null,

    // 购物车top位置
    cartPositionT:0,

    // 购物车left位置
    cartPositionL: 0,

    // 动画左偏移
    elLeft:0,

    // 动画顶部偏移
    elTop:0,

    // 显示飞入图片
    showMoveImg: false,

    // 是否进入购物车
    receiveInCart: false,

    // 是否显示购物车
    showCart: false,

}

export default new Vuex.Store({
    state,
	mutations
})