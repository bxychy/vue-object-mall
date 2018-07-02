<template>
    <div class="w goodsDetail">
        <!-- 产品图片 -->
        <div class="gray-box goodsdetail-box">
            <!-- 头部左边 -->
            <div class="box-banner">
                <div class="banner">
                    <div class="thumbnail">
                        <ul>
                            <li v-for="(l,ind) in productImage" :key="ind">
                                <img v-lazy="l" :alt="product.productName">
                            </li>
                        </ul>
                    </div>
                    <div class="thumb"></div>
                </div>
            </div>
            <!-- 头部右边 -->
            <div class="box-wrapper">

            </div>
        </div>
        <!-- 产品信息 -->
        <div class="goodsDetail-info">

        </div>
    </div>
</template>

<script>
import {productDet} from '/api/goods'
import vButton from '/components/button.vue'
export default {
    data(){
        return{
            small:[],
            product:{},
            productMsg:{},
            productImage:[],
            big:'',
        }
    },
    created(){
        this.productDetP(this.$route.query.productId);
    },
    methods: {
        productDetP(productId){
            productDet({productId}).then((res) => {
                console.log('goodsDetail------44',res);
                this.product = res.result;
                this.productMsg = res.result.productMsg || '';
                this.productImage = res.result.productImageSmall;
                this.big = res.result.productImageSmall[0];
            })
        },
    },
    computed: {
        
    },
    components: {
        vButton
    }
}
</script>

<style scoped>
.goodsDetail{clear: both;width: 1220px;min-height: 600px;padding: 0 0 25px;margin: 0 auto;}
.goodsdetail-box{display: flex;padding: 60px;margin: 20px 0;}
.goodsdetail-box .box-banner .banner{display: flex;width: 540px;}
.goodsdetail-box .box-banner .banner .thumbnail li:first-child{margin-top: 0px;}
.goodsdetail-box .box-banner .banner .thumbnail li{width: 80px;height: 80px;margin-top: 10px;padding: 12px;border: 1px solid rgba(0, 0, 0, 0.06);border-radius: 5px;cursor: pointer;}
.goodsdetail-box .box-banner .banner .thumbnail li.on{padding: 10px;border: 3px solid rgba(0, 0, 0, 0.2);}
.goodsdetail-box .box-banner .banner .thumbnail li img{display: block;width: 100%;height: 100%;}
</style>


