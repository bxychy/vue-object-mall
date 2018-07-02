<template>
    <div class="home">
        <div class="banner">
            <div class="banner-bg" ref="bannerBg" @mouseover="bannerBgOver($refs.bannerBg)" @mousemove="bannerBgMove($refs.bannerBg,$event)"  @mouseout="bannerBgOut($refs.bannerBg)">
                <span class="img tanz-40"></span>
                <span class="text tanz-20">要买就买<br/>不买别比比</span>
                <span class="copyright tanz-0">code by qingjin.me | picture from t.tt</span>
            </div>
        </div>

        <!-- 热门商品暂无数据 -->
        <section class="w mt30 clearfix">
            <v-Shelf title="热门商品" @click="">
                <div slot="content" class="hot">
                    <!-- <v-Mallgoods :msg="item" v-for="(item,index) in hot" :key="index"></v-Mallgoods> -->
                </div>
            </v-Shelf>
        </section>

        <section class="w mt30" v-for="(item,index) in floors" :key="index">
            <v-shelf :title="item.title">
                <div slot="content" class="floors">
                    <div class="imgbanner">
                        <img v-lazy="floors[index].image.image" :alt="item.title">
                    </div>
                    <v-Mallgoods :msg="tab" v-for="(tab,itab) in item.tabs" :key="itab"></v-Mallgoods>
                </div>
            </v-shelf>
        </section>

    </div>
</template>

<script>
import {productHome} from '/api/index.js'
import vShelf from '/components/shelf.vue'
import vMallgoods from '/components/mallGoods.vue'


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
            floors:[],
            hot:[]
        }
    },
    mounted(){
        productHome().then(res => {
            const {home_floors,home_hot} = res.result;
            this.floors = home_floors;
            console.log("首页商品数据返回-----",res.result)
            this.hot = home_hot;
        });
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
            const {offsetLeft, offsetTop, offsetWidth, offsetHeight} = this.bannerBgOpt
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
        },
        openl(){
            window.open('www.baidu,com','_system');
        }
    },
    components:{
        vShelf,
        vMallgoods,
    },
}
</script>

<style>
.banner, .banner span, .banner div {font-family: "Microsoft YaHei";transition: all .3s;-webkit-transition: all .3s;transition-timing-function: linear;-webkit-transition-timing-function: linear;}
.banner {perspective: 3000px;position: relative;z-index: 19;}
.banner-bg {position: relative;width: 1220px;height: 500px;margin: 20px auto;background: url("/static/images/banner-3d-item.png") center no-repeat;background-size: 100% 100%;border-radius: 10px;transform-style: preserve-3d;-webkit-transform-origin: 50% 50%;-webkit-transform: rotateY(0deg) rotateX(0deg);}
.img {display: block;position: absolute;width: 100%;height: 100%;bottom: 5px;left: 0;background: url("/static/images/banner-3d.png") center no-repeat;background-size: 95% 100%;}
.text {position: absolute;top: 20%;right: 10%;font-size: 30px;color: #fff;text-align: right;font-weight: lighter;}
.copyright {position: absolute;bottom: 10%;right: 10%;font-size: 10px;color: #fff;text-align: right;font-weight: lighter;}

.floors {width: 100%;display: flex;flex-wrap: wrap;align-items: center;}
.floors .imgbanner {width: 50%;height: 430px;}
.floors img {display: block;width: 100%;height: 100%;}
</style>

