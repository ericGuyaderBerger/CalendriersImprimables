<template>
  <div id="calendars">
    <h2>Impression</h2>
    <div class="calendar" v-for="salarie in salaries" :key="salarie.nom">
      <h3>
        {{salarie.nom}}, du 9 au 13 juillet 2018
      </h3>
      <table>

      </table>
    </div>
  </div>
</template>

<script>
  export default {
    name: 'PrintableCalendars',
    props: salaries
  }
</script>

<!-- Add "scoped" attribute to limit CSS to this component only -->
<style scoped>
</style>
