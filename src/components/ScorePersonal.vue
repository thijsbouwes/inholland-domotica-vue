<template>
    <div>
        <doughnut-personal-score v-if="played_games" ref="Doughnut" :data="stats"></doughnut-personal-score>
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
                        'Total played games'
                    ]
                }
            }
        },

        created() {
            this.$http.get(ENDPOINTS.GAME_USER_STATS)
                .then(response => {
                    delete response.data.user;

                    // see if you played games
                    if (response.data.total_games_played <= 0) {
                        this.played_games = false;
                    }

                    this.stats.datasets[0].data = Object.values(response.data);
                    // this.stats.labels = Object.keys(response.data);

                    this.$refs.Doughnut.update();
                    this.loading = false;
                })
                .catch(error => console.log(error));
        }
    }
</script>