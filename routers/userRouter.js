import express from 'express';

const router = express.Router();
import { createNewUser, getAllUsers } from '../controllers/userController.js';

router.get('/users', getAllUsers);
router.post('/create-user', createNewUser);

export default router;
