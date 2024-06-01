import jwt from 'jsonwebtoken';
import { config } from '../configs/config.js';

function verifyToken(token) {
  try {
    const decoded = jwt.verify(token, config.jwtSecretKey);
    return decoded;
  } catch (err) {
    throw new Error('Failed to verify token');
  }
}
export default verifyToken;
