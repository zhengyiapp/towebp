import { globalStore } from '@/store'
import { decodePicture } from '@/utils/decryptPic'
import lazy from '@/utils/lazy'

export default () => {
  // 云盘解密密匙，云盘静态域名
  const { secret, staticDomain } = globalStore.cloud
  const lazyImgs = document.querySelectorAll('img.cf-source'), aLinks = document.querySelectorAll('a.cf-source')
  // 云盘图片
  lazyImgs.forEach(el => {
    const isCloudFlare = el.dataset['cf'] == 1
    el.src = '/img/loading2.png'
    // 图片懒加载
    lazy(el, () => {
      // 图片解密
      decodePicture({
        url: isCloudFlare ? `${staticDomain}/${el.dataset['src']}` : el.dataset['src'],
        key: secret
      }).then(bloburl => {
        el.src = bloburl
      }).catch(e=>{
        console.error(e)
      })
    })
  })
  // 云盘链接
  aLinks.forEach(el => {
    const isCloudFlare = el.dataset['cf'] == 1
    el.href = isCloudFlare ? `${staticDomain}/${el.dataset['src']}` : el.dataset['src']
  })
}