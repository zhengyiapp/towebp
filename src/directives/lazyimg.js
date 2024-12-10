import lazy from '@/utils/lazy'

export default app => {
  /**
   * 懒加载（仅限图片）
   * @param {Object} binding.value 图片地址
   * @param {Boolean} binding.modifiers 修饰符 background 做为背景图
   */
  app.directive('lazyimg', {
    mounted(el, binding){
      const imgurl = binding.value
      if (!imgurl) return
      const {background} = binding.modifiers

      lazy(el, () => {
        if (background) {
          el.style.cssText = `background-image:url(${imgurl})`
        } else {
          el.src = imgurl
        }
      })
    }
  })
}