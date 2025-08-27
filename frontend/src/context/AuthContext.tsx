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
    const [checkedAuth, setCheckedAuth] = useState(false)

    useEffect(() => {
        checkAuth()
    }, [])

    const checkAuth = async () => {
        try {
            const token = localStorage.getItem('authToken')
            if (!token) {
                setUser(null)
                setLoading(false)
                setCheckedAuth(true)
                return
            }

            const u = await api<User>("/api/user", { method: "GET" })
            setUser(u)
        } catch (error) {
            console.error("Auth check failed:", error)
            localStorage.removeItem('authToken')
            setUser(null)
        } finally {
            setLoading(false)
            setCheckedAuth(true)
        }
    }

    // useEffect(() => {
    //     (async () => {
    //         try {
    //             const u = await api<User>("/api/user", { method: "GET"})
    //             setUser(u)
    //         } catch {
    //             setUser(null)
    //         } finally {
    //             setLoading(false)
    //         }
    //     })()
    // }, [])

    // const login = async (email: string, password: string) => {
    //     try {
    //     const response = await api<{message: string; token: string }>("/api/login", {
    //         method: "POST",
    //         body: JSON.stringify({ email, password }),
    //     })

    //     if (response.token) {
    //         localStorage.setItem('authToken', response.token)
    //     }

    //     const u = await api<User>("/api/user", { method: "GET" })
    //     setUser(u)
    //     return u
    // } catch (error) {
    //     console.error("Login error.", error)
    //     throw error
    // }
    // }

    const login = async (email: string, password: string): Promise<User> => {
    console.log('Starting login process...');
    
    const response = await api<{ message: string; token: string }>("/api/login", {
        method: "POST",
        body: JSON.stringify({ email, password }),
    });
    
    console.log('Login API response:', response);

    if (response.token) {
        localStorage.setItem("authToken", response.token)
        console.log("Token stored in local storage")
    } else {
        throw new Error("No token received from the server")
    }
    
    console.log('Token in localStorage before user fetch:', localStorage.getItem('authToken'));
    // Manually try to fetch user data
    try {
        const userData = await api<User>('/api/user', {
            method: 'GET',
        });
        console.log('User data:', userData);
        setUser(userData)
        return userData
    } catch (error) {
        console.error('Failed to get user:', error);
        localStorage.removeItem("authToken")
        throw new Error('Failed to fetch user information after login');
    }
};

    const register = async (email: string, password: string, name: string) => {
        await api("/api/register", {
            method: "POST",
            body: JSON.stringify({ email, password, name }),
        })
    }

    const logout = async () => {
        try {
            await api("/api/logout", { method: "POST" })
        } catch (error) {
            console.error("Logout error:", error)
        } finally {
            localStorage.removeItem("authToken")
            setUser(null)
        }
        
    }

    return (
        <AuthContext.Provider value={{ user, login, register, logout, loading, checkedAuth }}>
            {children}
        </AuthContext.Provider>
    )
}