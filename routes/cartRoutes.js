import express from 'express';
import {
  getCart,
  addToCart,
  increaseQuantity,
  decreaseQuantity,
  removeFromCart,
  clearCart
} from '../controllers/cartControllers.js';
import { authMiddleware } from '../units/authMiddleware.js';

let cartRoute = express.Router();

cartRoute.use(authMiddleware);

cartRoute.get('/get', getCart);
cartRoute.post('/add', addToCart);
cartRoute.put('/increase', increaseQuantity);
cartRoute.put('/decrease', decreaseQuantity);
cartRoute.delete('/remove/:productId', removeFromCart);
cartRoute.delete('/remove', removeFromCart);
cartRoute.delete('/clear', clearCart);

export default cartRoute;
