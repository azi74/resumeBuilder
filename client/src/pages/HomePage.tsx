import { useNavigate } from 'react-router-dom'
import { Button } from '../components'
import { TEMPLATES } from '../constants/resumeTemplates'
import { useAuth } from '../hooks/useAuth'

const HomePage = () => {
  const navigate = useNavigate()
  const { currentUser } = useAuth()

  return (
    <div className="max-w-6xl mx-auto">
      <section className="py-16 text-center">
        <h1 className="text-5xl font-bold text-gray-900 mb-6">
          Create Your Perfect Resume
        </h1>
        <p className="text-xl text-gray-600 mb-8 max-w-2xl mx-auto">
          Build a professional resume that stands out and gets you hired. Choose from our ATS-friendly templates.
        </p>
        <div className="flex justify-center gap-4">
          {currentUser ? (
            <Button onClick={() => navigate('/builder')}>
              Create New Resume
            </Button>
          ) : (
            <>
              <Button onClick={() => navigate('/auth')}>
                Get Started
              </Button>
              <Button variant="outline" onClick={() => navigate('/auth')}>
                Sign In
              </Button>
            </>
          )}
        </div>
      </section>

      <section className="py-12">
        <h2 className="text-3xl font-bold text-center mb-12">Our Templates</h2>
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8">
          {TEMPLATES.map(template => (
            <div 
              key={template.id}
              className="bg-white rounded-lg shadow-md overflow-hidden hover:shadow-lg transition-shadow"
            >
              <div className="h-48 bg-gray-200 flex items-center justify-center">
                <img 
                  src={template.thumbnail} 
                  alt={template.name} 
                  className="object-cover h-full w-full"
                />
              </div>
              <div className="p-6">
                <h3 className="text-xl font-semibold mb-2">{template.name}</h3>
                <p className="text-gray-600 mb-4">{template.description}</p>
                <Button 
                  variant="outline" 
                  size="sm"
                  onClick={() => navigate('/builder')}
                >
                  Use Template
                </Button>
              </div>
            </div>
          ))}
        </div>
      </section>
    </div>
  )
}

export default HomePage