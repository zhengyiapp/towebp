<template>
  <div class="mao-tab-selector">
    <div 
      v-for="v in tabs" 
      class="item" 
      :class="{active: v.key === value || value?.includes(v.key)}"
      :key="v.key" 
      @click="onChange(v)"
    >
      {{ v.name }}
    </div>
  </div>
</template>

<script setup>
const props = defineProps({
  multiple: Boolean,
  value: [Array, Number, String, Boolean],
  tabs: {type: Array, default:() => []},
})
const emits = defineEmits(['update:value', 'change'])

const onChange = record => {
  if (props.multiple) {
    const values = new Set(props.value)
    if (props.value.includes(record.key)) {
      values.delete(record.key)
    } else {
      values.add(record.key)
    }
    emits('update:value', Array.from(values))
    emits('change', props.value)
  } else {
    if (record.key === props.value) {
      const type = typeof props.value
      emits(
        'update:value', 
        type==='object' ? [] :
          type==='number' ? 0 :
          type==='string' ? '' :
          type==='boolean' ? false : true
      )
    } else {
      emits('update:value', record.key)
    }
    emits('change', props.value)
  }
}
</script>

<style lang="scss">
.mao-tab-selector{
  display: flex;
  flex-wrap: wrap;
  gap: .6em;
  .item{
    background-color: rgba(var(--content), .1);
    border-radius: .5em;
    display: inline-flex;
    align-items: center;
    justify-content: center;
    padding: 0 .8em;
    min-width: 5em;
    transition: all .3s;
    &:not(.active):hover,&.active{
      cursor: pointer;
      background-color: rgb(var(--primary));
      color: #fff;
    }
  }
}
</style>