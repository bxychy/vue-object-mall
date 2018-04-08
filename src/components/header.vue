<template>
    <div class="header">
        <header class="w">
            <div class="header-box">
                <div class="left-logo">
                    <h1>
                        <router-link to="/" title="xx科技官网">WTF</router-link>
                    </h1>
                </div>
                <div class="right-box">
                    <div class="nav-list">
                        <router-link to="/goods">全部商品</router-link>
                    </div>
                    <div class="nav-aside" ref="aside" :class="{fixed:(stf && showNav)}"></div>
                </div>
            </div>
        </header>

        <div class="footer-box" v-show="showNav" :class="{fixed:stf}">
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
export default {
    data(){
        return{
            stf:false,
        }
    },
    props:{
        ShowNav:{
            default:true,
            type:Boolean
        }
    },
}
</script>

<style>

</style>


