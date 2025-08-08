import React, { useEffect } from 'react';
import { createPortal } from 'react-dom';
import { X } from 'lucide-react';
import { cn } from '../../utils/cn';

interface ModalProps {
    isOpen: boolean;
    onClose: () => void;
    title: string;
    children: React.ReactNode;
    size?: 'sm' | 'md' | 'lg' | 'xl';
}

export const Modal: React.FC<ModalProps> = ({ 
    isOpen, 
    onClose, 
    title, 
    children, 
    size = 'md' 
    }) => {
    useEffect(() => {
        if (isOpen) {
        document.body.style.overflow = 'hidden';
        } else {
        document.body.style.overflow = 'unset';
        }

        return () => {
        document.body.style.overflow = 'unset';
        };
    }, [isOpen]);

    useEffect(() => {
        const handleEscape = (e: KeyboardEvent) => {
        if (e.key === 'Escape') {
            onClose();
        }
        };

        if (isOpen) {
        document.addEventListener('keydown', handleEscape);
        }

        return () => {
        document.removeEventListener('keydown', handleEscape);
        };
    }, [isOpen, onClose]);

    if (!isOpen) return null;

    const sizes = {
    sm: 'max-w-md',
    md: 'max-w-lg',
    lg: 'max-w-2xl',
    xl: 'max-w-4xl'
    };

return createPortal(
    <div className="fixed inset-0 z-50 overflow-y-auto">
    <div className="flex min-h-full items-center justify-center p-4">
        <div 
        className="fixed inset-0 bg-black/25 transition-opacity"
        onClick={onClose}
        />
        <div className={cn(
        'relative w-full rounded-lg bg-white shadow-xl transition-all dark:bg-slate-800',
        sizes[size]
        )}>
        <div className="flex items-center justify-between px-6 py-4 border-b border-slate-200 dark:border-slate-700">
            <h3 className="text-lg font-semibold text-slate-900 dark:text-slate-100">
            {title}
            </h3>
            <button
            onClick={onClose}
            className="rounded-md p-1 text-slate-400 hover:text-slate-500 hover:bg-slate-100 dark:hover:bg-slate-700 transition-colors"
            >
            <X className="h-5 w-5" />
            </button>
        </div>
        <div className="px-6 py-4">
            {children}
        </div>
        </div>
    </div>
    </div>,
    document.body
    );
};