import {BACKGROUNDS} from '../config/background';

export default {
    data() {
        return {
            backgrounds: [],
        }
    },

    created() {
        this.backgrounds = BACKGROUNDS;
    },

    computed: {
        randomBackground() {
            let background = this.backgrounds[Math.floor(Math.random()*this.backgrounds.length)];
            return "background-image: url(" + background['url'] + ");";
        }
    }
}