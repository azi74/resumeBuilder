import { createContext, useContext, useState, ReactNode } from 'react'
import { Resume, ResumeFormData } from '../types'
import { resumeService } from '../services/resumeService'

interface ResumeContextType {
  resumes: Resume[]
  currentResume: Resume | null
  loading: boolean
  error: string | null
  fetchResumes: () => Promise<void>
  fetchResume: (id: string) => Promise<void>
  createResume: (data: ResumeFormData) => Promise<Resume>
  updateResume: (id: string, data: ResumeFormData) => Promise<Resume>
  deleteResume: (id: string) => Promise<void>
  downloadResume: (data: ResumeFormData, format: 'pdf' | 'docx') => Promise<void>
}

const ResumeContext = createContext<ResumeContextType | undefined>(undefined)

export const ResumeProvider = ({ children }: { children: ReactNode }) => {
  const [resumes, setResumes] = useState<Resume[]>([])
  const [currentResume, setCurrentResume] = useState<Resume | null>(null)
  const [loading, setLoading] = useState(false)
  const [error, setError] = useState<string | null>(null)

  const fetchResumes = async () => {
    setLoading(true)
    try {
      const data = await resumeService.getResumes()
      setResumes(data)
      setError(null)
    } catch (err) {
      setError(err instanceof Error ? err.message : 'Failed to fetch resumes')
    } finally {
      setLoading(false)
    }
  }

  const fetchResume = async (id: string) => {
    setLoading(true)
    try {
      const data = await resumeService.getResume(id)
      setCurrentResume(data)
      setError(null)
    } catch (err) {
      setError(err instanceof Error ? err.message : 'Failed to fetch resume')
    } finally {
      setLoading(false)
    }
  }

  const createResume = async (data: ResumeFormData): Promise<Resume> => {
    setLoading(true)
    try {
      const newResume = await resumeService.createResume(data)
      setResumes([...resumes, newResume])
      setCurrentResume(newResume)
      setError(null)
      return newResume
    } catch (err) {
      setError(err instanceof Error ? err.message : 'Failed to create resume')
      throw err
    } finally {
      setLoading(false)
    }
  }

  const updateResume = async (id: string, data: ResumeFormData): Promise<Resume> => {
    setLoading(true)
    try {
      const updatedResume = await resumeService.updateResume(id, data)
      setResumes(resumes.map(r => r._id === id ? updatedResume : r))
      setCurrentResume(updatedResume)
      setError(null)
      return updatedResume
    } catch (err) {
      setError(err instanceof Error ? err.message : 'Failed to update resume')
      throw err
    } finally {
      setLoading(false)
    }
  }

  const deleteResume = async (id: string) => {
    setLoading(true)
    try {
      await resumeService.deleteResume(id)
      setResumes(resumes.filter(r => r._id !== id))
      if (currentResume?._id === id) {
        setCurrentResume(null)
      }
      setError(null)
    } catch (err) {
      setError(err instanceof Error ? err.message : 'Failed to delete resume')
    } finally {
      setLoading(false)
    }
  }

  const downloadResume = async (data: ResumeFormData, format: 'pdf' | 'docx') => {
    setLoading(true)
    try {
      await resumeService.downloadResume(data, format)
      setError(null)
    } catch (err) {
      setError(err instanceof Error ? err.message : 'Failed to download resume')
    } finally {
      setLoading(false)
    }
  }

  const value = {
    resumes,
    currentResume,
    loading,
    error,
    fetchResumes,
    fetchResume,
    createResume,
    updateResume,
    deleteResume,
    downloadResume
  }

  return <ResumeContext.Provider value={value}>{children}</ResumeContext.Provider>
}

export const useResume = () => {
  const context = useContext(ResumeContext)
  if (context === undefined) {
    throw new Error('useResume must be used within a ResumeProvider')
  }
  return context
}