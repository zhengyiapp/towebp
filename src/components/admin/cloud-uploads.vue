<template>
  <div class="cloud-uploads">
    <div class="item" v-for="(v, i) in values" :key="`${v}-${i}`" @click="onClick(i)">
      <template v-if="v">
        <img v-if="globalStore.cloud.staticDomain" v-depic="`${globalStore.cloud.staticDomain}/${v}`" />
        <div class="close" @click.stop="clear(i)">&times;</div>
      </template>
      <div v-else class="f fc upload-tips">
        <div class="fs30">+</div>
        <div>{{ text }}</div>
      </div>
    </div>
    <div class="item" @click="onClick()">
      <div class="f fc upload-tips">
        <div class="fs30">+</div>
        <div>{{ text }}</div>
      </div>
    </div>
  </div>
  <CloudModal v-model:open="showCloud" :confirmLoading="insertLoading" @insert="onPosterInsert" @cancel="onCancel" />
</template>

<script setup>
import { ref, computed } from 'vue'
import CloudModal from '@/pages/cloud/modules/modal.vue'
import { globalStore } from '@/store'

const props = defineProps({
  modelValue: {type:Array, default:()=>[]},
  previewURL: String,
  mode: {type:String, default:'cover'},
  text: {type:String, default:'上传图片'},
})

const showCloud = ref(false)
let curIndex = null
const values = computed({
  get(){return props.modelValue},
  set(v){emits('update:modelValue', v)}
})
const insertLoading = ref(false)

const emits = defineEmits(['update:modelValue'])

const onClick = (index) => {
  curIndex = index
  showCloud.value = true
}

const clear = (index) => {
  values.value.splice(index, 1)
}

const onPosterInsert = async (files) => {
  if (!files.length) return
  try{
    insertLoading.value = true
    if (curIndex === 0 || curIndex > 0) {
      values.value[curIndex] = files[0].src
    } else {
      values.value.push(...files.map(f => f.src))
    }
    showCloud.value = false
  }finally{
    insertLoading.value = false
  }
}

const onCancel = () => {
  curIndex = null
  insertLoading.value = false
}
</script>

<style lang="scss">
.cloud-uploads{
  display: flex;
  flex-wrap: wrap;
  gap: 1em;
  .item{
    background-color: rgba(var(--content), .08);
    height: 180px;
    width: 254px;
    display: flex;
    align-items: center;
    justify-content: center;
    color: var(--grey);
    text-align: center;
    cursor: pointer;
    overflow: hidden;
    position: relative;
    border-radius: 5px;
    &:hover{
      border: dotted 1px rgb(var(--primary));
      .close{
        display: block;
      }
    }
    .upload-tips{
      color: rgba(var(--content), .5);
    }
    .fs30{
      font-size: 30px;
      line-height: 1;
    }
    &>img{
      max-width: 100%;
      max-height: 100%;
    }
    .close{
      position: absolute;
      width: 50px;
      height: 50px;
      line-height: 65px;
      background-color: rgb(var(--error));
      color: #fff;
      right: -25px;
      top: -25px;
      z-index: 9;
      border-radius: 30px;
      text-align: left;
      font-size: 16px;
      padding: 0 0 0 10px;
      display: none;
    }
  }
}
</style>