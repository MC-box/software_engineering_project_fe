<template>
  <a-table :columns="columns" :data-source="data">
    <template #headerCell="{ column }">
      <template v-if="column.key === 'name'">
        <span>
          <smile-outlined />
          题目名称
        </span>
      </template>
    </template>

    <template #bodyCell="{ column, record }">
      <template v-if="column.key === 'name'">
        <a>
          {{ record.name }}
        </a>
      </template>
      <template v-else-if="column.key === 'tags'">
        <span>
          <a-tag
            v-for="tag in record.tags"
            :key="tag"
            :color="tag === 'loser' ? 'volcano' : tag.length > 5 ? 'geekblue' : 'green'"
          >
            {{ tag.toUpperCase() }}
          </a-tag>
        </span>
      </template>
      <template v-else-if="column.key === 'action'">
        <span>
          <a>Delete</a>
          <a-divider type="vertical" />
          <a class="ant-dropdown-link">
            More actions
            <down-outlined />
          </a>
        </span>
      </template>
    </template>
  </a-table>
</template>
<script lang="ts" setup>
import { SmileOutlined, DownOutlined } from '@ant-design/icons-vue';
const columns = [
  {
    name: '题目名称',
    dataIndex: 'name',
    key: 'name',
  },
  {
    title: '题目编号',
    dataIndex: 'age',
    key: 'age',
  },
  {
    title: '课程',
    dataIndex: 'address',
    key: 'address',
  },
  {
    title: '难度',
    key: 'tags',
    dataIndex: 'tags',
  },
  {
    title: '类型',
    key: 'type',
    dataIndex: 'type',
  },
  {
    title: 'Action',
    key: 'action',
  },
];

const data = [
  {
    key: '1',
    name: 'CrackMe',
    age: 32,
    address: 'Reverse',
    tags: ['nice', 'developer'],
    type: '填空题',
  },
  {
    key: '2',
    name: 'Binary Tree',
    age: 42,
    address: 'Data Structure',
    tags: ['loser'],
    type: '选择题',
  },
  {
    key: '3',
    name: 'Joe Black',
    age: 32,
    address: 'Sidney No. 1 Lake Park',
    tags: ['cool', 'teacher'],
    type: '代码题',
  },
];
</script>

