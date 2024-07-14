import express from 'express';
import {
  updateUser,
  deleteUser,
  getUserById,
  getUsers,
} from '../controllers/user.js';
import { verifyAdmin, verifyUser } from '../utils/verifyToken.js';

const router = express.Router();

// router.get('/checkauthentication', verifyToken, (req, res) => {
//   res.send('Hello user, You are logged in');
// });

// router.get('/checkuser/:id', verifyUser, (req, res) => {
//   res.send('Hello user, You are logged in & can delete your account');
// });

// router.get('/checkadmin/:id', verifyAdmin, (req, res) => {
//   res.send('Hello admin, You are logged in & can delete any account');
// });

//Update
router.put('/:id', verifyUser, updateUser);

//Delete
router.delete('/:id', verifyUser, deleteUser);

//Get by Id
router.get('/:id', verifyUser, getUserById);

//Get all
router.get('/', verifyAdmin, getUsers);

export default router;
