import { ref } from 'vue'

const roleState = ref('STUDENT')

if (process.client) {
  const r = localStorage.getItem('userRole')
  if (r) roleState.value = r
}

export const useAuth = () => {
  const role = roleState

  function setRole(r: string) {
    roleState.value = r
    if (process.client) localStorage.setItem('userRole', r)
  }

  function clearRole() {
    roleState.value = 'STUDENT'
    if (process.client) localStorage.removeItem('userRole')
  }

  return { role, setRole, clearRole }
}
