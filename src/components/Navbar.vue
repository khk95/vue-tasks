<template>
    <nav>
        <v-snackbar v-model="snackbar" :timeout="3000" top color="success" class="mt-3">
            <span>New task added</span>
        </v-snackbar>

        <v-toolbar flat app>

            <v-toolbar-side-icon class="pink--text" v-on:click="drawer = !drawer"></v-toolbar-side-icon>
            <v-toolbar-title>
                <span class="font-weight-light">tasks</span>
                <span>KHK</span>
            </v-toolbar-title>
            <v-spacer></v-spacer>

            <v-menu offset-y>
                <v-btn flat slot="activator">
                    <v-icon left>expand_more</v-icon>
                    <span>Menu</span>
                </v-btn>
                <v-list>
                    <v-list-tile v-for="link in links" :key="link.text" router :to="link.route">
                        <v-list-tile-title>{{ link.text }}</v-list-tile-title>
                    </v-list-tile>
                </v-list>
            </v-menu>

            <v-btn flat @click="logout">
                <span>Sign out</span>
                <v-icon right>exit_to_app</v-icon>
            </v-btn>

        </v-toolbar>

        <v-navigation-drawer v-model="drawer" app class="grey lighten-3">
            <v-layout column align-center>
                <v-flex class="mt-5">
                    <p class="subheading mt-2 text-xs-center">{{ user.displayName }}</p>
                </v-flex>
            </v-layout>
            <v-list>
                <v-list-tile v-for="link in links" v-bind:key="link.text" router v-bind:to="link.route">
                    <v-list-tile-action>
                        <v-icon>{{link.icon}}</v-icon>
                    </v-list-tile-action>
                    <v-list-tile-content>
                        <v-list-tile-title>{{link.text}}</v-list-tile-title>
                    </v-list-tile-content>
                </v-list-tile>
            </v-list>
        </v-navigation-drawer>
    </nav>

</template>

<script>
import fb from '@/fb'
const auth = fb.auth;

export default {
    data() {
        return {
            drawer: false,
            links: [
                {
                    icon: 'dashboard',
                    text: 'Dashboard',
                    route: '/'
                },
                {
                    icon: 'folder',
                    text: 'Projects',
                    route: '/projects'
                },
                {
                    icon: 'assignment',
                    text: 'My tasks',
                    route: '/my-tasks'
                },
                {
                    icon: 'person',
                    text: 'Team',
                    route: '/team'
                }
            ],
            snackbar: false,
            user: null
        }
    },
    methods: {
        logout(){
            auth.signOut().then(() => {
                this.$router.replace('/login');
            })
        }
    },
    created(){
        this.user = this.$store.getters.getUser
    }
}
</script>