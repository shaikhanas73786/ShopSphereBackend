import express from 'express';
import {
  createProduct,
  getAllProducts,
  getProductById,
  updateProduct,
  deleteProduct
} from '../controllers/productControllers.js';
import { authMiddleware, adminMiddleware } from '../units/authMiddleware.js';

let productRoute = express.Router();

productRoute.get('/getall', getAllProducts);
productRoute.get('/get/:id', getProductById);
productRoute.post('/create', authMiddleware, adminMiddleware, createProduct);
productRoute.put('/update/:id', authMiddleware, adminMiddleware, updateProduct);
productRoute.put('/update', authMiddleware, adminMiddleware, updateProduct);
productRoute.delete('/delete/:id', authMiddleware, adminMiddleware, deleteProduct);
productRoute.delete('/delete', authMiddleware, adminMiddleware, deleteProduct);

export default productRoute;
