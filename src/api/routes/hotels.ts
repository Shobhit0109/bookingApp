import express from 'express';

const router = express.Router();

//create
router.post('/', (_req, res) => {
  res.send('Hello, this is hotels endpoint!');
});

export default router;
