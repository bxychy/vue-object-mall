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
                        
                    </div>
                </div>
            </div>
        </header>

        <!--底部导航-->
        <div class="nav-sub footer-box" v-show="showNav" :class="{fixed:stf}">
            <div class="nav-sub-bg"></div>
            <div class="nav-sub-wrapper" :class="{fixed:stf}">
                <div class="w">
                    <ul class="nav-sub-list">
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
import { mapState } from 'vuex'
import { loginOut } from '../api/index.js'

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
        ...mapState(['login','cartList']),
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

    }
}
</script>

<style lang="scss" rel="stylesheet/scss">
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

@media (min-width: 1px) {
    .nav-sub .nav-sub-wrapper:after {display: block;}
}


</style>



