import CryptoJS from 'crypto-js'

/**加密公匙*/
export const publicKey = '8b63b2bcf2521568'

export function md5(str){
  return CryptoJS.MD5(str).toString()
}

// 加密方法
export function encrypt(data, secret, key, iv) {
  try {
    const _md5 = md5(secret || publicKey)
    key = CryptoJS.enc.Utf8.parse(key || _md5.substring(0, 16))
    iv = CryptoJS.enc.Utf8.parse(iv || _md5.substring(16, 32))
    var srcs = CryptoJS.enc.Utf8.parse(data)
    var encrypted = CryptoJS.AES.encrypt(srcs, key, {
      iv,
      mode: CryptoJS.mode.CBC,
      padding: CryptoJS.pad.Pkcs7
    })
    return encrypted.toString()
  } catch (error) {
    console.log(error)
  }
}

// 解密方法
export function decrypt(data, secret, key, iv) {
  try {
    const _md5 = md5(secret || publicKey)
    key = CryptoJS.enc.Utf8.parse(key || _md5.substring(0, 16))
    iv = CryptoJS.enc.Utf8.parse(iv || _md5.substring(16, 32))
    var decrypt = CryptoJS.AES.decrypt(data, key, {
      iv,
      mode: CryptoJS.mode.CBC,
      padding: CryptoJS.pad.Pkcs7
    })
    var decryptedStr = decrypt.toString(CryptoJS.enc.Utf8)
    return decryptedStr.toString()
  } catch (error) {
    console.log(error)
  }
}

export const base64Encode = (str, salt='') => {
  const encrypted = CryptoJS.enc.Base64.stringify(CryptoJS.enc.Utf8.parse(str))
  return `${salt}${encrypted}`
}
export const base64Decode = (encrypted, salt='') => {
  encrypted = encrypted.replace(new RegExp(`^${salt}`), '')
  let decrypt = CryptoJS.enc.Utf8.stringify(CryptoJS.enc.Base64.parse(encrypted))
  return decrypt
}