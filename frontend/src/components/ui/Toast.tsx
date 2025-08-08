import React, { useEffect } from 'react';
import { X, CheckCircle, XCircle, AlertCircle, Info } from 'lucide-react';
import { Toast as ToastType } from '../../types';
import { cn } from '../../utils/cn';

interface ToastProps {
    toast: ToastType;
    onRemove: (id: string) => void;
}

export const Toast: React.FC<ToastProps> = ({ toast, onRemove }) => {
    const { id, type, title, message } = toast;

    const icons = {
        success: CheckCircle,
        error: XCircle,
        warning: AlertCircle,
        info: Info
    };

    const styles = {
        success: 'bg-green-50 border-green-200 text-green-800 dark:bg-green-900/20 dark:border-green-800 dark:text-green-200',
        error: 'bg-red-50 border-red-200 text-red-800 dark:bg-red-900/20 dark:border-red-800 dark:text-red-200',
        warning: 'bg-yellow-50 border-yellow-200 text-yellow-800 dark:bg-yellow-900/20 dark:border-yellow-800 dark:text-yellow-200',
        info: 'bg-blue-50 border-blue-200 text-blue-800 dark:bg-blue-900/20 dark:border-blue-800 dark:text-blue-200'
    };

    const Icon = icons[type];

    useEffect(() => {
        const timer = setTimeout(() => {
        onRemove(id);
        }, 5000);

        return () => clearTimeout(timer);
    }, [id, onRemove]);

return (
    <div className={cn(
    'flex items-start p-4 border rounded-lg shadow-sm transition-all duration-300 transform',
    styles[type]
    )}>
    <Icon className="h-5 w-5 mt-0.5 mr-3 flex-shrink-0" />
    <div className="flex-1">
        <h4 className="font-medium">{title}</h4>
        {message && <p className="mt-1 text-sm opacity-90">{message}</p>}
    </div>
    <button
        onClick={() => onRemove(id)}
        className="ml-4 p-1 rounded-md hover:bg-black/10 dark:hover:bg-white/10 transition-colors"
    >
        <X className="h-4 w-4" />
    </button>
    </div>
);
};