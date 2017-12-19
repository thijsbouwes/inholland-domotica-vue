<template>
    <div>
        <p>Updated at: {{ house.updated_at }}</p>
        <p>Location at: AMS Vultr server</p>

        <div class="center-align">
            <img :src="houseImage" class="responsive-img" v-if="houseImage">
        </div>

        <div class="progress" v-show="loading">
            <div class="indeterminate"></div>
        </div>
    </div>
</template>

<script>
    import { mapGetters } from 'vuex';
    import { mapState } from 'vuex';

    export default {
        computed: {
            ...mapGetters('remoteHouse', [
                'house',
                'houseImage'
            ]),

            ...mapState('remoteHouse', [
                'loading'
            ])
        },

        methods: {

        }
    }
</script>

<style scoped>
    img {
        max-height: 450px;
    }
</style>