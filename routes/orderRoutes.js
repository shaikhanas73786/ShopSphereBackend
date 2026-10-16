import express from 'express';
import {
  createOrder,
  getMyOrders,
  getOrderById
} from '../controllers/orderControllers.js';
import { authMiddleware } from '../units/authMiddleware.js';

let orderRoute = express.Router();

orderRoute.use(authMiddleware);

orderRoute.post('/create', createOrder);
orderRoute.get('/myorders', getMyOrders);
orderRoute.get('/get/:id', getOrderById);

export default orderRoute;
