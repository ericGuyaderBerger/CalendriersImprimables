<template>
    <div class="taches-employes" :class="{'inactive':employe.nom !== employeCalendrier.nom}">
      <h6> <i class="fa fa-user"></i> {{ employe.nom }} </h6>
      <div v-for="tache in employe.taches" :key="tache.index" class="tache">
        <p> <i class="fa fa-square"></i> {{ tache.lieu }}</p>
      </div>
    </div>  
</template>
<script>
  export default {
    name:'EmployeeTasks',
    props:{
      employe: Object,
      employeCalendrier: Object,
    }
  }
</script>
<style scoped>
  .inactive{
    color:#999;
  }
</style>

