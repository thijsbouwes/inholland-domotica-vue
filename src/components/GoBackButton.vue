<template>
    <div>
        <div class="fixed-action-btn">
            <a class="btn-floating btn-large">
                <router-link tag="a" to="/" exact><i class="large material-icons">arrow_back</i></router-link>
            </a>
        </div>
    </div>
</template>

<script>
    import Modal from '../components/Modal';
    import RemoteHouse from '../components/RemoteHouse';

    export default {
        data() {
            return {
            }
        },

        mounted() {
            let elem = document.querySelector('.fixed-action-btn');
            let options = { direction: 'top', hoverEnabled: true, toolbarEnabled: false, position: 'left' };
            let instance = new this.$M.FloatingActionButton(elem, options);
        }
    }
</script>