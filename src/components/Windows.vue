<template>
	<div class="card">
	    <div class="card-content">
			<span class="card-title">Windows</span>

			<window
				v-for="window in windows"
				:key="window.id"
				:window="window">
			</window>

			<div class="progress" v-show="loading">
				<div class="indeterminate"></div>
			</div>
	    </div>
	</div> 
</template>

<script>
import Window from "./Window";
import {ENDPOINTS} from "../config/api";

export default {
	components: { Window },

	data() {
		return {
            loading: true,
			windows: []
		}
	},

	created() {
		this.$http.get(ENDPOINTS.WINDOWS)
			.then(data => {
			    this.windows = data.data;
				this.loading = false;
            })
			.catch(error => console.log(error));	
	}
}
</script>
