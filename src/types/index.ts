import { Request } from 'express';
import { JwtPayload } from 'jsonwebtoken';

export interface IUser extends JwtPayload {
  id: number;
  username: string;
}

export interface IRequestWihUser extends Request {
  user: IUser;
}
