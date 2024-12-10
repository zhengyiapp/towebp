<template>
  <div class="cloud-poster-upload" :class="[`cloud-poster-mode-${mode}`, mode === 'whole' ? 'whole' : '']" @click="() => showCloud = true">
    <template v-if="modelValue">
      <img v-depic="blobURL||previewURL||modelValue" />
      <div class="close" @click.stop="clear">&times;</div>
    </template>
    <div v-else class="f fc upload-tips">
      <div class="fs30">+</div>
      <div>{{ text }}</div>
    </div>
  </div>
  <CloudModal v-model:open="showCloud" :confirmLoading="insertLoading" @insert="onPosterInsert" @cancel="onCancel" />
</template>

<script setup>
import { ref } from 'vue'
import CloudModal from '@/pages/cloud/modules/modal.vue'

defineProps({
  modelValue: String,
  previewURL: String,
  mode: {type:String, default:'cover'},
  text: {type:String, default:'上传图片'},
})

const showCloud = ref(false)
const emits = defineEmits(['update:modelValue'])
const insertLoading = ref(false)

const clear = () => {
  emits('update:modelValue', '')
}

const blobURL = ref('')

const onPosterInsert = async (files) => {
  if (!files.length) return
  try{
    insertLoading.value = true
    if (files[0].blobSrc) blobURL.value = files[0].blobSrc
    emits('update:modelValue', '')
    setTimeout(() => emits('update:modelValue', files[0].src), 0)
    showCloud.value = false
  }finally{
    insertLoading.value = false
  }
}

const onCancel = () => {
  insertLoading.value = false
}
</script>

<style lang="scss">
.cloud-poster-upload{
  background-color: rgba(var(--content), .08);
  height: 160px;
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
  &.cloud-poster-mode-cover{
    background-size: cover;
  }
  &.cloud-poster-mode-whole{
    background-image: none!important;
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
</style>