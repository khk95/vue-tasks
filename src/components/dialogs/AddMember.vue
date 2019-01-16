<template>
    <v-dialog max-width="400px" v-model="dialog">
        <v-btn small flat color="pink" slot='activator'>
            <v-icon left small>person_add</v-icon>
            <span class="caption text-lowercase">add new member</span>
        </v-btn>
        <v-card>
            <v-card-title>
                <h2>Add member</h2>
            </v-card-title>
            <v-card-text>
                <v-form class="px-3" ref="form">
                    <v-text-field label="Name" v-model="name" prepend-icon="person" :rules="inputRules" required></v-text-field>
                    <v-text-field label="Email" v-model="email" prepend-icon="contact_mail" :rules="inputRules" required></v-text-field>
                    <v-text-field label="Password" hint="At least 8 characters" v-model="password" prepend-icon="lock" :rules="inputRules" min="8" :append-icon="e1 ? 'visibility_off' : 'visibility'" :append-icon-cb="() => (e1 = !e1)" :type="e1 ? 'text' : 'password'" required></v-text-field>
                    <v-select
                        offset-y
                        prepend-icon="share"
                        :items="roles"
                        v-model="role"
                        label="Select"
                        single-line
                        :rules="inputRules"
                        required
                    ></v-select>
                    <v-btn flat class="pink white--text mt-3" :loading="loading" @click="registerMember">Add member</v-btn>
                </v-form>
            </v-card-text>
        </v-card>
    </v-dialog>
</template>

<script>
import fb from '@/fb'
const auth = fb.auth;
const db = fb.db;

export default {
    data() {
        return {
            name: '',
            role: '',
            email: '',
            password: '',
            dialog: false,
            inputRules: [
                v => (v && v.length) > 0 || 'Min 1 sign'
            ],
            e1: false,
            roles: [
                'Developer',
                'Designer',
                'Account Manager'
            ],
            loading: false,
            currentUser: null
        }
    },
    methods: {
        registerMember(){
            var newUserUid;
            var prevUser = this.currentUser;
            var prevUserCred;
            if (this.$refs.form.validate()){
                this.loading = true;
                auth.createUserWithEmailAndPassword(this.email, this.password).then(credentials => {
                    console.log(credentials);
                    credentials.user.updateProfile({displayName: this.name});
                    newUserUid = credentials.user.uid;
                }).then(() => {
                    console.log('created user...');
                    db.collection('users').add({
                        name: this.name,
                        email: this.email,
                        role: this.role,
                        password: this.password,
                        uid: newUserUid
                    })
                }).then(() => {
                    console.log('created user profile in collection');
                    auth.signOut();
                }).then(() => {
                    console.log('signed out new user');
                    console.log('prevuser: ', prevUser)
                    prevUserCred = db.collection('users').where('uid', '==', prevUser.uid).get().then(data => {
                        console.log('data: ', data.data());
                    });
                }).then(() => {
                    console.log('received prev user');
                    console.log(prevUserCred);
                    auth.signInWithEmailAndPassword(prevUserCred.email, prevUserCred.password);
                }).then(() => {
                    console.log('sign in as prev user :)');
                    this.$refs.form.reset();                
                    this.loading = false;
                    this.dialog = false;
                }).catch((err) => {
                    throw err
                })
            }
        }
    },
    created(){
        this.currentUser = this.$store.state.user
    }
}
</script>
