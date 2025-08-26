import React, { createContext, useContext, useEffect, useState } from "react"
import type { AuthContextType, User } from '@/types'
import { api } from "@/lib/api"

const AuthContext = createContext<AuthContextType | undefined>(undefined)

export const useAuth = () => {
    const context = useContext(AuthContext)
    if (!context) throw new Error('useAuth must be used within an AuthProvider')
        return context
}

export const AuthProvider: React.FC<{ children: React.ReactNode }> = ({ children }) => {
    const [user, setUser] = useState<User | null>(null)
    const [loading, setLoading] = useState(true)

    useEffect(() => {
        (async () => {
            try {
                const u = await api<User>("/api/user", { method: "GET"})
                setUser(u)
            } catch {
                setUser(null)
            } finally {
                setLoading(false)
            }
        })()
    }, [])

    const login = async (email: string, password: string) => {
        const response = await api<{message: string; token: string }>("/api/login", {
            method: "POST",
            body: JSON.stringify({ email, password }),
        })

        if (response.token) {
            localStorage.setItem('authToken', response.token)
        }
        const u = await api<User>("/api/user", { method: "GET" })
        setUser(u)
    }

    const register = async (email: string, password: string, name: string) => {
        await api("/api/register", {
            method: "POST",
            body: JSON.stringify({ email, password, name }),
        })
    }

    const logout = async () => {
        await api("/api/logout", { method: "POST" })
        setUser(null)
    }

    return (
        <AuthContext.Provider value={{ user, login, register, logout, loading }}>
            {children}
        </AuthContext.Provider>
    )
}