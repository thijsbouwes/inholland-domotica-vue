<template>
	<div class="switch house-item">
		<span>
			<i class="material-icons">border_all</i>
			<span>{{ windowList.location }} {{ windowList.floor }}</span>
		</span>
		<label class="right">
			<input type="checkbox" v-model="windowList.status" @click="updateStatus">
			<span class="lever"></span>
		</label>
	</div>
</template>

<script type="text/javascript">
	import {ENDPOINTS} from "../config/api";

	export default {
		props: {
			window: {
				type: Object,
				required: true
			}
		},

		data() {
			return {
				windowList: this.window
			}
		},

		methods: {
			updateStatus() {
				this.$http.put(ENDPOINTS.WINDOW_SWITCH + this.windowList.id)
					.then(data => this.windowList = data.data)
					.catch(error => console.log(error));
			}
		}
	}
</script>