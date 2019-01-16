<template>
    <v-dialog max-width="1200px" v-model="dialog">
        <v-btn flat small slot="activator" class="pink--text">Details</v-btn>
        <v-card>
            <v-card-title>
                <h2>Project Details</h2>
            </v-card-title>
            <v-card-text>
                <v-form class="px-3" ref="form">
                    <v-text-field label="Title" v-model="title" prepend-icon="folder" :rules="inputRules"></v-text-field>
                    <v-textarea class="mb-5" rows="1" label="Description" v-model="content" prepend-icon="edit" :rules="inputRules"></v-textarea>
                    <div class="my-4">
                        <h2>Tasks</h2>
                        <v-card flat class="lighten-4" v-for="task in computedTasks" v-bind:key="task.id">
                            <v-layout align-center row wrap v-bind:class="`pa-3 project ${ task.status }`">
                                <v-flex xs12 md1>
                                    <v-chip v-bind:class="`${ task.status } white--text caption my-2`">{{ task.status }}</v-chip>
                                </v-flex>
                                <v-flex xs12 md4>
                                    <div>{{task.title}}</div>
                                </v-flex>
                                <v-flex xs6 sm4 md2>
                                    <div class="caption grey--text">by {{task.authorName}}</div>
                                </v-flex>
                                <v-flex xs6 sm4 md3>
                                    <div class="caption grey--text">due by {{task.due}}</div>
                                </v-flex>
                                <v-flex class="text-xs-right" xs6 sm4 md2>
                                    <TaskDetails :task="task"/>
                                </v-flex>
                            </v-layout>
                            <v-divider></v-divider>
                        </v-card>
                    </div>
                    <br>
                    <AddTask :id="id"/>
                    <v-btn flat class="blue--text" :loading="loading">
                        <v-icon left>save</v-icon>
                        <span>Save changes</span>
                    </v-btn>
                    <v-btn flat class="red--text" :loading="deleteLoading" @click="deleteProject">
                        <v-icon left>delete</v-icon>
                        <span>Delete project</span>
                    </v-btn>
                </v-form>
            </v-card-text>
        </v-card>
    </v-dialog>
</template>

<script>
import TaskDetails from './TaskDetails';
import AddTask from './AddTask';
import fb from '@/fb';
const db = fb.db;

export default {
    components: {
        AddTask,
        TaskDetails
    },
    name: 'ProjectDetails',
    props: ['project', 'projectId'],
    data() {
        return {
            loading: false,
            title: this.project.title,
            content: this.project.description,
            id: this.project.id,
            inputRules: [
                v => v.length >= 3 || 'Min 1 sign length'
            ],
            dialog: false,
            tasks: [],
            deleteLoading: false
        }
    },
    methods: {
        deleteProject(){
            this.deleteLoading = true;
            db.collection('projects').doc(this.id).delete().then(() => {
                this.deleteLoading = false;
                this.dialog = false;
            })
        }
    },
    computed: {
        computedTasks(){
            return this.tasks;
        }
    },
    created(){
        db.collection('tasks').where('projectId', '==', this.id).onSnapshot(res => {
            const changes = res.docChanges();

            changes.forEach(change => {
                if(change.type == 'added'){
                    this.tasks.push({
                        ...change.doc.data(),
                        id: change.doc.id    
                    })
                } else if (change.type == 'removed'){
                    this.tasks = this.tasks.filter(task => {
                        return task.id != change.doc.id;
                    })
                } else if (change.type == 'modified'){
                    var index = this.tasks.findIndex(task => task.id == change.doc.id);
                    this.tasks[index] = change.doc.data();
                    this.tasks[index].id = change.doc.id;
                }
            })
        })
    }
}
</script>

<style scoped>

  .project.complete{
    border-left: 4px solid yellowgreen;
  }
  .project.ongoing{
    border-left: 4px solid royalblue;
  }
  .project.overdue{
    border-left: 4px solid crimson;
  }
  .project.planned{
    border-left: 4px solid goldenrod;
  }
  .v-chip.planned{
    background: goldenrod;
  }
  .v-chip.complete{
    background: yellowgreen;
  }
  .v-chip.ongoing{
    background: royalblue;
  }
  .v-chip.overdue{
    background: crimson;
  }

</style>