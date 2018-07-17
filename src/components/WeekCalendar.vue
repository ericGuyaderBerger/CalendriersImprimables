<template>
  <div class="calendar-week row">
    <DayCalendar v-for="jour of [0,1,2,3,4,5]" :key="jour" :jour="jour" :debut="debut" :employeCalendrier="salarie" />
  </div>
</template>
<script>
import DayCalendar from '@/components/DayCalendar.vue'

export default {
  name:'WeekCalendar',
  components:{DayCalendar},
  props:['debut','salarie']
}  
</script>
<style scoped>

</style>
