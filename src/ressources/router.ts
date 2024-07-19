import { Router } from 'express';
import authRoute from './user/user.route';

const router = Router();
router.use('/auth', authRoute);

export default router;
