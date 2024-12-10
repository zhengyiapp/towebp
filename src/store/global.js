import { defineStore } from 'pinia'

const storeName = 'global'
export default defineStore(storeName, {
  state: () => {
    const caches = localStorage.getItem(`store:${storeName}`)
    if (caches) {
      return JSON.parse(caches)
    }
    return {
    }
  },
  getters: {
  },
  actions: {
    asyncData(){
      
    },
  }
})