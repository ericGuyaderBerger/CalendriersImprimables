<template>
  <div id="app" class="container">
    <h1 class="not-printable">
      <i class="fa fa-calendar text-danger"></i>
      Roche Fils Nettoyage - Calendriers imprimables
    </h1>
    <Selection :debut="debut" :salaries="employes" :employesSelectionnes="employesSelectionnes" 
        @update:debut="update($event)" @update:employesSelectionnes="updateEmployesSelectionnes($event)" 
        @print="print()" @refresh="refresh()"/>
    
    <PrintableCalendars :salaries="employesSelectionnes" :debut="debut" :tachesSemaine="taches" 
        :calendriers="calendriersTaches" />
  </div>
</template>

<script>
import PrintableCalendars from './components/PrintableCalendars.vue'
import Selection from './components/Selection.vue'
import CalendarTools from './calendars.js'
const { ipcRenderer } = window.require('electron')

export default {
  name: 'app',
  components: {
    Selection,
    PrintableCalendars
  },
  data(){
    let employes = []
    let taches = []
    let debut = this.getDefaultDebut()
    let employesSelectionnes = []
    let calendriersTaches = []
    return {employes,taches,calendriersTaches,debut,employesSelectionnes}
  },
  computed:{
    
  },
  methods: {
    print(){
      let debutFormate = this.debut.toLocaleDateString().replace(/\//gi,'-');
      ipcRenderer.send('printing',{fichier:`Planning semaine du ${debutFormate}.pdf`})
    },
    refresh(){
      this.getGapiData()
    },
    update(newDebut){
      this.debut = newDebut
      this.getGapiData()
    },
    updateEmployesSelectionnes(emp){
      // console.log('in')
      if( this.employesSelectionnes.includes(emp) ){
        this.employesSelectionnes.splice(this.employesSelectionnes.indexOf(emp),1)
      } else {
        this.employesSelectionnes.splice(this.employes.indexOf(emp),0,emp)
      }
    },
    getDefaultDebut(){
      let now = new Date()
      let ret = new Date()
      let jourSem = now.getDay()
      if ( jourSem > 1 ) {
        ret.setDate( now.getDate() + 8 - jourSem )
      } else if ( jourSem === 0 ) {
        ret.setDate( now.getDate() + 1  )
      }
      ret.setHours(0,0,0,0)
      // console.log(ret)
      return ret
    },
    getEmployes() {
      CalendarTools
        .getEmployesDistincts(new Date(this.debut))
        .then( distEmps => {
          // console.log(employes)
          this.employes = distEmps
          this.employesSelectionnes = Array.from(distEmps)
        })
        .catch( err => console.log(err) )
    },
    getWeekTasks(){
      let TasksProm = CalendarTools
        .getPlanedEvents(new Date(this.debut))
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
        .getTasksCalendars();
      CalendarsProm
        .then( calendars => this.calendriersTaches = calendars )
        .catch( err => console.log(err) )
    },
    getGapiData(){
      this.getEmployes()
      this.getWeekTasks()
      this.getTasksCalendars()
    }
  },
  mounted(){
    // this.debut = this.getDefaultDebut()
    const gapi = window.gapi
    
    gapi.load('client:auth2', () => {
      gapi.client.init({
        // apiKey: 'AIzaSyCQ3xCsHPiDPaOI2lzdlEAENsiTHZn-Tcs',
        // clientId: '554100630055-sblc7jocm9a76cl96craekbdl8kdrci0.apps.googleusercontent.com',
        apiKey: 'AIzaSyDXwlyHiQd6xs-vZXh_-8rtoauaNCVJmhQ',
        clientId: '841295231115-cl4bkln0po9eelta3mv32vsskek0u74b.apps.googleusercontent.com',
        discoveryDocs: ["https://www.googleapis.com/discovery/v1/apis/calendar/v3/rest"],
        scope: 'https://www.googleapis.com/auth/calendar.readonly'
      }).then( () => {
        
        CalendarTools.logIn(gapi)
          .then( () => {
              console.log(gapi)
              this.getGapiData()
          })
          .catch ( err => console.log(err) )
      })
    })
  }
}
</script>

<style>

</style>
