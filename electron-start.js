const {app,BrowserWindow} = require("electron")

let win
let url
if (process.env.NODE_ENV === 'DEV') {
  url = 'http://localhost:8080/'
} else {
  url = `file://${process.cwd()}/dist/index.html`
}


app.on('ready',() => {
  win = new BrowserWindow({
    fullscreen:true,
    show:false
  });
  win.loadURL(url)
  win.on('ready-to-show',() => {
    win.show()
  })
})