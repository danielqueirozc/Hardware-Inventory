import type { LoginType, RegisterType } from '@/@types';
import { authServie } from '@/lib/axios';
import { create } from 'zustand';
import { persist } from 'zustand/middleware';

interface LoginResponse {
  user: UserType
  token: string
}

interface UserType {
  id: string
  name: string
  email: string
  imageUrl?: string | null
  password_hash: string
  created_at: string
}

interface AuthStore {
 user: UserType | null
 token: string | null
 isAuthenticated: boolean
 isLoading: boolean

  login: (data: LoginType) => Promise<LoginResponse>
  register: (data: RegisterType) => Promise<void>
  logout: () => void
  checkAuth: () => Promise<void>
  updateProfileImage: (file: File) => Promise<void>
}

// create<AuthStore>()() - Note os dois parênteses! Isso é necessário quando usa TypeScript com middleware (persist). É uma peculiaridade do Zustand.
export const useAuthStore = create<AuthStore>()(
  persist(
    // é a função que você usa para atualizar o estado da store. É como o useState do React, mas para a store global.
    (set) => ({
      // Estado
      // Define o estado inicial da store. São as variáveis que ficam disponíveis globalmente. Começa tudo null/false porque o usuário não está logado ainda.
      user: null,
      token: null,
      isAuthenticated: false,
      isLoading: false,

      // Action: Login
      login: async (data: LoginType) => {
        set({ isLoading: true })
        
        try {
          const response = await authServie.login(data)

          set({
            user: response.user,
            token: response.token,
            isAuthenticated: true,
            isLoading: false,
          })

          return response

        } catch (error) {
            set({ isLoading: false })
          throw error
        }
      },

      // Action: Register
      register: async ({ name, email, password }: RegisterType) => {
        set({ isLoading: true })
        
        try {
          await authServie.register({ name, email, password })

        } catch (error) {
            throw error
        }
      },

      // Action: Logout
      logout: () => {
        set({
          user: null,
          token: null,
          isAuthenticated: false,
        })
      },

      // Action: Verificar autenticação
      checkAuth: async () => {
        // é uma função especial do Zustand que retorna o estado atual sem fazer o componente re-renderizar. Útil para pegar valores dentro de funções.
        const token = useAuthStore.getState().token
        
        if (!token) {
          set({ isAuthenticated: false })
          return
        }

        try {
          const response = await authServie.checkAuth()

          // Atualiza o estado com os dados do usuário
          set(state => ({
            user: response.user? {
              ... response.user,
              imageUrl: response.user.imageUrl || state.user?.imageUrl || null
            } : null,
            isAuthenticated: true,
          }))

        } catch (error) {
          set({ user: null, token: null, isAuthenticated: false })
        }
      },

      updateProfileImage: async (file: File) => {
        set({ isLoading: true })

        const response = await authServie.updateProfileImage(file)

        set(state => ({
          user: state.user ? { ...state.user, imageUrl: response.imageUrl } : null,
          isLoading: false,
        }))
      }
    }),
    {
      name: 'auth-storage', // Nome da chave no localStorage
      partialize: (state) => ({
        token: state.token,
        user: state.user,
      }), // Salva apenas token e user
    }
  )
)