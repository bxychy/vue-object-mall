import Vue from 'vue'
import Router from 'vue-router'
const Home = resolve => require(['@/view/home.vue'], resolve)
const Login = resolve => require(['@/view/login.vue'], resolve)

Vue.use(Router)

export default new Router({
  	routes: [
		{path: '/',name: 'Home',component: Home},
		{path: '/login',name: 'Login',component: Login},
  	]
})
