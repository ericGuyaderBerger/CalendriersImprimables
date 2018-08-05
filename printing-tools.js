const fs = require('fs')


module.exports = {
  print(browserWindow){
    browserWindow.webContents.print({landscape:true,printBackground:true})
  },
  printToPDF(browserWindow){
    browserWindow.webContents.printToPDF({landscape:true,printBackground:true}, (err,data) => {
      if(err){
        
        return
      }
      fs.writeFile('c:/users/eric/desktop/rf-ptpdf.pdf', data, (error) => {
        if (error) throw error
        // TODO: boîte de dialogue!
        console.log('Write PDF successfully.')
      })
    })
  }
}