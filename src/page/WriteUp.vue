<template>
    <v-md-editor v-model="text" height="400px"></v-md-editor>
</template>

<script setup lang="ts">
import { ref } from 'vue'

let text = ref('')
</script>