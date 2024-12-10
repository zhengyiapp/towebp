<template>
  <div ref="stickyRef" class="admin-form-action-bar f ac jb" :class="{isSticky}">
    <button v-if="showBack" class="go-back" @click="router.back()"><i class="micon micon-left"></i>返回</button>
    <div v-else></div>
    <slot />
  </div>
</template>

<script setup>
import { onMounted, onBeforeUnmount, ref } from 'vue'
import { useRouter } from 'vue-router'

defineProps({
  showBack: {type:Boolean, default:true}
})

const router = useRouter()
const isSticky = ref(false)
const stickyRef = ref(null)
let scroller

const scrollHandle = () => {
  const scrollTop = scroller.scrollTop
  isSticky.value = scrollTop > 48
}

onMounted(() => {
  scroller = document.querySelector('.layout-content')
  scrollHandle()
  scroller.addEventListener('scroll', scrollHandle)
})
onBeforeUnmount(()=>{
  if (scroller) {
    scroller.removeEventListener('scroll', scrollHandle)
  }
})
</script>

<style lang="scss">
.admin-form-action-bar{
  height: 48px;
  top: 0;
  z-index: 899;
  position: sticky;
  left: 0;
  background-color: rgb(var(--white));
  border-bottom: solid 1px var(--borderColor);
  border-radius: 4px 4px 0 0;
  padding: 0 16px;
  transition: all .2s;
  &.isSticky{
    border-radius: 0 0 4px 4px;
    margin: 0 -16px;
  }
  .go-back{
    background-color: rgba(var(--content), 0.08);
    color: rgb(var(--content));
    border: 0;
    padding: .4em 1em;
    border-radius: 5px;
    cursor: pointer;
    &:hover{
      background-color: rgba(var(--primary), .1);
      color: rgb(var(--primary));
    }
  }
  .ant-btn{
    height: 30px;
    padding: 0 1em;
    margin-left: 10px;
  }
  .ant-space{
    margin-bottom: 0!important;
  }
}
</style>