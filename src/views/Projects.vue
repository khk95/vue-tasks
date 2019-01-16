<template>
  <div class="projects">
    <h1 class="subheading">Projects</h1>
    <v-container class="my-5">
      <v-layout row class="mb-3">
        <Popup/>
      </v-layout>
      <v-layout row wrap>
        <v-flex xs12 sm6 md4 lg3 v-for="project in projects" v-bind:key="project.title">
          <v-card flat class="text-xs-center ma-3">
            <v-card-text>
              <div class="subheading">{{ project.title }}</div>
              <div class="grey--text">{{ project.description }}</div>
            </v-card-text>
            <v-card-actions>
              <ProjectDetails :project="project" :projectId="project.id"/>
            </v-card-actions>
          </v-card>
        </v-flex>
      </v-layout>
    </v-container>
  </div>
</template>

<script>
import Popup from '../components/Popup';
import ProjectDetails from '../components/dialogs/ProjectDetails';
import fb from '@/fb'
const db = fb.db;

export default {
  components: {
    Popup,
    ProjectDetails
  },
  data() {
    return {
      projects: []
    }
  },
  created() {
      db.collection('projects').onSnapshot(res => {
        const changes = res.docChanges();

        changes.forEach(change => {
          if (change.type === 'added') {
            this.projects.push({
              ...change.doc.data(),
              id: change.doc.id
            })
          } else if (change.type == 'removed'){
              this.projects = this.projects.filter(project => {
                  return project.id != change.doc.id;
              })
            }
        })
      })
    }
}
</script>
