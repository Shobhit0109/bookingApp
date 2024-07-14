import jwt from 'jsonwebtoken';
import express from 'express';
import { createError } from './error.js';

// Define a more specific type for user
interface User {
  id: string;
  isAdmin: boolean;
}

type ExtendedRequest = express.Request & { user?: User };

export const verifyToken = (
  req: ExtendedRequest,
  res: express.Response,
  next: express.NextFunction,
) => {
  const token = req.cookies['access_token'];

  if (!token) {
    return next(createError(401, 'You are not authorized'));
  }
  const secret = process.env['JWT_SECRET'];
  if (!secret) {
    throw new Error('JWT_SECRET is not set');
  }

  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  jwt.verify(token, secret, (err: any, user: any) => {
    if (err) {
      return next(createError(403, 'Token is invalid'));
    }
    req.user = user as User;
    next();
  });
};

export const verifyUser = (
  req: ExtendedRequest,
  res: express.Response,
  next: express.NextFunction,
) => {
  verifyToken(req, res, err => {
    if (err) return next(err);

    if (req.user && (req.user.id === req.params['id'] || req.user.isAdmin)) {
      return next();
    } else {
      return next(createError(403, 'You are not authorized'));
    }
  });
};

export const verifyAdmin = (
  req: ExtendedRequest,
  res: express.Response,
  next: express.NextFunction,
) => {
  verifyToken(req, res, err => {
    if (err) return next(err);

    if (req.user && req.user.isAdmin) {
      return next();
    } else {
      return next(createError(403, 'You are not an admin'));
    }
  });
};
