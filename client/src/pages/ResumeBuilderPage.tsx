import { useEffect, useState } from 'react'
import { useForm, FormProvider } from 'react-hook-form'
import { useNavigate, useParams } from 'react-router-dom'
import { FiSave, FiDownload, FiShare2, FiEye, FiChevronLeft } from 'react-icons/fi'
import Button from '@/components/ui/Button'
import Modal from '@/components/ui/Modal'
import TemplateSelector from '@/components/ui/TemplateSelector'
import PreviewPane from '@/components/ui/PreviewPane'
import PersonalInfoForm from '@/components/ui/PersonalInfoForm'
import ExperienceForm from '@/components/ui/ExperienceForm'
import EducationForm from '@/components/ui/EducationForm'
import SkillsForm from '@/components/ui/SkillsForm'
import ProjectsForm from '@/components/ui/ProjectsForm'
import CertificationsForm from '@/components/ui/CertificationsForm'
import { useAuth } from '@/context/AuthContext'
import { useResume } from '@/context/ResumeContext'
import { ResumeFormData } from '../types'

const ResumeBuilderPage = () => {
  const { resumeId } = useParams()
  const { currentUser } = useAuth()
  const { 
    currentResume, 
    fetchResume, 
    createResume, 
    updateResume,
    downloadResume,
    loading: resumeLoading 
  } = useResume()
  const [isPreviewOpen, setIsPreviewOpen] = useState(false)
  const [activeTab, setActiveTab] = useState('personal')
  const navigate = useNavigate()

  const methods = useForm<ResumeFormData>({
    defaultValues: {
      personalInfo: {
        firstName: '',
        lastName: '',
        email: currentUser?.email || '',
        phone: '',
        address: '',
        city: '',
        country: '',
        postalCode: '',
        summary: '',
        photo: null
      },
      experiences: [],
      educations: [],
      skills: [],
      projects: [],
      certifications: [],
      socialLinks: {
        linkedin: '',
        github: '',
        portfolio: ''
      },
      template: 'classic'
    }
  })

  useEffect(() => {
    if (resumeId && !currentResume) {
      fetchResume(resumeId)
    }
  }, [resumeId, currentResume, fetchResume])

  useEffect(() => {
    if (currentResume) {
      methods.reset(currentResume.data)
    }
  }, [currentResume, methods])

  const onSubmit = async (data: ResumeFormData) => {
    try {
      if (resumeId && currentResume) {
        await updateResume(resumeId, data)
      } else {
        const newResume = await createResume(data)
        navigate(`/builder/${newResume._id}`)
      }
    } catch (error) {
      console.error('Error saving resume:', error)
    }
  }

  const handleDownload = async (format: 'pdf' | 'docx') => {
    const data = methods.getValues()
    await downloadResume(data, format)
  }

  const handleShare = async () => {
    // Implement share functionality
    console.log('Sharing resume')
  }

  if (resumeLoading) {
    return <div>Loading...</div>
  }

  return (
    <FormProvider {...methods}>
      <div className="container mx-auto px-4 py-8">
        <div className="flex items-center mb-6">
          <button
            onClick={() => navigate('/')}
            className="flex items-center text-violet-600 hover:text-violet-800 mr-4"
          >
            <FiChevronLeft className="mr-1" /> Back
          </button>
          <h1 className="text-2xl font-bold text-gray-900">
            {resumeId ? 'Edit Resume' : 'Create New Resume'}
          </h1>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
          <div className="lg:col-span-2">
            <div className="bg-white rounded-lg shadow-md p-6 mb-6">
              <TemplateSelector />
            </div>

            <div className="bg-white rounded-lg shadow-md p-6">
              <div className="flex overflow-x-auto mb-6">
                {['personal', 'experience', 'education', 'skills', 'projects', 'certifications'].map((tab) => (
                  <button
                    key={tab}
                    onClick={() => setActiveTab(tab)}
                    className={`px-4 py-2 font-medium text-sm rounded-md mr-2 ${activeTab === tab ? 'bg-violet-100 text-violet-700' : 'text-gray-600 hover:bg-gray-100'}`}
                  >
                    {tab.charAt(0).toUpperCase() + tab.slice(1)}
                  </button>
                ))}
              </div>

              <form onSubmit={methods.handleSubmit(onSubmit)}>
                {activeTab === 'personal' && <PersonalInfoForm />}
                {activeTab === 'experience' && <ExperienceForm />}
                {activeTab === 'education' && <EducationForm />}
                {activeTab === 'skills' && <SkillsForm />}
                {activeTab === 'projects' && <ProjectsForm />}
                {activeTab === 'certifications' && <CertificationsForm />}

                <div className="mt-8 flex flex-wrap gap-4">
                  <Button type="submit" variant="primary" loading={methods.formState.isSubmitting}>
                    <FiSave className="mr-2" /> Save Resume
                  </Button>
                  <Button type="button" variant="outline" onClick={() => setIsPreviewOpen(true)}>
                    <FiEye className="mr-2" /> Preview
                  </Button>
                  <Button type="button" variant="secondary" onClick={() => handleDownload('pdf')}>
                    <FiDownload className="mr-2" /> Download PDF
                  </Button>
                  <Button type="button" variant="ghost" onClick={handleShare}>
                    <FiShare2 className="mr-2" /> Share
                  </Button>
                </div>
              </form>
            </div>
          </div>

          <div className="lg:col-span-1">
            <div className="bg-white rounded-lg shadow-md p-6 sticky top-4">
              <h2 className="text-lg font-semibold mb-4">Resume Tips</h2>
              <ul className="space-y-3">
                <li className="flex items-start">
                  <span className="text-violet-600 mr-2">•</span>
                  <span>Keep your resume concise (1-2 pages max)</span>
                </li>
                <li className="flex items-start">
                  <span className="text-violet-600 mr-2">•</span>
                  <span>Use action verbs to describe your experiences</span>
                </li>
                <li className="flex items-start">
                  <span className="text-violet-600 mr-2">•</span>
                  <span>Tailor your resume for each job application</span>
                </li>
                <li className="flex items-start">
                  <span className="text-violet-600 mr-2">•</span>
                  <span>Quantify achievements with numbers when possible</span>
                </li>
                <li className="flex items-start">
                  <span className="text-violet-600 mr-2">•</span>
                  <span>Proofread carefully for spelling and grammar</span>
                </li>
              </ul>
            </div>
          </div>
        </div>
      </div>

      <Modal isOpen={isPreviewOpen} onClose={() => setIsPreviewOpen(false)} size="xl" title="Resume Preview">
        <PreviewPane />
      </Modal>
    </FormProvider>
  )
}

export default ResumeBuilderPage