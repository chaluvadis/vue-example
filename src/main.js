import Vue from 'vue'
import Vuetify from 'vuetify'
import App from './App'
import router from './router'
import { store } from './store'
import DateFilter from './filter/date'
import * as firebase from 'firebase';
import * as AlertCmp from './shared/alert.vue'
Vue.use(Vuetify)

Vue.config.productionTip = false
Vue.filter('date', DateFilter)
Vue.component('app-alert', AlertCmp)

/* eslint-disable no-new */
new Vue({
  el: '#app',
  store,
  router,
  render: h => h(App),
  created() {
    firebase.initializeApp({
      apiKey: "AIzaSyAaaAphMFYJTWPF7pe1nBIkSmLy5AB_0WM",
      authDomain: "devmeetup-74f32.firebaseapp.com",
      databaseURL: "https://devmeetup-74f32.firebaseio.com",
      projectId: "devmeetup-74f32",
      storageBucket: "",
    })
  }
})
