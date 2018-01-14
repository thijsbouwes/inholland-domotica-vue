import { PUSHER_CONFIG } from "../config/pusher";
import Pusher from 'pusher-js';

//Pusher.logToConsole = true;

const socket = new Pusher(PUSHER_CONFIG.APP_KEY, {
    cluster: PUSHER_CONFIG.APP_CLUSTER,
    encrypted: PUSHER_CONFIG.ENCRYPTED
});

export default socket;