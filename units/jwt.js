import jwt from 'jsonwebtoken';

export const generateToken = (payload) => {
  return jwt.sign(payload, process.env.SECRETKEY, { expiresIn: '1d' });
};

export const verifyToken = (token) => {
  return jwt.verify(token, process.env.SECRETKEY);
};
