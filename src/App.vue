<template>
  	<div id="app">
		<v-header></v-header>
    	<!-- <img src="./assets/logo.png"> -->
    	<router-view/>
		<v-footer></v-footer>
  	</div>
</template>

<script>
import vHeader from '@/components/header.vue'
import vFooter from '@/components/footer.vue'

export default {
	name: 'App',
	components: {
      	vHeader,
      	vFooter
    }
	  
}
</script>

<style>
*{margin:0;padding: 0;}
#app {
	font-family: 'Avenir', Helvetica, Arial, sans-serif;
	-webkit-font-smoothing: antialiased;
	-moz-osx-font-smoothing: grayscale;
	text-align: center;
	color: #2c3e50;
	/* margin-top: 60px; */
	background: #ededed;;
	}
.w{width: 1220px;margin: 0 auto;}
.mt30{margin-top: 30px;}
li{list-style-type: none;}
a{text-decoration:none;font-style: normal;color: #5079d9;cursor: pointer;transition: all .15s ease-out;}
</style>
