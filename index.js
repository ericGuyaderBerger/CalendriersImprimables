const {app,BrowserWindow,ipcMain} = require("electron")
const {setMenu} = require('./electron-menu.js')
const PrintingTools = require('./printing-tools')
const express = require('express')
const path = require('path')

let win
let url
let expApp
let expServer

// url selon mode application
if (process.env.NODE_ENV === 'DEV') {
  url = 'http://localhost:8080/'
} else {
  expApp = express()
  expApp.use( express.static( path.join(process.cwd(),'dist') ) )
  expServer = expApp.listen(3000)
  url = `http://localhost:3000/`
}


app.on('ready',() => {
  win = new BrowserWindow({
    show:false,
    fullscreenWindowTitle:true,
    webPreferences:{
      devTools:true,
      webSecurity:false
    }
  });
  win.loadURL(url)
  win.on('ready-to-show',() => {
    win.maximize()
    win.show()
    win.webContents.openDevTools()
  })
  setMenu(win)
})

app.on('window-all-closed',() => {
  if( expServer ){
    expServer.close()
  }
})

ipcMain.on('printing', (ev,args)=>{
  PrintingTools.printToPDF(win, args)
})