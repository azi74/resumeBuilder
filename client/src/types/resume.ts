export interface Experience {
  jobTitle: string
  company: string
  location?: string
  startDate: Date | string
  endDate?: Date | string
  current: boolean
  description: string
}

export interface Education {
  institution: string
  degree: string
  fieldOfStudy?: string
  startDate: Date | string
  endDate?: Date | string
  current: boolean
  description?: string
}

export interface Skill {
  name: string
  level: 'beginner' | 'intermediate' | 'advanced' | 'expert'
}

export interface Project {
  name: string
  description: string
  url?: string
  technologies?: string[]
}

export interface Certification {
  name: string
  issuingOrganization: string
  issueDate: Date | string
  expirationDate?: Date | string
  credentialId?: string
  credentialUrl?: string
}

export interface SocialLinks {
  linkedin?: string
  github?: string
  portfolio?: string
}

export interface PersonalInfo {
  firstName: string
  lastName: string
  email: string
  phone?: string
  address?: string
  city?: string
  country?: string
  postalCode?: string
  summary?: string
  photo?: string | null
}

export interface ResumeFormData {
  personalInfo: PersonalInfo
  experiences: Experience[]
  educations: Education[]
  skills: Skill[]
  projects: Project[]
  certifications: Certification[]
  socialLinks: SocialLinks
  template: string
}

export interface Resume {
  _id: string
  user: string
  title: string
  template: string
  data: ResumeFormData
  createdAt: Date | string
  updatedAt: Date | string
}