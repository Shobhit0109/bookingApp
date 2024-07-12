import bcrypt from 'bcryptjs';
import express from 'express';
import User from '../models/User.js';
import jwt from 'jsonwebtoken';
import { createError } from '../utils/error.js';

export const register = async (
  req: express.Request,
  res: express.Response,
  next: express.NextFunction,
) => {
  const salt = bcrypt.genSaltSync(10);
  const hashedPassword = bcrypt.hashSync(req.body.password, salt);

  try {
    const newUser = new User({
      username: req.body.username,
      email: req.body.email,
      password: hashedPassword,
    });
    await newUser.save();
    res.status(201).send('New User created');
  } catch (error) {
    next(error);
  }
};

export const login = async (
  req: express.Request,
  res: express.Response,
  next: express.NextFunction,
) => {
  try {
    const user = await User.findOne({ username: req.body.username });
    if (!user) {
      return res.status(404).send('User not found');
    }
    const isPasswordCorrect = await bcrypt.compare(
      req.body.password,
      user.password,
    );
    if (!isPasswordCorrect) {
      return next(createError(400, 'Invalid password'));
    }
    const secret = process.env['JWT_SECRET'];
    if (!secret) {
      return next(createError(500, 'JWT_SECRET is not set'));
    }
    const token = jwt.sign({ id: user._id, isAdmin: user.isAdmin }, secret);

    // eslint-disable-next-line @typescript-eslint/no-unused-vars
    const { password, isAdmin, ...otherData } = user;

    res
      .cookie('access_token', token, {
        httpOnly: true,
      })
      .status(200)
      .json({ otherData });
  } catch (error) {
    next(error);
  }
};
