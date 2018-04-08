<template>
    <div class="vbutton">
        <input :type="inputType" readonly :class="classStyle" @click="btnClick($event)" :disabled="classStyle == 'disabled-btn'" :value="text" />
    </div>
</template>

<script>
export default {
    props:{
        text:{
            type:[String,Number],
            default:'one botton',
        },
        inputType:{
            type:[String],
            default:'button',
        },
        classStyle:{
            type:String,
            default:'default-btn'
        },
    },
    methods:{
        btnClick(event){
            this.$emit('btnClick',event);
        }
    }
}
</script>

<style lang="scss" rel="stylesheet/scss">
@import "../../static/scss/theme.scss";
</style>

<style>
.vbutton .input{width: 100px;height: 30px;line-height: 28px;vertical-align: middle;}
.vbutton input{display: inline-block;cursor: pointer;text-align: center;}


.default-btn {border:1px solid #e1e1e1;border-radius: 4px;font-size: 12px;color: #646464;background-color: #f9f9f9;background-image: -webkit-linear-gradient(top, #fff, #f9f9f9);background-image: linear-gradient(180deg, #fff, #f9f9f9);}
.default-btn:hover {background-color: #eee;background-image: -webkit-linear-gradient(top, #f5f5f5, #eee);background-image: linear-gradient(180deg, #f5f5f5, #eee);}

.main-btn {border:1px solid #5c81e3;border-radius: 4px;font-size: 12px;color: #fff;background-color: #678ee7;background-image: -webkit-linear-gradient(top, #678ee7, #5078df);background-image: linear-gradient(180deg, #678ee7, #5078df);}
.main-btn:hover {background-color: #6c8cd4;background-image: -webkit-linear-gradient(top, #6c8cd4, #4769c2);background-image: linear-gradient(180deg, #6c8cd4, #4769c2);}

.vbutton .disabled-btn {cursor: not-allowed;border:1px solid #afafaf;border-radius: 4px;font-size: 12px;color: #fff;background-color: #a9a9a9;background-image: -webkit-linear-gradient(top, #b8b8b8, #a9a9a9);background-image: linear-gradient(180deg, #b8b8b8, #a9a9a9);}


</style>
