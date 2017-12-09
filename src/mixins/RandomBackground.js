import {ENDPOINTS} from '../config/api';

export default {
    data() {
        return {
            backgrounds: [],
        }
    },

    computed: {
        randomBackground() {
            if (this.backgrounds.length > 0) {
                let background = this.backgrounds[Math.floor(Math.random()*this.backgrounds.length)];
                return "background-image: url(" + background['url'] + ");";
            }

            return "";
        }
    },

    created() {
        axios.get(ENDPOINTS.BACKGROUND_ALL)
            .then(response => {
                this.backgrounds = response.data;
            });
    }
}