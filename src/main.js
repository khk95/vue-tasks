import Vue from 'vue'
import './plugins/vuetify'
import App from './App.vue'
import router from './router'
import { store } from './store/store'
import Firebase from 'firebase/app'

Vue.config.productionTip = false

Firebase.auth().onAuthStateChanged(() => {

  new Vue({
    el: '#app',
    store: store,
    router: router,
    render: h => h(App)
  });

});