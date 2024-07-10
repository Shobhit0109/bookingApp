import express from 'express';

const router = express.Router();

//create
router.post('/', (req, res) => {
  res.send('Hello, this is auth endpoint!');
});

export default router;
