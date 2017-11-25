<template>
	<div>
        <div class="col s12 m6 l3">
            <lamps></lamps>
        </div>

        <div class="col s12 m6 l3">
            <windows></windows>
        </div>

        <div class="col s12 m6 l3">

        </div>

        <div class="col s12 m6 l3">
            <div class="input-field col s12">
                <input id="name" type="text" class="validate" required>
                <label class="" for="name">Naam</label>
            </div>
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