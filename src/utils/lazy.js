export default (el, callback) => {
  if (typeof IntersectionObserver === 'function') {
    const observer = new IntersectionObserver((entries, observer) => {
      entries.forEach((entry) => {
        if (entry.isIntersecting) {
          const _el = entry.target
          callback(_el)
          observer.unobserve(_el)
        }
      })
    })

    observer.observe(el)
  } else {
    callback()
  }
}