import db from '../../utils/db';
import {
  loginUserSchemaType,
  registerUserSchemaType,
} from '../../../api_contract/user.validator';
import bcrypt from 'bcryptjs';
import jwt from 'jsonwebtoken';
/**
 * verify user email
 * @param email
 * @returns
 */
export const verifyUserEmail = (email: string) => {
  return db.user.findUnique({ where: { email } });
};

/**
 * Hashes the given password using bcrypt.
 * @param {string} password - The password to hash.
 * @return {string} The hashed password.
 */
export const hashPassword = (password: string) => {
  const salt = bcrypt.genSaltSync(12);
  return bcrypt.hashSync(password, salt);
};

/**
 * create a new user
 * @param userData
 * @returns
 */
export const createUser = async (userData: registerUserSchemaType['body']) => {
  const { email, password, firstname, lastname, phone } = userData;
  if (await verifyUserEmail(email)) {
    throw new Error('User already exists');
  }
  const hashedPassword = hashPassword(password);
  return db.user.create({
    data: { email, password: hashedPassword, firstname, lastname, phone },
  });
};

export const loginUser = async (userData: loginUserSchemaType['body']) => {
  const { email, password } = userData;
  const user = await db.user.findUnique({ where: { email } });
  if (!user) {
    throw new Error('User not found');
  }
  const isPasswordValid = await bcrypt.compare(password, user.password);
  if (!isPasswordValid) {
    throw new Error('Invalid password');
  }
  return user;
};

export const generateAccessToken = (id: number) => {
  return jwt.sign({ id }, process.env.JWT_SECRET!, { expiresIn: '1d' });
};
