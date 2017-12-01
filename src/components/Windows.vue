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
import Window from "./Window";
import {ENDPOINTS} from "../config/api";

export default {
	components: { Window },

	data() {
		return {
			windows: []
		}
	},

	created() {
		axios.get(ENDPOINTS.WINDOWS)
			.then(data => this.windows = data.data)
			.catch(error => console.log(error));	
	}
}
</script>
