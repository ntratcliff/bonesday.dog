<template>
	<div id="app">
		<h1>Is today a bones day?</h1>
		<bones-status-button />
	</div>
</template>

<script>
import BonesStatusButton from './components/BonesStatusButton.vue'

export default {
	name: 'App',
	components: {
		BonesStatusButton
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
	margin-top: 60px;
}
</style>
