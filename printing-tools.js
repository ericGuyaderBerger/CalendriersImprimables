const fs = require('fs')
const { dialog } = require('electron')
const opn = require('opn')

module.exports = {
  print(browserWindow){
    browserWindow.webContents.print({landscape:true,printBackground:true})
  },
  printToPDF(browserWindow, options = null){
    let fichier = 'c:/users/eric/desktop/rf-ptpdf.pdf'
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
        dialog.showMessageBox(browserWindow,{
          type:'info',
          message: 'Génération réussie',
          detail: `Fichier ${fichier} généré correctement!`,
          buttons: ['OK']
        })

        opn(fichier)
      })
    })
  }
}