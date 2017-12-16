<template>
    <div>
        <p>Updated at: {{ base64_updated_at }}</p>
        <p>Location at: AMS Vultr server</p>
        <div class="center-align">
            <img :src="base64" class="responsive-img" v-if="base64">
        </div>

        <div class="progress" v-show="loading">
            <div class="indeterminate"></div>
        </div>
    </div>
</template>

<script>
    import {ENDPOINTS} from '../config/api';

    export default {
        data() {
            return {
                loading: true,
                base64: "",
                base64_updated_at: ""
            }
        },

        created() {
            this.getRemote();

            Event.$on("reload_state_house", (data) => this.getRemote());
        },

        methods: {
            getRemote() {
                console.log("hello 1");
                this.loading = true;

                axios.get(ENDPOINTS.HOUSE_REMOTE)
                    .then(response => {
                        this.base64 = "data:image/png;base64," + response.data.image;
                        this.base64_updated_at = response.data.updated_at;
                        this.loading = false;
                    })
                    .catch(error => {
                        console.log(error);
                    });
            }
        }
    }
</script>