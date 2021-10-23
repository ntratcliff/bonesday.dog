<template>
	<div id="bones-status">
		<!-- loader --> 
		<div v-if="!responseOK" id="loader">
			<img src="/img/bone.png" >
		</div>
		<!-- content -->
		<div v-if="responseOK" id="status" :class="status ? 'bones' : 'no-bones'">
			<h1 class="color">{{ status ? "Yes!" : "No" }}</h1>
			<p>Today is a <span class="color">{{ status ? "" : "no"}} bones</span> day.</p>
			<p id="timestamp">Last updated at {{ timestamp }}</p>
		</div>
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

#loader {
	margin: 0 auto;
	width: 200px;
	height: 200px;
	display: flex;
	justify-content: center;
	align-items: center;
}

#loader img {
	width: 100%;
	height: 100%;
	opacity: 0.5;
	animation: loader-bob 1.2s infinite alternate;
	animation-timing-function: cubic-bezier(0.445, 0.050, 0.550, 0.950);
}

@keyframes loader-bob {
	from {width: 100%; height: 100%;}
	to {width: 70%; height: 70%;}
}

</style>