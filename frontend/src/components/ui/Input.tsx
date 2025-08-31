import React, { forwardRef } from "react";
import { cn } from '../../utils/cn'

interface InputProps extends React.InputHTMLAttributes<HTMLInputElement> {
    label?: string
    error?: string
}

export const Input = forwardRef<HTMLInputElement, InputProps>(({
    className,
    label,
    error,
    ...props
}, ref) => {
    return (
        <div className="space-y-1">
            {label && (
                <label className="block text-sm font-medium text-slate-200">
                    {label}
                </label>
            )}
            <input className={cn("block w-full px-3 py-2 border border-slate-600 bg-transparent text-white placeholder-slate-400",
            "focus:outline-none focus:ring-2 focus:ring-slate-700 focus:border-transparent transition-all duration-200",
            error && 'border-red-300 focus:ring-red-500',
            className
            )}
            ref={ref}
            autoComplete="off"
            {...props}
            />
            {error && (
                <p className="text-sm text-red-600">{error}</p>
            )}
        </div>
    )
})