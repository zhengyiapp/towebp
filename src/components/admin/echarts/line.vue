<template>
  <div ref="lineChart" class="echarts-line"></div>
</template>

<script setup>
import { ref, onMounted, nextTick, onBeforeUnmount, watch } from 'vue'
import echarts from './index.js'
import useLineOptions from './lineOptions'
import useGlobalStore from '@/store/global'

const props = defineProps({
  xAxis:{type:Array, default:()=>[]},
  series:{type:Array, default:()=>[]},
  legend:{type:Array, default:()=>[]},
})

const globalStore = useGlobalStore()
const lineChart = ref(null)
let options = useLineOptions({...props, echarts, isDark:globalStore.theme==='dark'})
let chart

const resizeHandle = () => {
  chart.resize()
}

watch(() => globalStore.theme, theme => {
  options = useLineOptions({...props, echarts, isDark:theme==='dark'})
  chart.setOption(options)
})

onMounted(() => {
  nextTick(() => {
    chart = echarts.init(lineChart.value)
    chart.setOption(options)
    window.addEventListener('resize', resizeHandle)
  })
})
onBeforeUnmount(() => {
  window.removeEventListener('resize', resizeHandle)
})
</script>

<style scoped>
.echarts-line{
  width: 100%;
}
</style>