<template>
    <div class="fixed-action-btn">
        <a class="btn-floating btn-large">
            <i class="large material-icons">{{ icon }}</i>
        </a>
        <ul>
            <li><a class="btn-floating red"><i class="material-icons">insert_chart</i></a></li>
            <li><a class="btn-floating yellow darken-1"><i class="material-icons">format_quote</i></a></li>
            <li><a class="btn-floating green"><i class="material-icons">publish</i></a></li>
            <li><a class="btn-floating blue"><i class="material-icons">attach_file</i></a></li>
        </ul>

        <modal target_id="modalhouse"><remote-house></remote-house></modal>
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