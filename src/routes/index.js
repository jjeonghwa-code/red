import express from 'express';
import account from './account';
import print from './print';

const router = express.Router();

router.use('/account', account);
router.use('/print', print);

export default router;
