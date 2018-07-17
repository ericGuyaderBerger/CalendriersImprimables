<template>
  <div class="calendar-day col-2">
    <h5>Jour {{ day }}</h5>
  </div>
</template>
<script>
  export default {
    name:'DayCalendar'
  }
</script>
<style scoped>
  .calendar-day h5{
    text-align: center;
  }
</style>
