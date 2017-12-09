<template>
	<div>
		<div class="card">
		    <div class="card-content">
				<span class="card-title">Heater</span>

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
    import {ENDPOINTS} from "../config/api";

	export default {
	    data() {
	        return {
                loading: true,
	            heater: {},
			}
		},

        created() {
            axios.get(ENDPOINTS.HEATER)
                .then(response => {
                    this.heater = response.data;
                    this.loading = false;
                    this.createSlider();
                })
                .catch(error => console.log(error));
        },

        methods: {
            updateHeater() {
                // Update temperature, round and remove postfix deg
                this.heater.temperature = Math.round(this.heater_slider.noUiSlider.get().replace('&deg;', ''));

                axios.put(ENDPOINTS.HEATER_TEMPERATURE, { temperature: this.heater.temperature })
                    .then(response => {
                        this.heater = response.data;
                    })
                    .catch(error => console.log(error));
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
                this.heater_slider.noUiSlider.on('set', this.updateHeater);
			}
        }
	}
</script>