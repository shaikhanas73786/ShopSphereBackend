import express from 'express';
import {
  createAccount,
  loginUser,
  userProfile,
  updateUser,
  deleteUser
} from '../controllers/userControllers.js';

import { authMiddleware } from '../units/authMiddleware.js';

let userRoute = express.Router();

userRoute.post('/createaccount', createAccount);
userRoute.post('/login', loginUser);
userRoute.get('/profile', authMiddleware, userProfile);
userRoute.put('/update', authMiddleware, updateUser);
userRoute.delete('/delete', authMiddleware, deleteUser);

export default userRoute;




