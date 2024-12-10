import {createVNode, render} from 'vue'
import Message from './index.vue'

const defaultOptions = {
  duration: 2000
}

export default options => {
  const opt = {...defaultOptions, ...options}
  const div = document.createElement('div')
  const vm = createVNode(Message, opt)
  let messageNode = document.querySelector('#message')
  render(vm, div)
  if (!messageNode) {
    messageNode = document.createElement('div')
    messageNode.id = 'message'
    document.body.append(messageNode)
  }
  messageNode.appendChild(div)
  const remove = () => {
    const t2 = setTimeout(() => {
      vm.el.classList.add('remove')
      clearTimeout(t2)
    }, 300)
    const t = setTimeout(()=>{
      render(null, div)
      messageNode.removeChild(div)
      clearTimeout(t)
    }, 600)
  }
  const closeBtn = div.querySelector('.close')
  if (closeBtn) closeBtn.onclick = remove
  if(opt.type==='loading')opt.duration=0
  if(opt.duration){
    const t = setTimeout(()=>{
      remove()
      clearTimeout(t)
    },opt.duration)
  }
  return{
    remove
  }
}