import React from 'react';
import { Bell, Search } from 'lucide-react';
import { useAuth } from '../../context/AuthContext';

export const Header: React.FC = () => {
    const { user } = useAuth();

return (
    <header className="bg-white dark:bg-slate-900 border-b border-slate-200 dark:border-slate-800">
    <div className="flex items-center justify-between px-6 py-4">
        <div className="flex items-center flex-1">
        <div className="relative max-w-xs w-full">
            <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
            <Search className="h-4 w-4 text-slate-400" />
            </div>
            <input
            type="text"
            placeholder="Search..."
            className="block w-full pl-9 pr-3 py-2 border border-slate-300 rounded-lg text-sm placeholder-slate-400 focus:outline-none focus:ring-2 focus:ring-slate-500 focus:border-transparent dark:bg-slate-800 dark:border-slate-600 dark:text-slate-100 dark:placeholder-slate-500"
            />
        </div>
        </div>

        <div className="flex items-center space-x-4">
        <button className="p-2 text-slate-400 hover:text-slate-600 dark:hover:text-slate-300 relative">
            <Bell className="h-5 w-5" />
            <span className="absolute top-1 right-1 h-2 w-2 bg-red-500 rounded-full"></span>
        </button>
        
        <div className="flex items-center">
            <div className="w-8 h-8 bg-slate-200 dark:bg-slate-700 rounded-full flex items-center justify-center">
            <span className="text-slate-600 dark:text-slate-400 text-sm font-medium">
                {user?.name.charAt(0)}
            </span>
            </div>
            <div className="ml-3">
            <p className="text-sm font-medium text-slate-900 dark:text-slate-100">{user?.name}</p>
            <p className="text-xs text-slate-500 dark:text-slate-400 capitalize">{user?.role}</p>
            </div>
        </div>
        </div>
    </div>
    </header>
);
};