<template>
  <Modal
    v-model:open="show"
    wrapClassName="editor-modal"
    :title="title"
    centered
    destroyOnClose
    cancel-text="取消"
    ok-text="插入"
    :width="1200"
    @ok="onOk"
  >
    <Editor
      id="editorModal"
      v-model="content"
      :options="options"
    >
    </Editor>
  </Modal>
</template>

<script setup>
import { ref, computed } from 'vue'
import { Modal } from 'ant-design-vue'
import Editor from './index.vue'

const props = defineProps({
  title: String,
  content: String,
  open: Boolean,
  options: {
    type: Object,
    default: {
      toolbar: 'styles bold italic underline strikethrough forecolor backcolor | link unlink alignleft aligncenter numlist bullist emoticons image cloud | code removeformat |'
    }
  }
})

const emits = defineEmits(['update:open', 'insert', 'update:content'])

const show = computed({
  get(){return props.open},
  set(v){emits('update:open', v)}
})
const content = ref(props.content)

const onOk = () => {
  emits('insert', content.value)
}
</script>

<style lang="scss">
.editor-modal{
  .ant-modal-content{
    padding: 0;
  }
  .ant-modal-header{
    padding: 20px 24px;
    border-bottom: solid 1px var(--borderColor);
  }
  .ant-modal-footer{
    padding: 20px 24px;
    border-top: solid 1px var(--borderColor);
  }
}
</style>