import express from 'express';
import {
  changePassword,
  createAdminUser,
  getAdminUser,
} from '../controllers/adminUserController.js';

const router = express.Router();

router.post('/login-admin', getAdminUser);
router.post('/create-admin', createAdminUser);
router.post('/change-password', changePassword);

export default router;
