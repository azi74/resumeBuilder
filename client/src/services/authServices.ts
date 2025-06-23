import api from './api'
import { User } from '../types'

export const authService = {
  async login(email: string, password: string): Promise<User> {
    const response = await api.post('/auth/login', { email, password })
    localStorage.setItem('token', response.data.token)
    return response.data
  },

  async register(name: string, email: string, password: string): Promise<User> {
    const response = await api.post('/auth/register', { name, email, password })
    localStorage.setItem('token', response.data.token)
    return response.data
  },

  logout(): void {
    localStorage.removeItem('token')
    api.post('/auth/logout')
  },

  async getCurrentUser(): Promise<User> {
    const response = await api.get('/auth/profile')
    return response.data
  },

  googleLogin(): void {
    window.location.href = `${import.meta.env.VITE_API_BASE_URL}/auth/google`
  }
}