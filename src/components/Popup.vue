<template>
    <v-dialog max-width="600px" v-model="dialog">
        <v-btn flat small slot="activator" class="pink--text">
            <v-icon left>note_add</v-icon>
            <span class="caption text-lowercase">Add new project</span>
        </v-btn>
        <v-card>
            <v-card-title>
                <h2>Add a New Project</h2>
            </v-card-title>
            <v-card-text>
                <v-form class="px-3" ref="form">
                    <v-text-field label="Title" v-model="title" prepend-icon="folder" :rules="inputRules"></v-text-field>
                    <v-textarea label="Description" v-model="content" prepend-icon="edit" :rules="inputRules"></v-textarea>
                    <v-spacer></v-spacer>
                    <v-btn flat class="pink white--text mx-0 mt-3" @click="submit" :loading="loading">Add project</v-btn>
                </v-form>
            </v-card-text>
        </v-card>
    </v-dialog>
</template>

<script>
import fb from '@/fb'
const db = fb.db;

export default {
    name: 'Popup',
    data() {
        return {
            title: '',
            content: '',
            inputRules: [
                v => !!v || 'Min 1 sign length'
            ],
            loading: false,
            dialog: false,
            user: null
        }
    },
    methods: {
        submit() {
            if(this.$refs.form.validate()){
                this.loading = true;
                const project = {
                    title: this.title,
                    description: this.content,
                    author: this.user.uid
                }
                db.collection('projects').add(project).then(() => {
                    this.loading = false;
                    this.dialog= false;
                    this.$emit('taskAdded');
                    this.$refs.form.reset();
                })
            }
        }
    },
    created(){
        this.user = this.$store.getters.getUser;
    }
}
</script>
