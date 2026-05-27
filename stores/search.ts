import { reactive } from 'vue'
import { useRuntimeConfig, useFetch } from 'nuxt/app'

type SimpleCourse = {
  id: string
  title: string
  topic: string
  level: string
  price: string
  description: string
}

const MOCK: SimpleCourse[] = [
  {
    id: 'c1',
    title: 'Speaking Booster',
    topic: 'Speaking',
    level: 'Beginner',
    price: 'Free',
    description: 'Practice everyday conversations.',
  },
  {
    id: 'c2',
    title: 'Grammar Sprint',
    topic: 'Grammar',
    level: 'Intermediate',
    price: '$20',
    description: 'Bite-sized grammar drills.',
  },
  {
    id: 'c3',
    title: 'IELTS Reading Lab',
    topic: 'Exam',
    level: 'Upper',
    price: '$35',
    description: 'Reading strategies for exams.',
  },
  {
    id: 'c4',
    title: 'Vocabulary Builder',
    topic: 'Vocabulary',
    level: 'All',
    price: 'Free',
    description: 'Topic-based vocabulary.',
  },
  {
    id: 'c5',
    title: 'Business Speaking Pro',
    topic: 'Speaking',
    level: 'Upper',
    price: '$45',
    description: 'Meetings and presentations.',
  },
]

const piniaMod = (globalThis as any).__pinia
let piniaFactory: any = undefined

function createReactiveFallback() {
  const state = reactive({
    query: '' as string,
    results: [] as SimpleCourse[],
    lastRemote: [] as any[],
    loading: false as boolean,
    error: null as string | null,
  })

  function setQuery(q: string) {
    state.query = q
    if (!String(q).trim()) {
      state.results = MOCK.slice()
      state.lastRemote = []
      state.error = null
      state.loading = false
    }
  }

  async function searchLocal() {
    state.loading = true
    try {
      await new Promise((r) => setTimeout(r, 600))
      const term = state.query.trim().toLowerCase()
      state.results = term
        ? MOCK.filter((c) =>
            [c.title, c.topic, c.description].join(' ').toLowerCase().includes(term)
          )
        : MOCK.slice()
      state.error = null
    } catch (e: any) {
      state.error = String(e)
    } finally {
      state.loading = false
    }
  }

  async function searchRemote() {
    state.loading = true
    state.error = null
    try {
      const config = useRuntimeConfig()
      const base = config.public?.apiBase || ''
      const url = 'https://jsonplaceholder.typicode.com/posts'
      const { data, error } = await useFetch(url, { params: { q: state.query } })
      if (error?.value) throw error.value
      await new Promise((r) => setTimeout(r, 600))
      const posts = ((data?.value as any[]) || []).slice(0, 5).map((p: any) => ({
        id: String(p.id ?? p.userId ?? Math.random()),
        title: p.title || p.name || `Remote ${p.id}`,
        topic: 'Remote',
        level: 'N/A',
        price: 'Free',
        description: p.body || p.body || '',
      }))
      state.lastRemote = posts
    } catch (e: any) {
      state.error = String(e)
    } finally {
      state.loading = false
    }
  }

  return Object.assign(state, {
    setQuery,
    searchLocal,
    searchRemote,
  })
}

export function useSearchStore() {
  if (piniaMod && typeof piniaMod.defineStore === 'function') {
    if (!piniaFactory) {
      const defineStore = piniaMod.defineStore
      piniaFactory = defineStore('search', () => {
        const state = reactive({
          query: '' as string,
          results: [] as SimpleCourse[],
          lastRemote: [] as any[],
          loading: false as boolean,
          error: null as string | null,
        })

        function setQuery(q: string) {
          state.query = q
          if (!String(q).trim()) {
            state.results = MOCK.slice()
            state.lastRemote = []
            state.error = null
            state.loading = false
          }
        }

        async function searchLocal() {
          state.loading = true
          try {
            await new Promise((r) => setTimeout(r, 600))
            const term = state.query.trim().toLowerCase()
            state.results = term
              ? MOCK.filter((c) =>
                  [c.title, c.topic, c.description].join(' ').toLowerCase().includes(term)
                )
              : MOCK.slice()
            state.error = null
          } catch (e: any) {
            state.error = String(e)
          } finally {
            state.loading = false
          }
        }

        async function searchRemote() {
          state.loading = true
          state.error = null
          try {
            const config = useRuntimeConfig()
            const base = config.public?.apiBase || ''
            const url = 'https://jsonplaceholder.typicode.com/posts'
            const { data, error } = await useFetch(url, { params: { q: state.query } })
            if (error?.value) throw error.value
            await new Promise((r) => setTimeout(r, 600))
            const posts = ((data?.value as any[]) || []).slice(0, 5).map((p: any) => ({
              id: String(p.id ?? p.userId ?? Math.random()),
              title: p.title || p.name || `Remote ${p.id}`,
              topic: 'Remote',
              level: 'N/A',
              price: 'Free',
              description: p.body || p.body || '',
            }))
            state.lastRemote = posts
          } catch (e: any) {
            state.error = String(e)
          } finally {
            state.loading = false
          }
        }

        return Object.assign(state, {
          setQuery,
          searchLocal,
          searchRemote,
        })
      })
    }

    return piniaFactory()
  }

  return createReactiveFallback()
}
