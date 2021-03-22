const { app, BrowserWindow } = require('electron')

let win

const createWindow = () => {
	win = new BrowserWindow({
		show: false,
		title: 'Youtube Downloader',
		width: 800,
		height: 600,
		webPreferences:{
			nodeIntegration: true,
			contextIsolation: false,
			enableRemoteModule: true
		}
	})

	win.loadFile('public/index.html')
	win.toggleDevTools()

	win.on('ready-to-show', () => {win.show()})
	win.on('closed', () => {win=null})
}

app.on('ready', createWindow)

app.on('activate', () => {
	if(win===null){
		createWindow()
	}
})

app.on('window-all-closed', () => {
	if(process.platform !== 'darwin')
		app.quit()
})