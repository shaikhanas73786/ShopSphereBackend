import express from 'express';
import {
  getAllUsers,
  getAllOrders,
  updateOrderStatus
} from '../controllers/adminControllers.js';
import { authMiddleware, adminMiddleware } from '../units/authMiddleware.js';

let adminRoute = express.Router();

adminRoute.use(authMiddleware, adminMiddleware);

adminRoute.get('/users', getAllUsers);
adminRoute.get('/orders', getAllOrders);
adminRoute.put('/order/status/:id', updateOrderStatus);


export default adminRoute;
