<template>
	<div class="card">
	    <div class="card-content">
			<span class="card-title">Lamps</span>
            <slot></slot>
            <div class="switch house-item" v-for="lamp in lamps">
                <span>
                    <i class="material-icons prefix">lightbulb_outline</i>
                    <span>{{ lamp.location }} {{ lamp.floor }}</span>
                </span>
                <label class="right">
                    <input type="checkbox" :checked="lamp.status" @click="updateStatusLamp(lamp)">
                    <span class="lever"></span>
                </label>
            </div>

			<div class="progress" v-show="loading">
				<div class="indeterminate"></div>
			</div>
		</div>
	</div> 
</template>

<script>
import { mapState } from 'vuex';
import { mapGetters } from 'vuex';
import { mapActions } from 'vuex';

export default {
	computed: {
		...mapState('lamps', [
		   'loading'
		]),

		...mapGetters('lamps', [
	        'lamps'
		])
	},

    methods: {
        ...mapActions('lamps', [
           'updateStatusLamp'
        ])
    },

	created() {
	    this.$store.dispatch('lamps/getAllLamps');
	}
}
</script>
