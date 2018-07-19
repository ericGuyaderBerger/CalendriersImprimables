<template>
    <div class="taches-employe" :class="{'active': employe.nom.split(' + ').includes(employeCalendrier) }">
      <h6> <i class="fa fa-user" :class="{'fa-users': employe.nom.split(' + ').length > 1 }"></i> {{ employe.nom }} </h6>
      <p v-for="tache in employe.taches" :key="tache.index" class="tache"> <i class="fa fa-square" :style="{color:tache.couleur}"></i> {{ tache.intitule }}</p>
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
  .taches-employe{
    margin:1em 0;
  }

  .taches-employe:not(.active){
    opacity: 0.25;
  }

  .active{
    color:#000;
    background:#fee;
    border-radius:5px;
  }

  .tache{
    margin:0.1em;
  }
  
  h6{
    margin-bottom:0.1em
  }
</style>

