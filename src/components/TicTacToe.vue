<template>
    <div class="card">
        <div class="card-tabs game">
            <div class="card-content">
                <span class="card-title">Tic Tac Toe</span>

                <div id="local" class="game">
                    <div :class="game_status_color" v-text="status_message"></div>
                    <div :class="game_status_color">Total moves: {{ moves }}</div>
                    <div>Wins X: {{ wins.X }}</div>
                    <div>Wins O: {{ wins.O }}</div>

                    <div class="grid-tic">
                        <div class="cell"
                             v-for="(cell, index) in cells"
                             :key="index"
                             :class="{ 'cell-set': cell }"
                             @click="makeMove(index)"
                        ><span>{{ cell }}</span></div>
                    </div>

                </div>
                <div id="online">

                </div>
            </div>

            <ul class="tabs tabs-fixed-width">
                <li class="tab"><a class="active" href="#local">Local</a></li>
                <li class="tab"><a href="#online">Online</a></li>
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

        data() {
            return {
                matches: 0,
                wins: {
                    O: 0,
                    X: 0
                },
                // can be O or X
                active_player: 'O',

                // maintains the status of the game: turn or win or draw
                status: 'turn',

                // status color is used as background color in the status bar
                // it can hold the name of either of the following CSS classes
                // statusTurn (default) is yellow for a turn
                // statusWin is green for a win
                // statusDraw is purple for a draw
                game_status_color: 'status turn',

                // no. of moves played by both players in a single game (max = 9)
                moves: 0,

                // stores the placement of X and O in cells by their cell number
                cells: ['', '', '', '', '', '', '', '', ''],

                // contains all (8) possible winning conditions
                win_conditions: [
                    [0, 1, 2], [3, 4, 5], [6, 7, 8], // rows
                    [0, 3, 6], [1, 4, 7], [2, 5, 8], // columns
                    [0, 4, 8], [0, 4, 8]             // diagonals
                ],
            }
        },

        computed: {
            // helper property to get the non-active player
            non_active_player () {
                if (this.active_player === 'O') {
                    return 'X'
                }
                return 'O'
            },

            status_message() {
                switch(this.status) {
                    case 'win':
                        return `${this.active_player} wins`;
                    case 'draw':
                        return 'Draw !';
                    default:
                        return `${this.active_player}'s turn`
                }
            }
        },


        methods: {
            makeMove(index) {
                if (this.cells[index] !== "") {
                    return;
                }

                // Sets either X or O in the clicked cell of the cells array
                this.$set(this.cells, index, this.active_player);

                // Increments the number of moves
                this.moves++;

                // Stores the game status by calling the changeGameStatus method
                this.status = this.changeGameStatus();

                // Switch active player
                this.active_player = this.non_active_player;
            },

            // compares 3 cell values based on the cells in the condition
            checkForWin () {
                this.win_conditions.forEach(condition => {
                    let cells = this.cells;

                    console.log(cells[condition[0]]);
                    console.log(cells[condition[1]]);
                    console.log(cells[condition[2]]);

                    if (this.areEqual(cells[condition[0]], cells[condition[1]], cells[condition[2]])) {
                        return true
                    }
                });
            },

            // loops through each value and compares them with an empty sting and for inequality
            areEqual () {
                let len = arguments.length;

                for (let i = 1; i < len; i++){
                    if (arguments[i] === '' || arguments[i] !== arguments[i-1])
                        return false;
                }
                return true;
            },

            changeGameStatus () {
                if (this.checkForWin()) {
                    return 'win';
                } else if (this.moves === 9) {
                    return 'draw';
                }

                return 'turn';
            }
        },

        mounted() {
            let elem = document.querySelector('.game .tabs');
            let instance = new M.Tabs(elem);
        }
    }
</script>
