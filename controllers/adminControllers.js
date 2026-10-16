import {
  getAdminUsersService,
  getAdminOrdersService,
  updateAdminOrderStatusService
} from '../services/adminServices.js';

export const getAllUsers = async (req, res) => {
  try {
    const users = await getAdminUsersService();
    return res.status(200).json({
      message: 'All users fetched successfully',
      response: users
    });
  } catch (error) {
    return res.status(500).json({
      message: 'Internal Server Error'
    });
  }
};

export const getAllOrders = async (req, res) => {
  try {
    const orders = await getAdminOrdersService();
    return res.status(200).json({
      message: 'All orders fetched successfully',
      response: orders
    });
  } catch (error) {
    return res.status(500).json({
      message: 'Internal Server Error'
    });
  }
};

export const updateOrderStatus = async (req, res) => {
  try {
    const orderId = req.params.id || req.body.orderId;
    const { status } = req.body;

    const allowedStatuses = ['pending', 'confirmed', 'shipped', 'delivered', 'cancelled'];
    if (!allowedStatuses.includes(status)) {
      return res.status(400).json({
        message: `Invalid status. Allowed values: ${allowedStatuses.join(', ')}`
      });
    }

    const updated = await updateAdminOrderStatusService(orderId, status);
    if (!updated) {
      return res.status(404).json({
        message: 'Order not found'
      });
    }

    return res.status(200).json({
      message: 'Order status updated successfully',
      response: updated
    });
  } catch (error) {
    return res.status(500).json({
      message: 'Internal Server Error'
    });
  }
};
