<template>
    <div>
        <table class="striped centered">
            <thead>
            <tr>
                <th>Name</th>
                <th>Wins</th>
                <th>Loses</th>
                <th>Ties</th>
                <th>Total</th>
            </tr>
            </thead>

            <tbody>
            <tr v-for="score in scores">
                <td v-text="score.user"></td>
                <td v-text="score.wins"></td>
                <td v-text="score.loses"></td>
                <td v-text="score.ties"></td>
                <td v-text="score.total_games_played"></td>
            </tr>
            </tbody>
        </table>

        <div class="progress" v-show="loading">
            <div class="indeterminate"></div>
        </div>
    </div>
</template>
<script>
    import { ENDPOINTS } from '../config/api';
    export default {
        data() {
            return {
                loading: false,
                scores: []
            }
        },

        created() {
            this.$http.get(ENDPOINTS.GAME_HIGHSCORE)
                .then(response => {
                    this.scores = response.data;
                    this.loading = false;
                })
                .catch(error => console.log(error));
        }
    }
</script>