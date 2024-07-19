import { Request, Response } from 'express';
import {
  loginUserSchemaType,
  registerUserSchemaType,
} from '../../../apiTypes/user.validator';
import { createUser, loginUser } from './user.service';

export async function postLoginUser(req: Request, res: Response) {
  try {
    const { email, password } = req.body as loginUserSchemaType['body'];
    const user = await loginUser({ email, password });
    res
      .status(200)
      .json({ success: true, data: user, message: 'User logged in' });
  } catch (error) {
    res.status(500).json({ success: false, message: 'Error logging in user' });
  }
}
export async function postRegisterUser(req: Request, res: Response) {
  try {
    const { email, password, firstname, lastname, phone } =
      req.body as registerUserSchemaType['body'];
    const createdUser = await createUser({
      email,
      password,
      firstname,
      lastname,
      phone,
    });
    res
      .status(201)
      .json({ success: true, data: createdUser, message: 'User created' });
  } catch (error) {
    console.log(error);

    res.status(500).json({ success: false, message: 'Error creating user' });
  }
}
