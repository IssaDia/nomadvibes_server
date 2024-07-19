import { Router } from 'express';
import { postLoginUser, postRegisterUser } from './user.controller';
import validate from '../../middlewares/schemaValidator';
import {
  registerUserSchema,
  loginUserSchema,
} from '../../../apiTypes/user.validator';

const router = Router();

router.post('/login', validate(loginUserSchema), postLoginUser);
router.post('/register', validate(registerUserSchema), postRegisterUser);

export default router;
