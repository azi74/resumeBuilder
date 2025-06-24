import { useGoogleLogin } from '@react-oauth/google'
import  Button  from "./Button";
import { FcGoogle } from 'react-icons/fc'
import { useAuth } from '@/context/AuthContext';

interface GoogleLoginButtonProps {
  onClick?: () => void
}

const GoogleLoginButton = ({ onClick }: GoogleLoginButtonProps) => {
  const { googleLogin } = useAuth()

  const login = useGoogleLogin({
    onSuccess: tokenResponse => {
      console.log('Google Token:', tokenResponse)
      googleLogin()
    },
    onError: () => {
      console.error('Google login failed')
    }
  })

  return (
    <Button 
      variant="outline" 
      onClick={() => {
        if (onClick) onClick()
        login()
      }}
    >
      <FcGoogle className="mr-2" />
      Sign in with Google
    </Button>
  )
}

export default GoogleLoginButton