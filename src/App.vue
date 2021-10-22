<template>
	<div id="app">
		<bones-status />
	</div>
</template>

<script>
import BonesStatus from './components/BonesStatus.vue'

export default {
	name: 'Is today a bones day?',
	components: {
		BonesStatus
	}
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
