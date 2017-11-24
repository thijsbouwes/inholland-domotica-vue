<template>
	<div class="switch">
		<i class="material-icons">lightbulb_outline</i>
		<span>{{ windowList.description }}</span>
		<label class="right">
			<input type="checkbox" v-model="windowList.status" @click="updateStatus">
			<span class="lever"></span>
		</label>
	</div>
</template>

<script type="text/javascript">
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
				this.$http.put('window/' + this.windowList.id)
					.then(data => this.windowList = data.data)
					.catch(error => console.log(error));
			}
		}
	}
</script>