import {
  getCartByUserId,
  addToCart as addToCartService,
  removeFromCart as removeFromCartService,
  clearCart as clearCartService
} from '../services/cartServices.js';

export const getCart = async (req, res) => {
  try {
    const cart = await getCartByUserId(req.user.id);
    return res.status(200).json({
      message: 'Cart fetched successfully',
      response: cart
    });
  } catch (error) {
    return res.status(500).json({
      message: 'Internal Server Error'
    });
  }
};

export const addToCart = async (req, res) => {
  try {
    const { productId, quantity } = req.body;
    if (!productId) {
      return res.status(400).json({
        message: 'Product ID is required'
      });
    }

    const updatedCart = await addToCartService(req.user.id, productId, quantity || 1);
    return res.status(200).json({
      message: 'Product added to cart successfully',
      response: updatedCart
    });
  } catch (error) {
    return res.status(error.message === 'Product not found' ? 404 : 500).json({
      message: error.message || 'Internal Server Error'
    });
  }
};





export const removeFromCart = async (req, res) => {
  try {
    const productId = req.params.productId || req.body.productId;
    if (!productId) {
      return res.status(400).json({
        message: 'Product ID is required'
      });
    }

    const updatedCart = await removeFromCartService(req.user.id, productId);
    return res.status(200).json({
      message: 'Item removed from cart',
      response: updatedCart
    });
  } catch (error) {
    return res.status(400).json({
      message: error.message || 'Internal Server Error'
    });
  }
};

export const clearCart = async (req, res) => {
  try {
    const updatedCart = await clearCartService(req.user.id);
    return res.status(200).json({
      message: 'Cart cleared successfully',
      response: updatedCart
    });
  } catch (error) {
    return res.status(500).json({
      message: 'Internal Server Error'
    });
  }
};
