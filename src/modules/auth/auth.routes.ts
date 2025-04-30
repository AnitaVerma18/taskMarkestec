import express from 'express';
import * as Controller from './auth.controller';
import { authorization } from '../../middleware/authorization';
const router = express.Router();

router.post('/signup', Controller.signup)
router.post('/verify', authorization, Controller.verifyEmail)
router.post('/resend', Controller.resendOtp)
router.post('/forgot', Controller.forgotPassword)
router.post('/verify-otp', Controller.verifyOtp)
router.post('/reset', Controller.resetPassword)
router.post('/login', Controller.login)
router.get('/profile', authorization, Controller.profile)
router.post('/logout', authorization, Controller.logout)

export default router;