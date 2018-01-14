<template>
    <div class="card">
        <div class="card-tabs game">
            <div class="card-content">
                <span class="card-title">Tic Tac Toe</span>

                <div id="game" class="game">
                    <div v-if="game_is_ready">
                        <div>Playing against {{ opponent.name }}, ({{ player_symbol(opponent.id) }})</div>
                        <div>Game created {{ active_game.created_at | formatDate }}</div>
                        <div v-if="active_player_turn">{{ active_player.name }}'s turn,</div>
                        <div v-else>Your turn!</div>
                        <div>Total moves: {{ moves }}</div>

                        <div class="grid-tic">
                            <div class="cell"
                                 v-for="(cell, index) in cells"
                                 :key="index"
                                 :class="{ 'cell-set': cell }"
                                 @click="makeMove(index)"
                            ><span>{{ cell }}</span></div>
                        </div>
                    </div>

                    <div v-else-if="waiting_for_opponent">
                        <p>Waiting for opponent</p>
                        <div class="progress">
                            <div class="indeterminate"></div>
                        </div>
                    </div>

                    <div v-else-if="waiting_for_invited_opponent">
                        <p>Waiting for invited opponent</p>
                        <div class="progress">
                            <div class="indeterminate"></div>
                        </div>
                    </div>

                    <div v-else>
                        <form method="post" class="form_user" @submit.prevent="createLobby()" autocomplete="off">
                            <p>
                                <label>
                                    <input type="checkbox" class="filled-in" checked="checked" v-model="public_lobby">
                                    <span>Create public lobby</span>
                                </label>
                            </p>
                            <div class="input-field" v-if="! public_lobby">
                                <input id="email" type="email" class="validate" required v-model="player2_email">
                                <label class="active" for="email">Opponent email</label>
                            </div>
                            <div class="center-align">
                                <button class="btn waves-effect waves-light" type="submit" name="action">Create
                                    <i class="material-icons right">add</i>
                                </button>
                            </div>
                        </form>
                    </div>
                </div>

                <div id="join">
                    <table class="responsive-table highlight centered">
                        <thead>
                        <tr>
                            <th>Name</th>
                            <th>Created</th>
                        </tr>
                        </thead>
                        <tbody>
                            <tr>
                                <th colspan="3">Public lobby</th>
                            </tr>
                            <tr v-for="lobby in open_lobby_list" @click="joinGame(lobby)">
                                <td v-text="lobby.name"></td>
                                <td>{{ lobby.created_at | formatDate }}</td>
                            </tr>

                            <tr>
                                <th colspan="3">Private invites</th>
                            </tr>
                            <tr v-for="lobby in private_lobby_list" @click="joinGame(lobby)">
                                <td v-text="lobby.user1.name"></td>
                                <td>{{ lobby.created_at | formatDate }}</td>
                            </tr>
                        </tbody>
                    </table>
                </div>
            </div>

            <div class="progress" v-show="loading">
                <div class="indeterminate"></div>
            </div>

            <ul class="tabs tabs-fixed-width">
                <li class="tab"><a class="active" href="#game">Game</a></li>
                <li class="tab"><a href="#join">Join</a></li>
            </ul>
        </div>
    </div>
</template>

<script>
    import { mapGetters } from 'vuex';
    import ScorePersonal from './ScorePersonal';
    import ScoreTop from './ScoreTop';
    import { ENDPOINTS } from '../config/api';
    import { GAME_STATUS } from '../config/game';
    import { CHANNELS } from "../config/game";

    export default {
        components: { ScorePersonal, ScoreTop },

        data() {
            return {
                loading: true,

                // create game
                public_lobby: true,
                player2_email: '',

                // game object
                game: {
                    invites: [],
                    lobby_list: [],
                    started: []
                },

                // stores the placement of X and O in cells by their cell number
                cells: ['', '', '', '', '', '', '', '', '']
            }
        },

        computed: {
            active_game() {
                return this.game.started[0];
            },

            game_is_ready() {
                return this.game.started[0] !== undefined;
            },

            waiting_for_opponent() {
                return this.game_is_ready && this.active_game.status === GAME_STATUS.WAITING_RANDOM_PLAYER_JOIN;
            },

            waiting_for_invited_opponent() {
                return this.game_is_ready && this.active_game.status === GAME_STATUS.WAITING_INVITED_PLAYER_JOIN;
            },

            open_lobby_list() {
                return this.game.lobby_list.filter(lobby => lobby.status === GAME_STATUS.WAITING_RANDOM_PLAYER_JOIN);
            },

            private_lobby_list() {
                return this.game.invites.filter(invite => invite.status === GAME_STATUS.WAITING_INVITED_PLAYER_JOIN);
            },

            started_player() {
                // check if user1 is logged in user
                return this.active_game.user1.id === this.user.id;
            },

            opponent() {
                if (this.started_player === false) {
                    return this.active_game.user1;
                } else {
                    return this.active_game.user2;
                }
            },

            active_player() {
                let last_move_user = this.active_game.moves.slice().pop().user_id;

                if (this.active_game.user1.id !== last_move_user) {
                    return this.active_game.user1;
                } else {
                    return this.active_game.user2;
                }
            },

            active_player_turn() {
                return this.active_player === this.opponent;
            },

            moves() {
                return this.active_game.moves.length;
            },

            ...mapGetters({
                user: 'profile/user',
            })
        },

        watch: {
            game: {
                handler() {
                    // update view with new moves
                    this.active_game.moves.map(move => {
                        // Sets either X or O in the clicked cell of the cells array
                        this.$set(this.cells, move.position, this.player_symbol(move.user_id));
                    });
                },
                deep: true
            }
        },

        methods: {
            createLobby() {
                let data = {};
                if (! this.public_lobby) {
                    data = { player2_email: this.player2_email };
                }

                this.$http.post(ENDPOINTS.GAME_CREATE, data)
                    .then(response => {
                        this.startGame(response.data);
                        console.log(response.data);
                    });
            },

            joinLobby(lobby) {
                this.$http.put(ENDPOINTS.GAME_JOIN, { id: lobby.id })
                    .then(response => {
                        this.startGame(response.data);
                        console.log(response.data);
                    });
            },

            startGame(lobby) {
                this.game.started.push(lobby);
            },

            makeMove(index) {
                this.$http.post(ENDPOINTS.GAME_MOVE_CREATE, { game_id: this.active_game.id, position: index })
                    .then(response => {
                        // push move to current game
                        this.active_game.moves.push(response.data);
                    });
            },

            player_symbol(player_id) {
                // check if user1 is logged in user
                if (this.active_game.user1.id === player_id) {
                    return 'X';
                } else {
                    return 'O';
                }
            },
        },

        created() {
            // listen for new games
            let PUBLIC_GAMES = this.$socket.subscribe(CHANNELS.PUBLIC_GAMES);

            PUBLIC_GAMES.bind('game_created', data => {
                if (this.game_is_ready === false) {
                    this.$M.toast({ html: `<span>New public game, created by ${data.user1.name}</span>` + '<button onclick="' + this.joinLobby( data ) + '" class="btn-flat toast-action">Join</button>' });
                }
            });

            // fetch game status
            this.$http(ENDPOINTS.GAME)
                .then(response => {
                    this.game = response.data;

                    this.loading = false;
                });
        },

        mounted() {
            let elem = document.querySelector('.game .tabs');
            let instance = new this.$M.Tabs(elem);
        }
    }
</script>
