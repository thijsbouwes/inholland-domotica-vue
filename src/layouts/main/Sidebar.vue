<template>
    <ul id="slide-out" class="sidenav">
        <li>
            <div class="user-view">
                <div class="background">
                    <img :src="settings.background">
                </div>

                <a href="#!user"><img class="circle" :src="settings.user.avatar"></a>
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
            <form action="post" @submit.prevent="doSubmit()">
                <ul class="collapsible collapsible-accordion">
                    <li>
                        <a class="collapsible-header"><i class="material-icons">face</i>User</a>
                        <div class="collapsible-body">
                            <div class="input-field">
                                <input id="name" type="text" class="validate" v-model="settings.user.name" required>
                                <label class="active" for="name">Naam</label>
                            </div>

                            <div class="input-field">
                                <input id="email" type="email" class="validate" v-model="settings.user.email" required>
                                <label class="active" for="email">Email</label>
                            </div>

                            <div class="input-field">
                                <input id="location" type="text" class="validate" v-model="settings.user.location">
                                <label class="active" for="location">Locatie</label>
                            </div>
                        </div>
                    </li>
                    <li>
                        <a class="collapsible-header"><i class="material-icons">widgets</i>Widgets</a>
                        <div class="collapsible-body">
                            <div class="switch icon-before" v-for="(module, index) in settings.enabled_modules">
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
                                <select class="icons" v-model="settings.background">
                                    <option value="" disabled selected>Choose your option</option>
                                    <option
                                            v-for="background in this.backgrounds"
                                            v-text="background.name"
                                            :value="background.url"
                                            :data-icon="background.url">
                                    </option>
                                </select>
                                <label>Selecteer background</label>
                            </div>
                        </div>
                    </li>
                </ul>
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
        axios.get(ENDPOINTS.PROFILE)
            .then(response => {
                this.settings.user.name = response.data.name;
                this.settings.user.email = response.data.email;
            })
            .catch(error => console.log(error));
    },

    mounted() {
        let options = {
            onCloseStart() {

            }
        };

        let elem_select = document.querySelector('select');
        let instance = new M.Select(elem_select);

        let elem = document.querySelector('.sidenav');
        this.sidebar = new M.Sidenav(elem, options);

         let collapsibleElem = document.querySelector('.collapsible');
         var collapsibleInstance = new M.Collapsible(collapsibleElem, {});
    },

    data() {
        return {
            settings: {
                background: "https://images.unsplash.com/photo-1458682625221-3a45f8a844c7?auto=format&fit=crop&w=1267&q=60&ixid=dW5zcGxhc2guY29tOzs7Ozs%3D",
                user: {
                    name: "",
                    email: "",
                    location: "",
                    avatar: "http://materializecss.com/images/yuna.jpg"
                },
                enabled_modules: {
                    lamps: true,
                    windows: true,
                    heater: false,
                    news_feed: true,
                    time_date: false,
                    weather: true
                }
            },
            backgrounds: [
                {
                    name: "Option 1",
                    url: "https://images.unsplash.com/photo-1458682625221-3a45f8a844c7?auto=format&fit=crop&w=1267&q=60&ixid=dW5zcGxhc2guY29tOzs7Ozs%3D"
                },
                {
                    name: "Option 2",
                    url: "https://images.unsplash.com/photo-1507561942779-d2a26d42d51f?auto=format&fit=crop&w=1350&q=60&ixid=dW5zcGxhc2guY29tOzs7Ozs%3D"
                },
                {
                    name: "Option 3",
                    url: "https://images.unsplash.com/photo-1491592382973-75316efb392c?auto=format&fit=crop&w=1266&q=60&ixid=dW5zcGxhc2guY29tOzs7Ozs%3D"
                }
            ],
            profile_saved: false,
        }
    },

    methods: {
        doSubmit() {
            M.toast({html: 'I am a toast!', classes: 'green darken-1'});
            this.sidebar.close();
        },

        logout() {
            Auth.logout();
            this.sidebar.close();
            this.$router.push('/login');
        }
    }
}
</script>