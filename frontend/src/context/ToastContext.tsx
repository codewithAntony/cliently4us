import React, { createContext, useContext, useCallback } from 'react'
import { Toast, ToastType } from '../types'

interface ToastContextType {
    toasts: Toast[]
    addToast: (type: ToastType, title: string, message?: string) => void
    removeToast: (id: string) => void
}

const ToastContext = createContext<ToastContextType | undefined>(undefined)

export const useToast = () => {
    const context = useContext(ToastContext)
    if (context === undefined) {
        throw new Error('useToast must be used within a ToastProvider')
    }
    return context
}

export const ToastProvider: React.FC<{ children: React.ReactNode }> = ({
    children
}) => {
    const [toasts, setToasts] = useState<Toast[]>([])

    const addToast = useCallback((type: ToastType, title: string, message?:string) => {
        const id = Date.now().toString()
        const toast: Toast = { id, type, title, message }

        setToasts(prev => [...prev, toast])

        setTimeout(() => {
            removeToast(id)
        }, 5000)
    }, [])

    const removeToast = useCallback((id: string) => {
        setToasts(prev => prev.filter(toast => toast.id !== id))
    }, [])

    return (
        <ToastContext.Provider value={{ toasts, addToast, removeToast }}>
            {children}
        </ToastContext.Provider>
    )
}