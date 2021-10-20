<template>
	<div id="status" :class="status ? 'bones' : 'no-bones'">
		<h1 class="color">{{ status ? "Yes!" : "No" }}</h1>
		<p>Today <span class="color">is {{ status ? "" : "not"}}</span> a bones day.</p>
	</div>
</template>

<script>
export default {
	data() {
		return {
			status: true
		}
	}
}
</script>

<style>
#status {
	text-align: center;
}

#status h1 {
	font-size: 9rem;
	margin: 0 auto;
	line-height: 80%;
}

.bones .color {
	color: green;
}

.no-bones .color {
	color: red;
}
</style>