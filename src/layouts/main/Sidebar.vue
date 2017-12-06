<template>
    <ul id="slide-out" class="sidenav">
        <li>
            <div class="user-view">
                <div class="background">
                    <img :src="settings.background.url" :title="settings.background.name" width="100%">
                </div>

                <a href="#!user"><img class="circle" src="https://x1.xingassets.com/assets/frontend_minified/img/users/nobody_m.original.jpg"></a>
                <a href="#!name"><span class="white-text name" v-text="settings.user.name"></span></a>
                <a href="#!email"><span class="white-text email" v-text="settings.user.email"></span></a>
            </div>
        </li>

        <!--Page links-->
        <router-link tag="li" to="/" exact><a><i class="material-icons">dashboard</i>Dashboard</a></router-link>

        <!--Settings-->
        <li><div class="divider"></div></li>
        <li><a class="subheader">Settings</a></li>
        <li class="no-padding">
            <form method="post" class="form_user" @submit.prevent="doSubmit()">
                <ul class="collapsible">
                    <li>
                        <a class="collapsible-header"><i class="material-icons">face</i>User</a>
                        <div class="collapsible-body">
                            <div class="input-field">
                                <input id="name" type="text" class="validate" v-model="settings.user.name" required>
                                <label class="active" for="name">Naam</label>
                            </div>

                            <div class="input-field">
                                <input id="email" type="email" class="validate" v-model="settings.user.email" required disabled>
                                <label class="active" for="email">Email</label>
                            </div>

                            <div class="input-field">
                                <input id="location" type="text" class="validate" v-model="settings.user.location" required>
                                <label class="active" for="location">Locatie</label>
                            </div>
                        </div>
                    </li>
                    <li>
                        <a class="collapsible-header"><i class="material-icons">widgets</i>Widgets</a>
                        <div class="collapsible-body">
                            <div class="switch icon-before" v-for="(module, index) in enabled_modules">
                                <span>{{ index }}</span>
                                <label class="right">
                                    <input type="checkbox" :checked="module">
                                    <span class="lever"></span>
                                </label>
                            </div>
                        </div>
                    </li>
                    <li>
                        <a class="collapsible-header"><i class="material-icons">image</i>Background</a>
                        <div class="collapsible-body">
                            <div class="input-field">
                                <select class="icons" v-model="settings.background" required>
                                    <option value="" disabled selected>Choose your option</option>
                                    <option
                                            v-for="background in backgrounds"
                                            v-text="background.name"
                                            :value="background"
                                            :data-icon="background.url">
                                    </option>
                                </select>
                                <label>Selecteer background</label>
                            </div>
                        </div>
                    </li>
                </ul>

                <div class="center-align">
                    <button @click="openCollapsible" class="btn waves-effect waves-light" type="submit" name="action">Save
                        <i class="material-icons right">save</i>
                    </button>
                </div>
            </form>
        </li>

        <!--Logout-->
        <li><div class="divider"></div></li>
        <li>
            <a class="waves-effect" href="#" @click="logout"><i class="material-icons">exit_to_app</i>Logout</a>
        </li>
    </ul>
</template>

<script>
    import Auth from '../../service/auth-service';
    import {ENDPOINTS} from "../../config/api";

export default {
    created() {
        axios.get(ENDPOINTS.PROFILE_SETTINGS)
            .then(response => {
                this.settings = response.data;
            })
            .then(response => {
                M.updateTextFields();
            })
            .catch(error => console.log(error));

        axios.get(ENDPOINTS.BACKGROUND_ALL)
            .then(response => {
                this.backgrounds = response.data;
            })
            .then(response => {
                let elem_select = document.querySelector('select');
                new M.Select(elem_select);
            })
            .catch(error => console.log(error));
    },

    mounted() {
        let elem = document.querySelector('.sidenav');
        this.sidebar = new M.Sidenav(elem);

        let collapsibleElem = document.querySelector('.collapsible');
        this.collapsible = new M.Collapsible(collapsibleElem);
    },

    data() {
        return {
            settings: {
                background: {},
                user: {},
            },
            enabled_modules: {
                lamps: true,
                windows: true,
                heater: false,
                news_feed: true,
                time_date: false,
                weather: true
            },
            backgrounds: [],
        }
    },

    methods: {
        doSubmit() {
            M.toast({html: 'Saving profile', classes: 'green'});
            this.sidebar.close();
        },

        logout() {
            this.sidebar.close();
            Auth.logout();
            this.$router.push('/login');
        },

        openCollapsible() {
            this.collapsible.open(0);
        }
    },
}
</script>