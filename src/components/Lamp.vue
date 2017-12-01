<template>
	<div class="switch">
		<i class="material-icons">lightbulb_outline</i>
		<span>{{ lamp.location }} {{ lamp.floor }}</span>
		<label class="right">
			<input type="checkbox" v-model="lampList.status" @click="updateStatus">
			<span class="lever"></span>
		</label>
	</div>
</template>

<script type="text/javascript">
import {ENDPOINTS} from "../config/api";

	export default {
		props: {
			lamp: {
				type: Object,
				required: true
			}
		},

		data() {
			return {
				lampList: this.lamp
			}
		},

		methods: {
			updateStatus() {
				axios.put(ENDPOINTS.LAMP_SWITCH + this.lampList.id)
					.then(data => this.lampList = data.data)
					.catch(error => console.log(error));
			}
		}
	}
</script>