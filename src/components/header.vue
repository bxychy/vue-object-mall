<template>
    <div class="header">
        <header class="wheader">
            <div class="header-box">
                <div class="nav-logo left-logo">
                    <h1>
                        <router-link to="/" title="xx科技官网"></router-link>
                    </h1>
                </div>
                <div class="right-box">
                    <div class="nav-list">
                        <router-link to="/goods">全部商品</router-link>
                    </div>
                    <div class="nav-aside" ref="aside" :class="{fixed:(stf && showNav)}">
                        <div class="user pr">
                            <router-link to="/user">个人中心</router-link>
                            <!--用户信息显示-->
                            <div class="nav-user-wrapper pa" v-if="login">
                                <div class="nav-user-list">
                                    <ul>
                                        <li class="nav-user-avatar"></li>
                                        <li v-for="(item, i) in navList" :key="i">
                                            <router-link :to="item.link">{{item.text}}</router-link>
                                        </li>
                                        <li>
                                            <a href="javascript:;" @click="loginOut">退出</a>
                                        </li>
                                    </ul>
                                </div>
                            </div>
                        </div>
                        <div class="shop pr" @mouseover="cartShowState(true)" @mouseout="cartShowState(false)" ref="positionMsg">
                            <router-link to="/cart" class="shop-a"></router-link>
                            <span class="cart-num">
                                <i class="num" ref="num" :class="{no:totalNum <= 0,move_in_cart:receiveInCart}">{{totalNum}}</i>
                            </span>
                            <!-- 购物车显示块 -->
                            <div class="nav-user-wrapper pa active" v-show="showCart">
                                <!-- 购物列表 -->
                                <div class="nav-user-list">
                                    <div class="full" v-show="totalNum">
                                        <!-- 购物列表 -->
                                        <div class="nav-cart-items">
                                            <ul>
                                                <li class="clearfix" v-for="(fix,fdex) in cartList" :key="fdex">
                                                    <div class="cart-item">
                                                        <div class="cart-item-inner">
                                                            <router-link>
                                                                <div class="item-thumb">
                                                                    <img :src="fix.productImg">
                                                                </div>
                                                            </router-link>
                                                            <div class="item-desc">
                                                                <div class="cart-cell">
                                                                    <h4>
                                                                        <router-link :to="'goodsDetails?productId='+item.productId" v-text="item.productName"></router-link>
                                                                    </h4>
                                                                    <p class="attrs"><span>白色</span></p>
                                                                    <h6>
                                                                        <span class="price-icon">¥</span>
                                                                        <span class="price-num">{{item.productPrice}}</span>
                                                                        <span class="item-num">x {{item.productNum}}</span>
                                                                    </h6>
                                                                </div>
                                                            </div>
                                                        </div>
                                                    </div>
                                                </li>
                                            </ul>
                                        </div>
                                        <!-- 总件数 -->
                                        <div class="nav-cart-total">
                                            <p>共<strong>{{totalNum}}</strong>件商品</p>
                                            <h5>合计:
                                                <span class="price-icon">¥</span>
                                                <span class="price-num">{{totalPrice}}</span>
                                            </h5>
                                            <h6>
                                                <v-button classStyle="main-btn" style="height: 40px;width: 100%;margin: 0;color: #fff;font-size: 14px;line-height: 38px" text="去购物车" @btnClick="toCart"></v-button>
                                            </h6>
                                        </div>
                                    </div>
                                    <div class="cart-con" v-show="!totalNum" style="height: 313px;text-align: center">
                                        <p>你的购物车竟然是空的!</p>
                                    </div>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </header>

        <!--导航-->
        <div class="nav-sub footer-box" v-show="showNav" :class="{fixed:stf}">
            <div class="nav-sub-bg"></div>
            <div class="nav-sub-wrapper" :class="{fixed:stf}">
                <div class="w">
                    <ul class="nav-list">
                        <li>
                            <router-link to="/">首页</router-link>
                        </li>
                        <li>
                            <router-link to="/goods">全部商品</router-link>
                        </li>
                    </ul>
                </div>
            </div>
        </div>
    </div>
</template>

<script>
import { mapState, mapMutations } from 'vuex'
import { loginOut } from '../api/index.js'
import vButton from '/components/button.vue'

export default {
    data(){
        return{
            stf:false,
            navList: [
                {text: '我的订单',link: '/user/orderList'}, 
                {text: '账号资料',link: '/user/information'},
                {text: '收货地址',link: '/user/addressList'}, 
                {text: '售后服务',link: '/user/support'}, 
                {text: '我的优惠',link: '/user/coupon'}
            ],
        }
    },
    props:{
        showNav:{
            default:true,
            type:Boolean
        }
    },
    computed:{
        ...mapState(['login','cartList','showCart','receiveInCart']),
        // 计算价格
        totalPrice(){
            let totalPrice = 0;
            this.cartList.length && this.cartList.forEach(element => {
                totalPrice += (element.productNum * element.productPrice);
            });
            return totalPrice;
        },
        // 计算数量
        totalNum(){
            let totalNum = 0;
            this.cartList.length && this.cartList.forEach(item => {
                totalNum += (item.productNum);
            })
            return totalNum;
        }
    },
    methods:{
        ...mapMutations(['INIT_BUYCART','ADD_CART','ADD_ANIMATION','SHOW_CART']),
        // 购物车显示
        cartShowState(state){
            this.SHOW_CART({showCart: state})
        },
        // 跳转购物车
        toCart () {
            this.$router.push({path: '/cart'});
        },
    },
    components:{
        vButton
    }
}
</script>

<style lang="scss" rel="stylesheet/scss" scoped>
@import "../../static/scss/theme.scss";
@import "../../static/scss/mixin.scss";
</style>
<style>
.header-box {background:#1a1a1a;background-image: -webkit-linear-gradient(#000, #121212);background-image: linear-gradient(#000, #121212);width: 100%;}
header {height: 100px;z-index: 30;position: relative;}
.header-box {display: flex;justify-content: space-between;align-items: center;height: 100%;position: relative;}
.header-box h1{height: 100%;display: flex;align-items: center;}
.header-box h1 a{background: url(/static/images/global-logo-red@2x.png) no-repeat 50%;width: 50px;height: 40px;background-size: cover;display: block;background-position: 0 0;}

.right-box {display: flex;}
.nav-list {display: flex;justify-content: center;align-items: center;margin-right: 22px;}
.nav-list a{color: #c8c8c8;display: block;font-size: 14px;padding: 0 25px;}
.nav-list a:hover{color: #fff;}

.nav-sub{position: relative;height: 90px;background: #f7f7f7;box-shadow: 0 2px 4px rgba(0, 0, 0, .04);z-index: 1;}
.nav-sub .fixed{position: fixed;z-index: 21;height: 60px;top: 0;left: 0;right: 0;border-bottom: 1px solid #dadada;background-image: -webkit-linear-gradient(#fff, #f1f1f1);background-image: linear-gradient(#fff, #f1f1f1);}
.nav-sub .nav-sub-wrapper{padding: 31px 0;height: 90px;position: relative;}
.nav-sub .nav-sub-wrapper .fixed{padding: 0;height: 100%;display: flex;align-items: center;}
.nav-sub .nav-sub-wrapper:after{content: " ";position: absolute;top: 89px;left: 50%;margin-left: -610px;width: 1220px;background: #000;height: 1px;display: none;opacity: 0;-webkit-transition: opacity .3s ease-in;transition: opacity .3s ease-in;}
.nav-sub .nav-sub-wrapper .w{display: flex;justify-content: space-between;}
.nav-sub .nav-sub-wrapper .w .nav-list{line-height: 28px;display: flex;align-items: center;height: 100%;}
.nav-sub .nav-sub-wrapper .w .nav-list li{position: relative;float: left;padding-left: 2px;}
.nav-sub .nav-sub-wrapper .w .nav-list li a{display: block;padding: 0 20px;color: #666;}
.nav-sub .nav-sub-wrapper .w .nav-list li:first-child{padding-left: 0;}
.nav-sub .nav-sub-wrapper .w .nav-list li:first-child a{padding-left:10px;}
.nav-sub .nav-sub-wrapper .w .nav-list li:before{content: ' ';position: absolute;left: 0;top: 13px;width: 2px;height: 2px;background: #bdbdbd;}


.header-box .right-box .nav-aside{position: relative;display:flex;}
.header-box .right-box .nav-aside:before{background: rgba(255, 255, 255, 0.2);content: " ";width: 1px;height: 13px;overflow: hidden;position: absolute;top: 4px;left: 0;}
.header-box .right-box .nav-aside .user{margin-left: 41px;width: 36px;}
.header-box .right-box .nav-aside .user a{position: relative;width: 36px;height: 20px;display: block;text-indent: -9999px;}
.header-box .right-box .nav-aside .user a:before{content: " ";position: absolute;left: 8px;top: 0;width: 20px;height: 20px;background:url(/static/images/account-icon.png) -155px 0;background-size: 240px 107px;transition: none;}

.header-box .right-box .nav-aside .shop{position: relative;float: left;margin-left: 21px;width: 61px;z-index: 99;}
.header-box .right-box .nav-aside .shop:hover a:before{content: " ";background-position: 0 -22px;}
.header-box .right-box .nav-aside .shop .nav-user-wrapper.active{top: 18px;visibility: visible;opacity: 1;-webkit-transition: opacity .15s ease-out;transition: opacity .15s ease-out;}
.header-box .right-box .nav-aside .shop .shop-a{ position: absolute;left: 0;top: 0;bottom: 0;display: block;right: 0;z-index: 1;}
.header-box .right-box .nav-aside .shop .shop-a::before{display: block;width: 30px;height: 100%;content: " ";background: url(/static/images/account-icon.png) 0 -22px;background-size: 240px 107px;background-position: -150px -22px;}
.header-box .right-box .nav-aside .shop .cart-num{position: relative;display: block;margin-left: 31px;margin-top: -1px;min-width: 30px;text-indent: 0;line-height: 20px;}
.header-box .right-box .nav-aside .shop .cart-num i.num{background: #eb746b;background-image: -webkit-linear-gradient(#eb746b, #e25147);background-image: linear-gradient(#eb746b, #e25147);box-shadow: inset 0 0 1px hsla(0, 0%, 100%, .15), 0 1px 2px hsla(0, 0%, 100%, .15);text-align: center;font-style: normal;display: inline-block;width:20px;height:20px;line-height: 20px;border-radius: 10px;color: #fff;font-size: 12px;}
.header-box .right-box .nav-aside .shop .cart-num i.num.no{background: #969696;background-image: -webkit-linear-gradient(#A4A4A4, #909090);background-image: linear-gradient(#A4A4A4, #909090);box-shadow: inset 0 0 1px #838383, 0 1px 2px #838383;}
.header-box .right-box .nav-aside .shop .nav-user-wrapper{right: 0;width: 360px;}
.header-box .right-box .nav-aside .shop .nav-user-wrapper .nav-user-list::before{right: 34px;}
.header-box .right-box .nav-aside .shop .nav-user-list{padding: 0;width: 100%;}
.header-box .right-box .nav-aside .shop .nav-user-list .full{border-radius: 8px;overflow: hidden;}


/* 用户信息 */
.nav-user-wrapper{position: absolute;z-index: 30;padding-top: 18px;opacity: 0;visibility: hidden;top: -3000px;}
.nav-user-wrapper .nav-user-list{position: relative;padding-top: 20px;background: #fff;border: 1px solid #d6d6d6;border-color: rgba(0, 0, 0, .08);border-radius: 8px;box-shadow: 0 20px 40px rgba(0, 0, 0, .15);z-index: 10;}
.nav-user-wrapper .nav-user-list::before{position: absolute;content: " ";background: url(/static/images/account-icon.png) no-repeat -49px -43px;background-size: 240px 107px;width:20px;height:8px;top: -8px;margin-left: -10px;}
.cart-con {text-align: center;position: relative;}
.cart-con p{padding-top: 185px;color: #333333;font-size: 16px;}
.cart-con:before {position: absolute;content: ' ';left: 50%;transform: translate(-50%, -70%);top: 50%;width: 76px;height: 62px;background: url("/static/images/cart-empty-new.png") no-repeat;background-size: cover;}

@media (min-width: 1px) {
    .nav-sub .nav-sub-wrapper:after {display: block;}
}
</style>



