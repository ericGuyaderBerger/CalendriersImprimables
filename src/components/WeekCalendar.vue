<template>
  <div class="calendar-week row">
    <DayCalendar v-for="(taches,jour) in taches" :key="jour" 
        :employeCalendrier="salarie"
        :jour="jour" 
        :tachesJour="taches" />
  </div>
</template>
<script>
import DayCalendar from '@/components/DayCalendar.vue'

export default {
  name:'WeekCalendar',
  components:{DayCalendar},
  props:['debut','salarie','taches']
}  
</script>
<style scoped>

</style>
