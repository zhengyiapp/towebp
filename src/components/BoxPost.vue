<template>
  <RouterLink
    class="item"
    :to="link || `/post/${item.id}`" 
  >
    <div :style="`${item.styles}`">
      <!-- <div v-if="item.poster" class="img-box">
        <img v-depic="item.poster">
      </div> -->
      <span>
        <span class="txt-ellipsis-1">{{ item.title }}</span>
        <label v-if="item.tag" :style="item.tagStyles">{{ item.tag }}</label>
      </span>
    </div>
  </RouterLink>
</template>

<script setup>
defineProps({
  item: {type:Object, default:()=>({})},
  link: String,
  poster: String,
})
</script>