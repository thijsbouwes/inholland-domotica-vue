<template>
	<layout>
        <div class="row">
            <div class="col s12 m6 l3">
                <lamps></lamps>
            </div>

            <div class="col s12 m6 l3">
                <windows></windows>
            </div>

            <div class="col s12 m6 l3">
                <heater></heater>
            </div>

            <div class="col s6 m6 l3 x3">
                <time-date></time-date>
            </div>
        </div>

        <div class="row">
            <div class="col s12 m6 l3">

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
    import {ENDPOINTS} from '../config/api';

    export default {
        components: { Lamps, Windows, ActionButton, Layout, Heater, TimeDate },
    }
</script>