import bcrypt from 'bcrypt';

export const hashPass = async (password) => {
  try {
    return await bcrypt.hash(password, 10);
  } catch (error) {
    console.log(error)
  }
};

export const checkPass = async (password, hashPassword) => {
  try {
    return await bcrypt.compare(password, hashPassword);
  } catch (error) {
    console.log(error)
  }
};
