<template>
    <div>
        <table class="striped centered">
            <thead>
            <tr>
                <th>Name</th>
                <th>Tegenstander</th>
                <th>Gewonnen</th>
            </tr>
            </thead>

            <tbody>
                <tr v-for="score in scores">
                    <td v-text="score.name"></td>
                    <td v-text="score.opponent"></td>
                    <td v-html="wonOrLost(score.won)"></td>
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
                scores: [
                    {
                        name: "Alvin",
                        opponent: "Jonathan",
                        won: false,
                    },
                    {
                        name: "Alvin",
                        opponent: "Henk",
                        won: true,
                    },
                    {
                        name: "Alvin",
                        opponent: "Joop",
                        won: false,
                    }
                ]
            }
        },

        created() {
            this.$http.get(ENDPOINTS.GAME_USER_STATS)
                .then(response => {
                    console.log(response.data);
                    this.loading = false;
                })
                .catch(error => console.log(error));
        },

        methods: {
            wonOrLost(won) {
                if (won) {
                    return '<i class="material-icons">check</i>'
                }

                return '<i class="material-icons">clear</i>'
            }
        }
    }
</script>