<template>
    <div class="taches-employe" v-if="employe.taches.length > 0" :class="{'active': employe.nom.split(' + ').includes(employeCalendrier) }">
      <h6> <i class="fa fa-user" :class="{'fa-users': employe.nom.split(' + ').length > 1 }"></i> {{ employe.nom }} </h6>
      <div class="row no-gutters justify-content-start">
        <p v-for="tache in employe.taches" :key="tache.index" class="tache col-auto"> 
          <i class="fa fa-window-minimize fa-rotate-90" :style="{color:tache.couleur}"></i> <span>{{ tache.intitule }}</span>
        </p>
      </div>
      
    </div>  
</template>
<script>
  export default {
    name:'EmployeeTasks',
    props:{
      employe: Object,
      employeCalendrier: String,
    }
  }
</script>
<style scoped>
  .taches-employe{
    margin:1em 0;
  }

  .taches-employe:not(.active){
    opacity: 0.5;
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

