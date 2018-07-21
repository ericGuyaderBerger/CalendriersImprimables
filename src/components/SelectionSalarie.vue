<template>
  <span :class="{inactive: !employesSelectionnes.includes(salarie)}" >
    <i class="fa fa-user"></i>
    {{ salarie }}
  </span>
</template>
<script>
export default {
  props:{
    salarie:String,
    employesSelectionnes:Array
  },
}
</script>
<style scoped>
</style>
