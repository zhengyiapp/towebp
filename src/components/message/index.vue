<template>
  <div :class="['_message', {eventsAllowed:closable}]">
    <Loading v-if="type==='loading'"></Loading>
    <i v-else-if="type" :class="['fa-solid', 'fa-'+mapType[type], type]"></i>
    <div v-if="content" class="_m_content" v-html="content"></div>
    <span v-if="duration==0" class="close" @click="remove">&times;</span>
  </div>
</template>

<script>
import {defineComponent} from 'vue'
import Loading from '@/components/loading/index.vue'
export default defineComponent({
  name: 'Message',
  components: {Loading},
  props: {
    closable: {type:Boolean,default:false},
    content: {type:String},
    duration: {type:Number,default:2000},
    type: {default: 'info'}
  },
  setup(){
    return{
      mapType: {
        'info': 'circle-info',
        'warning': 'triangle-exclamation',
        'success': 'circle-check',
        'error': 'circle-xmark'
      }
    }
  }
})
</script>

<style>
#message{
  position: fixed;
  z-index: 999;
  top: 1em;
  pointer-events: none;
  left: 0;
  top: 0;
  width: 100%;
  height: 100%;
  display: flex;
  align-items: center;
  justify-content: center;
  flex-direction: column;
  color: initial;
  padding: 0 6%;
}
._message.remove{
  top: -5em;
  opacity: 0;
}
._message{
  position: relative;
  top: 0;
  opacity: 1;
  transition: all .3s;
  background-color: var(--color-background-white);
  border-radius: 5px;
  padding: 1em 1.5em;
  box-shadow: 0 0 20px var(--box-shadow-color);
  display: inline-flex;
  align-items: center;
  justify-content: center;
  margin-top: 10px;
  font-size: 1.3em;
  border: solid 1px var(--divider-light-2);
}
._message.eventsAllowed{
  pointer-events: all;
}
._message .close{
  color: var(--color-text-gray);
  position: absolute;
  top: 0;
  right: 6px;
  z-index: 9;
  cursor: pointer;
  pointer-events: all;
  font-size: 22px;
  line-height: 1;
}
._message .close:hover{
  color: var(--color-text);
}
._message ._icon-loading{
  font-size: 1em;
  color: var(--color-text-gray);
}
._message ._m_content{
  margin-left: 6px;
}
._message .info{
  color: var(--info-color);
}
._message .warning{
  color: var(--warning-color);
}
._message .error{
  color: var(--error-color);
}
._message .success{
  color: var(--success-color);
}
</style>