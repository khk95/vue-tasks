<template>
    <v-dialog max-width="600px" v-model="dialog">
        <v-btn flat slot="activator" class="pink--text">
            <v-icon left>note_add</v-icon>
            <span>Add new task</span>
        </v-btn>
        <v-card>
            <v-card-title>
                <h2>Add a New Task</h2>
            </v-card-title>
            <v-card-text>
                <v-form class="px-3" ref="form">
                    <v-text-field label="Title" v-model="title" prepend-icon="folder" :rules="inputRules"></v-text-field>
                    <v-textarea label="Description" v-model="content" prepend-icon="edit" :rules="inputRules"></v-textarea>
                    <v-menu>
                        <v-text-field :value="formattedDate" slot="activator" label="Due date" prepend-icon="date-range" :rules="inputRules"></v-text-field>
                        <v-date-picker v-model="due"></v-date-picker>
                    </v-menu>
                    <v-spacer></v-spacer>
                    <v-btn flat class="pink white--text mx-0 mt-3" @click="submit" :loading="loading">Add project</v-btn>
                </v-form>
            </v-card-text>
        </v-card>
    </v-dialog>
</template>

<script>
import format from 'date-fns/format'
import fb from '@/fb'
const db = fb.db;

export default {
    props: ['id'],
    data() {
        return {
            title: '',
            content: '',
            due: null,
            inputRules: [
                v => !!v || 'Empty field'
            ],
            loading: false,
            dialog: false
        }
    },
    methods: {
        submit() {
            this.loading = true;
            if(this.$refs.form.validate()){
                const task = {
                    title: this.title,
                    content: this.content,
                    due: format(this.due, 'Do MMM YYYY'),
                    authorId: this.$store.state.user.uid,
                    authorName: this.$store.state.user.displayName,
                    projectId: this.id,
                    status: 'planned'
                }
                db.collection('tasks').add(task).then(() => {
                    this.loading = false;
                    this.dialog= false;
                    this.$emit('taskAdded');
                    this.$refs.form.reset();
                    this.$refs.form.validationReset();
                })
            }
        }
    },
    computed: {
        formattedDate() {
            return this.due ? format(this.due, 'Do MMM YYYY') : ''
        }
    }
}
</script>
