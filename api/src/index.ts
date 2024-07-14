/* eslint-disable no-console */
/* eslint-disable @typescript-eslint/no-unused-vars */
import express from 'express';
import loadEnv from './utils/loadEnv.js';
import mongoose from 'mongoose';
import authRouter from './routes/auth.js';
import hotelsRouter from './routes/hotels.js';
import usersRouter from './routes/users.js';
import roomsRouter from './routes/rooms.js';
import cookieParser from 'cookie-parser';
import compression from 'compression';

const app = express();

await loadEnv();

const port = Number(process.env['PORT']) || 8080;

const connect = async () => {
  try {
    await mongoose.connect(process.env['MONGO'] as string);
    console.log('Connected to MongoDB');
  } catch (error: unknown) {
    throw new Error(
      `Failed to connect to MongoDB: ${(error as Error).message}`,
    );
  }
};

mongoose.connection.on('disconnected', () => {
  console.log('Mongoose disconnected');
});
mongoose.connection.on('connected', () => {
  console.log('Mongoose connected');
});

//middleware
app.use(compression());
app.use(cookieParser());
app.use(express.json());

app.use('/api/auth', authRouter);
app.use('/api/hotels', hotelsRouter);
app.use('/api/users', usersRouter);
app.use('/api/rooms', roomsRouter);

app.use(
  (
    err: mongoose.Error.ValidationError,
    req: express.Request,
    res: express.Response,
    next: express.NextFunction,
  ) => {
    //eslint-disable-next-line @typescript-eslint/no-explicit-any
    const errorStatus = (err as any).status || 500;
    const errorMessage = err.message || 'Internal Server Error';

    return res.status(errorStatus).json({
      success: false,
      status: errorStatus,
      message: errorMessage,
      // stack: err.stack,
    });
  },
);

app.listen(port, () => {
  connect();
  console.log('Server is running on port ' + port);
});

app.get('/', (req, res) => {
  res.send('Hello World!');
});
