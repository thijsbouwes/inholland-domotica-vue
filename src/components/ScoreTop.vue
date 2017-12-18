<template>
    <div>
        <table class="striped centered">
            <thead>
            <tr>
                <th>Name</th>
                <th>Gewonnen</th>
                <th>Verloren</th>
            </tr>
            </thead>

            <tbody>
            <tr v-for="score in scores">
                <td v-text="score.name"></td>
                <td v-text="score.won"></td>
                <td v-html="score.lost"></td>
            </tr>
            </tbody>
        </table>

        <div class="progress" v-show="loading">
            <div class="indeterminate"></div>
        </div>
    </div>
</template>
<script>
    export default {
        data() {
            return {
                loading: false,
                scores: [
                    {
                        name: "Alvin",
                        won: 14,
                        lost: 2
                    },
                    {
                        name: "Hendrik",
                        won: 5,
                        lost: 1
                    },
                    {
                        name: "Pietjan",
                        won: 9,
                        lost: 5
                    }
                ]
            }
        },

        created() {
            // this.$http.get(ENDPOINTS.LAMPS)
            //     .then(response => {
            //         this.lamps = response.data;
            //         this.loading = false;
            //     })
            //     .catch(error => console.log(error));
        }
    }
</script>