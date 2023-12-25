<template>
    <div>
      <a-button type="primary" @click="showModal">Open Modal with async logic</a-button>
      <a-modal v-model:open="open" title="编写题解" :confirm-loading="confirmLoading" @ok="handleOk" width="1500px" :bodyStyle="{   'height': '600px','overflow': 'hidden', 'overflowY': 'scroll', }">
        <label>请在下方编写你的题解,完成后记得点击提交</label>
        <div >
            <v-md-editor v-model="markdown" :height="height"></v-md-editor>
        </div>
      </a-modal>
    </div>
  </template>
  <script lang="ts" setup>
  import { ref } from 'vue';
  const modalText = ref<string>('Content of the modal');
  const open = ref<boolean>(false);
  const confirmLoading = ref<boolean>(false);
  const markdown = ref("")
  const showModal = () => {
    open.value = true;
  };
  
  const height = ref('575px') // modal高度·25px
  const handleOk = () => {
    modalText.value = 'The modal will be closed after two seconds';
    confirmLoading.value = true;
    setTimeout(() => {
      open.value = false;
      confirmLoading.value = false;
    }, 2000);
  };
  </script>
<style scoped >
.ant-modal-body {
  min-height: 300px;
  overflow-y: auto;
}
</style>
  
  