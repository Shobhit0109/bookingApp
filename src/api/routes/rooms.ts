import express from 'express';

const router = express.Router();

router.get('/', (_req, res) => {
  res.send('Hello, this is auth endpoint!');
});

export default router;
