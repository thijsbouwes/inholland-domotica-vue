<template>
	<div>
        <div class="col s12 m6 l3">
            <lamps></lamps>
        </div>

        <div class="col s12 m6 l3">
            <windows></windows>
        </div>

        <div class="col s12 m6 l3">are</div>

        <div class="col s12 m6 l3">
            <a class="waves-effect waves-light btn"><i class="material-icons left">cloud</i>button</a>
        </div>

        <action-button></action-button>
	</div>
</template>

<script>
    import Lamps from '../components/Lamps';
    import Windows from '../components/Windows';
    import ActionButton from '../components/ActionButton';

    export default {
        components: { Lamps, Windows, ActionButton },
    }
</script>