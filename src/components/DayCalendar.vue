<template>
  <div class="calendar-day col-2">
    <h5>{{ dateJour }}</h5>
    <EmployeeTasks v-for="employe in employesAvecTaches" :key="employe.nom" />
  </div>
</template>
<script>
  import EmployeeTasks from '@/components/EmployeeTasks.vue'

  export default {
    components:{EmployeeTasks},
    name:'DayCalendar',
    props: ['jour','debut'],
    data(){
      return { employesAvecTaches: [{nom:"YARECK",taches:[{lieu:"EXEDRA",type:"Chantiers"},{lieu:"MPOSS",type:"Chantiers"}]}] }
    },
    computed: {
      dateJour(){
        let dt = new Date(this.debut);
        let jours = ["lundi", "mardi","mercredi","jeudi","vendredi","samedi"];
        dt.setDate(dt.getDate() + this.jour )
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
  }
  .calendar-day h5{
    text-align: center;
  }
</style>
