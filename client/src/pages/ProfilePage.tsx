import { useEffect } from 'react'
import { useNavigate } from 'react-router-dom'
import Button from '@/components/ui/Button'
import { useAuth } from '@/context/AuthContext'
import { useResume } from '@/context/ResumeContext'

const ProfilePage = () => {
  const { currentUser, logout } = useAuth()
  const { resumes, fetchResumes } = useResume()
  const navigate = useNavigate()

  useEffect(() => {
    if (currentUser) {
      fetchResumes()
    }
  }, [currentUser, fetchResumes])

  if (!currentUser) {
    navigate('/auth')
    return null
  }

  return (
    <div className="max-w-4xl mx-auto">
      <div className="flex justify-between items-center mb-8">
        <h1 className="text-3xl font-bold">Your Profile</h1>
        <Button variant="outline" onClick={logout}>
          Sign Out
        </Button>
      </div>

      <div className="bg-white rounded-lg shadow-md p-6 mb-8">
        <h2 className="text-xl font-semibold mb-4">Personal Information</h2>
        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
          <div>
            <p className="text-gray-600">Name</p>
            <p className="font-medium">{currentUser.name}</p>
          </div>
          <div>
            <p className="text-gray-600">Email</p>
            <p className="font-medium">{currentUser.email}</p>
          </div>
        </div>
      </div>

      <div className="bg-white rounded-lg shadow-md p-6">
        <div className="flex justify-between items-center mb-4">
          <h2 className="text-xl font-semibold">Your Resumes</h2>
          <Button onClick={() => navigate('/builder')}>
            Create New Resume
          </Button>
        </div>

        {resumes.length === 0 ? (
          <p className="text-gray-500">You haven't created any resumes yet.</p>
        ) : (
          <div className="space-y-4">
            {resumes.map(resume => (
              <div 
                key={resume._id} 
                className="border rounded-lg p-4 hover:bg-gray-50 cursor-pointer"
                onClick={() => navigate(`/builder/${resume._id}`)}
              >
                <h3 className="font-medium">{resume.title}</h3>
                <p className="text-sm text-gray-500">
                  Last updated: {new Date(resume.updatedAt).toLocaleDateString()}
                </p>
              </div>
            ))}
          </div>
        )}
      </div>
    </div>
  )
}

export default ProfilePage