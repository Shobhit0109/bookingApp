import User from '../models/User.js';
import { Request, Response, NextFunction } from 'express';

export const createUser = async (
  req: Request,
  res: Response,
  next: NextFunction,
) => {
  const newUser = new User(req.body);
  try {
    const savedUser = await newUser.save();
    res.status(200).json(savedUser);
  } catch (error) {
    next(error);
  }
};

export const updateUser = async (
  req: Request,
  res: Response,
  next: NextFunction,
) => {
  try {
    const updateUser = await User.findByIdAndUpdate(
      req.params['id'],
      {
        $set: req.body,
      },
      { new: true },
    );
    res.status(200).json(updateUser);
  } catch (error) {
    next(error);
  }
};

export const deleteUser = async (
  req: Request,
  res: Response,
  next: NextFunction,
) => {
  try {
    await User.findByIdAndDelete(req.params['id']);
    res.status(200).json('User has been deleted');
  } catch (error) {
    next(error);
  }
};

export const getUserById = async (
  req: Request,
  res: Response,
  next: NextFunction,
) => {
  try {
    const user = await User.findById(req.params['id']);
    res.status(200).json(user);
  } catch (error) {
    next(error);
  }
};

export const getUsers = async (
  req: Request,
  res: Response,
  next: NextFunction,
) => {
  try {
    const users = await User.find();
    res.status(200).json(users);
  } catch (error) {
    next(error);
  }
};
