<template>
    <div class="home">
        <div class="banner">
            <div class="banner-bg" ref="bannerBg" @mousemove="bannerBgOver($refs.bannerBg)">
                <span class="img tanz-40"></span>
                <span class="text tanz-20">要买就买<br/>不买别比比</span>
                <span class="copyright tanz-0">code by qingjin.me | picture from t.tt</span>
            </div>
        </div>
    </div>
</template>

<script>
import {productHome} from '../api/index.js'



export default {
    data(){
        return{
            banner: {},
            bannerBgOpt:{
                offsetLeft:0,
                offsetTop:0,
                offsetWidth:0,
                offsetHeight:0
            },

        }
    },
    methods:{
        // 鼠标移入
        bannerBgOver(evn){
            // 获取移入时的位置
            const {offsetLeft, offsetTop, offsetWidth, offsetHeight} = evn;
            this.bannerBgOpt.offsetLeft = offsetLeft;
            this.bannerBgOpt.offsetTop = offsetTop;
            this.bannerBgOpt.offsetWidth = offsetWidth;
            this.bannerBgOpt.offsetHeight = offsetHeight;
        },
        // 鼠标移动
        bannerBgMove(dom,evn){
            // 获取移动时的位置
            const {offsetLeft, offsetTop, offsetWidth, offsetHeight} = this.bgOpt
            let X,Y;
            let mouseX = evn.pageX - offsetLeft;
            let mouseY = evn.pageY - offsetTop;
            X = mouseX - (offsetWidth / 2);
            Y = offsetHeight / 2 - mouseY;
            dom.style['-webkit-transform'] = `rotateY(${X / 50}deg) rotateX(${Y / 50}deg)`;
            dom.style.transform = `rotateY(${X / 50}deg) rotateX(${Y / 50}deg)`;
        },
        // 鼠标移出
        bannerBgOut(dom){
            dom.style.transform = 'rotateY(0deg) rotateX(0deg)';
            dom.style['-webkit-transform'] = 'rotateY(0deg) rotateX(0deg)';
        }
    },
}
</script>

<style>

</style>

