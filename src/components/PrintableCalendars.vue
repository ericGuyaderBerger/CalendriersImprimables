<template>
  <div id="calendars">
    <h2 class="not-printable">Impression</h2>
    <div class="calendar" v-for="salarie in salaries" :key="salarie.nom">
      <div class="row">
        <h4 class="col-7">
          {{salarie}}, du {{ debut | dateFr }} au {{ fin | dateFr }}
        </h4>
        <div class="col-5 container-fluid">
          <div class="row">
            <div v-for="cal in calendriers" :key="cal.summary" class="col-4">
              <i class="fa fa-square" :style="{color:cal.backgroundColor}"></i>
              {{ cal.summary }}
            </div>
          </div>
        </div>
      </div>
      <WeekCalendar :salarie="salarie" :debut="debut" :taches="tachesSemaine" />
    </div>
  </div>
</template>

<script>
  import WeekCalendar from '@/components/WeekCalendar.vue'

  export default {
    name: 'PrintableCalendars',
    props: {
      salaries: Array,
      debut: Date,
      tachesSemaine: [Array, Object],
      calendriers: Array
    },
    components:{WeekCalendar},

    computed:{
      fin(){
        const nbMsInDay = 8.64e+7
        let fin = new Date(this.debut.getTime() + 5 * nbMsInDay)
        fin.setHours(23,59,59,999)
        return fin
      }
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
