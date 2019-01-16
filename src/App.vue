<template>
  <v-app id="app" class="grey lighten-4">
    <Navbar v-if="user"/>
    <v-content class="ma-4">
      <router-view/>
    </v-content>

  </v-app>
</template>

<script>
import Navbar from "@/components/Navbar.vue";

export default {
  name: 'App',
  components: {
    Navbar
  },
  data () {
    return {
      user: null
    }
  },
  methods: {  
    setUser(){
      this.$store.dispatch('setUser');
    }
  },
  created(){
    this.setUser();
    this.user = this.$store.getters.getUser;
  }
}
</script>
