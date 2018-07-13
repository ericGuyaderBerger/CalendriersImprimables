<template>
  <div id="app" class="container">
    <h1>
      <i class="fa fa-calendar text-danger"></i>
      Roche &amp; Fils - Calendriers imprimables
    </h1>
    <Selection />
    <PrintableCalendars />
  </div>
</template>

<script>
import PrintableCalendars from './components/PrintableCalendars.vue'
import Selection from './components/Selection.vue'

export default {
  name: 'app',
  components: {
    Selection,
    PrintableCalendars
  }
}
</script>

<style>

</style>
