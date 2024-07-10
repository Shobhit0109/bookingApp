import express, { Express, Request, Response } from 'express';
import dotenv from 'dotenv';
import mongoose from 'mongoose';
import authRouter from './routes/auth.js';

const app = express();

const result = dotenv.config();
if (result.error) {
  console.error('Error loading .env file', result.error);
}

// console.log(process.env.MONGO); // Check loaded variables

const port = Number(process.env.PORT) || 8080;

const connect = async () => {
  try {
    await mongoose.connect(process.env.MONGO as string);
    console.log('Connected to MongoDB');
  } catch (error: any) {
    throw new Error(`Failed to connect to MongoDB: ${error.message}`);
  }
};

mongoose.connection.on('disconnected', () => {
  console.log('Mongoose disconnected');
});
mongoose.connection.on('connected', () => {
  console.log('Mongoose connected');
});

//middleware
app.use('/auth', authRouter);

app.listen(port, () => {
  connect();
  console.log('Server is running on port ' + port);
});

// app.get('/', (req, res) => {
//   res.send('Hello World!');
// });
