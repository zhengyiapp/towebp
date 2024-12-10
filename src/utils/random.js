export const randomNum = (len = 6) => parseInt(Math.random().toString().slice(-len))
export const randomStr = (len = 6) => {
  let ranStr = Math.random().toString(16).slice(-len).replace(/^0\./,'')
  if (ranStr.length < len) {
    ranStr = `${ranStr}${randomStr(len - ranStr.length)}`
  }
  return ranStr
}