import { mapGetters } from 'vuex';

export default {
    computed: {
        ...mapGetters([
            'backgrounds'
        ]),

        randomBackground() {
            if (this.backgrounds.length > 0) {
                let background = this.backgrounds[Math.floor(Math.random()*this.backgrounds.length)];
                return "background-image: url(" + background['url'] + ");";
            }

            return '';
        }
    },

    created() {
        this.$store.dispatch('getAllBackgrounds');
    }
}