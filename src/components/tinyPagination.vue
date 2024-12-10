<template>
  <div class="dhy-tiny-pagination">
    <div class="left" :class="{disabled:isFirstPage}" title="上一页" @click="onPrev">&laquo;</div>
    <div class="right" :class="{disabled:isLastPage}" title="下一页" @click="onNext">&raquo;</div>
  </div>
</template>

<script setup>
import { computed } from 'vue'

const props = defineProps({
  current: {type:Number, default:1},
  pageSize: {type:Number, default:20},
  total: {type:Number, default:0}
})
const emits = defineEmits(['change', 'update:current'])

const pagesCount = computed(() => Math.ceil(props.total/props.pageSize))
const isFirstPage = computed(() => pagesCount.value === 0 || props.current === 1)
const isLastPage = computed(() => pagesCount.value === 0 || props.current === pagesCount.value)

const onPrev = () => {
  const current = props.current - 1
  emits('update:current', current)
  emits('change', current)
}
const onNext = () => {
  const current = props.current + 1
  emits('update:current', current)
  emits('change', current)
}
</script>

<style lang="scss">
.dhy-tiny-pagination{
  display: flex;
  align-items: center;
  gap: .2em;
  .left, .right{
    border: solid 2px rgba(var(--content),.3);
    color: rgba(var(--content),.3);
    width: 22px;
    height: 22px;
    line-height: 18px;
    border-radius: 6px;
    display: inline-flex;
    justify-content: center;
    cursor: pointer;
    transition: all .2s;
    font-weight: bold;
    &:hover{
      border-color: rgba(var(--content),1);
      color: rgba(var(--content),1);
    }
    &.disabled{
      opacity: .5;
      cursor: not-allowed;
      pointer-events: none;
    }
  }
}
</style>