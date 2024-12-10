<template>
  <div v-show="showGotop" class="mao-gotop" @click="gotoTop">
    <IconTop />
  </div>
</template>

<script setup>
import { ref, onMounted, onUnmounted } from 'vue'
import { useThrottleFn } from '@vueuse/core'
import IconTop from './icon/arrow-top.vue'

const props = defineProps({
  scroller: {type:Element}
})

const showGotop = ref(false)
const gotoTop = () => {
  (props.scroller || window).scrollTo(0, 0)
}

let lastTop = 0
const scrollHandle = useThrottleFn(() => {
  let top = 0
  if (props.scroller) {
    top = props.scroller.scrollTop
  } else {
    top = window.scrollY
  }
  // 显示返回顶部按钮
  if (top > 400) showGotop.value = true
  else showGotop.value = false
  lastTop = top
}, 60)

onMounted(() => {
  // 窗口滚动监听返回顶部
  (props.scroller || window).addEventListener('scroll', scrollHandle)
  scrollHandle()
})

onUnmounted(() => {
  (props.scroller || window).removeEventListener('scroll', scrollHandle)
})
</script>

<style lang="scss">
.mao-gotop{
  position: fixed;
  bottom: 5em;
  right: 3em;
  width: 4em;
  font-size: .9em;
  z-index: 99;
  display: block;
  height: 2.5em;
  line-height: 3;
  text-align: center;
  border-radius: 1em;
  background-color: rgba(var(--white));
  box-shadow: 0 0 6px rgba(var(--primary), 0.2);
  cursor: pointer;
  transition: all .2s;
  .mao-icon{
    position: relative;
    top: 0;
    transition: all .2s;
  }
  &:hover{
    box-shadow: 0 0 20px rgba(var(--primary), 0.3);
    .mao-icon{
      top: -2px;
    }
  }
}
</style>