<template>
  <div :id="props.id" :class="{'tinymce-inline-editor': options.inline}"></div>
  <CloudModal v-model:open="showCloud" @insert="onCloudInsert" />
  <!-- <EditorModal v-if="showEditorModal" v-model:open="showEditorModal" title="添加付费内容" @insert="onPaidContentInsert" /> -->
</template>

<script setup>
import { onMounted, onBeforeUnmount, ref } from 'vue'
import { useTinyConfig, cloudUploader } from './methods'
import loadjs from './loadjs'
import CloudModal from '@/pages/cloud/modules/modal.vue'
// import EditorModal from './modal.vue'
import { decodePicture } from '@/utils/decryptPic'
import { globalStore } from '@/store'
import lazy from '@/utils/lazy'

const props = defineProps({
  modelValue: String,
  imgBaseUrl: {
    type: String,
    default: '',
  },
  id: {
    type: String,
    default: 'editor',
  },
  imgDomain: {
    type: String,
    default: '',
  },
  options: {
    type: Object,
    default: () => ({}),
  },
  dark: Boolean,
  placeholder: {type:String, default:'请输入内容'},
})
const emit = defineEmits(['update:modelValue'])
const { secret, staticDomain } = globalStore.cloud

const showCloud = ref(false)
// const showEditorModal = ref(false)
let editor

// let firstWatchFlag = true
// watch(() => props.modelValue, (newVal) => {
//   if (firstWatchFlag && editor) {
//     firstWatchFlag = false
//     editor.setContent(newVal)
//   }
// })

const onCloudInsert = (filesInfo) => {
  cloudUploader(editor, filesInfo)
  showCloud.value = false
}

// const onPaidContentInsert = (paidContent) => {
//   if (paidContent) {
//     editor.execCommand('mceInsertContent', false, `<div></div><div class="__paid-content__">${paidContent}</div><div></div>`)
//   }
//   showEditorModal.value = false
// }

const init = async () => {
  let content_style = '.mce-content-body{font-family: "Open Sans", -apple-system, BlinkMacSystemFont, "Helvetica Neue", Helvetica, Segoe UI, Arial, Roboto, "PingFang SC", "miui", "Hiragino Sans GB", "Microsoft Yahei", sans-serif;font-size:14px;}'
  if (props.dark) content_style += '.mce-content-body{color:#fff}.mce-content-body[data-mce-placeholder]::before{color:#525252!important}'

  return new Promise((resolve, reject) => {
    tinymce.init({
      selector: `#${props.id}`,
      ...useTinyConfig(),
      ...props.options,
      dark: props.dark ? 'dark' : '',
      placeholder: props.placeholder,
      content_style,
      setup(e){
        editor = e
        editor.on('change input undo redo', () => {
          let newContent = editor.getContent();
          if (newContent) {
            const cloudSourceInitReg = /(<(img|a).*?)\s(src|href)=".*?"(.*?data\-cf=.*?data\-src=.*?>)/g
            newContent = newContent.replace(cloudSourceInitReg, '$1$4')
          }
          emit('update:modelValue', newContent)
        })
        e.ui.registry.addButton('cloud', {
          tooltip: '云盘',
          icon: 'gallery',
          onAction: () => {
            showCloud.value = true
          }
        })
        e.ui.registry.addButton('paid', {
          tooltip: '添加加密内容',
          icon: 'lock',
          onAction: () => {
            // showEditorModal.value = true
            editor.execCommand('mceInsertContent', false, `<div></div><div class="__paid-content__">请在此输入加密内容</div><div></div>`)
          }
        })
      },
      init_instance_callback(editor) {
        if (props.modelValue) {
          // 设置编辑器内容
          editor.setContent(props.modelValue)

          // 云盘资源（图片）懒加载与解码
          let lazyImg = [], aLinks = []
          if (props.options.inline) {
            lazyImg = document.querySelectorAll('img.cf-source')
            aLinks = document.querySelectorAll('a.cf-source')
          } else {
            const editorIframe = document.querySelector(`#${props.id}+.tox-tinymce iframe`)
            lazyImg = editorIframe.contentWindow.document.querySelectorAll('img.cf-source')
            aLinks = editorIframe.contentWindow.document.querySelectorAll('a.cf-source')
          }
          lazyImg.forEach(el => {
            const isCloudFlare = el.dataset['cf'] == 1
            lazy(el, () => {
              decodePicture({
                url: isCloudFlare ? `${staticDomain}/${el.dataset['src']}` : el.dataset['src'],
                key: secret,
              }).then(bloburl => {
                el.src = bloburl
              }).catch(e=>{
                console.error(e)
              })
            })
          })
          aLinks.forEach(el => {
            const isCloudFlare = el.dataset['cf'] == 1
            el.href = isCloudFlare ? `${staticDomain}/${el.dataset['src']}` : el.dataset['src']
          })
        }

        resolve(editor)
      },
      ...props.options,
    })
  })
}

const reload = () => {
  setTimeout(() => {
    editor.destroy()
    init()
  }, 0)
}

defineExpose({
  reload
})

onMounted(async () => {
  loadjs().then(init)
})
onBeforeUnmount(()=>{
  if (editor) editor.destroy()
})
</script>

<style lang="scss">
.tinymce-inline-editor{
  border: 1px solid #d9d9d9!important;
  border-radius: 6px!important;
  overflow-y: auto;
  padding: 4px 12px;
  &:focus{
    border-color: rgb(var(--primary))!important;
    box-shadow: 0 0 0 2px rgba(var(--primary), 0.2);
  }
  &::before{
    left: 12px!important;
    color: rgb(var(--grey))!important;
  }
  p{
    margin: 0 0 1em;
  }
}
</style>