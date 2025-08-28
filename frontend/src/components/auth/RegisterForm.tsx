import React, { useState, type SyntheticEvent } from 'react'
import { Eye, EyeOff } from 'lucide-react'
import { Button } from '../ui/button'
import { Input } from '../ui/Input'
import { useToast } from '../../context/ToastContext'

interface RegisterFormProps {
    onSwitchToLogin: () => void
}

export const RegisterForm: React.FC<RegisterFormProps> = ({ onSwitchToLogin }) => {

    const [name, setName] = useState("")
    const [email, setEmail] = useState("")
    const [password, setPassword] = useState("")
    const [confirmPassword, setConfirmPassword] = useState("")
    const [showPassword, setShowPassword] = useState(false)
    const [loading, setLoading] = useState(false)

    const { addToast } = useToast()


    const handleSubmit = async (e: SyntheticEvent) => {
        e.preventDefault()

        if (!name || !email || !password || !confirmPassword) {
            addToast("error", "Missing fields", "Please fill in all fields")
            return
        }
        if (!/\S+@\S+\.\S+/.test(email)) {
            addToast("error", "Invalid email", "Please enter a valid email.")
            return
        }
        if (password.length < 6) {
            addToast("error", "Weak password", "Password must be at least 6 characters.")
            return
        }
        if (password != confirmPassword) {
            addToast("error", "Password mismatch", "Passwords do not match.")
            return
        }

        setLoading(true)
        try {
            const res = await fetch(`${import.meta.env.VITE_API_BASE ?? "http://localhost:8000"}/api/register`, {
                method: "POST",
                credentials: "include",
                headers: { "Content-Type": "application/json" },
                body: JSON.stringify({ name, email, password }),
            })

            if (!res.ok) {
                const data = await res.json().catch(() => ({}))
                throw new Error(data?.message || "Registration failed")
            }
                addToast("success", "Account created!", "Please sign in.")
                onSwitchToLogin()
            
        } catch (error) {
            addToast("error", "Registration failed", error instanceof Error ? error.message : "Something went wrong")

        } finally {
            setLoading(false)
        }
    }


    return (
        <div className='w-full max-w-md'>
            <div className='text-center mb-8'>
                <div className="w-16 h-16  bg-gradient-to-br from-blue-500 to-purple-600 rounded-xl flex items-center justify-center mx-auto mb-4'">
            <span className="text-white font-bold text-xl">CS</span>
            </div>
                <h2 className='text-2xl font-bold text-slate-900 dark:text-slate-100'>
                    Create your account
                </h2>
                <p className='text-slate-600 dark:text-slate-400 mt-2'>Join ClientSight to manage your clients</p>
            </div>

            <form onSubmit={handleSubmit} className='space-y-4'>
                <Input
                    name='name'
                    type='text'
                    label='Full Name'
                    onChange={e => setName(e.target.value)}
                    placeholder='Enter your full name'
                />

                <Input
                    name='email'
                    type='email'
                    label='Email'
                    onChange={e => setEmail(e.target.value)}
                    placeholder='Enter your email'
                />

                <div className='relative'>
                    <Input
                        name='password'
                        type={showPassword ? "text" : "password"}
                        label='Password'
                        onChange={e => setPassword(e.target.value)}
                        placeholder='Create a password'
                    />
                    <button
                        type='button'
                        onClick={() => setShowPassword(!showPassword)}
                        className='absolute right-3 top-8 text-slate-400 hover:text-slate-600 dark:hover:text-slate-300'
                    >
                        {showPassword ? <EyeOff className='h-4 w-4' /> : <Eye className='h-4 w-4' />}
                    </button>
                </div>

                <Input
                    name='ConfirmPassword'
                    type='password'
                    label='Confirm Password'
                    onChange={e => setConfirmPassword(e.target.value)}
                    placeholder='Confirm your password'
                />

                <Button type='submit' className='w-full' loading={loading}>
                    Create Account
                </Button>
            </form>

            <div className='mt-6 text-center'>
                <p className='text-sm text-slate-600 dark:text-slate-400'>
                    Already have an account?{' '}
                    <button 
                        onClick={onSwitchToLogin}
                        className='font-medium text-slate-900 dark:text-slate-100 hover:underline'
                    >
                        Sign in
                    </button>
                </p>
            </div>
        </div>
    )
}