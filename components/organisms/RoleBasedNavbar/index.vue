<script setup lang="ts">
import NavbarForStudent from '../NavbarForStudent/index.vue'
import NavbarForAdmin from '../NavbarForAdmin/index.vue'
import { useAuth } from '@/composables/useAuth'

const { role } = useAuth()
</script>

<template>
  <div>
    <NavbarForAdmin v-if="role === 'ADMIN'" />
    <NavbarForStudent v-else />
  </div>
</template>

<style scoped>
/* placeholder styles */
</style>
