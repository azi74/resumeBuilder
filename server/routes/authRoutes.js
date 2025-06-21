import express from 'express'
import {
  authUser,
  registerUser,
  logoutUser,
  getUserProfile,
  updateUserProfile,
  googleAuth,
  googleAuthCallback
} from '../controllers/authController.js'
import { protect } from '../middleware/authMiddleware.js'

const router = express.Router()

router.post('/register', registerUser)
router.post('/login', authUser)
router.post('/logout', logoutUser)
router.route('/profile')
  .get(protect, getUserProfile)
  .put(protect, updateUserProfile)

// Google OAuth routes
router.get('/google', googleAuth)
router.get('/google/callback', googleAuthCallback)

export default router