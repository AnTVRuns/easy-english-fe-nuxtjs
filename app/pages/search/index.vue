<template>
  <section class="search-demo">
    <h1>Search demo — Pinia + useFetch/useAsyncData + runtime config</h1>

    <div class="controls">
      <input aria-label="Search" v-model="store.query" placeholder="Enter keyword" />
      <button @click="store.searchLocal">Local search</button>
      <button @click="store.searchRemote">Remote (useFetch)</button>
      <button @click="loadAsyncData">Fetch via useAsyncData</button>
      <!-- <button @click="demoPinia">Demo Pinia</button> -->
      <button @click="resetAll">Reset</button>
    </div>

    <div class="status">
      <div v-if="store.loading" class="loading-indicator">Loading...</div>
      <div v-else>Loading: {{ store.loading }}</div>
      <div v-if="store.error" class="error">Error: {{ store.error }}</div>
    </div>

    <div class="demo-pinia-status" v-if="demoPiniaMsg">
      <strong>Demo Pinia:</strong> {{ demoPiniaMsg }}
      <div v-if="demoPiniaCount">Counter: {{ demoPiniaCount }}</div>
    </div>

    <section>
      <h3>Local results (from Pinia store.results)</h3>
      <ul>
        <li v-for="r in store.results" :key="r.id">
          {{ r.title }} — {{ r.topic }} — {{ r.price }}
        </li>
      </ul>
    </section>

    <section>
      <h3>Remote results (mapped to course shape)</h3>
      <ul>
        <li v-for="r in store.lastRemote" :key="r.id">
          {{ r.title }} — {{ r.topic }} — {{ r.price }}
        </li>
      </ul>
    </section>

    <section>
      <h3>AsyncData demo (mapped to course shape)</h3>
      <div v-if="asyncLoading">Loading async data...</div>
      <ul v-else>
        <li v-for="item in asyncData" :key="item.id">
          {{ item.title }} — {{ item.topic }} — {{ item.price }}
        </li>
      </ul>
    </section>
  </section>
</template>

<script setup lang="ts">
import { useAsyncData } from 'nuxt/app'
import { computed, ref } from 'vue'
import { useSearchStore } from '../../../stores/search'
import { useApi } from '../../../composables/useApi'
import { useNuxtApp } from 'nuxt/app'

const store = useSearchStore()
const api = useApi()
const nuxtApp = useNuxtApp()

const asyncDataRef = ref<any[]>([])
const asyncLoading = ref(false)

async function loadAsyncData() {
  asyncLoading.value = true
  try {
    const { data, error } = await useAsyncData('comments-demo', () =>
      $fetch('https://jsonplaceholder.typicode.com/comments?_limit=5')
    )
    if (error?.value) throw error.value
    asyncDataRef.value = ((data?.value as any[]) || []).slice(0, 5).map((c: any) => ({
      id: `async-${c.id}`,
      title: c.name || c.email || `Comment ${c.id}`,
      topic: 'Async',
      level: 'N/A',
      price: 'Free',
      description: c.body || '',
    }))
  } catch (e: any) {
    console.warn('asyncData error', e)
    asyncDataRef.value = []
  } finally {
    asyncLoading.value = false
  }
}

const asyncData = computed(() => asyncDataRef.value)

const demoPiniaMsg = ref('')
const demoPiniaCount = ref<number>((globalThis as any).__demoPiniaCount || 0)

async function demoPinia() {
  if (!import.meta.client) {
    demoPiniaMsg.value = 'Demo Pinia runs on client only.'
    return
  }
  try {
    const provides = (nuxtApp?.vueApp as any)?._context?.provides || {}
    const hasPiniaProvide = Object.keys(provides).some((k) =>
      String(k).toLowerCase().includes('pinia')
    )
    if (hasPiniaProvide) {
      demoPiniaMsg.value =
        'Pinia appears to be installed and registered with the app (found in provides).'
      return
    }
  } catch (_) {}

  try {
    const pinia = await eval("import('pinia')")
    if (pinia && (pinia.createPinia || pinia.defineStore)) {
      demoPiniaMsg.value = 'Pinia is installed — you can convert the store to defineStore.'
      return
    }
  } catch (e) {
    demoPiniaCount.value = (globalThis as any).__demoPiniaCount || 0
    demoPiniaCount.value++
    ;(globalThis as any).__demoPiniaCount = demoPiniaCount.value
    demoPiniaMsg.value = `Pinia not installed — simulated global counter: ${demoPiniaCount.value}. Import error: ${err?.message || err}`
  }
}

async function tryApi() {
  try {
    await api.get('/some-path')
  } catch (e) {
    console.debug('api demo failed (expected in this repo):', e)
  }
}

tryApi()

function resetAll() {
  store.setQuery('')
  asyncDataRef.value = []
}
</script>

<style scoped>
.controls {
  display: flex;
  gap: 8px;
  flex-wrap: wrap;
  margin-bottom: 12px;
}
.controls input {
  padding: 8px;
  min-width: 200px;
}
.error {
  color: red;
}
.loading-indicator {
  font-weight: 700;
  color: #0b76ff;
}
</style>
