<template>
    <div>
        <navigation></navigation>
        <sidebar></sidebar>
        <section class="mainContent">
            </slot>
        </section>
    </div>
</template>

<script>
    import Navigation from './Navigation';
    import Sidebar from './Sidebar';

    export default {
        components: {Navigation, Sidebar}
    }
</script>