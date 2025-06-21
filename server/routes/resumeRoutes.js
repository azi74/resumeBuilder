import express from 'express'
import {
  getResumes,
  getResume,
  createResume,
  updateResume,
  deleteResume,
  downloadPDF,
  downloadDocx
} from '../controllers/resumeController.js'
import { protect } from '../middleware/authMiddleware.js'

const router = express.Router()

router.route('/')
  .get(protect, getResumes)
  .post(protect, createResume)

router.route('/:id')
  .get(protect, getResume)
  .put(protect, updateResume)
  .delete(protect, deleteResume)

router.route('/:id/download/pdf')
  .get(protect, downloadPDF)

router.route('/:id/download/docx')
  .get(protect, downloadDocx)

export default router