import { decodePicture } from '@/utils/decryptPic'
import { globalStore } from '@/store'
import lazy from '@/utils/lazy'

export default (app) => {
  /**
   * 加密图片懒加载（仅限图片）
   * @param {String} binding.value 图片地址
   * @param {Boolean} binding.modifiers 修饰符 background 做为背景图
   */
  app.directive('depic', {
    mounted(el, binding){
      const { secret, staticDomain } = globalStore.cloud
      let url = binding.value
      if (!url) return
      if (url.startsWith('tg/')) {
        url = `${staticDomain || 'https://api.telegram.org'}/${url}`
      } else if (url.startsWith('blob:http')) {
        return el.src = url
      } else if (url.startsWith('/pic/')) {
        url = `${globalStore.fetchURL}${url}`
      }
      let imgEl
      if (el.tagName !== 'IMG') {
        imgEl = el.querySelector('img')
      }

      lazy(el, () => {
        decodePicture({
          url, 
          key: secret
        }).then(bloburl => {
          (imgEl||el).src = bloburl
        }).catch(e=>{
          (imgEl||el).src = url
          console.error(e)
        })
      })
    }
  })
}