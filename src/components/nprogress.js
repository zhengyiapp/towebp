let progressEl = null, endTimer = null, progressTimer = null

const remove = () => {
  if (progressEl) {
    if (endTimer) clearTimeout(endTimer)
    document.body.removeChild(progressEl)
    progressEl = null
  }
}

export default {
  start(){
    remove()
    const child = document.createElement('div')
    let percent = 5
    progressEl = document.createElement('div')
    progressEl.append(child)
    progressEl.style.cssText = 'position:fixed;top:0;left:0;width:100%;height:1px;z-index:9999'
    child.style.cssText = `background:var(--primary);transition:all .3s;width:${percent}%;height:1px`
    document.body.append(progressEl)
    const progressTimer = setInterval(() => {
      if (!progressEl || percent > 80 || child.style.width === '100%') {
        return clearInterval(progressTimer)
      }
      percent += 5
      progressEl.children[0].style.width = `${percent}%`
    }, 1000)
  },
  end(){
    if (progressTimer) clearInterval(progressTimer)
    if (progressEl) {
      progressEl.children[0].style.width = '100%'
      endTimer = setTimeout(() => {
        remove()
      }, 300)
    }
  }
}