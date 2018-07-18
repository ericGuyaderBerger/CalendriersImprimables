<template>
  <div id="calendars">
    <h2>Impression</h2>
    <div class="calendar" v-for="salarie in salaries" :key="salarie.nom">
      <h4>
        {{salarie}}, du {{ debut | dateFr }} au {{ fin | dateFr }}
      </h4>
      <WeekCalendar :salarie="salarie" :debut="debut" />
    </div>
  </div>
</template>

<script>
  import WeekCalendar from '@/components/WeekCalendar.vue'

  export default {
    name: 'PrintableCalendars',
    props: ['salaries','debut','fin'],
    components:{WeekCalendar},
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
