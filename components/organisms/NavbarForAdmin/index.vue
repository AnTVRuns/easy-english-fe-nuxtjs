<template>
  <header class="navbar admin">
    <div class="nav-left">easy-english (Admin)</div>
    <nav class="nav-center">
      <Button @click="() => {}">Search</Button>
    </nav>
    <div class="nav-right">
      <Button @click="open">Notifications</Button>
    </div>
  </header>
</template>

<script setup lang="ts">
import Button from '@/components/atoms/Button/index.vue'
import { useSidebar } from '@/composables/useSidebar'

const { open } = useSidebar()
</script>

<style scoped>
.navbar {
  display: flex;
  align-items: center;
  justify-content: space-between;
  padding: 12px 16px;
  background: #fff;
  border-bottom: 1px solid #eee;
}
</style>
