import axios from 'axios'
import type { CreateItemType ,EditItemType, ItemType, LoginType, RegisterType } from '../@types'
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
  },

  updateProfileImage: async (file: File) => {
    const formData = new FormData()
    formData.append('file', file) // append = adicionar um novo campo ao formData

    const response = await api.patch('/users/profile-image', formData, {
      headers: {
        'Content-Type': 'multipart/form-data',
      },
    })

    return response.data
  },

  changeName: async (newName: string) => {

    const response = await api.patch('/change-name', { newName })


    return response.data

  },
  
  changeEmail: async (newEmail: string) => {

    const response = await api.patch('/change-email', { newEmail })


    return response.data  

  },

  changePassword: async (newPassword: string) => {

    const response = await api.patch('/change-password', { newPassword })


    return response.data

  },


  verifyCurrentPassword: async (currentPassword: string) => {
    const response = await api.post('/verify-current-password', { currentPassword })
    return response.data

  }
}

export const inventoryService = {
  getItemsQuantity: async () => {
    const response = await api.get('/items/quantity')

    return response.data
  },
  getItemsByType: async (type: ItemType) => {
    const response = await api.get(`/items/${type}`)

    return response.data.items
  },

  getItemsByFilter: async (filter: any, type: ItemType) => {
    const response = await api.post(`/items/filter/${type}`, { filter })

    return response.data
  },

  searchItem: async(q: string, type: ItemType) => {
    const response = await api.get('items/search', { params: { q, type } })

    
    return response.data
  },
  
  deleteItem: async (id: string) => {
    await api.delete(`/item/${id}`)
  },
  
  editItem: async ({ id, name, amount, filters }: EditItemType) => {
    const response = await api.put('/edit', { id, name, amount, filters })


    return response.data
  },

  createItem: async ({ name, amount, type, filters }: CreateItemType) => {
    const response = await api.post('/create', { name, amount, type, filters })


    return response.data
  },

}