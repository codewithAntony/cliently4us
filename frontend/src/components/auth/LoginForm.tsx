import React, { useState } from 'react'
import { Eye, EyeOff } from 'lucide-react'
import { Button } from '../ui/button'
import { Input } from '../ui/Input'
import { useAuth } from '../../context/AuthContext'
import { useToast } from '../../context/ToastContext'
import { useNavigate } from 'react-router-dom'

interface LoginFormProps {
    onSwitchToRegister: () => void
}

export const LoginForm: React.FC<LoginFormProps> = ({ onSwitchToRegister }) => {
    const [email, setEmail] = useState('')
    const [password, setPassword] = useState('')
    const [showPassword, setShowPassword] = useState(false)
    const [errors, setErrors] = useState<{ email?: String; password?: string }>
    ({})
    const [loading, setLoading] = useState(false)


    const { addToast } = useToast()
    const { login } = useAuth()
    const navigate = useNavigate()

    const validateForm = () => {
      const newErrors: { email?: string; password?: string } = {}

      if (!email) {
        newErrors.email = 'Email is required'
      } else if (!/\S+@\S+\.\S+/.test(email)) {
        newErrors.email = 'Email is invalid'
      }

      if (!password) {
        newErrors.password = 'Password is required'
      } else if (password.length < 6) {
        newErrors.password = 'Password must be at least 6 characters'
      }

      setErrors(newErrors)
      return Object.keys(newErrors).length === 0
    }

    const handleSubmit = async (e: React.FormEvent) => {
      e.preventDefault()

      if (!validateForm()) return

      setLoading(true)
      try {
        await login(email, password)
        addToast('success', 'Welcome back!', 'You have successfully signed in.')
        navigate("/dashboard")
      } catch (error) {
        addToast('error', 'Login failed', error instanceof Error ? error.message : 'Invalid credentials')
      } finally {
        setLoading(false)
      }
    }

  return (
    <div className='min-h-screen flex items-center justify-center bg-[#152141] px-4'>
      <div className='w-full max-w-md rounded-2xl shadow-lg p-8 bg-[#1e2a4a]'> 
      <div className='text-center mb-8'>
        <div className="w-16 h-16  bg-gradient-to-br from-blue-500 to-purple-600 rounded-xl flex items-center justify-center mx-auto mb-4'">
            <span className="text-white font-bold text-xl">CS</span>
            </div>
        <h2 className='text-2xl font-bold text-white dark:text-slate-100'>Welcome back</h2>
        <p className='text-white dark:text-slate-400 mt-2'>Sign in to your account to continue</p>
      </div>

      <form onSubmit={handleSubmit} className='space-y-4'>
        <Input
          type='email'
          label='Email'
          value={email}
          onChange={(e) => setEmail(e.target.value)}
          error={errors.email}
          placeholder='Enter your email'
          autoComplete='off'
        />

        <div className='relative'>
          <Input
            type={showPassword ? 'text' : 'password'}
            label='Password'
            value={password}
            onChange={(e) => setPassword(e.target.value)}
            error={errors.password}
            placeholder='Enter your password'
            autoComplete='new-password'
          />
          <button
            type='button'
            onClick={() => setShowPassword(!showPassword)}
            className='absolute right-3 top-8 text-white hover:text-slate-600 dark:text-slate-300'
            >
              {showPassword ? <EyeOff className='h-4 w-4' /> : <Eye className='h-4 w-4' />}
            </button>
        </div>

        <Button type='submit' className='w-full' loading={loading}>
          Sign In
        </Button>
      </form>

      <div className='mt-6 text-center'>
        <p className='text-sm text-white dark:text-slate-400'>Don't have an account?{' '}
          <button
            onClick={onSwitchToRegister}
            className='font-medium text-white dark:text-slate-100 underline'
            >
              Sign up
            </button>
        </p>
      </div>
    </div>
    </div>
    
  )
}
