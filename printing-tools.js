const fs = require('fs')
const { dialog } = require('electron')
const opn = require('opn')
const path = require('path')
const homedir = require('os').homedir();

module.exports = {
  print(browserWindow){
    browserWindow.webContents.print({landscape:true,printBackground:true})
  },
  printToPDF(browserWindow, options = null){
    let fichier = 'Planing hebdomadaire.pdf'
    if ( options && options.fichier ) {
      fichier = options.fichier
    }
    
    
    browserWindow.webContents.printToPDF({landscape:true,printBackground:true}, (err,data) => {
      if(err){
        dialog.showMessageBox(browserWindow,{
          type:'error',
          message:'Impossible de générer le fichier PDF!',
          detail:err.message
        })
        return
      }
      let cheminComplet = path.normalize(path.join(homedir , fichier))
      fs.writeFile(cheminComplet, data, (error) => {
        if (error) {
          dialog.showMessageBox(browserWindow,{
            type:'error',
            message:`Impossible de générer le fichier ${cheminComplet} !`,
            detail:err.message
          })
          return
        }
        
        dialog.showMessageBox(browserWindow,{
          type:'info',
          message: 'Génération réussie',
          detail: `Fichier ${cheminComplet} généré correctement!`,
          buttons: ['OK']
        })

        opn(cheminComplet)
          .catch( err => {
            dialog.showMessageBox(browserWindow,{
              type:'error',
              message:'Impossible d\'ouvrir le fichier PDF généré automatiquement!',
              detail:err.message
            })
          })
      })
    })
  }
}