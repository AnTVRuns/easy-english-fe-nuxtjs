<template>
  <aside v-if="isOpen" class="right-sidebar">
    <button class="close" @click="close">Close</button>
    <slot>
      <ul>
        <li>Enrolled Courses</li>
        <li>My Cart</li>
        <li>Orders</li>
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
