import React from 'react';
import { NavLink } from 'react-router-dom';
import { 
    LayoutDashboard, 
    Users, 
    FolderOpen, 
    FileText, 
    MessageSquare,
    Moon,
    Sun,
    LogOut
} from 'lucide-react';
import { useAuth } from '../../context/AuthContext';
import { useTheme } from '../../context/ThemeContext';
import { cn } from '../../utils/cn';

const navigation = [
    { name: 'Dashboard', href: '/dashboard', icon: LayoutDashboard },
    { name: 'Clients', href: '/clients', icon: Users },
    { name: 'Projects', href: '/projects', icon: FolderOpen },
    { name: 'Invoices', href: '/invoices', icon: FileText },
    { name: 'Notes', href: '/notes', icon: MessageSquare },
];

export const Sidebar: React.FC = () => {
    const { user, logout } = useAuth();
    const { theme, toggleTheme } = useTheme();

    return (
        <div className="flex flex-col w-64 bg-white dark:bg-slate-900 border-r border-slate-200 dark:border-slate-800">
        <div className="flex items-center px-6 py-4 border-b border-slate-200 dark:border-slate-800">
            <div className="flex items-center">
            <div className="w-8 h-8 bg-slate-900 dark:bg-slate-100 rounded-lg flex items-center justify-center">
                <span className="text-white dark:text-slate-900 font-bold text-sm">CT</span>
            </div>
            <span className="ml-2 text-lg font-semibold text-slate-900 dark:text-slate-100">
                ClientTrack Pro
            </span>
            </div>
        </div>

        <nav className="flex-1 px-4 py-6 space-y-1">
            {navigation.map((item) => (
            <NavLink
                key={item.name}
                to={item.href}
                className={({ isActive }) =>
                cn(
                    'flex items-center px-3 py-2 rounded-lg text-sm font-medium transition-colors',
                    isActive
                    ? 'bg-slate-100 text-slate-900 dark:bg-slate-800 dark:text-slate-100'
                    : 'text-slate-600 hover:bg-slate-50 hover:text-slate-900 dark:text-slate-400 dark:hover:bg-slate-800 dark:hover:text-slate-100'
                )
                }
            >
                <item.icon className="mr-3 h-5 w-5" />
                {item.name}
            </NavLink>
            ))}
        </nav>

        <div className="p-4 border-t border-slate-200 dark:border-slate-800">
            <div className="flex items-center justify-between mb-4">
            <button
                onClick={toggleTheme}
                className="flex items-center px-3 py-2 rounded-lg text-sm font-medium text-slate-600 hover:bg-slate-50 hover:text-slate-900 dark:text-slate-400 dark:hover:bg-slate-800 dark:hover:text-slate-100 transition-colors"
            >
                {theme === 'light' ? (
                <>
                    <Moon className="mr-3 h-5 w-5" />
                    Dark Mode
                </>
                ) : (
                <>
                    <Sun className="mr-3 h-5 w-5" />
                    Light Mode
                </>
                )}
            </button>
            </div>

            <div className="flex items-center justify-between">
            <div className="flex items-center">
                <div className="w-8 h-8 bg-slate-200 dark:bg-slate-700 rounded-full flex items-center justify-center">
                <span className="text-slate-600 dark:text-slate-400 text-sm font-medium">
                    {user?.name.charAt(0)}
                </span>
                </div>
                <div className="ml-3">
                <p className="text-sm font-medium text-slate-900 dark:text-slate-100">{user?.name}</p>
                <p className="text-xs text-slate-500 dark:text-slate-400">{user?.email}</p>
                </div>
            </div>
            <button
                onClick={logout}
                className="p-2 text-slate-400 hover:text-slate-600 dark:hover:text-slate-300 transition-colors"
            >
                <LogOut className="h-4 w-4" />
            </button>
            </div>
        </div>
        </div>
    );
};