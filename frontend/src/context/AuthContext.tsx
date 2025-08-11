import React, { createContext, useContext, useEffect, useState } from "react"
import type { AuthContextType, User } from '@/types'

const AuthContext = createContext<AuthContextType | undefined>(undefined)

export const useAuth = () => {
    const context = useContext(AuthContext)
    if (context === undefined) {
        throw new Error('useAuth must be used within an AuthProvider')
    }
    return context
}

export const AuthProvider: React.FC<{ children: React.ReactNode }> = ({ children }) => {
    const [user, setUser] = useState<User | null>(null)
    const [loading, setLoading] = useState(true)

    useEffect(() => {
        const token = localStorage.getItem('auth-token')
        const userData = localStorage.getItem('user-data')

        if (token && userData) {
            try {
                setUser(JSON.parse(userData))
            } catch (error) {
                localStorage.removeItem('auth-token')
                localStorage.removeItem('user-data')
            }
        }
        setLoading(false)
    }, [])

    const login = async (email: string, password: string) => {
        setLoading(true)
        try {
            await new Promise(resolve => setTimeout(resolve, 1000))

            if (email === 'demo@clienttrack.com' && password === 'password') {
                const userData: User = {
                    id: '1',
                    email,
                    name: 'Demo User',
                    role: 'admin'
                }

                const token = 'mock-jwt-token'
                localStorage.setItem('auth-token', token)
                localStorage.setItem('user-data', JSON.stringify(userData))
                setUser(userData)
            } else {
                throw new Error('Invalid credentials')
            }
        } catch (error) {
            throw error
        } finally {
            setLoading(false)
        }
    }

    const register = async (email: string, password: string, name: string) => {
        setLoading(true)

        try {
            await new Promise(resolve => setTimeout(resolve, 1000))

            const userData: User = {
                id: Date.now().toString(),
                email,
                name,
                role: 'user'
            }

            const token = 'mock-jwt-token'
            localStorage.setItem('auth-token', token)
            localStorage.setItem('user-data', JSON.stringify(userData))
            setUser(userData)
        } catch (error) {
            throw error
        } finally {
            setLoading(false)
        }
    }

    const logout = () => {
        localStorage.removeItem('auth-token')
        localStorage.removeItem('user-data')
        setUser(null)
    }

    return (
        <AuthContext.Provider value={{ user, login, register, logout, loading }}>
            {children}
        </AuthContext.Provider>
    )
}