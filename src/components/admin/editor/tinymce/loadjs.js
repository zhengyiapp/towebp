let isLoadedTinyMCE = false

export default () => {
  return new Promise((resolve, reject) => {
    if (isLoadedTinyMCE) return resolve()
    let js = document.querySelector('#tinymce')
    if (!js) {
      js = document.createElement('script')
      js.id = 'tinymce'
      js.src = '/assets/tinymce/tinymce.min.js'
      document.body.append(js)
    }
    const okHandle = () => {
      isLoadedTinyMCE = true
      resolve()
      js.removeEventListener('load', okHandle)
    }
    const errHandle = () => {
      reject('TinyMCE编辑器加载失败')
      js.removeEventListener('error', errHandle)
    }
    js.addEventListener('load', okHandle)
    js.addEventListener('error', errHandle)
  })
}