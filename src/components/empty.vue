<template>
  <div class="dhy-empty">
    <div class="i"><EmptyIcon /></div>
    <div v-if="content" class="p">{{ content }}</div>
  </div>
</template>

<script setup>
import EmptyIcon from '@/components/icon/empty.vue'
defineProps({
  content: {type:String, default:'暂无内容'}
})
</script>

<style lang="scss">
.dhy-empty{
  text-align: center;
  .i{
    font-size: 32px;
    color: rgba(var(--content),.5);
    svg{
      fill: rgba(var(--content),.5);
    }
  }
  .p{
    color: rgba(var(--content),.5);
    margin-top: 0;
  }
}
</style>