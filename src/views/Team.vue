<template>
  <div class="team">
    <h1 class="subheading">Team</h1>
    <v-container class="my-5">
      <v-layout row class="mb-3">
        <v-tooltip top>
          <v-btn small flat color="grey" @click="filterByRole('All')" slot="activator">
            <v-icon left small>people</v-icon>
            <span class="caption text-lowercase">all</span>
          </v-btn>
          <span>show all members</span>
        </v-tooltip>
        <v-tooltip top>
          <v-btn small flat color="grey" @click="filterByRole('Developer')" slot="activator">
            <v-icon left small>code</v-icon>
            <span class="caption text-lowercase">developers</span>
          </v-btn>
          <span>show developers only</span>
        </v-tooltip>
        <v-tooltip top>
          <v-btn small flat color="grey" @click="filterByRole('Designer')" slot="activator">
            <v-icon left small>brush</v-icon>
            <span class="caption text-lowercase">designers</span>
          </v-btn>
          <span>show designers only</span>
        </v-tooltip>
        <v-tooltip top>
          <v-btn small flat color="grey" @click="filterByRole('Account Manager')" slot="activator">
            <v-icon left small>work</v-icon>
            <span class="caption text-lowercase">account managers</span>
          </v-btn>
          <span>show managers only</span>
        </v-tooltip>
        <AddMemberPopup/>
      </v-layout>
      <v-layout row wrap>
        <v-flex xs12 sm6 md4 lg3 v-for="person in filteredTeam" v-bind:key="person.name">
          <v-card flat class="text-xs-center ma-3">
            <v-card-text>
              <div class="subheading">{{ person.name }}</div>
              <div class="grey--text">{{ person.role }}</div>
            </v-card-text>
          </v-card>
        </v-flex>
      </v-layout>
    </v-container>
  </div>
</template>

<script>
import AddMemberPopup from '../components/dialogs/AddMember';
import fb from '@/fb';
const db = fb.db;

export default {
  components: {
    AddMemberPopup
  },
  data() {
    return {
      team: [],
      filteredTeam: []
    }
  },
  methods: {
    filterByRole(val){
      if (val === 'All'){
        this.filteredTeam = this.team
      } else {
        this.filteredTeam = this.team.filter(member => {
          return member.role === val
        })
      }
    }
  },
  created(){
    db.collection('users').onSnapshot((res) => {
      const changes = res.docChanges();

      changes.forEach(change => {
        if(change.type == 'added'){
          this.team.push({
            ...change.doc.data()
          })
        }
      })
    });
    this.filteredTeam = this.team
  }
}
</script>
