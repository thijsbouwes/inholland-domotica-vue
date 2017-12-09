<template>
    <div>
        <div class="card">
            <div class="card-content">
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
    import {ENDPOINTS} from "../config/api";
    import moment from 'moment';

    export default {
        data() {
            return {
                date: '',
                time: '',
                dateFormat: 'DD-MM-YYYY',
                timeFormat: 'HH:mm:ss',
                timeZone: 'nl',
            }
        },

        created() {
            this.refreshTime();
            moment.locale(this.timeZone);
            setInterval(this.refreshTime, 1000);
        },

        methods: {
            refreshTime() {
                this.date = moment().format(this.dateFormat);
                this.time = moment().format(this.timeFormat);
            },
        }
    }
</script>