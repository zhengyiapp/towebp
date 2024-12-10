<template>
  <div class="home-page">
    <div class="max max-800">
      <div class="mb-12 font-24"><b>JPG/PNG/GIF → WebP</b></div>

      <div class="display-f flex-wr flex-ac font-12 gap-36 mb-24">
        <div class="form-item display-f flex-ac">
          <label>默认压缩率：</label>
          <Slider v-model:value="rate" :min="1" :max="100" :style="{width:'160px', marginRight:'1em'}" />
          <InputNumber v-model:value="rate"></InputNumber>
        </div>
        <div class="form-item display-f flex-ac">
          <label>GIF压缩率：</label>
          <Slider v-model:value="gifRate" :min="1" :max="100" :style="{width:'160px', marginRight:'1em'}" />
          <InputNumber v-model:value="gifRate"></InputNumber>
        </div>
      </div>

      <Spin :spinning="uploading" class="uploader" @click="onUpload">
        <InboxOutlined></InboxOutlined>
        <p class="mt-12">点击选择文件夹</p>
        <p class="txt-gr">
          仅文件夹选择，仅支持 jpg/png/gif 格式
        </p>
      </Spin>
      <div class="files">
        <div v-for="file in files" :key="file.fileName" class="display-f flex-ac file-item" :class="{[file.status||'loading']:true}">
          <CheckCircleOutlined v-if="file.status === 'success'" />
          <CloseCircleOutlined v-else-if="file.status === 'error'" />
          <IconLoading v-else />
          <span class="ellipsis-1 mr-36">{{ file.fileName }}</span>
          <!-- <DeleteOutlined class="ml-auto" /> -->
          <div v-if="file.msg" class="ml-auto msg" :title="file.msg" :style="{maxWidth:'50%'}">消息:{{ file.msg }}</div>
        </div>
      </div>
    </div>
  </div>
</template>

<script setup>
import { ref, computed, onMounted } from 'vue'
import { globalStore } from '@/store'
import { UploadDragger, Button, Slider, InputNumber } from 'ant-design-vue'
import { InboxOutlined, FileImageOutlined, DeleteOutlined, CheckCircleOutlined, CloseCircleOutlined } from '@ant-design/icons-vue'
import Spin from '@/components/spin.vue'
import IconLoading from '@/components/loading.vue'

const { ipcRenderer } = require('electron')

const rate = ref(99)
const gifRate = ref(75)
const files = ref([])
const uploading = computed(() => {
  const loadingList = files.value.filter(file => !file.status || file.status === 'loading')
  return loadingList.length > 0
})
const onUpload = () => {
  ipcRenderer.invoke('req:askDialog', {
    rate: rate.value,
    gifRate: gifRate.value
  })
  ipcRenderer.addListener('res:askDialog', (e, args) => {
    console.log(args)
    if (args.code == 200) {
      uploading.value = true
      files.value = args.data.files
    }
  })
}

const onTest = () => {
  ipcRenderer.invoke('req:test', {})
}

// ipcRenderer.on('res:test', (e, args) => {
//   console.log(args)
// })
</script>

<style lang="scss" scoped>
.home-page{
  text-align: center;
  padding: var(--boxPadding);
  :deep(.anticon-inbox){
    font-size: 60px;
    color: rgb(var(--primary));
  }
  :deep(.ant-upload-list-item){
    text-align: left;
  }
  
  .uploader{
    position: relative;
    width: 100%;
    height: 100%;
    text-align: center;
    background: rgba(0, 0, 0, 0.02);
    border: 1px dashed #d9d9d9;
    border-radius: 8px;
    cursor: pointer;
    transition: border-color 0.3s;
    padding: 1em;
    overflow: hidden;
    &:hover{
      border-color: rgb(var(--primary));
    }
    &.spinning{
      pointer-events: none;
    }
  }

  .files{
    padding: 3px 0;
    font-size: 12px;
    .file-item{
      padding: 3px 0;
      text-align: left;
      border-bottom: solid 1px rgba(var(--content), .1);
      .ellipsis-1{
        margin-left: 5px;
      }
      .msg{
        overflow: hidden;text-overflow:ellipsis;white-space: nowrap;
      }
    }
    :deep(.anticon-delete){
      cursor: pointer;
      &:hover{
        color: rgb(var(--error));
      }
    }
    :deep(.anticon-check-circle){
      color: rgb(var(--success));
    }
    :deep(.anticon-close-circle){
      color: rgb(var(--error));
    }
  }
}
</style>