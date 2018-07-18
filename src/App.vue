<template>
  <div id="app" class="container">
    <h1>
      <i class="fa fa-calendar text-danger"></i>
      Roche &amp; Fils - Calendriers imprimables
    </h1>
    <Selection />
    <PrintableCalendars :salaries="employes" :debut="debut" />
  </div>
</template>

<script>
import PrintableCalendars from './components/PrintableCalendars.vue'
import Selection from './components/Selection.vue'
import CalendarTools from './calendars.js'

export default {
  name: 'app',
  components: {
    Selection,
    PrintableCalendars
  },
  data(){
    let employes = []
    let taches = []
    let debut = '2018-12-31'
    let gapi = {}
    return {employes:employes,taches:taches,debut:debut}
  },
  methods: {
    getEmployes() {
      CalendarTools
        .getEmployesDistincts(this.gapi,new Date(this.debut))
        .then( distEmps => {
          this.employes = distEmps
          // console.log(employes)
        })
        .catch( err => console.log(err) )
    },
    getWeekTasks(start){
      CalendarTools
        .getPlanedEvents(this.gapi,new Date(this.debut))
        .then( distTaches => {
          // console.log( distTaches )
          this.taches = distTaches
          
        })
        .catch( err => console.log(err) )
    }
  },
  mounted(){
    this.$getGapiClient()
      .then(gapi => {
        // console.log(gapi)
        gapi.auth2.getAuthInstance().signIn()
          .then( () => {
            this.gapi = gapi
            this.getEmployes()
            this.getWeekTasks(this.debut)
          })
      })
  }
}
</script>

<style>

</style>
