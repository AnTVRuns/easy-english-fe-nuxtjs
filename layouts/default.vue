<script setup lang="ts">
import RoleBasedNavbar from '@/components/organisms/RoleBasedNavbar/index.vue'
</script>

<template>
  <div class="app-shell">
    <RoleBasedNavbar />
    <slot />
  </div>
</template>
Restart TypeScript Server
