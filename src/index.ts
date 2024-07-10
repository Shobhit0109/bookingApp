import express, { Express, Request, Response } from 'express';

const port = Number(process.env.PORT) || 3000;

const app = express();

app.listen(port, () => {
  console.log('Server is running on port ' + port);
});

// app.get('/', (req, res) => {
//   res.send('Hello World!');
// });
