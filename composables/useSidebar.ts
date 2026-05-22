import { ref } from 'vue'

const sidebarOpen = ref(false)

export const useSidebar = () => {
  const isOpen = sidebarOpen

  function open() {
    isOpen.value = true
  }

  function close() {
    isOpen.value = false
  }

  function toggle() {
    isOpen.value = !isOpen.value
  }

  return { isOpen, open, close, toggle }
}
