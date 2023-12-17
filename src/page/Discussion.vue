<template>
    <div>
      <a @click="router.back">
      <ArrowLeftOutlined :style="{fontSize: '30px', color: '#08c'} "/>
      </a>
    这是交流区页面</div>
    <!-- <u-comment relative-time>
  </u-comment> -->
  <u-comment :config="config" @submit="submit" @like="like" relative-time>
    <div>这里编写主题帖内容</div>
    <!-- <div>导航栏卡槽</div> -->
    <!-- <template #header>头部卡槽</template> -->
    <!-- <template #info>用户信息卡槽</template> -->
    <!-- <template #card>用户信息卡片卡槽</template> -->
    <!-- <template #opearte>操作栏卡槽</template> -->
    <!-- <template #func>功能区域卡槽</template> -->
  </u-comment>
</template>
<script setup lang="ts">
import emoji from '../assets/emoji.ts'
import { reactive } from 'vue'
import { CommentApi, ConfigApi, SubmitParamApi, UToast, createObjectURL, dayjs } from 'undraw-ui'
import {ArrowLeftOutlined} from '@ant-design/icons-vue';
import { useRouter} from 'vue-router';
const router = useRouter()
// 这是一个主页面，而主页面的comments是在本页面中含有的评论，而下面的每一个comment评论实际上也会有评论，猜测是视为一个comment对象
const config = reactive<ConfigApi>({
  user: {
    id: 1,
    username: 'jack',
    avatar: 'https://static.juzicon.com/avatars/avatar-200602130320-HMR2.jpeg?x-oss-process=image/resize,w_100',
    // 评论id数组 建议:存储方式用户uid和评论id组成关系,根据用户uid来获取对应点赞评论id,然后加入到数组中返回
    likeIds: [1, 2] //
  },
  emoji: emoji,
  comments: [],// 下面的评论
  // aTarget: '_self',
  // showForm: false,
  // showContent: false,
  total: 10
})

let temp_id = 100
// 提交评论事件
const submit = ({ content, parentId, files, finish, reply }: SubmitParamApi) => {
  let str = '提交评论:' + content + ';\t父id: ' + parentId + ';\t图片:' + files + ';\t被回复评论:'
  console.log(str, reply)

  /**
   * 上传文件后端返回图片访问地址，格式以'||'为分割; 如:  '/static/img/program.gif||/static/img/normal.webp'
   */
  let contentImg = files?.map(e => createObjectURL(e)).join('||')

  temp_id += 1
  const comment: CommentApi = {
    id: String(temp_id),
    parentId: parentId,
    uid: config.user.id,
    address: '来自江苏',
    content: content,
    likes: 0,
    createTime: dayjs().subtract(5, 'seconds').toString(),
    contentImg: contentImg,
    user: {
      username: config.user.username,
      avatar: config.user.avatar,
      level: 6,
      homeLink: `/${temp_id}`
    },
    reply: null
  }
  setTimeout(() => {
    finish(comment)
    UToast({ message: '评论成功!', type: 'info' })
  }, 200)
}
// 点赞按钮事件 将评论id返回后端判断是否点赞，然后在处理点赞状态
const like = (id: string, finish: () => void) => {
  console.log('点赞: ' + id)
  setTimeout(() => {
    finish()
  }, 200)
}

config.comments = [
  {
    id: '1',
    parentId: null,
    uid: '1',
    address: '来自上海',
    content:
     '缘生缘灭，缘起缘落，我在看别人的故事，别人何尝不是在看我的故事?别人在演绎人生，我又何尝不是在这场戏里?谁的眼神沧桑了谁?我的眼神，只是沧桑了自己[喝酒]',
    likes: 2,
    contentImg: 'https://gitee.com/undraw/undraw-ui/raw/master/public/docs/normal.webp',
    createTime: dayjs().subtract(10, 'minute').toString(),
    user: {
      username: '落🤍尘',
      avatar: 'https://static.juzicon.com/avatars/avatar-200602130320-HMR2.jpeg?x-oss-process=image/resize,w_100', // 头像
      level: 6, // 指示等级
      homeLink: '/1' // 如何设置不进行跳转?
    }
  },
  {
    id: '2',
    parentId: null,
    uid: '2',
    address: '来自上海',
    content:
     '这道题怎么做啊我吐了，好难啊，有无大佬指教[喝酒]',
    likes: 5,
    contentImg: 'https://gitee.com/undraw/undraw-ui/raw/master/public/docs/normal.webp',
    createTime: dayjs().subtract(10, 'minute').toString(),
    user: {
      username: '你妈边哭边',
      avatar: 'https://static.juzicon.com/avatars/avatar-200602130320-HMR2.jpeg?x-oss-process=image/resize,w_100', // 头像
      level: 6, // 指示等级
      homeLink: '/1' // 如何设置不进行跳转?
    }
  }
]
</script>
<!-- 问题：1.finish函数是接口本身提供的？ 2.comment下的评论也是视为comment? -->