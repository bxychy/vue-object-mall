<template>
    <div class="mallGoods good-item">
        <div class="good-bg">
            <div class="good-img">
                <router-link :to="'goodsDetail?productId=' + msg.productId">
                    <img v-lazy="msg.productImageBig" :alt="msg.productName">
                </router-link>
            </div>

            <h6 class="good-title">{{msg.productName}}</h6>
            <h3 class="sub-title ellipsis">{{msg.sub_title}}</h3>

            <div class="good-price">
                <div class="good-flex">
                    <router-link :to="'goodsDetail?productId=' + msg.productId">
                        <v-button text="查看详情" style="margin: 0 5px" ></v-button>
                    </router-link>
                    <v-button text="加入购物车" style="margin: 0 5px"@btnClick="addCart(msg.productId,msg.salePrice,msg.productName,msg.productImageBig)" classStyle="main-btn"></v-button>
                </div>
                <p><span style="font-size: 16px">￥</span>{{msg.salePrice}}</p>
            </div>

        </div>
    </div>
</template>

<script>
import { mapMutations, mapState } from 'vuex'
import vButton from '/components/button.vue'

export default {
    data(){
        return{

        }
    },
    props:{
        msg:{ type:[Object,Array] }
    },
    mounted () {
        // console.log(this.msg);
    },
    methods:{
        addCart(id,price,name,img){

        },
    },
    components: {
        vButton
    }
}
</script>

<style lang="scss" rel="stylesheet/scss" scoped>
    @import "../../static/scss/mixin.scss";
    @import "../../static/scss/theme.scss";
</style>

<style>
.good-item{background: #fff;width: 25%;transition: all .5s;height: 430px;}
.good-item:hover{transform: translateY(-3px);box-shadow: 1px 1px 20px #999;}
.good-item:hover .good-price p{display:none;}
.good-item:hover .good-flex{display: flex;}
.good-item .good-img img{margin:50px auto 10px;display: block;width:206px;height: 206px;}
.good-item .good-price{margin: 15px 0;height: 30px;text-align: center;line-height: 30px;color: #e4393c;font-size: 20px;position:relative;}
.good-item .good-flex{width:100%;display:none;align-items: center;justify-content: center;}
.good-item .good-title{line-height: 1.2;font-size: 16px;color: #424242;margin: 0 auto;padding: 0 14px;text-align: center;overflow: hidden;}
.good-item h3{text-align: center;line-height: 1.2;font-size: 12px;color: #d0d0d0;padding: 10px;}

</style>

