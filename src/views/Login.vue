<template>
    <v-card flat max-width="400px" class="ma-auto mt-5">
        <v-form class="pa-3">
            <v-text-field label="Email" prepend-icon="email" v-model="email"></v-text-field>
            <v-text-field label="Password" hint="At least 8 characters" v-model="password" prepend-icon="lock" :rules="inputRules" min="8" :append-icon="e1 ? 'visibility_off' : 'visibility'" :append-icon-cb="() => (e1 = !e1)" :type="e1 ? 'text' : 'password'" required></v-text-field>
            <v-btn flat class="pink white--text" :loading="loading" @click="login">Sign in</v-btn>
        </v-form>
    </v-card>
</template>

<script>
import fb from '@/fb'
const auth = fb.auth;

export default {
    data() {
        return {
            email: '',
            password: '',
            loading: false
        }
    },
    methods: {
        login(){
            this.loading = true;
            auth.signInWithEmailAndPassword(this.email, this.password).then(() => {
                this.loading = false;
                this.$router.replace('/');
            })
        }
    }
}
</script>