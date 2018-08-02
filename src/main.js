import Vue from 'vue'
import App from './App.vue'
import VueGAPI from 'vue-gapi'


Vue.config.productionTip = false
Vue.use(VueGAPI,{
  apiKey: 'AIzaSyCQ3xCsHPiDPaOI2lzdlEAENsiTHZn-Tcs',
  clientId: '554100630055-sblc7jocm9a76cl96craekbdl8kdrci0.apps.googleusercontent.com',
  // clientId: '841295231115-cl4bkln0po9eelta3mv32vsskek0u74b.apps.googleusercontent.com',
  // apiKey: 'AIzaSyDXwlyHiQd6xs-vZXh_-8rtoauaNCVJmhQ',
  discoveryDocs: ["https://www.googleapis.com/discovery/v1/apis/calendar/v3/rest"],
  scope: 'https://www.googleapis.com/auth/calendar.readonly'
})


new Vue({
  render: h => h(App)
}).$mount('#app')

