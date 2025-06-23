import api from './api'
import { Resume, ResumeFormData } from '../types'

export const resumeService = {
  async getResumes(): Promise<Resume[]> {
    const response = await api.get('/resumes')
    return response.data
  },

  async getResume(id: string): Promise<Resume> {
    const response = await api.get(`/resumes/${id}`)
    return response.data
  },

  async createResume(data: ResumeFormData): Promise<Resume> {
    const response = await api.post('/resumes', data)
    return response.data
  },

  async updateResume(id: string, data: ResumeFormData): Promise<Resume> {
    const response = await api.put(`/resumes/${id}`, data)
    return response.data
  },

  async deleteResume(id: string): Promise<void> {
    await api.delete(`/resumes/${id}`)
  },

  async downloadResume(data: ResumeFormData, format: 'pdf' | 'docx'): Promise<void> {
    const response = await api.post(
      `/resumes/download/${format}`,
      data,
      { responseType: 'blob' }
    )
    
    const url = window.URL.createObjectURL(new Blob([response.data]))
    const link = document.createElement('a')
    link.href = url
    link.setAttribute('download', `resume.${format}`)
    document.body.appendChild(link)
    link.click()
    link.remove()
  }
}