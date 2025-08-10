import React, { useState } from 'react'
import { Eye, EyeOff } from 'lucide-react'
import { Button } from '../ui/Button'
import { Input } from '../ui/Input'
import { useToast } from '../../context/ToastContext'

interface RegisterFormProps {
    onSwitchToLogin: () => void
}

export const RegisterForm: React.FC<RegisterFormProps> = ({ onSwitchToLogin }) => {
    const [formData, setFormData] = useState({
        name: '',
        email: '',
        password: '',
        confirmPassword: ''
    })

    const [showPassword, setShowPassword] = useState(false)
    const [errors, setErrors] = useState<Record<string, string>>({})

    const { register, loading } = useAuth()
    const { addToast } = useToast()

    const validateForm = () => {
        const newErrors: Record<string, string> = {}

        if (!formData.name) {
            newErrors.name = 'Name is required'
        }

        if (!formData.email) {
            newErrors.email = 'Email is required'
        } else if (!/\S+@\S+\.\S+/.test(formData.email)) {
            newErrors.email = 'Email is invalid'
        }

        if (!formData.password) {
            newErrors.password = 'Password is required'
        } else if (formData.password.length < 6) {
            newErrors.password = 'Password must be at least 6 characters'
        }

        if (formData.password !== formData.confirmPassword) {
            newErrors.confirmPassword = 'Password do not match'
        }

        setErrors(newErrors)
        return Object.keys(newErrors).length === 0
    }

    const handleSubmit = async (e: React.FormEvent) => {
        e.preventDefault()

        if (!validateForm()) return

        try {
            await register(formData.email, formData.password, formData.name)
            addToast('success', 'Account created!', 'Welcome to ClientTrack Pro.')
        } catch (error) {
            addToast('error', 'Registration failed', error instanceof Error ? error.message : 'Something went wrong')
        }
    }

    const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
        setFormData(prev => ({
            ...prev,
            [e.target.name]: e.target.value
        }))
    }

    return (
        <div className='w-full max-w-md'>
            <div className='text-center mb-8'>
                <div className='w-16 h-16 bg-slate-900 dark:bg-slate-100 rounded-xl flex items-center justify-center mx-auto mb-4'>
                    <span className='text-white dark:text-slate-900 font-bold text-xl'>CT</span>
                </div>
                <h2 className='text-2xl font-bold text-slate-900 dark:text-slate-100'>
                    Create your account
                </h2>
                <p className='text-slate-600 dark:text-slate-400 mt-2'>Join ClientTrack Pro to manage your clients</p>
            </div>

            <form onSubmit={handleSubmit} className='space-y-4'>
                <Input
                    name='name'
                    type='text'
                    label='Full Name'
                    value={formData.name}
                    onChange={handleChange}
                    error={errors.name}
                    placeholder='Enter your email'
                />

                <div className='relative'>
                    <Input
                        name='password'
                        type={showPassword ? 'text' : 'password'}
                        label='Password'
                        value={formData.password}
                        onChange={handleChange}
                        error={errors.password}
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
                    value={formData.confirmPassword}
                    onChange={handleChange}
                    error={errors.confirmPassword}
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