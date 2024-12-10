import {createVNode, render} from 'vue'
import Toast from './index.vue'

const defaultOptions = {
  duration: 3000
}

export default options => {
  if (typeof options === 'string') {
    options = {...defaultOptions, title:options}
  } else {
    options = {...defaultOptions, ...options}
  }
  
  const div = document.createElement('div')
  const vm = createVNode(Toast, options)

  render(vm, div)
  document.body.append(div)

  const remove = () => {
    div.remove()
  }

  if(options.duration){
    const t = setTimeout(()=>{
      remove()
      clearTimeout(t)
    }, options.duration)
  }
  return{
    remove
  }
}