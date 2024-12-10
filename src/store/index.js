import { createPinia } from 'pinia'
import useGlobalStore from './global'

const store = createPinia()

export const globalStore = useGlobalStore(store)

export const usePersist = (store) => {
  // 每当数据发生改变进行持久化储存
  store.$subscribe((mutation, state) => {
    localStorage.setItem(`store:${store.$id}`, JSON.stringify(state))
  })
}
// 默认对globalStore进行持久化储存
usePersist(globalStore)

export default store