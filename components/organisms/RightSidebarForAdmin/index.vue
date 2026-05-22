<template>
  <aside v-if="isOpen" class="right-sidebar admin">
    <button class="close" @click="close">Close</button>
    <slot>
      <ul>
        <li>Courses</li>
        <li>Categories</li>
        <li>Users</li>
      </ul>
    </slot>
  </aside>
</template>

<script setup lang="ts">
import { useSidebar } from '@/composables/useSidebar'

const { isOpen, close } = useSidebar()
</script>

<style scoped>
.right-sidebar {
  position: fixed;
  right: 0;
  top: 64px;
  width: 260px;
  background: #fff;
  border-left: 1px solid #eee;
  padding: 12px;
}
</style>
