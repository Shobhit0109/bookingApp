import express from 'express';

import {
  createHotel,
  updateHotel,
  deleteHotel,
  getHotelById,
  getHotels,
} from '../controllers/hotel.js';

const router = express.Router();

//Create
router.post('/', createHotel);

//Update
router.post('/:id', updateHotel);

//Delete
router.delete('/:id', deleteHotel);

//Get by Id
router.get('/:id', getHotelById);

//Get all
router.get('/', getHotels);

export default router;
