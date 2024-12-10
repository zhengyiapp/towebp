<template>
  <div class="spin" :class="{spinning}">
    <slot></slot>
    <div v-if="spinning" class="spin-mask">
      <div>
        <Loading />
        <span v-if="text">{{ text }}</span>
      </div>
    </div>
  </div>
</template>

<script setup>
import Loading from './loading.vue'
defineProps({
  spinning: Boolean,
  text: String
})
</script>

<style lang="scss">
.spin{
  position: relative;
  .spin-mask{
    position: absolute;
    z-index: 998;
    width: 100%;
    height: 100%;
    left: 0;
    top: 0;
    background: rgba(var(--white),.75);
    text-align: center;
    display: flex;
    align-items: center;
    justify-content: center;
    &>div{
      gap: .6em;
    }
  }
}
</style>