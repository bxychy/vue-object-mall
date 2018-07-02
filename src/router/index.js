import Vue from 'vue'
import Router from 'vue-router'
const Home = resolve => require(['@/view/home/home.vue'], resolve)
const Login = resolve => require(['@/view/login/login.vue'], resolve)
const Goods = resolve => require(['@/view/good/goods.vue'], resolve)
const GoodsDetail = resolve => require(['@/view/good/goodsDetail.vue'], resolve)


Vue.use(Router)

export default new Router({
  	routes: [
		{path: '/',name: 'Home',component: Home},
		{path: '/login',name: 'Login',component: Login},
		{path: '/goods',name: 'Goods',component: Goods},
		{path: '/goodsDetail',name: 'GoodsDetail',component: GoodsDetail},
  	]
})
