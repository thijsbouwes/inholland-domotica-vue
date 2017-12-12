<template>
	<layout>
        <div class="row">
            <div class="col s12 m6 l3">
                <lamps v-if="enabled_modules.lamps"></lamps>
            </div>

            <div class="col s12 m6 l3">
                <windows v-if="enabled_modules.windows"></windows>
            </div>

            <div class="col s12 m6 l3">
                <heater v-if="enabled_modules.heater"></heater>
            </div>

            <div class="col s6 m6 l3 x3">
                <time-date v-if="enabled_modules.time_date"></time-date>
            </div>
        </div>

        <div class="row">
            <div class="col s12 m6 l4">
                <weather v-if="enabled_modules.weather"></weather>
            </div>

            <div class="col s12 m6 l3">

            </div>

            <div class="col s12 m6 l3">

            </div>

            <div class="col s12 m6 l3">

            </div>
        </div>

        <action-button></action-button>

	</layout>
</template>

<script>
    import Layout from '../layouts/main/Layout';
    import Lamps from '../components/Lamps';
    import Windows from '../components/Windows';
    import Heater from '../components/Heater';
    import ActionButton from '../components/ActionButton';
    import TimeDate from '../components/TimeDate';
    import Weather from '../components/Weather';
    import {ENDPOINTS} from '../config/api';

    export default {
        components: { Lamps, Windows, ActionButton, Layout, Heater, TimeDate, Weather },

        data() {
            return {
                enabled_modules: {
                    lamps: false,
                    windows: false,
                    heater: false,
                    news_feed: false,
                    time_date: false,
                    weather: false
                },
            }
        },

        created() {
            Event.$on('enabled_modules_update', (data) => {
                this.enabled_modules = data;
            });
        }
    }
</script>