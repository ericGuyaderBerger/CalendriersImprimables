import Vue from 'vue'
import App from './App.vue'
// import Vuex from 'vuex'
import VueGAPI from 'vue-gapi'

Vue.config.productionTip = false
// Vue.use(Vuex)
Vue.use(VueGAPI,{
  apiKey: 'AIzaSyDXwlyHiQd6xs-vZXh_-8rtoauaNCVJmhQ',
  clientId: '841295231115-cl4bkln0po9eelta3mv32vsskek0u74b.apps.googleusercontent.com',
  discoveryDocs: ["https://www.googleapis.com/discovery/v1/apis/calendar/v3/rest"],
  scope: 'https://www.googleapis.com/auth/calendar.readonly'
})


new Vue({
  render: h => h(App)
}).$mount('#app')

