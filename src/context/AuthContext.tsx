import { createContext, useContext, useEffect, useMemo, useState } from 'react'
import * as authApi from '@/api/auth'
import type { User } from '@/api/types'

type AuthContextValue = {
  user: User | null
  loading: boolean
  login: (username: string, password: string) => Promise<User>
  register: (username: string, password: string) => Promise<User>
  logout: () => Promise<void>
  refreshUser: () => Promise<void>
}

const AuthContext = createContext<AuthContextValue | null>(null)

export function AuthProvider({ children }: { children: React.ReactNode }) {
  const [user, setUser] = useState<User | null>(null)
  const [loading, setLoading] = useState(true)

  const refreshUser = async () => {
    try {
      const response = await authApi.getCurrentUser()
      setUser(response.user)
    } catch {
      setUser(null)
    }
  }

  useEffect(() => {
    refreshUser().finally(() => setLoading(false))
  }, [])

  const value = useMemo(
    () => ({
      user,
      loading,
      login: async (username: string, password: string) => {
        const response = await authApi.login(username, password)
        setUser(response.user)
        return response.user
      },
      register: async (username: string, password: string) => {
        const response = await authApi.register(username, password)
        setUser(response.user)
        return response.user
      },
      logout: async () => {
        await authApi.logout()
        setUser(null)
      },
      refreshUser,
    }),
    [user, loading],
  )

  return <AuthContext.Provider value={value}>{children}</AuthContext.Provider>
}

export function useAuth() {
  const context = useContext(AuthContext)
  if (!context) {
    throw new Error('useAuth must be used within AuthProvider')
  }
  return context
}
