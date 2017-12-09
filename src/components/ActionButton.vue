<template>
    <div class="fixed-action-btn">
        <a class="btn-floating btn-large">
            <i class="large material-icons">{{ icon }}</i>
        </a>
    </div>
</template>

<script>
    export default {
        data() {
            return {
                edit_mode: false,
                icon: "mode_edit"
            }
        },

        methods: {
            toggleEdit() {
                this.edit_mode = true;
                this.icon = "save";
            }
        }
    }
</script>