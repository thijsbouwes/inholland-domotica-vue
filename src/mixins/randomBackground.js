import { mapGetters } from 'vuex';

export default {
    computed: {
        ...mapGetters({
            backgrounds: 'backgrounds/backgrounds'
        }),

        randomBackground() {
            if (this.backgrounds.length > 0) {
                // remove No background
                let backgrounds = this.backgrounds.filter(background => background.id !== 1);

                let background = backgrounds[Math.floor(Math.random() * backgrounds.length)];
                return `background-image: url(${ background.url });`;
            }

            return '';
        }
    },

    created() {
        this.$store.dispatch('backgrounds/getAllBackgrounds');
    }
}