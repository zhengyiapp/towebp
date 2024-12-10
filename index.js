const { app, BrowserWindow, Menu } = require('electron')
const path = require('path')
const url = require('url')
const useIpcRenderer = require('./server/ipc')

const isDev = process.env.NODE_ENV === 'dev'

if (isDev) {
  try {
    require('electron-reloader')(module);
  } catch (_) {}
}

!(async () => {

  const createWindow = () => {
    if (!isDev) Menu.setApplicationMenu(null)
    const win = new BrowserWindow({
      width: 880,
      height: 780,
      webPreferences: {
        nodeIntegration: true, //是否开启在渲染进程中的node环境
        contextIsolation: false, //关闭独立加载electron API
        webviewTag: false,
        webSecurity: false, //禁用同源策略
      }
    })
    if (isDev) {
      win.loadURL("http://localhost:7001")
    } else {
      win.loadURL(url.format({
        pathname:path.join(__dirname, './dist/index.html'),
        protocol:'file:',
        slashes:true
      }))
    }
    useIpcRenderer({win})
  }

  app.whenReady().then(createWindow)

  app.on('window-all-closed', () => {
    // 清除服务器页面全局变量，释放内存
    global.pages = {}
    if (process.platform !== 'darwin') {
      // 关闭窗口退出应用程序
      app.quit()
    }
  })

  app.on('activate', () => {
    if (BrowserWindow.getAllWindows().length === 0) {
      createWindow()
    }
  })
})();