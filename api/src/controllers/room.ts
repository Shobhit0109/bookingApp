import { Request, Response, NextFunction } from 'express';
import Room from '../models/Room.js';
import Hotels from '../models/Hotels.js';

export const createRoom = async (
  req: Request,
  res: Response,
  next: NextFunction,
) => {
  const hotelId = req.params['hotelId'];
  const newRoom = new Room(req.body);

  try {
    const savedRoom = await newRoom.save();

    try {
      await Hotels.findByIdAndUpdate(hotelId, {
        $push: { rooms: savedRoom._id },
      });
    } catch (err) {
      next(err);
    }
    res.status(200).json(savedRoom);
  } catch (error) {
    next(error);
  }
};

export const updateRoom = async (
  req: Request,
  res: Response,
  next: NextFunction,
) => {
  try {
    const updateRoom = await Room.findByIdAndUpdate(
      req.params['id'],
      {
        $set: req.body,
      },
      { new: true },
    );
    res.status(200).json(updateRoom);
  } catch (error) {
    next(error);
  }
};

export const deleteRoom = async (
  req: Request,
  res: Response,
  next: NextFunction,
) => {
  const hotelId = req.params['hotelId'];
  const id = req.params['id'];

  try {
    await Hotels.findByIdAndUpdate(hotelId, {
      $pull: { rooms: id },
    });
    res.status(200).json('Room has been deleted');
  } catch (error) {
    next(error);
  }
};

export const getRoomById = async (
  req: Request,
  res: Response,
  next: NextFunction,
) => {
  try {
    const room = await Room.findById(req.params['id']);
    res.status(200).json(room);
  } catch (error) {
    next(error);
  }
};

export const getRooms = async (
  req: Request,
  res: Response,
  next: NextFunction,
) => {
  try {
    const rooms = await Room.find();
    res.status(200).json(rooms);
  } catch (error) {
    next(error);
  }
};
