<template>
    <div class="goods">
        <div class="nav">
            <div class="nav-fid w">
                <a href="javascript:void(0);" :class="{active:sortType == 1}" @click="reset()">综合排序</a>
                <a href="javascript:void(0);" @click="sort(1)" :class="{active:sortType == 2}">价格从低到高</a>
                <a href="javascript:void(0);" @click="sort(-1)" :class="{active:sortType == 3}">价格从高到低</a>
                <div class="price-interval">
                    <input class="number" type="number" placeholder="价格" v-model="params.min" />
                    <span style="margin:0 5px"> - </span>
                    <input type="number" placeholder="价格" v-model="params.max" />
                    <v-button text="确定" classStyle="main-btn" @btnClick="reset" style="margin-left: 10px;"></v-button>
                </div>
            </div>
        </div>
        <div class="box w">
            <mall-goods v-for="(god,g) in computer" :key="g" :msg="god"></mall-goods>
        </div>
        <div class="load-more w" v-show="!busy" v-infinite-scroll="loadMore" infinite-scroll-disabled="busy" infinite-scroll-distance="100">正在加载中...</div>
    </div>
</template>

<script>
import {getComputer} from '/api/goods'
import vButton from '/components/button.vue'
import mallGoods from '/components/mallGoods'

export default {
    data () {
        return {
            computer:[],        //商品数组
            timer:null,         //计时器对象  
            busy:false,
            params:{
                page:0,         //页码
                sort:'',        //排序
                min:'',         //最小价格
                max:'',         //最大价格
            },
            sortType:1,
        }
    },
    created(){
        // this.getComputerG();
    },
    methods: {
        // 默认排序
        reset(){
            this.sortType = 1
            this.params.sort = ''
            this.params.page = 0
            this.busy = false
            this.getComputerG()
        },
        // 价格排序
        sort(s){
            s == 1 ? this.sortType = 2 : this.sortType = 3;
            this.params.sort = s;
            this.params.page = 0;
            this.busy = false;
            this.getComputerG();
        },
        // 获取商品列表
        getComputerG(flag){
            const {page, sort, min, max} = this.params;
            let params = {
                page,
                sort,
                priceGt: min,
                priceLte: max
            }
            console.log('goods----72',params);
            getComputer(params).then((res) => {
                console.log(res.result.count);
                if(res.result.count){
                    let data = res.result.data;
                    if(flag){
                        this.computer = this.computer.concat(data);
                    }else{
                        this.computer = data;
                    }
                }else{
                    clearTimeout(this.timer);
                    this.busy = true;
                }
            });
        },
        // 加载更多
        loadMore(){
            this.busy = true
            this.timer = setTimeout(() => {
                this.params.page++
                this.getComputerG(true)
                this.busy = false
            }, 500)
        },
    },
    components:{
        vButton,
        mallGoods,
    }
}
</script>

<style lang="scss" rel="stylesheet/scss" scoped>
@import "../../../static/scss/theme.scss";
@import "../../../static/scss/mixin.scss";
</style>

<style scoped>
.nav{height: 60px;line-height: 60px;}
.nav .nav-fid{display: flex;align-items: center;}
.nav .nav-fid a{padding: 0 15px;height: 100%;font-size: 12px;color: #999;display: flex;align-items: center;justify-content: center;}
.nav .nav-fid a.active{color: #5683EA;}
.nav .nav-fid a:hover{color: #5683EA;}
.nav .nav-fid input{width:80px;height:30px;border: 1px solid #ccc;}
.nav .price-interval{padding: 0 15px;display: flex;align-items: center;justify-content: center;}
.nav .price-interval input[type=number]{border: 1px solid #ccc;text-align: center;background: none;border-radius: 5px;}


.box .mallGoods{float: left;border: 1px solid #efefef;}
.load-more{text-align: center;background: #fff}

</style>


