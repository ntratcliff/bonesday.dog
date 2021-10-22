<template>
	<div v-if="responseOK" id="status" :class="status ? 'bones' : 'no-bones'">
		<h1 class="color">{{ status ? "Yes!" : "No" }}</h1>
		<p>Today <span class="color">is {{ status ? "" : "not"}}</span> a bones day.</p>
		<p id="timestamp">Last updated at {{ timestamp }}</p>
	</div>
</template>

<script>
import axios from 'axios'

const url = process.env.VUE_APP_API_URL

export default {
	data() {
		return {
			response: null
		}
	},
	computed: {
		status() {
			return this.responseOK && this.data.bones
		},
		timestamp() {
			return this.responseOK && new Date(this.data.datetime).toString()
		},
		data() {
			return this.responseOK && this.response.data[0]
		},
		responseOK() {
			return this.response &&
				this.response.status == 200 &&
				this.response.data && this.response.data.length > 0
		}
	},
	async created() {
		// get bones status from api
		this.response = await axios.get(url + '/bones/')
	},
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

#timestamp {
	font-size: 0.7rem;
	font-style: italic;
	color: #ababab;
}
</style>