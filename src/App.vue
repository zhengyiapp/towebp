<template>
  <component :is="curLayoutComponent">
    <router-view v-slot="{ Component, route:comRoute }">
      <keep-alive>
        <component v-if="comRoute.meta.keepAlive" :is="Component" :key="comRoute.name" />
      </keep-alive>
      <component v-if="!comRoute.meta.keepAlive" :is="Component" :key="comRoute.name" />
    </router-view>
  </component>
</template> 

<script setup>
import { watch, shallowRef, defineAsyncComponent } from 'vue'
import { useRoute } from 'vue-router'

const route = useRoute()

// 布局异步组件
const layoutComponents = {
  'Default': defineAsyncComponent(() => import('@/layout/Default.vue')),
  'Blank': defineAsyncComponent(() => import('@/layout/Blank.vue')),
}
const curLayoutComponent = shallowRef(layoutComponents[route.meta.layout || 'Default'])

// 布局组件监听
watch(() => route.path, () => {
  curLayoutComponent.value = layoutComponents[route.meta.layout || 'Default']
})
</script>