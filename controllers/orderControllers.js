import {
  createOrderFromCart,
  getUserOrders,
  getOrderByIdForUser
} from '../services/orderServices.js';

export const createOrder = async (req, res) => {
  try {
    const { shippingAddress, paymentMethod } = req.body;

    if (
      !shippingAddress ||
      !shippingAddress.address ||
      !shippingAddress.city ||
      !shippingAddress.postalCode ||
      !shippingAddress.country
    ) {
      return res.status(400).json({
        message: 'Complete shipping address (address, city, postalCode, country) is required'
      });
    }

    const order = await createOrderFromCart(
      req.user.id,  
      shippingAddress,
      paymentMethod || 'COD'
    );

    return res.status(201).json({
      message: 'Order created successfully',
      response: order
    });
  } catch (error) {
    return res.status(400).json({
      message: error.message || 'Internal Server Error'
    });
  }
};

export const getMyOrders = async (req, res) => {
  try {
    const orders = await getUserOrders(req.user.id);
    return res.status(200).json({
      message: 'Orders fetched successfully',
      response: orders
    });
  } catch (error) {
    return res.status(500).json({
      message: 'Internal Server Error'
    });
  }
};

export const getOrderById = async (req, res) => {
  try {
    const order = await getOrderByIdForUser(req.params.id, req.user.id);
    if (!order) {
      return res.status(404).json({
        message: 'Order not found'
      });
    }

    return res.status(200).json({
      message: 'Order fetched successfully',
      response: order
    });
  } catch (error) {
    return res.status(500).json({
      message: 'Internal Server Error'
    });
  }
};
