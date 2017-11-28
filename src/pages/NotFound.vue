<template>
    <external-layout>
        <div class="banner full-height center-panel" :style="randomBackground">
            <div class="card-panel center-align">
                <h4>404</h4>
                <span>Sorry, we didn't find your page :(</span>
            </div>
        </div>
    </external-layout>
</template>

<script>
    import ExternalLayout from '../layouts/external/Layout';
    import RandomBackground from '../mixins/RandomBackground';

    export default {
        components: { ExternalLayout },
        mixins: [RandomBackground],
    }
</script>