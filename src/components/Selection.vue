<template>
  <div id="selection" class="not-printable">
    <h2>Options du calendrier à imprimer</h2>
    
  </div>
</template>

<script>
export default {
  name: 'Selection',
  props: {
    debut: Date,
    salaries: Array
  },
  computed:{
    semainesAffichables(){
      let ret = []
      for( let i = -3; i < 2; i++ ){
        let debut = new Date(this.debut)
        debut.setDate( debut.getDate() + i * 7 )
        ret.push({
          debut,
          libelle:'Semaine du ' + debut.toLocaleDateString()
        })
      }
      return ret
    }
  }
}
</script>

<!-- Add "scoped" attribute to limit CSS to this component only -->
<style scoped>
</style>
