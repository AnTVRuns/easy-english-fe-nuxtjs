import { useRuntimeConfig, useFetch } from '#imports'

export function useApi() {
  const config = useRuntimeConfig()
  const base = config.public?.apiBase || ''

  async function get(path: string, params?: Record<string, any>) {
    const url = `${base}${path}`
    const { data, error } = await useFetch(url, { params })
    if (error?.value) throw error.value
    return data.value
  }

  async function post(path: string, body?: any) {
    const url = `${base}${path}`
    const { data, error } = await useFetch(url, { method: 'POST', body })
    if (error?.value) throw error.value
    return data.value
  }

  return { get, post }
}
