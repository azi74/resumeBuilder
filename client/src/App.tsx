import { AnimatePresence } from 'framer-motion'
import { Routes, Route, useLocation } from 'react-router-dom'
import HomePage from './pages/HomePage'
import AuthPage from './pages/AuthPage'
import ProfilePage from './pages/ProfilePage'
import ResumeBuilderPage from './pages/ResumeBuilderPage'
import MainLayout from './layouts/MainLayout'
import { AuthProvider } from './context/AuthContext'
import { ResumeProvider } from './context/ResumeContext'

function App() {
  const location = useLocation()

  return (
    <AuthProvider>
      <ResumeProvider>
        <AnimatePresence mode="wait">
          <Routes location={location} key={location.pathname}>
            <Route path="/" element={<MainLayout />}>
              <Route index element={<HomePage />} />
              <Route path="auth" element={<AuthPage />} />
              <Route path="profile" element={<ProfilePage />} />
              <Route path="builder" element={<ResumeBuilderPage />} />
              <Route path="builder/:resumeId" element={<ResumeBuilderPage />} />
            </Route>
          </Routes>
        </AnimatePresence>
      </ResumeProvider>
    </AuthProvider>
  )
}

export default App