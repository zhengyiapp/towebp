<template>
  <div ref="chartRef" class="echarts-area"></div>
</template>

<script setup>
import { ref, onMounted, nextTick, onBeforeUnmount, watch } from 'vue'
import echarts from './index.js'
import usePieOptions from './pieOptions'
import useGlobalStore from '@/store/global'

const props = defineProps({
  names:{type:Array, default:()=>[]},
  series:{type:Array, default:()=>[]},
})

const globalStore = useGlobalStore()
const chartRef = ref(null)
let options = usePieOptions({...props, echarts, isDark:globalStore.theme==='dark'})
let chart

const resizeHandle = () => {
  chart.resize()
}

watch(() => globalStore.theme, theme => {
  options = usePieOptions({...props, echarts, isDark:theme==='dark'})
  chart.setOption(options)
})

onMounted(() => {
  nextTick(() => {
    chart = echarts.init(chartRef.value)
    chart.setOption(options)
    window.addEventListener('resize', resizeHandle)
  })
})
onBeforeUnmount(() => {
  window.removeEventListener('resize', resizeHandle)
})
</script>

<style scoped>
.echarts-area{
  width: 100%;
}
</style>