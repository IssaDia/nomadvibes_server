import { NextFunction, Request, Response } from 'express';
import jwt from 'jsonwebtoken';

export default function auth(req: Request, res: Response, next: NextFunction) {
  if (!req.headers.authorization) {
    return res
      .status(401)
      .json({ success: false, message: 'No token provided' });
  }
  const authHeader = req.headers.authorization;
  const token = authHeader && authHeader.split(' ')[1];
  if (token === null) {
    return res
      .status(401)
      .json({ success: false, message: 'No token provided' });
  }

  jwt.verify(token, process.env.JWT_SECRET!, (err: any, user: any) => {
    if (err) {
      return res.status(403).json({ success: false, message: 'Invalid token' });
    }
    req.user = user;
  });
  next();
}
