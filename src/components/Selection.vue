<template>
  <div id="selection" class="not-printable">
    <h2>Options du calendrier à imprimer</h2>
    <div class="row">
      <div class="col-3">
        <p v-for="semaine in semainesAffichables" :key="semaine.libelle" class="semaine"
            :class="{inactive:!isActive(semaine)}"
            @click="changeDebut(semaine.debut)"
            >
          <i class="fa fa-calendar"></i> {{ semaine.libelle }}
        </p>
      </div>
      <div class="col-9 row">
        <p v-for="salarie in salaries" :key="salarie" class="col-3 salarie">
          <i class="fa fa-user"></i>
          {{ salarie }}
        </p>
      </div>
      
    </div>
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
      let now = new Date()
      let lundi = new Date()
      lundi.setDate(now.getDate() - (now.getDay() - 1) )
      
      for( let i = -3; i < 2; i++ ){
        let debut = new Date()
        debut.setDate( lundi.getDate() + i * 7 )
        debut.setHours(0,0,0,0)
      
        // console.log(debut)
        ret.push({
          debut,
          libelle:'Semaine du ' + debut.toLocaleDateString()
        })
      }
      return ret
    }
  },
  methods:{
    isActive(semaine){
      // console.log(this.debut)
      // console.log(semaine.debut)
      return semaine.debut === this.debut
    },
    changeDebut(nvDebut){
      // console.log(nvDebut)
      this.$emit('update:debut',nvDebut)
    }
  }
}
</script>

<!-- Add "scoped" attribute to limit CSS to this component only -->
<style scoped>
  .inactive{
    opacity:0.25
  }
  .semaine,.salarie {
    cursor:pointer;
  }
</style>
