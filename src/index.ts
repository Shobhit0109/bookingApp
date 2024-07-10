import express, { Express, Request, Response } from 'express';

const port = Number(process.env.PORT) || 8000;

const app = express();

app.get('/', (req, res) => {
  res.send('Hello World!');
});

app.listen(port, () => {
  console.log('Server is running on port ' + port);
});
