<template>
    <div>
        <doughnut-personal-score ref="Doughnut" :data="stats"></doughnut-personal-score>

        <div class="progress" v-show="loading">
            <div class="indeterminate"></div>
        </div>
    </div>
</template>
<script>
    import { ENDPOINTS } from '../config/api';
    import DoughnutPersonalScore from './chart/Doughnut';

    export default {
        components: { DoughnutPersonalScore },

        data() {
            return {
                loading: false,

                stats: {
                    datasets:[{
                        data: [10, 10, 10, 10],
                        label: 'Dataset 1',
                        backgroundColor: [
                            '#ff6384',
                            '#36a2eb',
                            '#cc65fe',
                            '#ffce56'
                        ],
                    }],

                    labels: [
                        'Wins',
                        'Loses',
                        'Ties',
                        'Total games played'
                    ]
                }
            }
        },

        created() {
            this.$http.get(ENDPOINTS.GAME_USER_STATS)
                .then(response => {
                    delete response.data.user;

                    this.stats.datasets[0].data = Object.values(response.data);
                    // this.stats.labels = Object.keys(response.data);

                    this.$refs.Doughnut.update();
                    this.loading = false;
                })
                .catch(error => console.log(error));
        }
    }
</script>