import React, { useState } from 'react'
import { LoginForm } from '../components/auth/LoginForm'
import { RegisterForm } from '../components/auth/RegisterForm'

export const AuthPage: React.FC = () => {
    const [isLogin, setIsLogin] = useState(true)


    return (
        <div className='min-h-screen bg-slate-50 dark:bg-slate-900 flex items-center justify-center p-4'>
            <div className='w-full max-w-md'>
                {isLogin ? (
                    <LoginForm onSwitchToRegister={() => setIsLogin(false)} />
                ) : (
                    <RegisterForm onSwitchToLogin={() => setIsLogin(true)} />
                )}
            </div>
        </div>
    )
}
