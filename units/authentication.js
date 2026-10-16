import bcrypt from 'bcrypt';

export const hashPass = async (password) => {
  return await bcrypt.hash(password, 10);
};

export const checkPass = async (password, hashPassword) => {
  return await bcrypt.compare(password, hashPassword);
};
