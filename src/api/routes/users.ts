import express from 'express';
import {
  updateUser,
  deleteUser,
  getUserById,
  getUsers,
} from '../controllers/user.js';
import { verifyToken, verifyUser } from '../utils/verifyToken.js';

const router = express.Router();

router.get('/checkauthentication', verifyToken, (req, res) => {
  res.send('Hello user, You are logged in');
});

router.get('/checkuser/:id', verifyUser, (req, res) => {
  res.send('Hello user, You are logged in & can delete your account');
});

//Update
router.put('/:id', updateUser);

//Delete
router.delete('/:id', deleteUser);

//Get by Id
router.get('/:id', getUserById);

//Get all
router.get('/', getUsers);

export default router;
