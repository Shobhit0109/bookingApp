import express from 'express';

import {
  createHotel,
  updateHotel,
  deleteHotel,
  getHotelById,
  getHotels,
} from '../controllers/hotel.js';
import { verifyAdmin } from '../utils/verifyToken.js';

const router = express.Router();

//Create
router.post('/', verifyAdmin, createHotel);

//Update
router.put('/:id', verifyAdmin, updateHotel);

//Delete
router.delete('/:id', verifyAdmin, deleteHotel);

//Get by Id
router.get('/:id', getHotelById);

//Get all
router.get('/', getHotels);

export default router;
