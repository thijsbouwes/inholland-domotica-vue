<template>
    <ul id="slide-out" class="sidenav">
        <li>
            <div class="user-view">
                <div class="background">
                    <img :src="settings.background.url" :title="settings.background.name" width="100%">
                </div>

                <a href="#!user"><img class="circle" src="/static/users/nobody.jpg"></a>
                <a href="#!name"><span class="white-text name" v-text="settings.user.name"></span></a>
                <a href="#!email"><span class="white-text email" v-text="settings.user.email"></span></a>
            </div>
        </li>

        <!--Page links-->
        <router-link tag="li" to="/" exact><a class="sidenav-close"><i class="material-icons">dashboard</i>Dashboard</a></router-link>
        <router-link tag="li" to="/news" exact><a class="sidenav-close"><i class="material-icons">import_contacts</i>News</a></router-link>

        <li><div class="divider"></div></li>
        <li><a class="subheader">Settings</a></li>

        <!--Settings-->
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
                        </div>
                    </li>
                    <li>
                        <a class="collapsible-header"><i class="material-icons">widgets</i>Widgets</a>
                        <div class="collapsible-body">
                            <div class="switch icon-before" v-for="(module, index) in enabled_modules">
                                <span>{{ module.name }}</span>
                                <label class="right">
                                    <input type="checkbox" :checked="module.enabled" @change="updateModule(index, module, $event)">
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
                    <li>
                        <a class="collapsible-header"><i class="material-icons">bookmark</i>Bookmarks</a>
                        <div class="collapsible-body">
                            <div class="chips">
                                <input class="custom-class">
                            </div>
                        </div>
                    </li>
                </ul>

                <div class="center-align">
                    <button class="btn waves-effect waves-light" type="submit" name="action">Save
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
    data() {
        return {
            bookmark_url: "",
            settings: {
                background: {},
                user: {},
            },
            enabled_modules: [
                {
                    id: 1,
                    name: "Window",
                    column: "B",
                    component_name: "windows",
                    enabled: true
                },
                {
                    id: 2,
                    name: "Lamp",
                    column: "A",
                    component_name: "lamps",
                    enabled: true
                },
                {
                    id: 3,
                    name: "Time & Date",
                    column: "A",
                    component_name: "time-date",
                    enabled: false
                },
                {
                    id: 4,
                    name: "Weather",
                    component_name: "weather",
                    column: "B",
                    enabled: true
                },
                {
                    id: 5,
                    name: "Heater",
                    column: "A",
                    component_name: "heater",
                    enabled: true
                }
            ],
            backgrounds: [],
            bookmarks: [{ tag: "Google.nl" }]
        }
    },

    created() {
        axios.get(ENDPOINTS.PROFILE_SETTINGS)
            .then(response => {
                this.settings = response.data;
            })
            .then(response => {
                M.updateTextFields();
            });

        axios.get(ENDPOINTS.BACKGROUND_ALL)
            .then(response => {
                this.backgrounds = response.data;
            })
            .then(response => {
                let elem_select = document.querySelector('select');
                new M.Select(elem_select);
            });
    },

    mounted() {
        // Create sidenav
        let elem = document.querySelector('.sidenav');
        this.sidebar = new M.Sidenav(elem);

        // Create dropdown
        let collapsibleElem = document.querySelector('.collapsible');
        this.collapsible = new M.Collapsible(collapsibleElem);

        // Create chips
        let chipsElem = document.querySelector('.chips');
        let chipsOption = {
            placeholder: 'Enter a website',
            secondaryPlaceholder: '+Website',
            data: this.bookmarks
        };
        this.chipBookmarks = new M.Chips(chipsElem, chipsOption);
    },

    methods: {
        doSubmit() {
            let data = { name: this.settings.user.name, background_id: this.settings.background.id };

            axios.put(ENDPOINTS.PROFILE, data)
                .then(response => {
                    M.toast({html: '<i class="material-icons">check_circle</i> saving profile', classes: 'green'});
                })
                .catch(error => {
                    M.toast({html: '<i class="material-icons">error</i> error saving profile', classes: 'red'});
                });

            this.sidebar.close();
        },

        logout() {
            this.sidebar.close();
            Auth.logout();
            this.$router.push('/login');
        },

        updateModule(index, module, event) {
            this.enabled_modules[index].enabled = event.target.checked;
            Event.$emit('enabled_modules_update', { id: module.id, enabled: event.target.checked });
        }
    },
}
</script>