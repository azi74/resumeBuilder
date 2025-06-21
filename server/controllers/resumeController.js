import Resume from '../models/Resume.js'
import User from '../models/User.js'
import { generatePDF, generateDocx } from '../services/resumeService.js'
import { v2 as cloudinary } from 'cloudinary'

// Configure Cloudinary
cloudinary.config({
  cloud_name: process.env.CLOUDINARY_CLOUD_NAME,
  api_key: process.env.CLOUDINARY_API_KEY,
  api_secret: process.env.CLOUDINARY_API_SECRET
})

// @desc    Get all resumes for a user
// @route   GET /api/resumes
// @access  Private
export const getResumes = async (req, res, next) => {
  try {
    const resumes = await Resume.find({ user: req.user._id }).sort('-updatedAt')
    res.json(resumes)
  } catch (error) {
    next(error)
  }
}

// @desc    Get single resume
// @route   GET /api/resumes/:id
// @access  Private
export const getResume = async (req, res, next) => {
  try {
    const resume = await Resume.findOne({
      _id: req.params.id,
      user: req.user._id
    })

    if (!resume) {
      res.status(404)
      throw new Error('Resume not found')
    }

    res.json(resume)
  } catch (error) {
    next(error)
  }
}

// @desc    Create new resume
// @route   POST /api/resumes
// @access  Private
export const createResume = async (req, res, next) => {
  try {
    const { title, template, data } = req.body

    // Upload photo if exists
    if (data.personalInfo.photo) {
      const result = await cloudinary.uploader.upload(data.personalInfo.photo, {
        folder: 'resume-builder/photos'
      })
      data.personalInfo.photo = result.secure_url
    }

    const resume = new Resume({
      user: req.user._id,
      title,
      template,
      data
    })

    const createdResume = await resume.save()

    // Add resume to user's resumes array
    await User.findByIdAndUpdate(req.user._id, {
      $push: { resumes: createdResume._id }
    })

    res.status(201).json(createdResume)
  } catch (error) {
    next(error)
  }
}

// @desc    Update resume
// @route   PUT /api/resumes/:id
// @access  Private
export const updateResume = async (req, res, next) => {
  try {
    const { title, template, data } = req.body
    const resume = await Resume.findById(req.params.id)

    if (!resume) {
      res.status(404)
      throw new Error('Resume not found')
    }

    // Check if user owns the resume
    if (resume.user.toString() !== req.user._id.toString()) {
      res.status(401)
      throw new Error('Not authorized to update this resume')
    }

    // Handle photo upload/update
    if (data.personalInfo.photo && data.personalInfo.photo !== resume.data.personalInfo.photo) {
      // If there's an existing photo, delete it from Cloudinary
      if (resume.data.personalInfo.photo) {
        const publicId = resume.data.personalInfo.photo.split('/').pop().split('.')[0]
        await cloudinary.uploader.destroy(`resume-builder/photos/${publicId}`)
      }

      // Upload new photo
      const result = await cloudinary.uploader.upload(data.personalInfo.photo, {
        folder: 'resume-builder/photos'
      })
      data.personalInfo.photo = result.secure_url
    } else {
      // Keep the existing photo if not changed
      data.personalInfo.photo = resume.data.personalInfo.photo
    }

    const updatedResume = await Resume.findByIdAndUpdate(
      req.params.id,
      {
        title,
        template,
        data,
        lastUpdated: Date.now()
      },
      { new: true }
    )

    res.json(updatedResume)
  } catch (error) {
    next(error)
  }
}

// @desc    Delete resume
// @route   DELETE /api/resumes/:id
// @access  Private
export const deleteResume = async (req, res, next) => {
  try {
    const resume = await Resume.findById(req.params.id)

    if (!resume) {
      res.status(404)
      throw new Error('Resume not found')
    }

    // Check if user owns the resume
    if (resume.user.toString() !== req.user._id.toString()) {
      res.status(401)
      throw new Error('Not authorized to delete this resume')
    }

    // Delete photo from Cloudinary if exists
    if (resume.data.personalInfo.photo) {
      const publicId = resume.data.personalInfo.photo.split('/').pop().split('.')[0]
      await cloudinary.uploader.destroy(`resume-builder/photos/${publicId}`)
    }

    await resume.remove()

    // Remove resume from user's resumes array
    await User.findByIdAndUpdate(req.user._id, {
      $pull: { resumes: resume._id }
    })

    res.json({ message: 'Resume removed' })
  } catch (error) {
    next(error)
  }
}

// @desc    Download resume as PDF
// @route   POST /api/resumes/:id/download/pdf
// @access  Private
export const downloadPDF = async (req, res, next) => {
  try {
    const resume = await Resume.findOne({
      _id: req.params.id,
      user: req.user._id
    })

    if (!resume) {
      res.status(404)
      throw new Error('Resume not found')
    }

    const pdfBuffer = await generatePDF(resume)

    res.set({
      'Content-Type': 'application/pdf',
      'Content-Disposition': `attachment; filename=${resume.title.replace(/\s+/g, '_')}.pdf`,
      'Content-Length': pdfBuffer.length
    })

    res.send(pdfBuffer)
  } catch (error) {
    next(error)
  }
}

// @desc    Download resume as DOCX
// @route   POST /api/resumes/:id/download/docx
// @access  Private
export const downloadDocx = async (req, res, next) => {
  try {
    const resume = await Resume.findOne({
      _id: req.params.id,
      user: req.user._id
    })

    if (!resume) {
      res.status(404)
      throw new Error('Resume not found')
    }

    const docxBuffer = await generateDocx(resume)

    res.set({
      'Content-Type': 'application/vnd.openxmlformats-officedocument.wordprocessingml.document',
      'Content-Disposition': `attachment; filename=${resume.title.replace(/\s+/g, '_')}.docx`,
      'Content-Length': docxBuffer.length
    })

    res.send(docxBuffer)
  } catch (error) {
    next(error)
  }
}