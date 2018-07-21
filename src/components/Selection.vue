<template>
  <div id="selection" class="not-printable">
    <h2>Options du calendrier à imprimer</h2>
    <div class="row">
      <div class="col-3">
        <p v-for="semaine in semainesAffichables" :key="semaine.libelle" class="semaine"
            @click="changeDebut(semaine.debut)">
          <SelectionSemaine :semaine="semaine" :debut="debut" />
        </p>
      </div>
      <div class="col-9 row">
        <p v-for="salarie in salaries" :key="salarie" class="col-3 salarie"
            @click="salarieClick(salarie)">  
          <SelectionSalarie :salarie="salarie" :employesSelectionnes="employesSelectionnes" />
        </p>
      </div>
      
    </div>
  </div>
</template>

<script>
import SelectionSalarie from '@/components/SelectionSalarie.vue'
import SelectionSemaine from '@/components/SelectionSemaine.vue'

export default {
  name: 'Selection',
  components:{SelectionSalarie,SelectionSemaine},
  props: {
    debut: Date,
    salaries: Array,
    employesSelectionnes: Array
  },
  data(){
    let semainesAffichables = this.getSemainesAffichables()
    return {semainesAffichables}
  },
  methods:{
    getSemainesAffichables(){
      let ret = []
      let now = new Date()
      let lundi = new Date()
      lundi.setDate(now.getDate() - (now.getDay() - 1) )
      // console.log(debutCal)
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
    },
  // },
  // methods:{
    isActiveSalarie(sal){
      console.log(this.clicks[sal])
      return this.clicks[sal] !== undefined && this.clicks[sal] % 2 > 0
    },
    salarieClick(salarie){
      this.$emit('update:employesSelectionnes',salarie)
    },
    changeDebut(nvDebut){
      // console.log(nvDebut)
      this.$emit('update:debut',nvDebut)
    }
  }
}
</script>

<!-- Add "scoped" attribute to limit CSS to this component only -->
<style>
  .inactive{
    opacity:0.25
  }
  .semaine,.salarie {
    cursor:pointer;
  }
</style>
