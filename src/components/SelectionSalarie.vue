<template>
  <span :class="{inactive:clicks % 2 > 0}" @click="click">
    <i class="fa fa-user"></i>
    {{ salarie }}
  </span>
</template>
<script>
export default {
  props:{
    salarie:String
  },
  data(){
    return {clicks:0}
  },
  methods:{
    click(){
      this.clicks++
    }
  }
}
</script>
<style scoped>
</style>
