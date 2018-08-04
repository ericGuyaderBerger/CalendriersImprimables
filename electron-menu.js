const {app, Menu} = require('electron')
const fs = require('fs')
const isWindows = process.platform === 'win32'

module.exports = {
  setMenu(window){
    const template = [
      {
        label: isWindows ? 'Fichier' : app.getName(),
        submenu: [
          {
            label: 'Imprimer...',
            accelerator: isWindows ? 'Ctrl+P' : 'CmdOrCtrl+P',
            click() {
              window.webContents.print({printBackground:true})
            }
          },
          {
            label: 'Imprimer en PDF...',
            accelerator: isWindows ? 'Ctrl+Shift+P' : 'CmdOrCtrl+Shift+P',
            click() {
              window.webContents.printToPDF({landscape:true,printBackground:true}, (err,data) => {
                if(err){
                  // TODO: boîte de dialogue!
                  return
                }
                fs.writeFile('c:/users/eric/desktop/rf-ptpdf.pdf', data, (error) => {
                  if (error) throw error
                  console.log('Write PDF successfully.')
                })
              })
            }
          },
          {
            label: isWindows ? 'Quitter' : 'Quitter' + app.getName(),
            accelerator: isWindows ? 'Alt+F4' : 'CmdOrCtrl+Q',
            role: 'quit'
          }
        ]
      }
    ]

    const menu = Menu.buildFromTemplate(template)
    Menu.setApplicationMenu(menu)


  }
}

