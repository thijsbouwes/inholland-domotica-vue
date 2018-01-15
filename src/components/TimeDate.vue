<template>
    <div>
        <div class="card">
            <div class="card-content">
                <slot></slot>
                <div class="house-item center">
                    <i class="material-icons small">access_time</i>
                    <h5>{{ time }}</h5>
                </div>
                <div class="house-item center">
                    <i class="material-icons small">date_range</i>
                    <h6>{{ date }}</h6>
                </div>
            </div>
        </div>
    </div>
</template>

<script>
    import { ENDPOINTS } from '../config/api';
    import { mapState } from 'vuex';

    export default {
        data() {
            return {
                date: '',
                time: ''
            }
        },

        computed: {
            ...mapState([
                'time_format',
                'date_format'
            ]),
        },

        created() {
            this.refreshTime();
            setInterval(this.refreshTime, 1000);
        },

        methods: {
            refreshTime() {
                this.date = this.$moment().format(this.date_format);
                this.time = this.$moment().format(this.time_format);
            },
        }
    }
</script>