import jwt from 'jsonwebtoken';
import express from 'express';
import { createError } from './error.js';

// eslint-disable-next-line @typescript-eslint/no-explicit-any
type extendedRequest = express.Request & { user: any };

export const verifyToken = (
  req: express.Request,
  res: express.Response,
  next: express.NextFunction,
) => {
  const token = req.cookies['access_token'];
  if (!token) {
    return next(createError(401, 'You are not authorize'));
  }
  const defaultToken = process.env['JWT_SECRET'];
  if (!defaultToken) {
    throw new Error('JWT_SECRET is not set');
  }
  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  jwt.verify(token, defaultToken, (err: any, user: any) => {
    if (err) {
      return next(createError(403, 'Token is invalid'));
    }
    (req as extendedRequest).user = user;
    next();
  });
};

export const verifyUser = (
  req: express.Request,
  res: express.Response,
  next: express.NextFunction,
) => {
  verifyToken(req, res, () => {
    const user = (req as extendedRequest).user;
    if (user.id !== req.params['id'] && user.isAdmin === false) {
      return next(createError(403, 'You are not authorized'));
    }
    next();
  });
};
