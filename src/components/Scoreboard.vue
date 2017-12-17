<template>
    <div class="card">
        <div class="card-tabs score">
            <div class="card-content">
                <span class="card-title">Scoreboard</span>

                <div id="personal">
                    <score-personal></score-personal>
                </div>
                <div id="top">
                    <score-top></score-top>
                </div>
            </div>

            <ul class="tabs tabs-fixed-width">
                <li class="tab"><a class="active" href="#personal">Personal</a></li>
                <li class="tab"><a href="#top">Top 3</a></li>
            </ul>
        </div>
    </div>
</template>

<script>
    import ScorePersonal from "./ScorePersonal";
    import ScoreTop from "./ScoreTop";
    import {ENDPOINTS} from "../config/api";

    export default {
        components: { ScorePersonal, ScoreTop },

        mounted() {
            let elem = document.querySelector('.score .tabs');
            let instance = new M.Tabs(elem);
        }
    }
</script>
