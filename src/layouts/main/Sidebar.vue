<template>
    <div>
        <ul id="slide-out" class="sidenav">
            <li>
                <div class="user-view">
                    <div class="background">
                        <img v-if="user_background.url" :src="user_background.url" :title="user_background.name" width="100%">
                    </div>

                    <a href="#!user"><img class="circle" v-if="user_image" :src="user_image"></a>
                    <a href="#!name"><span class="white-text name" v-text="user_name"></span></a>
                    <a href="#!email"><span class="white-text email" v-text="user_email"></span></a>
                </div>
            </li>

            <!--Page links-->
            <router-link tag="li" to="/" exact><a class="sidenav-close"><i class="material-icons">dashboard</i>Dashboard</a></router-link>
            <router-link tag="li" to="/news" exact><a class="sidenav-close"><i class="material-icons">import_contacts</i>News</a></router-link>

            <router-link v-if="user.is_admin" tag="li" to="/users" exact><a class="sidenav-close"><i class="material-icons">supervisor_account</i>Users</a></router-link>

            <li><div class="divider"></div></li>
            <li><a class="subheader">Settings</a></li>

            <!--Settings-->
            <li class="no-padding">
                <form method="post" class="form_user" @submit.prevent="doSubmit()" autocomplete="off">
                    <ul class="collapsible">
                        <li>
                            <a class="collapsible-header"><i class="material-icons">face</i>User</a>
                            <div class="collapsible-body">
                                <div class="input-field">
                                    <input id="name" type="text" class="validate" v-model="user_name" required>
                                    <label class="active" for="name">Naam</label>
                                </div>

                                <div class="input-field">
                                    <input id="email" type="email" class="validate" :value="user_email" required disabled>
                                    <label class="active" for="email">Email</label>
                                </div>

                                <div class="file-field input-field">
                                    <div class="btn">
                                        <span>Image</span>
                                        <input type="file" accept="image/*" @change="uploadImage">
                                    </div>
                                    <div class="file-path-wrapper">
                                        <input class="file-path validate" type="text">
                                    </div>
                                </div>
                            </div>
                        </li>

                        <li>
                            <a class="collapsible-header"><i class="material-icons">widgets</i>Widgets</a>
                            <div class="collapsible-body">
                                <div class="switch icon-before" v-for="(widget, index) in widgets">
                                    <span>{{ widget.name }}</span>
                                    <label class="right">
                                        <input type="checkbox" :checked="widget.enabled" @change="updateWidget(widget)">
                                        <span class="lever"></span>
                                    </label>
                                </div>
                            </div>
                        </li>

                        <li>
                            <a class="collapsible-header"><i class="material-icons">image</i>Background</a>
                            <div class="collapsible-body">
                                <div class="input-field">
                                    <select class="icons" v-model="user_background" required>
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
                                <div class="chip" v-for="(bookmark, index) in bookmarks">
                                    <img :src="`https://s2.googleusercontent.com/s2/favicons?domain_url=${bookmark.name}`" alt="Contact Person">
                                    {{ bookmark.name }}
                                    <i class="close material-icons" @click="deleteBookmark(bookmark)">close</i>
                                </div>
                                <div class="input-field">
                                    <input id="bookmark" type="url" class="validate" v-model="bookmark_url" @keydown.enter.prevent="createNewBookmark()">
                                    <label class="active" for="bookmark">Bookmark</label>
                                    <span class="helper-text" data-error="Enter a full url" data-success="Url is correct">Enter a valid url https://example.nl</span>
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
        <span class="demo" v-if="demo"><h2 class="demo-text"></h2></span>
    </div>
    </template>

<script>
    import { mapGetters } from 'vuex';
    import { mapActions } from 'vuex';
    import { mapMutations } from 'vuex';
    import { mapState } from 'vuex';
    import * as types from '../../store/mutation-types';
    import Auth from '../../service/auth-service';
    import { ENDPOINTS } from "../../config/api";
    import { DEMO_STATUS } from "../../config/demo";
    import Typed from 'typed.js';
    import moment from 'moment';

export default {
    data() {
        return {
            // demo: true,
        }
    },

    computed: {
        demo() {
            if (this.user.created_at) {
                // if account is less then a minute old
                return moment(this.user.created_at).add(1, 'minutes') > moment();
            }

            return false;
        },

        bookmark_url: {
            get() {
                return this.$store.state.bookmarks.bookmark_url;
            },
            set(value) {
                this.$store.commit('bookmarks/SET_NEW_BOOKMARK', value);
            }
        },

        user_image: {
            get() {
                return this.$store.state.profile.all.user_image;
            },
            set(value) {
                this.$store.dispatch('profile/saveImage', value);
            }
        },

        user_name: {
            get() {
                return this.user.name;
            },
            set(value) {
                this.$store.commit('profile/SET_NAME', value);
                this.$store.commit('profile/DATA_CHANGED');
            }
        },

        user_email() {
            return this.user.email;
        },

        user_background: {
            get() {
                return this.background;
            },
            set(value) {
                this.$store.commit('profile/SET_BACKGROUND', value);
                this.$store.commit('profile/DATA_CHANGED');
            }
        },

        ...mapState({
            changed: state => state.profile.changed
        }),

        ...mapGetters({
            user: 'profile/user',
            background: 'profile/background',
            widgets: 'widgets/widgets',
            bookmarks: 'bookmarks/bookmarks',
            backgrounds: 'backgrounds/backgrounds'
        })
    },

    created() {
        this.$store.dispatch('profile/loadProfile')
            .then(() => {
                // Update text fields
                M.updateTextFields();

                if (this.demo) {
                    this.runDemo();
                }
            });

        this.$store.dispatch('backgrounds/getAllBackgrounds')
            .then(() => {
                // Create select
                let elem_select = document.querySelector('select');
                new this.$M.Select(elem_select);
            });

        this.$store.dispatch('bookmarks/getAllBookmarks');
    },

    mounted() {
        // Create sidenav
        let elem = document.querySelector('.sidenav');
        let ref = this;

        let options = {
            onCloseStart: () => {
                this.doSubmit();
            }
        };
        this.sidebar = new M.Sidenav(elem, options);

        // Create collaps
        let collapsibleElem = document.querySelector('.collapsible');
        this.collapsible = new M.Collapsible(collapsibleElem);
    },

    methods: {
        uploadImage(event) {
            let files = event.target.files || event.dataTransfer.files;
            if (!files.length) {
                return;
            }

            this.user_image = files[0];
        },

        doSubmit() {
            if (this.changed) {
                this.$store.dispatch('profile/updateProfile')
                    .then(() => {
                        M.toast({html: '<i class="material-icons">check_circle</i> saving profile', classes: 'green'});
                    })
                    .catch(() => {
                        M.toast({html: '<i class="material-icons">error</i> error saving profile', classes: 'red'});
                    });
            }
        },

        logout() {
            this.sidebar.close();
            Auth.logout();
            this.$router.push('/login');
        },

        interactWithApp(pos) {
            switch(pos){
                case DEMO_STATUS.OPEN_SIDEBAR:
                    this.sidebar.open();
                    break;
                case DEMO_STATUS.ENABLE_WIDGETS:
                    this.collapsible.open(1);
                    this.updateWidget(this.widgets.find(widget => widget.component_name === "windows"));
                    this.updateWidget(this.widgets.find(widget => widget.component_name === "time-date"));
                    this.updateWidget(this.widgets.find(widget => widget.component_name === "weather"));
                    this.updateWidget(this.widgets.find(widget => widget.component_name === "lamps"));
                    break;
                case DEMO_STATUS.SETUP_BACKGROUND:
                    this.user_background = this.backgrounds.find(background => background.id === 2);
                    break;
                case DEMO_STATUS.CLOSE_SIDEBAR:
                    this.sidebar.close();
                    break;
            }
        },

        runDemo() {
            let options = {
                strings: [
                    `${this.user.name} welcome to Home comfort 👋`,
                    "Let me show you around",
                    "In the sidebar, you can mange everything",
                    "Lets enable some widgets",
                    "Setup your background here",
                    `Enjoy your dashboard ${this.user.name} 👍`
                ],
                typeSpeed: 75,
                showCursor: false,
                onStringTyped: (arrayPos, self) => {
                    this.interactWithApp(arrayPos);
                },
                onComplete: () => {
                    // this.demo = false;
                }
            };

            let typed = new Typed(".demo-text", options);
        },

        ...mapActions({
            deleteBookmark: 'bookmarks/deleteBookmark',
            createNewBookmark: 'bookmarks/createNewBookmark',
            updateWidget: 'widgets/toggleWidget'
        })
    },
}
</script>