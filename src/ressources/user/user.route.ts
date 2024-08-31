import { Router } from 'express';
import { postLoginUser, postRegisterUser } from './user.controller';
import validate from '../../middlewares/schemaValidator';
import {
  registerUserInputSchema,
  loginUserInputSchema,
} from '../../../api_contract/user.validator';

const router = Router();

router.post('/login', validate(loginUserInputSchema), postLoginUser);
router.post('/register', validate(registerUserInputSchema), postRegisterUser);

export default router;
