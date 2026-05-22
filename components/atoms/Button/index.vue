<template>
  <NButton :id="id" :class="['btn', { 'btn--light': light }]" @click="$emit('click')">
    <slot>{{ label }}</slot>
  </NButton>
</template>

<script setup lang="ts">
import { NButton } from 'naive-ui'

const props = defineProps<{ id?: string; light?: boolean; label?: string }>()
defineEmits(['click'])
</script>

<style scoped>
.btn {
  padding: 8px 12px;
  border-radius: 6px;
  border: 1px solid #ccc;
  background: #f5f5f5;
  cursor: pointer;
}
.btn--light {
  background: transparent;
  border: 0;
  color: #333;
}
</style>
