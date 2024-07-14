import Hotel from '../models/Hotels.js';
import { Request, Response, NextFunction } from 'express';

export const createHotel = async (
  req: Request,
  res: Response,
  next: NextFunction,
) => {
  const newHotel = new Hotel(req.body);
  try {
    const savedHotel = await newHotel.save();
    res.status(200).json(savedHotel);
  } catch (error) {
    next(error);
  }
};

export const updateHotel = async (
  req: Request,
  res: Response,
  next: NextFunction,
) => {
  try {
    const updateHotel = await Hotel.findByIdAndUpdate(
      req.params['id'],
      {
        $set: req.body,
      },
      { new: true },
    );
    res.status(200).json(updateHotel);
  } catch (error) {
    next(error);
  }
};

export const deleteHotel = async (
  req: Request,
  res: Response,
  next: NextFunction,
) => {
  try {
    await Hotel.findByIdAndDelete(req.params['id']);
    res.status(200).json('Hotel has been deleted');
  } catch (error) {
    next(error);
  }
};

export const getHotelById = async (
  req: Request,
  res: Response,
  next: NextFunction,
) => {
  try {
    const hotel = await Hotel.findById(req.params['id']);
    res.status(200).json(hotel);
  } catch (error) {
    next(error);
  }
};

export const getHotels = async (
  req: Request,
  res: Response,
  next: NextFunction,
) => {
  try {
    const hotels = await Hotel.find();
    res.status(200).json(hotels);
  } catch (error) {
    next(error);
  }
};
