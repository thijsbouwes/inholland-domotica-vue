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

            <div class="col s12 m6 l3">
                <a class="waves-effect waves-light btn modal-trigger" href="#remote">Modal</a>
                <modal target_id="remote"><remote-house></remote-house></modal>
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
    import RemoteHouse from '../components/RemoteHouse';
    import Modal from '../components/Modal';
    import {ENDPOINTS} from '../config/api';

    export default {
        components: { Lamps, Windows, ActionButton, Layout, Heater, Modal, RemoteHouse },
    }
</script>