<template>
	<div>
		<div class="card">
		    <div class="card-content">
				<span class="card-title">Heater</span>
				<slot></slot>
				<div class="switch house-item" v-show="!loading">
					<span>
						<i class="material-icons prefix">whatshot</i>
						<span>Temperatuur {{ heater.temperature }}&deg;</span>
					</span>
					<div class="right heater" id="heater-slider"></div>
				</div>

				<div class="progress" v-show="loading">
					<div class="indeterminate"></div>
				</div>
			</div>
		</div> 
	</div>
</template>

<script>
    import { mapState } from 'vuex';
    import { mapGetters } from 'vuex';
    import { mapActions } from 'vuex';
    import noUiSlider from 'materialize-css/extras/noUiSlider/nouislider';

	export default {
	    data() {
	        return {
                heater_slider: {}
            }
        },

	    computed: {
            ...mapState('heater', [
                'loading'
            ]),

            ...mapGetters('heater', [
                'heater'
            ]),
		},

        created() {
            this.$store.dispatch('heater/getHeater')
				.then(() => {
                   this.createSlider();
				});
        },

        methods: {
	        updateTemperatureFromSlider() {
                let slider_state = this.heater_slider.noUiSlider.get();

                if (slider_state === false) {
                    return;
                }

                // Round and remove postfix deg
                let temperature =  Math.round(slider_state.replace('&deg;', ''));

                this.$store.dispatch('heater/updateHeater', temperature)
            },

			createSlider() {
                // create slider
                this.heater_slider = document.getElementById('heater-slider');

                noUiSlider.create(this.heater_slider, {
                    start: [this.heater.temperature],
                    connect: [true, false],
                    step: 1,
                    orientation: 'horizontal',
                    range: {
                        'min': 12,
                        'max': 35
                    },
                    format: wNumb({
                        decimals: 0,
                        postfix: '&deg;'
                    })
                });

                // Update temperature after set
                this.heater_slider.noUiSlider.on('set', this.updateTemperatureFromSlider);
			}
        }
	}
</script>