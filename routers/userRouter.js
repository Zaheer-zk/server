import express from 'express';

const router = express.Router();
import {
  createNewUser,
  deleteUser,
  getAllUsers,
  updateUser,
} from '../controllers/userController.js';

router.get('/users', getAllUsers);
router.post('/create-user', createNewUser);
router.delete('/delete-user', deleteUser);
router.put('/update-user', updateUser);

export default router;
