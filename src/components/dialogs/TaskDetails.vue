<template>
    <v-dialog max-width="1200px" v-model="dialog">
        <v-btn flat small slot="activator" class="pink--text">Details</v-btn>
        <v-card>
            <v-card-title>
                <h2>Task Details</h2>
            </v-card-title>
            <v-card-text>
                <v-form class="px-3" ref="form">
                    <v-text-field label="Title" v-model="title" prepend-icon="folder" :rules="inputRules"></v-text-field>
                    <v-textarea class="mb-5" rows="5" label="Description" v-model="content" prepend-icon="edit" :rules="inputRules"></v-textarea>
                    <v-select prepend-icon="assignment" v-model="status"
                        offset-y
                        :items="items"
                        label="Status"
                    ></v-select>
                    <br>
                    <v-btn flat class="blue--text" :loading="loading" @click="updateTask">
                        <v-icon left>save</v-icon>
                        <span>Save changes</span>
                    </v-btn>
                    <v-btn flat class="red--text" :loading="deleteLoading" @click="deleteTask">
                        <v-icon left>delete</v-icon>
                        <span>Delete project</span>
                    </v-btn>
                </v-form>
            </v-card-text>
        </v-card>
    </v-dialog>
</template>

<script>
import fb from '@/fb'
const db = fb.db;

export default {
    name: 'TaskDetails',
    props: [
        'task'
    ],
    data() {
        return {
            dialog: false,
            title: this.task.title,
            content: this.task.content,
            items: ['planned', 'ongoing', 'complete', 'overdue'],
            status: this.task.status,
            loading: false,
            deleteLoading: false,
            inputRules: [
                v => v.length >= 3 || 'Min 1 sign length'
            ]
        }
    },
    methods: {
        deleteTask(){
            this.deleteLoading = true;
            db.collection('tasks').doc(this.task.id).delete().then(() => {
                this.deleteLoading = false;
                this.dialog = false;
            })
        },
        updateTask(){
            this.loading = true;
            db.collection('tasks').doc(this.task.id).update({
                status: this.status,
                title: this.title,
                content: this.content
            }).then(() => {
                this.loading = false;
                this.dialog = false;
            })
        }
    }
}
</script>