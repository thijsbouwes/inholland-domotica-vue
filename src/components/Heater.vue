<template>
	<div>
		<div class="card">
		    <div class="card-content">
				<span class="card-title">Heater</span>

				<div class="switch house-item">
					<span>
						<i class="material-icons prefix">whatshot</i>
						<span>Temperatuur <span v-html="heater_temp"></span></span>
					</span>
					<div class="right heater" id="heater-slider"></div>
				</div>
			</div>
		</div> 
	</div>
</template>

<script>
	export default {
	    data() {
	        return {
                heater_temp: 20,
			}
		},

		methods: {
			updateHeater() {
			    this.heater_temp = this.heater_slider.noUiSlider.get();
			    console.log("hello" + this.heater_temp);
			}
		},

		mounted() {
	        // create slider
            this.heater_slider = document.getElementById('heater-slider');
            noUiSlider.create(this.heater_slider, {
                start: [this.heater_temp],
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

			// update heater after set
            this.heater_slider.noUiSlider.on('set', this.updateHeater);
        }
	}
</script>