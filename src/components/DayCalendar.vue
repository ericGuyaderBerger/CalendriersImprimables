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
    props: ['jour','debut','employeCalendrier'],
    data(){
      return { tachesJour: [
          {nom:"YARECK",taches:[{intitule:"EXEDRA",type:"Chantiers",couleur:"#ff0"},{intitule:"MPOSS",type:"Chantiers",couleur:"#ff0"}]},
          {nom:"JOEL",taches:[{intitule:"F. VERDIER, n°9",type:"Chantiers",couleur:"#ff0"},{intitule:"AXA",type:"Vitres",couleur:"#00a"}]},
          {nom:"PHILIPPE + DISANT",taches:[{intitule:"EGIS MINI",type:"Chantiers",couleur:"#ff0"},{intitule:"LES AGATES",type:"Containers",couleur:"#0aa"},{intitule:"MATEOS",type:"Vitres",couleur:"#00a"}]},
          {nom:"PHIL",taches:[{intitule:"VARSOVIE Hall",type:"Chantiers",couleur:"#ff0"},{intitule:"SAGESSE MINIMES",type:"Chantiers",couleur:"#ff0"}]},
          {nom:"DISANT",taches:[{intitule:"PATRIMOINE DE FRANCE",type:"Chantiers",couleur:"#ff0"},{intitule:"LAFOURCADE",type:"Chantiers",couleur:"#ff0"}]},

        ] 
      }
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
