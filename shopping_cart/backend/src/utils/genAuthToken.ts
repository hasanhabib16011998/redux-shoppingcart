import jwt from 'jsonwebtoken';
import { IUser } from '../models/users';

const genAuthToken = (user: IUser): string => {
  const token = jwt.sign(
    { _id: user._id, name: user.name, email: user.email },
    process.env.JWT_SECRET as string,
    { expiresIn: '1h' }
  );
  return token;
};

export default genAuthToken;
