<template>
    <div>
        <div class="fixed-action-btn">
            <a class="btn-floating btn-large">
                <i class="large material-icons">menu</i>
            </a>
            <ul>
                <li><a class="btn-floating green modal-trigger" href="#remote"><i class="material-icons">settings_remote</i></a></li>
                <li><a class="btn-floating blue"><i class="material-icons">dashboard</i></a></li>
                <li><a class="btn-floating red"><router-link tag="a" to="/news" exact><i class="material-icons">import_contacts</i></router-link></a></li>
            </ul>
        </div>

        <modal target_id="remote"><remote-house></remote-house></modal>
    </div>
</template>

<script>
    import Modal from '../components/Modal';
    import RemoteHouse from '../components/RemoteHouse';

    export default {
        components: { Modal, RemoteHouse },

        data() {
            return {
            }
        },

        mounted() {
            let elem = document.querySelector('.fixed-action-btn');
            let options = { direction: 'top', hoverEnabled: true, toolbarEnabled: false };
            let instance = new M.FloatingActionButton(elem, options);
        }
    }
</script>