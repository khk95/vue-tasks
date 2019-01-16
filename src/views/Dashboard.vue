<template>
  <div class="dashboard">
    <h1 class="subheading">Dashboard</h1>
    <v-container class="my-5">
      <v-layout row class="mb-3">
        <v-tooltip top>
          <v-btn small flat color="grey" @click="sortBy('title')" slot="activator">
            <v-icon left small>folder</v-icon>
            <span class="caption text-lowercase">by task name</span>
          </v-btn>
          <span>sort by task name</span>
        </v-tooltip>
        <v-tooltip top>
          <v-btn small flat color="grey" @click="sortBy('person')" slot="activator">
            <v-icon left small>person</v-icon>
            <span class="caption text-lowercase">by member</span>
          </v-btn>
          <span>sort by team member</span>
        </v-tooltip>
      </v-layout>
      <v-card flat v-for="project in projects" v-bind:key="project.title">
        <v-layout row wrap v-bind:class="`pa-3 project ${ project.status }`">
          <v-flex xs12 md6>
            <div class="caption grey--text">Title</div>
            <div>{{ project.title }}</div>
          </v-flex>
          <v-flex xs6 sm4 md2>
            <div class="caption grey--text">Members</div>
            <div>{{ project.person }}</div>
          </v-flex>
          <v-flex xs6 sm4 md2>
            <div class="caption grey--text">Due by</div>
            <div>{{ project.due }}</div>
          </v-flex>
          <v-flex xs6 sm4 md2>
            <div class="right">
              <v-chip v-bind:class="`${ project.status } white--text caption my-2`">{{ project.status }}</v-chip>
            </div>
          </v-flex>
        </v-layout>
        <v-divider></v-divider>
      </v-card>
    </v-container>
  </div>
</template>

<script>
import fb from '@/fb'
const db = fb.db;

  export default {
    data() {
      return {
        projects: []
      }
    },
    methods: {
      sortBy(prop){
        this.projects.sort((a, b) => a[prop] < b[prop] ? -1 : 1)
      }
    },
    created() {
      db.collection('tasks').onSnapshot(res => {
        const changes = res.docChanges();

        changes.forEach(change => {
          if (change.type === 'added') {
            this.projects.push({
              ...change.doc.data(),
              id: change.doc.id
            })
          }
        })
      })
    }
  }
</script>

<style>

  .project.complete{
    border-left: 4px solid yellowgreen;
  }
  .project.ongoing{
    border-left: 4px solid royalblue;
  }
  .project.overdue{
    border-left: 4px solid crimson;
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
  .project.planned{
    border-left: 4px solid goldenrod;
  }
  .v-chip.planned{
    background: goldenrod;
  }

</style>
