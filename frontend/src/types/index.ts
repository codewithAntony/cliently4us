export interface User {
    id: string
    email: string
    name: string
    role: 'admin' | 'user'
    avatar?: string
}

export interface Client {
    id: string
    name: string
    email: string
    phone?: string
    company?: string
    status: 'active' | 'inactive'
    createdAt: string
    updatedAt: string
}

export interface Project {
    id: string
    name: string
    description?: string
    clientId?: string
    status: 'active' | 'completed' | 'on-hold'
    createdAt: string
    updatedAt: string
}

export interface Task {
    id: string
    title: string
    description?: string
    status: 'todo' | 'in-progress' | 'done'
    priority: 'low' | 'medium' | 'high'
    projectId: string
    clientId: string
    assignedTo?: string
    dueDate?: string
    createdAt: string
    updatedAt: string
}

export interface Invoice {
    id: string
    clientId: string
    amount: number
    description?: string
    status: 'draft' | 'sent' | 'paid' | 'overdue'
    dueDate: string
    createdAt: string
    updatedAt: string
}

export interface Note {
    id: string
    clientId: string
    content: string
    description?: string
    type: 'note' | 'call' | 'meeting' | 'email'
    createdAt: string
    updatedAt: string
    createdBy: string
}

export interface AuthContextType {
    user: User | null
    login: (email: string, password: string) => Promise<void>
    register: (email: string, password: string, name: string) => Promise<void>
    logout: () => void
    loading: boolean
}

export interface ThemeContextType {
    theme: 'light' | 'dark'
    toggleTheme: () => void
}

export type ToastType = 'success' | 'error' | 'info' | 'warning'

export interface Toast {
    id: string
    type: ToastType
    title: string
    message?: string
}