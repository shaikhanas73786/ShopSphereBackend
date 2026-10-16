import orderModel from '../models/orderModel.js';
import cartModel from '../models/cartModel.js';

export const createOrderFromCart = async (userId, shippingAddress, paymentMethod = 'COD') => {
  
  const cart = await cartModel.findOne({ user: userId }).populate('items.product');

  if (!cart || cart.items.length === 0) {
    throw new Error('Cart is empty. Cannot create order.');
  }

  const orderItems = [];
  let totalAmount = 0;

  for (const item of cart.items) {
    if (!item.product) {
      throw new Error('One or more products in your cart are no longer available.');
    }

    const itemTotal = item.product.price * item.quantity;
    totalAmount += itemTotal;

    orderItems.push({
      product: item.product._id,
      title: item.product.title,
      price: item.product.price,
      quantity: item.quantity
    });
  }

  const newOrder = new orderModel({
    user: userId,
    items: orderItems,
    totalAmount,
    shippingAddress,
    paymentMethod: paymentMethod || 'COD',
    status: 'pending'
  });

  const savedOrder = await newOrder.save();

  // Clear cart after order creation
  cart.items = [];
  await cart.save();

  return savedOrder;
};


export const getUserOrders = async (userId) => {
  return await orderModel.find({ user: userId }).sort({ createdAt: -1 });
};

export const getOrderByIdForUser = async (orderId, userId) => {
  return await orderModel.findOne({ _id: orderId, user: userId });
};

export const getAllOrders = async () => {
  return await orderModel.find().populate('user', 'name email phone').sort({ createdAt: -1 });
};

export const updateOrderStatus = async (orderId, status) => {
  return await orderModel.findByIdAndUpdate(
    orderId,
    { status },
    { returnDocument: 'after', runValidators: true }
  );
};
