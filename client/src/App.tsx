import { AnimatePresence } from 'framer-motion'
import { Routes, Route, useLocation } from 'react-router-dom'
import { HomePage, AuthPage, ProfilePage, ResumeBuilderPage } from './pages'
import { MainLayout } from './layouts'
import { AuthProvider } from './context/AuthContext'

function App() {
  const location = useLocation()

  return (
    <AuthProvider>
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
    </AuthProvider>
  )
}

export default App