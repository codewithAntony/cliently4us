import React, { useState } from 'react'
import { LoginForm } from '../components/auth/LoginForm'
import { RegisterForm } from '../components/auth/RegisterForm'

export const AuthPage: React.FC = () => {
    const [isLogin, setIsLogin] = useState(true)


    return (
        <div className='min-h-screen flex items-center justify-center px-4 bg-[#152141]'>
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
