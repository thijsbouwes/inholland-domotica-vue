<template>
	<div class="card">
	    <div class="card-content">
	    <span class="card-title">Windows</span>

	    <window 
	    	v-for="window in windows"
	    	:key="window.id" 
	    	:window="window">		
    	</window>


	    </div>
	</div> 
</template>

<script>
import Window from "./window";

export default {
	components: { Window },

	data() {
		return {
			windows: []
		}
	},

	created() {
		this.$http.get('window')
			.then(data => this.windows = data.data)
			.catch(error => console.log(error));	
	}
}
</script>
