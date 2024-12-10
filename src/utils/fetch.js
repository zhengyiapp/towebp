import { decrypt, encrypt } from '@/utils/crypt'
import config from '@/utils/config'
import { globalStore } from '@/store'
import { message } from 'ant-design-vue'

export default function(){
  arguments[1] = arguments[1] || {}

  arguments[0] = `${config.fetchURL}${arguments[0]}`
  if (!arguments[1]?.headers) {
    arguments[1].headers = {}
  }
  if (['POST', 'PUT', 'DELETE'].includes(arguments[1].method) && !arguments[1].headers['Content-Type']) {
    arguments[1].headers['Content-Type'] = 'application/json'
  }
  if (globalStore.token) {
    arguments[1].headers['Token'] = globalStore.token
  }
  if (arguments[1].params) {
    const params = new URLSearchParams()
    for (const k in arguments[1].params) {
      if (k === 'd') {
        arguments[1].params[k] = encodeURIComponent(encrypt(JSON.stringify(arguments[1].params[k])))
      }
      params.append(k, arguments[1].params[k])
    }
    arguments[0] += `?${params.toString()}`
  }
  if (arguments[1].body) {
    if (arguments[1].body.d) {
      arguments[1].body.d = encrypt(JSON.stringify(arguments[1].body.d))
    }
    arguments[1].body = JSON.stringify(arguments[1].body)
  }

  return new Promise((resolve, reject) => {
    window.fetch(arguments[0], arguments[1]).then(async res => {
      if (res.status === 200) {
        let decode = decrypt(await res.text())
        try{
          decode = JSON.parse(decode)
          if (!decode.errCode) {
            resolve(decode)
          } else {
            reject(decode)
          }
        }catch(e){
          resolve(decode)
        }
      } else if (res.status < 300) {
        resolve(res)
      } else if (res.status === 401) {
        message.error('无操作权限')
        reject(res)
      } else {
        reject(res)
      }
    })
  })
}