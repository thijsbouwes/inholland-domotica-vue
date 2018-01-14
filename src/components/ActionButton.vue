<template>
    <div>
        <div class="fixed-action-btn">
            <a class="btn-floating btn-large">
                <i class="large material-icons">menu</i>
            </a>
            <ul>
                <li><a @click="getRemoteHouse" class="btn-floating green modal-trigger" href="#remote"><i class="material-icons">settings_remote</i></a></li>
                <li><router-link class="btn-floating red" to="/news" exact><i class="material-icons">import_contacts</i></router-link></li>
                <li><router-link class="btn-floating blue" v-show="is_admin" to="/users" exact><i class="material-icons">supervisor_account</i></router-link></li>
            </ul>
        </div>

        <modal target_id="remote"><remote-house></remote-house></modal>
    </div>
</template>

<script>
    import { mapActions } from 'vuex';
    import { mapGetters } from 'vuex';
    import Modal from '../components/Modal';
    import RemoteHouse from '../components/RemoteHouse';

    export default {
        components: { Modal, RemoteHouse },

        mounted() {
            let elem = document.querySelector('.fixed-action-btn');
            let options = { direction: 'top', hoverEnabled: true, toolbarEnabled: false };
            let instance = new this.$M.FloatingActionButton(elem, options);
        },

        computed: {
            ...mapGetters({
                is_admin: 'profile/is_admin'
            })
        },

        methods: {
            ...mapActions('remoteHouse', [
                'getRemoteHouse'
            ])
        }
    }
</script>