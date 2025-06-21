import mongoose from 'mongoose'

const experienceSchema = new mongoose.Schema({
  jobTitle: {
    type: String,
    required: true
  },
  company: {
    type: String,
    required: true
  },
  location: {
    type: String
  },
  startDate: {
    type: Date,
    required: true
  },
  endDate: {
    type: Date
  },
  current: {
    type: Boolean,
    default: false
  },
  description: {
    type: String,
    required: true
  }
})

const educationSchema = new mongoose.Schema({
  institution: {
    type: String,
    required: true
  },
  degree: {
    type: String,
    required: true
  },
  fieldOfStudy: {
    type: String
  },
  startDate: {
    type: Date,
    required: true
  },
  endDate: {
    type: Date
  },
  current: {
    type: Boolean,
    default: false
  },
  description: {
    type: String
  }
})

const projectSchema = new mongoose.Schema({
  name: {
    type: String,
    required: true
  },
  description: {
    type: String,
    required: true
  },
  url: {
    type: String
  },
  technologies: {
    type: [String]
  }
})

const certificationSchema = new mongoose.Schema({
  name: {
    type: String,
    required: true
  },
  issuingOrganization: {
    type: String,
    required: true
  },
  issueDate: {
    type: Date,
    required: true
  },
  expirationDate: {
    type: Date
  },
  credentialId: {
    type: String
  },
  credentialUrl: {
    type: String
  }
})

const resumeSchema = new mongoose.Schema({
  user: {
    type: mongoose.Schema.Types.ObjectId,
    ref: 'User',
    required: true
  },
  title: {
    type: String,
    required: true
  },
  template: {
    type: String,
    required: true,
    enum: ['classic', 'modern', 'creative', 'professional'],
    default: 'classic'
  },
  data: {
    personalInfo: {
      firstName: {
        type: String,
        required: true
      },
      lastName: {
        type: String,
        required: true
      },
      email: {
        type: String,
        required: true
      },
      phone: {
        type: String
      },
      address: {
        type: String
      },
      city: {
        type: String
      },
      country: {
        type: String
      },
      postalCode: {
        type: String
      },
      summary: {
        type: String
      },
      photo: {
        type: String
      }
    },
    experiences: [experienceSchema],
    educations: [educationSchema],
    skills: [{
      name: {
        type: String,
        required: true
      },
      level: {
        type: String,
        enum: ['beginner', 'intermediate', 'advanced', 'expert'],
        default: 'intermediate'
      }
    }],
    projects: [projectSchema],
    certifications: [certificationSchema],
    socialLinks: {
      linkedin: {
        type: String
      },
      github: {
        type: String
      },
      portfolio: {
        type: String
      }
    }
  },
  lastUpdated: {
    type: Date,
    default: Date.now
  }
}, {
  timestamps: true
})

const Resume = mongoose.model('Resume', resumeSchema)

export default Resume