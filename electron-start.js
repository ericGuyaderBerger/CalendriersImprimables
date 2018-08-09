const {app,BrowserWindow,ipcMain} = require("electron")
const {setMenu} = require('./electron-menu.js')
const PrintingTools = require('./printing-tools')

let win
let url

// url selon mode application
if (process.env.NODE_ENV === 'DEV') {
  url = 'http://localhost:8080/'
} else {
  url = `file://${process.cwd()}/dist/index.html`
}


app.on('ready',() => {
  win = new BrowserWindow({
    //fullscreen:true,
    show:false,
    resizable:true,
    closable:true,
    fullscreenWindowTitle:true
  });
  win.loadURL(url)
  win.on('ready-to-show',() => {
    win.show()
  })
  setMenu(win)
})

ipcMain.on('printing', (ev,args)=>{
  // TODO: déterminer le nom du fichier PDF à générer à partir des arguments transmis
  PrintingTools.printToPDF(win, args)
})