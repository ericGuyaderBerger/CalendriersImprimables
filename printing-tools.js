const fs = require('fs')
const { dialog } = require('electron')
const opn = require('opn')
const path = require('path')

module.exports = {
  print(browserWindow){
    browserWindow.webContents.print({landscape:true,printBackground:true})
  },
  printToPDF(browserWindow, options = null){
    let fichier = 'rf-ptpdf.pdf'
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
      fs.writeFile(fichier, data, (error) => {
        if (error) throw error
        let cheminComplet = path.normalize(path.join(__dirname , fichier))
        dialog.showMessageBox(browserWindow,{
          type:'info',
          message: 'Génération réussie',
          detail: `Fichier ${cheminComplet} généré correctement!`,
          buttons: ['OK']
        })

        opn(fichier)
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