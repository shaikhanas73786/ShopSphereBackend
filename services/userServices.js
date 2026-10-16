import userModel from '../models/userModel.js';

export const createUser = async (userData) => {
  const user = new userModel(userData);
  return await user.save();
};

export const findUser = async (filter) => {
  return await userModel.findOne(filter);
};

export const findUserById = async (id) => {
  return await userModel.findById(id).select('-password');
};

export const updateUserData = async (id, updateData) => {
  return await userModel.findByIdAndUpdate(id, updateData, {
    returnDocument: 'after',
    runValidators: true
  }).select('-password');
};


export const deleteUser = async (id) => {
  return await userModel.findByIdAndDelete(id);
};

export const findAllUsers = async () => {
  return await userModel.find().select('-password');
};
