import { defineStore } from 'pinia'
import { login, register } from '../lib/api'

export const useAuthStore = defineStore('auth', {
  state: () => ({
    user: null,
    token: localStorage.getItem('token') || null,
  }),

  getters: {
    isLoggedIn: (state) => !!state.token,
  },

  actions: {
    async login(email, password) {
      const { token, user } = await login(email, password)

      this.token = token
      this.user = user || { email }

      localStorage.setItem('token', token)
    },

    async register(email, password) {
      const { token, user } = await register(email, password)

      this.token = token
      this.user = user || { email }

      localStorage.setItem('token', token)
    },

    logout() {
      this.token = null
      this.user = null
      localStorage.removeItem('token')
    }
  }
})
