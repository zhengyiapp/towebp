const { ipcMain, dialog } = require('electron')
const fs = require('fs')
const path = require('path')
// const webp = require('webp-converter')
// const gif2webp = require('gif2webp-bin')
const { exec } = require('child_process')

module.exports = ({win}) => {
  const isDev = process.env.NODE_ENV === 'dev'
  
  ipcMain.handle('req:test', (e, args) => {
    console.log('Electron listener!')
    e.sender.send('res:test', {
      code: 200,
      data: 'Get'
    })
  })

  ipcMain.handle('req:askDialog', async (e, args) => {
    // 为webp可执行文件授予755权限
    // webp.grant_permission()
    // 打开文件夹对话框
    const res = dialog.showOpenDialogSync(win, {
      properties: ['openDirectory']
    })
    if (res?.[0]) {
      const picturesDir = res[0]
      // 过滤非 jpg png gif 文件
      const files = fs.readdirSync(picturesDir)
        .filter(fileName => {
          const ext = fileName.split('.').pop()
          return ['jpg', 'png', 'gif'].includes(ext)
        })
        .map(fileName => {
          const ext = fileName.split('.').pop()
          return {fileName, ext}
        })

      // 发送待转换文件
      e.sender.send('res:askDialog', {
        code: 200,
        data: {
          dir: res,
          files
        }
      })

      // 转换文件
      for (const file of files) {
        const filePath = path.join(picturesDir, file.fileName)
        let webpFilePath = ''
        let name = file.fileName.split('.')
        const ext = name.pop()
        name = name.join('.')
        webpFilePath = path.join(picturesDir, `${name}.webp`)
        ext === 'gif' 
          // ? webp.gwebp(filePath, webpFilePath, '-lossy -m 5 -q 75').then(res => {
          //   file.status = 'success'
          //   e.sender.send('res:askDialog', {
          //     code: 200,
          //     data: {
          //       dir: res,
          //       files
          //     }
          //   })
          // })
          // : webp.cwebp(filePath, webpFilePath, '-q 90').then(res => {
          //   file.status = 'success'
          //   e.sender.send('res:askDialog', {
          //     code: 200,
          //     data: {
          //       dir: res,
          //       files
          //     }
          //   })
          // })
          ? exec(`${path.join(__dirname, isDev ? '../lib/webp/bin/gif2webp.exe' : '../../../lib/webp/bin/gif2webp.exe')} -lossy -m 5 -q ${args?.gifRate || 75} ${filePath} -o ${webpFilePath}`, (error) => {
            if (error) {
              console.error(error)
              file.status = 'error'
              file.msg = error.message
            } else {
              file.status = 'success'
            }
            e.sender.send('res:askDialog', {
              code: 200,
              data: {
                dir: res,
                files
              }
            })
          })
          : exec(`${path.join(__dirname, isDev ? '../lib/webp/bin/cwebp.exe' : '../../../lib/webp/bin/cwebp.exe')} -q ${args?.rate || 99} -lossless "${filePath}" -o "${webpFilePath}"`, (error) => {
            if (error) {
              console.error(error)
              file.status = 'error'
              file.msg = error.message
            } else {
              file.status = 'success'
            }
            e.sender.send('res:askDialog', {
              code: 200,
              data: {
                dir: res,
                files
              }
            })
          })
      }
    } else {
      e.sender.send('res:askDialog', { code: 400 })
    }
    
  })
}