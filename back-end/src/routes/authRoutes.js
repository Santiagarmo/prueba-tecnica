import express from 'express';
import { loginUser, getUser, updateUser } from '../controllers/user.controller.js';
import { protect } from '../middleware/auth.middleware.js';

const router = express.Router();

router.post('/login', loginUser);
router.route('/profile').get(protect, getUser).put(protect, updateUser);