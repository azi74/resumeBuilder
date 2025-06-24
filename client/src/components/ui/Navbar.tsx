import { Link, useNavigate } from 'react-router-dom'
import Button from './Button'
import { useAuth } from '@/context/AuthContext'
import GoogleLoginButton from './GoogleLoginButton'
import { User } from '@/types/auth'

interface NavbarProps {
  user: User | null
}

const Navbar = ({ user }: NavbarProps) => {
  const { logout } = useAuth()
  const navigate = useNavigate()

  return (
    <nav className="bg-white shadow-sm">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex justify-between h-16">
          <div className="flex">
            <div className="flex-shrink-0 flex items-center">
              <Link to="/" className="text-xl font-bold text-violet-600">
                ResumeBuilder
              </Link>
            </div>
          </div>
          
          <div className="flex items-center space-x-4">
            {user ? (
              <>
                <Button 
                  variant="ghost" 
                  onClick={() => navigate('/profile')}
                >
                  My Resumes
                </Button>
                <Button 
                  variant="outline" 
                  onClick={() => navigate('/builder')}
                >
                  Create Resume
                </Button>
                <Button 
                  variant="ghost" 
                  onClick={logout}
                >
                  Sign Out
                </Button>
              </>
            ) : (
              <>
                <Button 
                  variant="ghost" 
                  onClick={() => navigate('/auth')}
                >
                  Sign In
                </Button>
                <GoogleLoginButton 
                  onClick={() => navigate('/auth')}
                />
              </>
            )}
          </div>
        </div>
      </div>
    </nav>
  )
}

export default Navbar