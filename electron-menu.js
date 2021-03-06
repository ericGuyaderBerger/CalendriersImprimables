const {app, Menu} = require('electron')
const PrintingTools = require('./printing-tools')

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
              PrintingTools.print(window)
            }
          },
          {
            label: 'Imprimer en PDF...',
            accelerator: isWindows ? 'Ctrl+Shift+P' : 'CmdOrCtrl+Shift+P',
            click() {
              window.webContents.executeJavaScript('document.querySelector(\'.semaine span:not(.inactive)\').innerText',
                (semaine) => {
                  let semainePourFichier = semaine.replace(/\//g,'-').toLowerCase().trim()
                  PrintingTools.printToPDF(window,{fichier:`Planning ${semainePourFichier}.pdf`})
                }
              )
            }
          },
          {
            label: isWindows ? 'Quitter' : 'Quitter ' + app.getName(),
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

