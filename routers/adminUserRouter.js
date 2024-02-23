import express from 'express';
import {
  createAdminUser,
  getAdminUser,
} from '../controllers/adminUserController.js';

const router = express.Router();

router.post('/login-admin', getAdminUser);
router.post('/create-admin', createAdminUser);

export default router;
