<template>
  <!-- <v-md-editor v-model="text" height="400px"></v-md-editor>
     -->
  <a @click="router.back">
    <CloseCircleOutlined :style="{ fontSize: '20px', color: '#08c' }" />
  </a>
  <v-md-preview :text="text"></v-md-preview>
  <!-- <u-comment :config="config" @submit="submit" @like="like" relative-time> -->
    <!-- <div>这里编写主题帖内容</div> -->
    <!-- <div>导航栏卡槽</div> -->
    <!-- <template #header>头部卡槽</template> -->
    <!-- <template #info>用户信息卡槽</template> -->
    <!-- <template #card>用户信息卡片卡槽</template> -->
    <!-- <template #opearte>操作栏卡槽</template> -->
    <!-- <template #func>功能区域卡槽</template> -->
  <!-- </u-comment> -->
  <List>
    <ATextarea v-model:value="comment" placeholder="请输入评论内容" :auto-size="{ minRows: 4, maxRows: 7 }" />
    <div style="display:flex;justify-content: flex-end;">
      <AButton size="small" type="primary" style="margin-top: 20px;margin-bottom: 20px;"
        class="submit-green">评论
      </AButton>
    </div>
    <template v-for="item in currentSolution.comments">
      <ListItem style="flex-direction: column;align-items: flex-start;color: #595959;">
        <div style="display:flex;justify-content: space-between;width:100%;">
          <Space style="font-weight: 500;">
            {{ item.content }}
            <Tag v-if="item.contributorrole == 0" color="green" style="font-weight:700;border-radius:10px"> 学生 </Tag>
            <Tag v-else color="blue" style="font-weight:700;border-radius:10px"> 老师 </Tag>
          </Space>

          <span style="color: #bfbfbf;display: flex;align-items: center;">
            评论于
            <div class="dot"></div>
            <!-- {{ formatDate(item.createdAt) }} -->
            {{ item.createAt  }}
          </span>
        </div>
        <div>
          <div class="comment-content">
            {{ 10 }}
          </div>
        </div>
      </ListItem>
    </template>
  </List>
</template>

<script setup lang="ts">
import { ref } from 'vue'
import { CloseCircleOutlined } from '@ant-design/icons-vue';
import { List, ListItem, Space, Tag } from 'ant-design-vue';
let text = ref('## 你是傻逼吗\n不会吧不会吧，不会这种题都要看题解吧')
// 从后端读取


import router from '../router/index'


interface solution {
  id: number
  title: string
  content: string
  schoolId: number
  comments: Comment[]
  createdAt: string
}

const comment = ref("comment")
interface Comment {
  commmentid: number // 评论id
  content: string // 文本
  createAt: string // 创建时间
  contributorname: string
  contributorrole: number

}
const currentSolution = ref<solution>({
  id: 1,
  title: "题解1",
  content: "题解1内容gdfogjflkgadsl.gjs dfl;fgjdlfkjgdlksfgj\nfsdlfjasfkasdlkfjsadlsdafjls;adkfjsdkaf\n",
  schoolId: 1,
  createdAt: "2021-06-01 12:00:00",
  comments: [
    {
      commmentid: 0,
      content: "评论1",
      createAt: "2021-06-01 12:00:00",
      contributorrole: 0,
      contributorname: "张三",
    },
    {
      commmentid: 1,
      content: "评论2",
      createAt: "2021-06-01 12:00:00",
      contributorrole: 1,
      contributorname: "李四",
    },
  ]
})
</script>