<template>
  <div id="selection" class="not-printable">
    <h2>
      Options du calendrier à imprimer
      <button class="btn btn-sm btn-success">
        <i class="fa fa-refresh" @click="refresh()"></i>
      </button>&nbsp;
      <button class="btn btn-sm btn-success" @click="print()">
        <i class="fa fa-print"></i>
      </button>&nbsp;
      
    </h2>
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
    print(){
      this.$emit('print')
    },
    refresh(){
      this.$emit('refresh')
    },
    getSemainesAffichables(){
      let ret = []
      const nbMsInDay = 8.64e+7 
      let now = new Date()
      let lundi = new Date(now.getTime() - (now.getDay() - 1) * nbMsInDay )
      
      for( let i = -3; i < 3; i++ ){
        
        let debut = new Date( lundi.getTime() + i * 7 * nbMsInDay)
        debut.setHours(0,0,0,0)
        
        ret.push({
          debut,
          libelle:'Semaine du ' + debut.toLocaleDateString()
        })
      }
      return ret
    },
    isActiveSalarie(sal){
      return this.clicks[sal] !== undefined && this.clicks[sal] % 2 > 0
    },
    salarieClick(salarie){
      this.$emit('update:employesSelectionnes',salarie)
    },
    changeDebut(nvDebut){
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
