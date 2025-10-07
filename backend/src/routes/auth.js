import express from 'express';
import {
  signup,
  signin,
  signout,
  resetPassword,
  updatePassword,
} from '../controllers/authController.js';
import { verifyToken } from '../middleware/auth.js';

const router = express.Router();

// POST /api/auth/signup
router.post('/signup', signup);

// POST /api/auth/signin
router.post('/signin', signin);

// POST /api/auth/signout
router.post('/signout', signout);

// POST /api/auth/reset-password
router.post('/reset-password', resetPassword);

// POST /api/auth/update-password (requires authentication)
router.post('/update-password', verifyToken, updatePassword);

export default router;