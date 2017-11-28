<template>
    <div>
        <navigation></navigation>
        <section class="mainContent">
            </slot>
        </section>
    </div>
</template>

<script>
    import Navigation from './Navigation';

    export default {
        components: {Navigation}
    }
</script>