<template>
    <div>
        <navigation></navigation>
        <section class="externalContent">
            <slot></slot>
        </section>
    </div>
</template>

<script>
    import Navigation from './Navigation';

    export default {
        components: {Navigation}
    }
</script>