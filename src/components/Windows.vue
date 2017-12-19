<template>
	<div class="card">
	    <div class="card-content">
			<span class="card-title">Windows</span>

			<div class="switch house-item" v-for="window in windows">
				<span>
					<i class="material-icons">border_all</i>
					<span>{{ window.location }} {{ window.floor }}</span>
				</span>
				<label class="right">
					<input type="checkbox" :checked="window.status" @click="updateStatus(window)">
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
            ...mapState('windows', [
                'loading'
            ]),

            ...mapGetters('windows', [
                'windows'
            ])
        },

        methods: {
            ...mapActions('windows', [
                'updateStatusWindow'
            ])
        },

	created() {
		this.$store.dispatch('windows/getAllWindows');
	}
}
</script>
