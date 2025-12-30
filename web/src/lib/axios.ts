import axios from 'axios'
import type { LoginType, RegisterType } from '../@types'
import { useAuthStore } from '@/context/auth-store'

export const api = axios.create({
    baseURL: 'http://localhost:3333',
})

api.interceptors.request.use((config) => {
  const token = useAuthStore.getState().token

   if (token) {
    config.headers.Authorization = `Bearer ${token}`
  }

  return config
})

api.interceptors.response.use(
 (response) => response,
  (error) => {
    if (error.response?.status === 401) {
      // Usa a action logout da própria store
      useAuthStore.getState().logout()
      window.location.href = '/login'
    }
    return Promise.reject(error)
  }
)

export const authServie = {
  login: async ({ email, password}: LoginType) => {
    const response = await api.post('/sessions', {email, password})

   return response.data
  },

  register: async ({ name ,email, password}: RegisterType) => {
    const response = await api.post('/users', {name, email, password})

   return response.data
  },

  checkAuth: async () => {
    try {
      const response = await api.get('/me')

      return response.data
    } catch (error) {
      throw error
    }
  }
}