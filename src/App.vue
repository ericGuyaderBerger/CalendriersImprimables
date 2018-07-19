<template>
  <div id="app" class="container">
    <h1 class="not-printable">
      <i class="fa fa-calendar text-danger"></i>
      Roche &amp; Fils - Calendriers imprimables
    </h1>
    <Selection />
    <PrintableCalendars :salaries="employes" :debut="debut" :tachesSemaine="taches" :calendriers="calendriersTaches" />
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
    let gapi = {}
    let calendriersTaches = []
    return {employes,taches,calendriersTaches}
  },
  computed:{
    debut(){
      let now = new Date()
      let ret = new Date()
      let jourSem = now.getDay()
      if ( jourSem > 1 ) {
        ret.setDate( now.getDate() + 8 - jourSem )
      }
      return ret
    }
  },
  methods: {
    getEmployes() {
      CalendarTools
        .getEmployesDistincts(this.gapi,new Date(this.debut))
        .then( distEmps => {
          // console.log(employes)
          this.employes = distEmps
        })
        .catch( err => console.log(err) )
    },
    getWeekTasks(start){
      let TasksProm = CalendarTools
        .getPlanedEvents(this.gapi,new Date(this.debut))
      // console.log(TasksProm)
      TasksProm
        .then( distTaches => {
          // console.log( distTaches )
          this.taches = distTaches
        })
        .catch( err => console.log(err) )
    },
    getTasksCalendars(){
      let CalendarsProm = CalendarTools
        .getTasksCalendars(this.gapi);
      CalendarsProm
        .then( calendars => this.calendriersTaches = calendars )
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
            this.getTasksCalendars()
          })
      })
  }
}
</script>

<style>

</style>
