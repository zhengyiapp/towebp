export default ({ windowKey, url }) => {
  return new Promise((resolve, reject) => {
    const js = document.createElement('script')
    window[windowKey] = null
    js.onload = () => {
      setTimeout(() => {
        js.remove()
        if (window[windowKey]) {
          window[windowKey] = null
          resolve()
        }
        else reject()
      }, 0)
    }
    js.onerror = (e) => {
      js.remove()
      reject(e)
    }
    js.src = url
    document.body.append(js)
  })
}