<template>
    <div class="card">
        <div class="card-tabs game">
            <div class="card-content">
                <slot></slot>
                <div id="game" class="game">
                    <div v-if="game_is_started">
                        <div class="players">
                            <span class="z-depth-2" :class="{ active: !opponent_turn}">{{ player_symbol(user.id) }} - {{ user.name }}</span>
                            <span class="z-depth-2" :class="{ active: opponent_turn}">{{ player_symbol(opponent.id) }} - {{ opponent.name }}</span>
                        </div>

                        <div class="status">
                            <span>{{ player_symbol(active_player.id) }} turn</span>
                        </div>

                        <div>
                            <svg class="gameboard">
                                <path class="line" d="M135,90L0,90"></path>
                                <path class="line" d="M135,90L270,90"></path>

                                <path class="line" d="M135,180L0,180"></path>
                                <path class="line" d="M135,180L270,180"></path>

                                <path class="line" d="M90,135L90,0"></path>
                                <path class="line" d="M90,135L90,270"></path>

                                <path class="line" d="M180,135L180,0"></path>
                                <path class="line" d="M180,135L180,270"></path>

                            </svg>
                        </div>
                        <div class="grid-tic">
                            <div class="cell"
                                 v-for="(cell, index) in cells"
                                 :key="index"
                                 :class="{ 'cell-set': cell }"
                                 @click="makeMove(index)"
                            >
                                <svg class="x" v-show="cell === 'X'" aria-label="X" role="img" viewBox="0 0 128 128">
                                    <path d="M16,16L112,112"></path>
                                    <path d="M112,16L16,112"></path>
                                </svg>
                                <svg class="o" v-show="cell === 'O'" aria-label="O" role="img" viewBox="0 0 128 128">
                                    <path d="M64,16A48,48 0 1,0 64,112A48,48 0 1,0 64,16"></path>
                                </svg>
                            </div>
                        </div>

                        <div class="status">
                            <a class="waves-effect waves-light btn-flat" @click="leaveLobby()">Leave<i class="material-icons right">close</i></a>
                        </div>
                    </div>

                    <div v-else-if="waiting_for_opponent">
                        <h5>Waiting for opponent</h5>
                        <div class="progress">
                            <div class="indeterminate"></div>
                        </div>
                        <div class="status">
                            <a class="waves-effect waves-light btn-flat" @click="leaveLobby()">Leave<i class="material-icons right">close</i></a>
                        </div>
                    </div>

                    <div v-else-if="waiting_for_invited_opponent">
                        <h5>Waiting for invited opponent</h5>
                        <div class="progress">
                            <div class="indeterminate"></div>
                        </div>
                        <div class="status">
                            <a class="waves-effect waves-light btn-flat" @click="leaveLobby()">Leave<i class="material-icons right">close</i></a>
                        </div>
                    </div>

                    <div v-else-if="game_is_finished">
                        <div class="players">
                            <span class="z-depth-2" :class="{ active: active_game.winner.id === user.id}">{{ player_symbol(user.id) }} - {{ user.name }}</span>
                            <span class="z-depth-2" :class="{ active: active_game.winner.id === opponent.id}">{{ player_symbol(opponent.id) }} - {{ opponent.name }}</span>
                        </div>
                        <div class="status">
                            <div v-if="active_game.winner.id === user.id">
                                <p>You are the winner!</p>
                            </div>
                            <div v-else-if="active_game.winner.id">
                                <p>{{ active_game.winner.name }} is the winner!</p>
                            </div>
                            <div v-else>
                                <p>Its a draw!</p>
                            </div>
                        </div>
                        <div class="status">
                            <a class="waves-effect waves-light btn-flat" @click="leaveGame()">Finish game<i class="material-icons left">check</i></a>
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
                    <table class="highlight centered">
                        <tbody>
                            <tr class="lobby_type" v-if="private_lobby_list.length > 0">
                                <th colspan="3">Private invites</th>
                            </tr>
                            <tr v-for="lobby in private_lobby_list" @click="joinLobby(lobby)">
                                <td v-text="lobby.user1.name"></td>
                                <td>{{ lobby.created_at | formatDate }}</td>
                            </tr>

                            <tr class="lobby_type">
                                <th colspan="3">Public lobby</th>
                            </tr>
                            <tr v-for="lobby in open_lobby_list" @click="joinLobby(lobby)">
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
                <li class="tab" :class="{ disabled: game_is_ready }"><a href="#join">Join</a></li>
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
                tabs: {},

                // create game
                public_lobby: true,
                player2_email: '',

                // game object
                game: {
                    invites: [],
                    lobby_list: [],
                    started: []
                },

                new_public_game: {},

                // game socket
                GAME_SOCKET: {},
                PUBLIC_GAMES: {},
                PRIVATE_USER: {},

                // stores the placement of X and O in cells by their cell number
                cells: ['', '', '', '', '', '', '', '', '']
            }
        },

        computed: {
            active_game() {
                if (this.game_is_ready) {
                    return this.game.started[0];
                }

                return {
                    status: null,
                    user1: {
                        id: null,
                        name: null
                    },
                    user2: {
                        id: null,
                        name: null
                    }
                }
            },

            game_is_ready() {
                return this.game.started[0] !== undefined;
            },

            game_is_started() {
                return this.active_game.status === GAME_STATUS.STARTED;
            },

            game_is_finished() {
                return this.active_game.status === GAME_STATUS.FINISHED;
            },

            waiting_for_opponent() {
                return this.active_game.status === GAME_STATUS.WAITING_RANDOM_PLAYER_JOIN;
            },

            waiting_for_invited_opponent() {
                return this.active_game.status === GAME_STATUS.WAITING_INVITED_PLAYER_JOIN;
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
                // started player starts
                let last_move_user = this.started_player.user_id;

                if (this.active_game.moves.length > 0) {
                    // get last move user_id
                    last_move_user = this.active_game.moves.slice().pop().user_id;
                }

                if (this.active_game.user1.id !== last_move_user) {
                    return this.active_game.user1;
                } else {
                    return this.active_game.user2;
                }
            },

            opponent_turn() {
                return this.active_player === this.opponent;
            },

            ...mapGetters({
                user: 'profile/user',
            })
        },

        watch: {
            game: {
                handler() {
                    if (this.game_is_ready === false) {
                        return;
                    }

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

                // private lobby add email
                if (! this.public_lobby) {
                    data = { player2_email: this.player2_email };
                }

                data.socket_id = this.$socket.connection.socket_id;

                this.$http.post(ENDPOINTS.GAME_CREATE, data)
                    .then(response => {
                        if (this.public_lobby) {
                            this.startGame(response.data, GAME_STATUS.WAITING_RANDOM_PLAYER_JOIN);
                        } else {
                            this.startGame(response.data, GAME_STATUS.WAITING_INVITED_PLAYER_JOIN);
                        }
                        this.setupSocket();
                    });
            },

            joinLobby(lobby) {
                let socket_id = this.$socket.connection.socket_id;

                // make sure cells are empty
                this.cells.fill('');
                console.log(this.cells);

                this.$http.put(ENDPOINTS.GAME_JOIN, { id: lobby.id, socket_id })
                    .then(response => {
                        this.startGame(response.data, GAME_STATUS.STARTED);
                        this.setupSocket();
                        this.tabs.select('game');
                    });
            },

            leaveLobby() {
                let socket_id = this.$socket.connection.socket_id;
                this.$http.put(ENDPOINTS.GAME_LEAVE, { id: this.active_game.id, socket_id })
                    .then(response => {
                        this.leaveGame();
                    });
            },

            leaveGame() {
                this.GAME_SOCKET.unsubscribe();
                this.GAME_SOCKET.unbind();

                let index = this.game.started.indexOf(this.active_game);
                this.game.started.splice(index, 1);
            },

            startGame(lobby, status) {
                this.game.started.push(lobby);
                lobby.status = status;
            },

            makeMove(index) {
                if (this.opponent_turn) {
                    return;
                }

                let socket_id = this.$socket.connection.socket_id;

                this.$http.post(ENDPOINTS.GAME_MOVE_CREATE, { game_id: this.active_game.id, position: index, socket_id })
                    .then(response => {
                        this.applyMove(response.data);
                    });
            },

            applyMove(data) {
                // push move to current game
                this.active_game.moves.push(data.moves.pop());

                // update the winner
                this.active_game.winner = data.winner;

                // update game status
                this.active_game.status = data.status;
            },

            player_symbol(player_id) {
                // check if user1 is logged in user
                if (this.active_game.user1.id === player_id) {
                    return 'X';
                } else {
                    return 'O';
                }
            },

            setupSocket() {
                if (this.game_is_ready === false) {
                    return;
                }

                this.GAME_SOCKET = this.$socket.subscribe(CHANNELS.PRIVATE_GAME_CHANNELNAME + this.active_game.id);

                this.GAME_SOCKET.bind('game_join', data => {
                    console.log("Someone joined the game!");
                    this.active_game.status = data.status;
                    this.active_game.user2 = data.user2;
                });


                this.GAME_SOCKET.bind('game_leave', data => {
                    console.log("Some leaved the game");

                    this.leaveGame();

                    this.$M.toast({ html:
                        `<span>${ this.opponent.name } leaved the game</span>`
                    });
                });

                this.GAME_SOCKET.bind('create_move', data => {
                    console.log("Something moved");
                    this.applyMove(data);
                });

            },

            sayHello() {
                console.log("hello");
            }
        },

        created() {
            // listen for new games
            this.PUBLIC_GAMES = this.$socket.subscribe(CHANNELS.PUBLIC_GAMES);

            this.PUBLIC_GAMES.bind('game_created', data => {
                // push new game to lobby list
                this.game.lobby_list.unshift(data);

                if (this.game_is_started === true) {
                    return;
                }

                this.$M.toast({ html:
                    `<span>New public game, created by ${ data.user1.name }</span>`
                });
            });

            // fetch game status
            this.$http(ENDPOINTS.GAME)
                .then(response => {
                    this.game = response.data;

                    this.setupSocket();
                    this.loading = false;
                });
        },

        destroyed() {
            this.PUBLIC_GAMES.unbind();
            // this.PRIVATE_USER.unbind();

            if (Object.keys(this.GAME_SOCKET).length > 0) {
                this.GAME_SOCKET.unbind();
            }
        },

        mounted() {
            let elem = document.querySelector('.game .tabs');
            this.tabs = new this.$M.Tabs(elem);
        }
    }
</script>
