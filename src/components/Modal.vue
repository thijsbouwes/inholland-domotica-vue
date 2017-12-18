<template>
    <div :id="target_id" class="modal modal-fixed-footer">
        <div class="modal-content">
            <slot>Default content</slot>
        </div>
        <div class="modal-footer">
            <a href="#!" class="modal-action modal-close waves-effect btn-flat">Close</a>
        </div>
    </div>
</template>

<script>
    export default {
        props: {
            target_id: {
                required: true,
                type: String
            }
        },

        mounted() {
            let elem = document.querySelector('.modal');
            let instance = new this.$M.Modal(elem);
        }
    }
</script>