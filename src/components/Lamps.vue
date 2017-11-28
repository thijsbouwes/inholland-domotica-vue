<template>
	<div class="card">
	    <div class="card-content">
	    <span class="card-title">Lamps</span>

	    <lamp 
	    	v-for="lamp in lamps"
	    	:key="lamp.id" 
	    	:lamp="lamp">		
    	</lamp>


	    </div>
	</div> 
</template>

<script>
import Lamp from "./Lamp";

export default {
	components: { Lamp },

	data() {
		return {
			lamps: []
		}
	},

	created() {
		axios.get('lamp')
			.then(data => this.lamps = data.data)
			.catch(error => console.log(error));	
	}
}
</script>
