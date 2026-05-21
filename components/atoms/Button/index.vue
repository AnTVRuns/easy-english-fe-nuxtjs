<template>
  <button class="ee-button" @click="$emit('click')">{{ label }}</button>
</template>

<script setup lang="ts">
defineProps<{ label?: string }>()
</script>

<style scoped>
.ee-button {
  padding: 8px 12px;
  border-radius: 6px;
  border: 1px solid #333;
  background: #fff;
}
</style>
