import CryptoJS from 'crypto-js'
import Tasker from '@/utils/Tasker'

const tasker = new Tasker({
  maxRetry: 0
})

// 加密文件头部识别码，用于判断文件是否已加密
export const headCode = 'mao!'

const mapFileMimeType = {
  'jpeg': 'image/jpeg',
  'jpg': 'image/jpg',
  'png': 'image/png',
  'apng': 'image/apng',
  'gif': 'image/gif',
  'webp': 'image/webp',
  'ico': 'image/ico',
  'svg': 'image/svg+xml',
}

/**
 * 获取头部识别码
 * @param {*} arrBuffer 文件内容
 * @param {Number} bytesToRead 偏移量
 * @returns {String} 头部识别码
 */
export const getFileHeader = (arrBuffer, bytesToRead) => {
  const u8arr = new Uint8Array(arrBuffer, 0, bytesToRead)
  const decoder = new TextDecoder('utf-8')
  return decoder.decode(u8arr)
}

/**
 * wordArray转Uint8Array
 * @param {WordArray} wordArray 
 * @returns {Uint8Array}
 */
export const word2u8Array = function (wordArray) {
  var words = wordArray.words
  var sigBytes = wordArray.sigBytes
  var u8 = new Uint8Array(sigBytes)
  for (var i = 0; i < sigBytes; i++) {
    var byte = (words[i >>> 2] >>> (24 - (i % 4) * 8)) & 0xff
    u8[i] = byte
  }
  return u8
}

/**
 * Uint8Array文件AES解密
 * @param {Uint8Array} u8arr 
 * @param {String} key 16位字节密匙
 * @returns {Uint8Array}
 */
export const decryptU8arr = (u8arr, key) => {
  const iv = CryptoJS.enc.Utf8.parse([...key].reverse().join(''))
  const wordArray = CryptoJS.lib.WordArray.create(u8arr)
  const dcBase64String = wordArray.toString(CryptoJS.enc.Base64)
  key = CryptoJS.enc.Utf8.parse(key)
  const decrypt = CryptoJS.AES.decrypt(dcBase64String, key, {
      iv,
      mode: CryptoJS.mode.CBC,
      padding: CryptoJS.pad.Pkcs7
  });
  return word2u8Array(decrypt)
}

/**
 * 文件解密
 * @param {File} file 加密文件
 * @param {String} key 16位字节密匙
 * @param {Boolean} withU8Arr 是否返回Uint8Array格式文件，默认返回blob二进制文件
 * @returns {Uint8Array|Blob}
 */
export const decryptFile = ({file, key, withU8Arr=false}) => {
  return new Promise((resolve, reject) => {
    const reader = new FileReader()
    reader.readAsArrayBuffer(file)
    reader.onload = () => {
      const headInfo = getFileHeader(reader.result, headCode.length)
      if (headCode === headInfo) {
        const fileContent = new Uint8Array(reader.result, headCode.length)
        const decryptedContent = decryptU8arr(fileContent, key)
        if (withU8Arr) return resolve(decryptedContent)
        file = new Blob([decryptedContent], { type: file.type })
      } else if (withU8Arr) {
        return resolve(new Uint8Array(reader.result))
      }
      resolve(file)
    }
    reader.onerror = reject
  })
}

export const decodePicture = ({url, key, fileName}) => {
  return tasker.add(async () => {
    const ext = url.split('.').pop().split('?')[0]
    const fileRes = await fetch(url)
    const blob = await fileRes.blob()
    const decryptBlob = await decryptFile({
      file: blob,
      key,
    })
    const blobUrl = URL.createObjectURL(new File([decryptBlob], fileName||url.split('/').pop(), { type: mapFileMimeType[ext] }))
    return blobUrl
  })
}