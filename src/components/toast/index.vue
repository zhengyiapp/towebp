<template>
  <div class="dhy-toast">
    <div>
      <div v-if="type">
        <component :is="mapIcon[type]"></component>
      </div>
      <div v-if="title" class="t">{{ title }}</div>
      <div v-if="content" class="p">{{ content }}</div>
    </div>
  </div>
</template>

<script setup>
import WarnIcon from '../icon/warn.vue'
import InfoIcon from '../icon/info.vue'
import ErrorIcon from '../icon/error.vue'
import SuccessIcon from '../icon/success.vue'

defineProps({
  type: String,
  title: String,
  content: String,
})
const mapIcon = {
  warn: WarnIcon,
  info: InfoIcon,
  error: ErrorIcon,
  success: SuccessIcon,
}
</script>

<style lang="scss">
.dhy-toast {
  width: 100%;
  height: 100%;
  position: fixed;
  left: 0;
  top: 0;
  z-index: 998;
  display: flex;
  align-items: center;
  justify-content: center;
  pointer-events: none;
  &>div{
    background: rgba(0,0,0,.75);
    color: #fff;
    padding: 1.5em 2em;
    border-radius: 1.5em;
    max-width: 300px;
    min-width: 160px;
    text-align: center;
    display: flex;
    flex-direction: column;
    gap: 12px;
    word-break: break-all;
  }
  svg{
    fill: #fff;
    font-size: 32px;
  }
  .t{
    font-size: 1.2em;
    line-height: 1.4;
  }
  .p{
    font-size: .9em;
    line-height: 1.6;
  }
}
</style>