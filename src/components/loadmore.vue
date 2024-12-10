<template>
  <div class="mao-loadmore f ac jc" :class="{loading}">
    <LoadingIcon v-if="loading" class="mr12" />
    加载更多
  </div>
</template>

<script setup>
import LoadingIcon from './loading.vue'

const props = defineProps({
  loading: Boolean,
})
</script>

<style lang="scss">
.mao-loadmore{
  padding: .7em;
  margin-top: .6em;
  font-size: 12px;
  gap: .6em;
  border-radius: .7em;
  background-color: rgba(var(--primary), .03);
  color: rgba(var(--content), .5);
  cursor: pointer;
  transition: all .2s;
  &:hover{
    background-color: rgba(var(--primary), .1);
    color: rgba(var(--content), 1);
  }
  &.loading{
    background-color: rgba(var(--primary), .03);
    color: rgba(var(--content), .5);
    pointer-events: none;
  }
}
</style>