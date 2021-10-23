<template>
	<div id="bones-status">
		<!-- loader --> 
		<div id="loader" :class="{ 'hidden': responseOK, 'visible': !responseOK }">
			<img src="/img/bone.png" >
		</div>
		<!-- content -->
		<div
			id="status"
			:class="{
				'bones': status, 'no-bones': !status,
				'hidden': !responseOK, 'visible': responseOK
			}"
		>
			<h1 class="color">{{ status ? "Yes!" : "No" }}</h1>
			<p id="bottom-text">Today is a <span class="color">{{ status ? "" : "no"}} bones</span> day.</p>
			<p id="mantra">{{ data.mantra }}</p>
			<p id="timestamp">Last updated at {{ timestamp }}</p>
		</div>
	</div>
</template>

<script>
import axios from 'axios'

const url = process.env.VUE_APP_API_URL
const showDelay = 3000; // how long to delay showing result even if it loads faster

export default {
	data() {
		return {
			response: null,
			ready: false
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
			return this.ready && this.response &&
				this.response.status == 200 &&
				this.response.data && this.response.data.length > 0
		}
	},
	async created() {
		// get bones status from api
		this.response = await axios.get(url + '/bones/')

		// set ready timeout to show loading animation even if it instantly loads :^)
		setTimeout((() => this.ready = true).bind(this), showDelay)
	},
}
</script>

<style>
@import url('https://fonts.googleapis.com/css2?family=Nunito:wght@800');

#bones-status {
	height: 305px;
	margin: 0 auto;
	max-width: 500px;
	font-size: 0.95em;
}

.hidden {
	opacity: 0;
	transition: opacity 0.3s ease-in;
}

.visible {
	opacity: 1;
	transition: opacity 0.3s ease-in;
}

#status {
	text-align: center;
}

#status h1 {
	font-family: 'Nunito', sans-serif;
	font-size: 9em;
	margin: 0 auto;
	line-height: 80%;
}

.color {
	font-weight: bold;
}

.bones .color {
	color: #3a3;
}

.no-bones .color {
	color: #e35;
}

#bottom-text {
	margin-bottom: 0.3em;
}

#mantra {
	margin-top: 0.3em;
	font-style: italic;
}

#timestamp {
	font-size: 0.7rem;
	font-style: italic;
	color: #ababab;
}

#loader {
	margin: 0 auto;
	width: 184px;
	height: 184px;
	display: flex;
	justify-content: center;
	align-items: center;
	margin-bottom: -184px;
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