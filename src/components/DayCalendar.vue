<template>
  <div class="col-2 p-1">
    <div class="calendar-day">
      <h5>{{ dateJour }}</h5>
      <EmployeeTasks v-for="employe in tachesJour" :key="employe.nom" :employe="employe" :employeCalendrier="employeCalendrier" />
    </div>
  </div>
</template>
<script>
  import EmployeeTasks from '@/components/EmployeeTasks.vue'

  export default {
    components:{EmployeeTasks},
    name:'DayCalendar',
    props: ['jour','employeCalendrier','tachesJour'],
    computed: {
      dateJour(){
        let dt = new Date(this.jour);
        let jours = ["lundi", "mardi","mercredi","jeudi","vendredi","samedi"];
        // dt.setDate(dt.getDate() + this.jour )
        return jours[dt.getDay() - 1] + ' ' + dt.getDate();
      }
    }
  }
</script>
<style scoped>
  .calendar-day{
    border:1px solid #666;
    border-radius:8px;
    padding:0.2em;
    height:100%;
  }
  .calendar-day h5{
    text-align: center;
  }
</style>
