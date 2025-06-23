import { Outlet } from 'react-router-dom'
import Footer from '@/components/ui/Footer'
import Navbar from '@/components/ui/Navbar'
import { useAuth } from '../hooks/useAuth'

const MainLayout = () => {
  const { currentUser } = useAuth()

  return (
    <div className="flex flex-col min-h-screen bg-gray-50">
      <Navbar user={currentUser} />
      <main className="flex-grow container mx-auto px-4 py-8">
        <Outlet />
      </main>
      <Footer />
    </div>
  )
}

export default MainLayout