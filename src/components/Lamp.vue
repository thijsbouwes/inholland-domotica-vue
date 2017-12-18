<template>
	<div class="switch house-item">
		<span>
			<i class="material-icons prefix">lightbulb_outline</i>
			<span>{{ lamp.location }} {{ lamp.floor }}</span>
		</span>
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
				this.$http.put(ENDPOINTS.LAMP_SWITCH + this.lampList.id)
					.then(data => this.lampList = data.data)
					.catch(error => console.log(error));
			}
		}
	}
</script>