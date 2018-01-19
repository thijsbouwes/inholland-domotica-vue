import { PUSHER_CONFIG } from "../config/pusher";
import { CHANNELS } from "../config/game";
import Pusher from 'pusher-js';
import request from "./request";
import {ENDPOINTS} from "../config/api";

//Pusher.logToConsole = true;

const socket = new Pusher(PUSHER_CONFIG.APP_KEY, {
    cluster: PUSHER_CONFIG.APP_CLUSTER,
    encrypted: PUSHER_CONFIG.ENCRYPTED,

    authorizer: (channel, options) => {
        console.log(channel.name);

        // auth private channel
        if (channel.name.includes(CHANNELS.PRIVATE_GAME_CHANNELNAME)) {
            console.log("game auth");
            let game_id = channel.name.split("-").pop();

            return {
                authorize: (socketId, callback) => {
                    request.post(ENDPOINTS.PUSHER_AUTH, { socket_id: socketId, game_id } )
                        .then(response => {
                            callback(false, JSON.parse(response.data));
                        });
                }
            }
        }

        // auth private user
        if (channel.name.includes(CHANNELS.PRIVATE_USER)) {
            console.log("user auth");
            return {
                authorize: (socketId, callback) => {
                    request.post(ENDPOINTS.PUSHER_USER_AUTH, { socket_id: socketId } )
                        .then(response => {
                            callback(false, JSON.parse(response.data));
                        });
                }
            }
        } else {
            console.log("fail");
        }
    },
});

export default socket;