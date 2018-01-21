<template>
    <div>
        <h6 v-text="status_title"></h6>
        <doughnut-personal-score v-if="played_games" ref="Doughnut" :data="stats" :options="options"></doughnut-personal-score>
        <div v-else><p>Play a game first!</p></div>

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
                played_games: true,
                status_title: "",

                options: {
                    responsive: true,
                    legend: {
                        position: 'top',
                    },
                    animation: {
                        animateScale: true,
                        animateRotate: true
                    }
                },

                stats: {
                    datasets:[{
                        data: [10, 10, 10],
                        label: 'Dataset 1',
                        backgroundColor: [
                            '#ff6384',
                            '#36a2eb',
                            '#cc65fe'
                        ],
                    }],

                    labels: [
                        'Wins',
                        'Loses',
                        'Ties',
                    ]
                }
            }
        },

        created() {
            this.$http.get(ENDPOINTS.GAME_USER_STATS)
                .then(response => {
                    // see if you played games
                    if (response.data.total_games_played <= 0) {
                        this.played_games = false;
                    }

                    this.status_title = `${ response.data.user } played ${ response.data.total_games_played } rounds`;

                    // delete unnecessary data for pie
                    delete response.data.user;
                    delete response.data.total_games_played;

                    this.stats.datasets[0].data = Object.values(response.data);
                    // this.stats.labels = Object.keys(response.data);

                    this.$refs.Doughnut.update();
                    this.loading = false;
                })
                .catch(error => console.log(error));
        }
    }
</script>