<template>
  <div class="f ac jb dhy-home-aside-title">
    <div class="f ac">
      <slot></slot>
      <ArrowRight />
    </div>
    <span class="f ac extra">
      <IconLoading v-if="loading" />
      <slot name="extra"></slot>
    </span>
  </div>
</template>

<script setup>
import ArrowRight from './icon/arrow-right.vue'
import IconLoading from '@/components/loading.vue'

defineProps({
  loading: Boolean
})
</script>

<style lang="scss">
.dhy-home-aside-title{
  font-weight: bold;
  font-size: 1.2em;
  margin-bottom: 1em;
  .dhy-icon{
    color: rgb(var(--second));
    fill: rgb(var(--second));
    margin-left: .5em;
    transition: all .2s;
  }
  &:hover{
    .dhy-icon{
      margin-left: .8em;
    }
  }
  .extra{
    font-size: 12px;
    color: rgb(var(--info));
    font-weight: normal;
    &:hover{
      font-weight: bold;
    }
    .dhy-icon-loading{
      margin-right: .3em;
      font-size: .9em;
    }
  }
}
</style>