<template>
  <div id="calendars">
    <h2 class="not-printable">Impression</h2>
    <div class="calendar" v-for="salarie in salaries" :key="salarie.nom">
      <h4>
        {{salarie}}, du {{ debut | dateFr }} au {{ fin | dateFr }}
      </h4>
      <WeekCalendar :salarie="salarie" :debut="debut" :taches="tachesSemaine" />
    </div>
  </div>
</template>

<script>
  import WeekCalendar from '@/components/WeekCalendar.vue'

  export default {
    name: 'PrintableCalendars',
    props: ['salaries','debut','tachesSemaine'],
    components:{WeekCalendar},
    data(){
      let fin = new Date(this.debut)
      fin.setDate(fin.getDate() + 5)
      return {fin:fin}
    },
    filters: {
      dateFr(date){
        const dt = new Date(date);
        const moisFr = ['janvier','février','mars','avril','mai','juin','juillet','août','septembre','octobre','novembre','décembre']
        return dt.getDate() + ' ' + moisFr[dt.getMonth()] + ' ' + dt.getFullYear();
      }
    }
  }
</script>

<!-- Add "scoped" attribute to limit CSS to this component only -->
<style scoped>
</style>
