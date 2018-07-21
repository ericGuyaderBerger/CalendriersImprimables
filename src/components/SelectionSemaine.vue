<template>
  <span :class="{inactive: debut.getTime() !== semaine.debut.getTime() }">
    <i class="fa fa-calendar"></i> {{ semaine.libelle }}
  </span>
</template>
<script>
  export default {
    props:{
      debut: Date,
      semaine: Object
    }
    // props:['debut','semaine']
  }
</script>
<style scoped>
</style>