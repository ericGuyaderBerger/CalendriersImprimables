<template>
  <div id="app" class="container">
    <h1>
      <i class="fa fa-calendar text-danger"></i>
      Roche &amp; Fils - Calendriers imprimables
    </h1>
    <Selection />
    <PrintableCalendars />
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
    this.$getGapiClient()
      .then(gapi => {
        // console.log(gapi)
        gapi.auth2.getAuthInstance().signIn().then( () => {
          CalendarTools
            .getEmployesDistincts(gapi,new Date('2018-07-16'),new Date('2018-07-20'))
            .then( distEmps => {
              // console.log( distEmps )
              employes = distEmps 
            })
        })
      })
      .catch( err => console.log(err) )

    return {employes:employes}
  },
}
</script>

<style>

</style>
