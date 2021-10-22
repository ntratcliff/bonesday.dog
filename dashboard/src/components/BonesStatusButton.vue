<template>
	<div v-if="responseOK" id="status" :class="status ? 'bones' : 'no-bones'">
		<input type="checkbox" :checked="status" id="status-toggle" name="status-toggle" @change="toggleChanged">
		<label for="status-toggle" class="color">{{ status ? "Yes!" : "No" }}</label>
		<p>Today <span class="color">is {{ status ? "" : "not"}}</span> a bones day.</p>
		<p id="timestamp">Last updated at {{ timestamp }}</p>
	</div>
</template>

<script>
import axios from 'axios'

const url = process.env.VUE_APP_API_URL
axios.defaults.headers.post['x-api-key'] = process.env.VUE_APP_API_KEY

export default {
	data() {
		return {
			response: null,
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
	created() {
		// get bones status from api
		this.updateResponse()
	},
	methods: {
		toggleChanged(event) {
			const checked = event.target.checked
			const date = new Date().toISOString().slice(0,19).replace('T', ' ')
			axios.post(`${url}/bones/${date}/${+checked}`)
				.then((response) => {
					console.log(response)
					this.updateResponse()
				})
				.catch((error) => {
					console.error(error)
					console.error(error.response.data)
				})
		},
		async updateResponse() {
			this.response = await axios.get(url + '/bones/')
		}
	}
}
</script>

<style>
#status {
	text-align: center;
}

#status label {
	font-size: 9rem;
	font-weight: 500;
	margin: 0 auto;
	line-height: 80%;
}

#status-toggle {
	width: 6rem;
	height: 6rem;
	margin: 0.5rem 0.5rem
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