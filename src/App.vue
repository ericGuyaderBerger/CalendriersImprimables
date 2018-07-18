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
    let debut = '2018-07-30'
    return {employes:employes,taches:taches,debut:debut}
  },
  methods: {
    getEmployes() {
      this.$getGapiClient()
      .then(gapi => {
        // console.log(gapi)
        gapi.auth2.getAuthInstance().signIn().then( () => {
          CalendarTools
            .getEmployesDistincts(gapi,new Date('2018-07-16'),new Date('2018-07-21'))
            // .getPlanedEvents(gapi,new Date('2018-07-16'),new Date('2018-07-20'))
            .then( distEmps => {
              // console.log( distEmps )
              this.employes = distEmps
              // console.log(employes)
              // taches =  distEmps
            })
        })
      })
      .catch( err => console.log(err) )
    },
    getWeekTasks(start){
      this.$getGapiClient()
      .then(gapi => {
        // console.log(gapi)
        gapi.auth2.getAuthInstance().signIn().then( () => {
          CalendarTools
            // .getEmployesDistincts(gapi,new Date('2018-07-16'),new Date('2018-07-21'))
            .getPlanedEvents(gapi,new Date('2018-07-16'),new Date('2018-07-20'))
            .then( distTaches => {
              // console.log( distEmps )
              this.taches = distTaches
              // console.log(employes)
              // taches =  distEmps
            })
        })
      })
      .catch( err => console.log(err) )
    }
  },
  mounted(){
    this.getEmployes()
    // this.getWeekTasks(this.debut)
  }
}
</script>

<style>

</style>
