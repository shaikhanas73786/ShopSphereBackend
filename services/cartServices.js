import cartModel from '../models/cartModel.js';
import productModel from '../models/productModel.js';

export const getCartByUserId = async (userId) => {
  let cart = await cartModel.findOne({ user: userId }).populate('items.product');
  if (!cart) {
    cart = await cartModel.create({ user: userId, items: [] });
  }
  return cart;
};

export const addToCart = async (userId, productId, quantity = 1) => {
  const product = await productModel.findById(productId);
  if (!product) {
    throw new Error('Product not found');
  }

  let cart = await cartModel.findOne({ user: userId });
  if (!cart) {
    cart = new cartModel({ user: userId, items: [] });
  }

  const existingItemIndex = cart.items.findIndex(
    (item) => item.product.toString() === productId.toString()
  );

  const parsedQty = Math.max(1, parseInt(quantity, 10) || 1);

  if (existingItemIndex > -1) {
    cart.items[existingItemIndex].quantity += parsedQty;
  } else {
    cart.items.push({ product: productId, quantity: parsedQty });
  }

  await cart.save();
  return await cartModel.findById(cart._id).populate('items.product');
};





export const removeFromCart = async (userId, productId) => {
  const cart = await cartModel.findOne({ user: userId });
  if (!cart) {
    throw new Error('Cart not found');
  }

  cart.items = cart.items.filter(
    (item) => item.product.toString() !== productId.toString()
  );

  await cart.save();
  return await cartModel.findById(cart._id).populate('items.product');
};

export const clearCart = async (userId) => {
  const cart = await cartModel.findOne({ user: userId });
  if (!cart) {
    return { user: userId, items: [] };
  }

  cart.items = [];
  await cart.save();
  return cart;
};
