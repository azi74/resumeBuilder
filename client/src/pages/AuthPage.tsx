import { useState } from 'react'
import { useNavigate } from 'react-router-dom'
import { AuthModal, GoogleLoginButton } from '../components'
import { useAuth } from '../hooks/useAuth'

const AuthPage = () => {
  const [isLogin, setIsLogin] = useState(true)
  const { googleLogin } = useAuth()
  const navigate = useNavigate()

  const handleSuccess = () => {
    navigate('/profile')
  }

  return (
    <div className="flex items-center justify-center min-h-screen bg-gray-50">
      <div className="w-full max-w-md p-8 space-y-8 bg-white rounded-xl shadow-md">
        <div className="text-center">
          <h2 className="text-3xl font-bold text-gray-900">
            {isLogin ? 'Sign in to your account' : 'Create an account'}
          </h2>
        </div>

        <AuthModal 
          isLogin={isLogin} 
          onSuccess={handleSuccess}
          onToggleMode={() => setIsLogin(!isLogin)}
        />

        <div className="relative">
          <div className="absolute inset-0 flex items-center">
            <div className="w-full border-t border-gray-300"></div>
          </div>
          <div className="relative flex justify-center text-sm">
            <span className="px-2 bg-white text-gray-500">
              Or continue with
            </span>
          </div>
        </div>

        <div className="flex justify-center">
          <GoogleLoginButton onClick={googleLogin} />
        </div>
      </div>
    </div>
  )
}

export default AuthPage