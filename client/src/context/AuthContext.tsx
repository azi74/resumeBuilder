import { createContext, useContext, useState, useEffect, ReactNode } from 'react'
import { useNavigate } from 'react-router-dom'
import { authService } from '../services/authService'
import { User } from '../types'

interface AuthContextType {
  currentUser: User | null
  loading: boolean
  login: (email: string, password: string) => Promise<void>
  register: (name: string, email: string, password: string) => Promise<void>
  logout: () => void
  googleLogin: () => void
}

const AuthContext = createContext<AuthContextType | undefined>(undefined)

export const AuthProvider = ({ children }: { children: ReactNode }) => {
  const [currentUser, setCurrentUser] = useState<User | null>(null)
  const [loading, setLoading] = useState(true)
  const navigate = useNavigate()

  useEffect(() => {
    const checkAuth = async () => {
      try {
        const user = await authService.getCurrentUser()
        setCurrentUser(user)
      } catch (error) {
        setCurrentUser(null)
      } finally {
        setLoading(false)
      }
    }
    checkAuth()
  }, [])

  const login = async (email: string, password: string) => {
    const user = await authService.login(email, password)
    setCurrentUser(user)
    navigate('/profile')
  }

  const register = async (name: string, email: string, password: string) => {
    const user = await authService.register(name, email, password)
    setCurrentUser(user)
    navigate('/profile')
  }

  const logout = () => {
    authService.logout()
    setCurrentUser(null)
    navigate('/')
  }

  const googleLogin = () => {
    authService.googleLogin()
  }

  const value = {
    currentUser,
    loading,
    login,
    register,
    logout,
    googleLogin
  }

  return <AuthContext.Provider value={value}>{children}</AuthContext.Provider>
}

export const useAuth = () => {
  const context = useContext(AuthContext)
  if (context === undefined) {
    throw new Error('useAuth must be used within an AuthProvider')
  }
  return context
}