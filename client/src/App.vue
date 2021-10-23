<template>
	<div id="app">
		<h1>Does Noodle have bones today?</h1>
		<bones-status />
	</div>
</template>

<script>
import BonesStatus from './components/BonesStatus.vue'

export default {
	name: 'App',
	components: {
		BonesStatus
	},
	data() {
		return {
			response: null,
		}
	},
}
</script>

<style>
#app {
	font-family: Avenir, Helvetica, Arial, sans-serif;
	-webkit-font-smoothing: antialiased;
	-moz-osx-font-smoothing: grayscale;
	text-align: center;
	color: #2c3e50;
	margin: 60px 12px 0 12px;
	font-size: 14pt;
}

h1 {
	font-size: 1.2em;
}
</style>
