<template>
  <a
    class="item"
    :href="link || item.link" 
    target="_blank" 
  >
    <div :style="`${item.styles}`">
      <div v-if="item.logo" class="img-box">
        <img v-depic="item.logo">
      </div>
      <span>
        {{ title || item.name }}
        <label v-if="item.tag" :style="item.tagStyles">{{ item.tag }}</label>
      </span>
    </div>
  </a>
</template>

<script setup>
defineProps({
  item: {type:Object, default:()=>({})},
  link: String,
  title: String,
})
</script>