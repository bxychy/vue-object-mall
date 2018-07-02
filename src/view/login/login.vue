<template>
    <div class="login">
        <div class="login-wrapper">
            <div class="dialog dialog-shadow"  style="display: block; margin-top: -362px;">
                <div class="login-title" v-if="loginPage">
                    <h4>使用 Smartisan ID 登录官网</h4>
                </div>
                <div class="login-content" v-if="loginPage">
                    <ul class="common-form">
                        <li class="username">
                            <div class="login-input">
                                <input type="text" v-model="loginSuc.userName" placeholder="账号" />
                            </div>
                        </li>
                        <li class="userpwd">
                            <div class="login-input">
                                <input type="password" v-model="loginSuc.userPwd" placeholder="密码" @keyup.enter="login" />
                            </div>
                        </li>
                        <li style="text-align: right">
                            <span  style="top: 0;left: 0;color: #d44d44">{{loginSuc.errMsg}}</span>
                            <a href="javascript:;" style="padding: 0 5px;font-size:14px;" @click="loginPage = false">注册 Smartisan ID</a>
                        </li>
                    </ul>
                    <v-button text="登陆" :classStyle="isLoginOk" @btnClick="login" class="btn"></v-button>
                </div>
            </div>
        </div>
    </div>
</template>

<script>
import { userLogin, register } from '../../api/index.js'
import { addCartBatch } from '../../api/goods.js'
import { getStore, removeStore } from '../../utils/storage.js'

import vButton from '/components/button.vue'

export default {
    data(){
        return{
            cart:[],
            loginPage:true,
            loginSuc:{
                userName:'',
                userPwd:'',
                errMsg:'',
            },
            registered:{
                userName:'',
                userPwd:'',
                userPwd1:'',
                errMsg:'',
            },
        }
    },
    mounted(){

    },
    computed:{
        isLoginOk(){
            const {userName, userPwd} = this.loginSuc;
            return userName && userPwd ? 'main-btn' : 'disabled-btn';
        }
    },
    methods:{
        login(){
            const {userName,userPwd} = this.loginSuc;
            if(!userName || !userPwd){
                return this.loginSuc.errMsg = '账号密码不能为空';
            }else{
                let params = {userName,userPwd};
                userLogin(params).then(res => {
                    if(res.status == '0'){
                        if(this.cart.length){
                            addCartBatch({productMsg:this.cart}).then(res => {
                                if (res.status == '1') {
                                    removeStore('buyCart');
                                }
                            }).then(this.$router.go(-1));
                        }else{
                            this.$router.go(-1);
                        }
                    }else{
                        this.loginSuc.errMsg = res.msg;
                    }
                });
            }
        },
        regist(){
            const {userName, userPwd, userPwd1} = this.registered;
            if(!userName || !userPwd || !userPwd1){
                this.loginSuc.errMsg = '账号密码不能为空';
                return false;
            }
            if(!userPwd !== !userPwd1){
                this.loginSuc.errMsg = '两次输入密码不一致';
                return false;
            }
            let params = {userName,userPwd};
            register({params}).then(res => {
                this.registered.errMsg = res.msg;
                if(res.status == '0'){
                    setTimeout(() => {
                        this.loginSuc.errMsg = '';
                        this.registered.errMsg = '';
                        this.loginPage = true;
                    },500);
                }
            })
        },
    },
    components:{
        vButton
    }
}
</script>

<style>
* {box-sizing: content-box;padding: 0;margin: 0;}
.login {overflow-x: hidden;overflow-y: hidden;}
.login .login-input {height: 50px;display: flex;align-items: center;}
.login .login-input input {font-size: 16px;width: 100%;height: 100%;padding: 10px 15px;box-sizing: border-box;border: 1px solid #ccc;border-radius: 6px;}
.login .login-wrapper {background: url(/static/images/bg_9b9dcb65ff.png) repeat;background-size: 100px;min-height: 800px;min-width: 630px;}
.login .btn input{margin: 0;width: 100%;height: 48px;font-size: 18px;line-height: 48px}

.login .dialog{width: 450px;border: 1px solid #dadada;border-radius: 10px;top: 50%;left: 50%;margin-left: -225px;position: absolute;}
.login .dialog .login-title{background: linear-gradient(#fff, #f5f5f5);overflow: visible;position: relative;background-image: url(/static/images/smartisan_4ada7fecea.png);background-size: 160px;background-position: top center;background-repeat: no-repeat;height: 92px;margin: 23px 0 50px;padding: 75px 0 0;box-shadow: none;}
.login .dialog .login-title h4{padding: 0;text-align: center;border-bottom: 1px solid #dcdcdc;position: absolute;bottom: 0;width: 100%;margin: 0;border-bottom: 0;box-shadow: none;line-height: 1em;height: auto;color: #333;font-weight: 400;}
.login .dialog .login-content{padding: 0 40px 22px;height: auto;}
.login .dialog .login-content .common-form li{clear: both;margin-bottom: 15px;position: relative;}

.dialog-shadow {-webkit-box-shadow: 0 9px 30px -6px rgba(0, 0, 0, .2), 0 18px 20px -10px rgba(0, 0, 0, .04), 0 18px 20px -10px rgba(0, 0, 0, .04), 0 10px 20px -10px rgba(0, 0, 0, .04);-moz-box-shadow: 0 9px 30px -6px rgba(0, 0, 0, .2), 0 18px 20px -10px rgba(0, 0, 0, .04), 0 18px 20px -10px rgba(0, 0, 0, .04), 0 10px 20px -10px rgba(0, 0, 0, .04);box-shadow: 0 9px 30px -6px rgba(0, 0, 0, .2), 0 18px 20px -10px rgba(0, 0, 0, .04), 0 18px 20px -10px rgba(0, 0, 0, .04), 0 10px 20px -10px rgba(0, 0, 0, .04);}

@media screen and (min-width: 737px), screen and (-webkit-max-device-pixel-ratio: 1.9) and (max-width: 736px) and (min-device-width: 737px) {
    .login-wrapper {background: url(/static/images/con-bg_04f25dbf8e.jpg) repeat-x;position: absolute;top: 0;bottom: 0;left: 0;right: 0;}
    .dialog {background: url(/static/images/dialog-gray-bg.png) #fff bottom repeat-x;border-radius: 12px;display: none;margin: -163px 0 0 -218px;width: 436px;position: fixed;left: 50%;top: 50%;}
    .dialog .title h4 {border-bottom: #d1d1d1 solid 1px;box-shadow: 0 2px 6px #d1d1d1;color: #666;font-size: 20px;height: 61px;line-height: 61px;padding: 0 0 0 35px;}
    .common-form li {clear: both;margin-bottom: 15px;position: relative;}
}

</style>


