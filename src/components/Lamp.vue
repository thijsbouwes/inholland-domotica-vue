<template>
	<div class="switch">
		<i class="material-icons">lightbulb_outline</i>
		<span>{{ lamp.description }}</span>
		<label class="right">
			<input type="checkbox" v-model="lampList.status" @click="updateStatus">
			<span class="lever"></span>
		</label>
	</div>
</template>

<script type="text/javascript">
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
				this.$http.put('lamp/' + this.lampList.id)
					.then(data => this.lampList = data.data)
					.catch(error => console.log(error));
			}
		}
	}
</script>