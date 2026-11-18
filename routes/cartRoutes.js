import express from 'express';
import {
  getCart,
  addToCart,
  removeFromCart,
  clearCart
} from '../controllers/cartControllers.js';
import { authMiddleware } from '../units/authMiddleware.js';

let cartRoute = express.Router();

cartRoute.use(authMiddleware);

cartRoute.get('/get', getCart);
cartRoute.post('/add', addToCart);
cartRoute.delete('/remove', removeFromCart);
cartRoute.delete('/clear', clearCart);


export default cartRoute;
