import { useState } from 'react'
import { useForm } from 'react-hook-form'
import { Button, Input } from './FormElements'
import { validateEmail } from '../utils/validationUtils'

interface AuthModalProps {
  isLogin: boolean
  onSuccess: () => void
  onToggleMode: () => void
}

interface AuthFormData {
  name?: string
  email: string
  password: string
}

const AuthModal = ({ isLogin, onSuccess, onToggleMode }: AuthModalProps) => {
  const { register, handleSubmit, formState: { errors } } = useForm<AuthFormData>()
  const [authError, setAuthError] = useState('')

  const onSubmit = async (data: AuthFormData) => {
    try {
      setAuthError('')
      // Here you would call your auth service
      // For example: await authService.login(data.email, data.password)
      onSuccess()
    } catch (error) {
      setAuthError(error instanceof Error ? error.message : 'Authentication failed')
    }
  }

  return (
    <form className="space-y-6" onSubmit={handleSubmit(onSubmit)}>
      {authError && (
        <div className="bg-red-50 text-red-600 p-3 rounded-md text-sm">
          {authError}
        </div>
      )}
      
      {!isLogin && (
        <Input
          label="Name"
          {...register('name', { required: 'Name is required' })}
          error={errors.name}
        />
      )}
      
      <Input
        label="Email address"
        type="email"
        {...register('email', { 
          required: 'Email is required',
          validate: value => validateEmail(value) || 'Invalid email address'
        })}
        error={errors.email}
      />
      
      <Input
        label="Password"
        type="password"
        {...register('password', { 
          required: 'Password is required',
          minLength: {
            value: 6,
            message: 'Password must be at least 6 characters'
          }
        })}
        error={errors.password}
      />
      
      <div className="flex items-center justify-between">
        {isLogin ? (
          <button
            type="button"
            className="text-sm text-violet-600 hover:text-violet-500"
            onClick={onToggleMode}
          >
            Don't have an account? Sign up
          </button>
        ) : (
          <button
            type="button"
            className="text-sm text-violet-600 hover:text-violet-500"
            onClick={onToggleMode}
          >
            Already have an account? Sign in
          </button>
        )}
      </div>
      
      <div>
        <Button type="submit" variant="primary" className="w-full">
          {isLogin ? 'Sign in' : 'Sign up'}
        </Button>
      </div>
    </form>
  )
}

export default AuthModal