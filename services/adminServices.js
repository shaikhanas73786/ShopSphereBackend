import { findAllUsers } from './userServices.js';
import { getAllOrders, updateOrderStatus } from './orderServices.js';

export const getAdminUsersService = async () => {
  return await findAllUsers();
};

export const getAdminOrdersService = async () => {
  return await getAllOrders();
};

export const updateAdminOrderStatusService = async (orderId, status) => {
  return await updateOrderStatus(orderId, status);
};
