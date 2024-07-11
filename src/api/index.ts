import express from 'express';
import dotenv from 'dotenv';
import mongoose from 'mongoose';
import authRouter from './routes/auth.js';
import hotelsRouter from './routes/hotels.js';
import usersRouter from './routes/users.js';
import roomsRouter from './routes/rooms.js';

const app = express();

let result = dotenv.config({ path: '../../.env' });
if (result.error) {
  result = dotenv.config();
  if (result.error) {
    console.error('Error loading .env file', result.error);
  }
}

// console.log(process.env.MONGO); // Check loaded variables

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
app.use('/api/auth', authRouter);
app.use('/api/hotels', hotelsRouter);
app.use('/api/users', usersRouter);
app.use('/api/rooms', roomsRouter);

app.listen(port, () => {
  connect();
  console.log('Server is running on port ' + port);
});

app.get('/', (_req, res) => {
  res.send('Hello World!');
});
