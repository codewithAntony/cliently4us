import React from "react";
import { createPortal } from 'react-dom'
import { useToast } from '../../context/ToastContext'
import { Toast } from "./Toast";

export const ToastContainer: React.FC = () => {
    const { toasts, removeToast } = useToast()

    if (toasts.length === 0) return null

    return createPortal(
        <div className="fixed top-4 right-4 z-50 space-y-2">
            {toasts.map((toast) => (
                <Toast key={toast.id} toast={toast} onRemove={removeToast} />
            ))}
        </div>,
        document.body
    )
}