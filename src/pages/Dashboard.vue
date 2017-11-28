<template>
	<layout>
        <div class="col s12 m6 l3">
            <lamps></lamps>
        </div>

        <div class="col s12 m6 l3">
            <windows></windows>
        </div>

        <div class="col s12 m6 l3">

        </div>

        <div class="col s12 m6 l3">

        </div>

        <action-button></action-button>
	</layout>
</template>

<script>
    import Layout from '../layouts/main/Layout';
    import Lamps from '../components/Lamps';
    import Windows from '../components/Windows';
    import ActionButton from '../components/ActionButton';

    export default {
        components: { Lamps, Windows, ActionButton, Layout },
    }
</script>