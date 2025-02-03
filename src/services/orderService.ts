const { Order }  = require("../models/Order")
const { logger }  = require("../utils/logger")

export const createOrder = async (userId, orderData: any) => {
  try {
    const order = new Order({ ...orderData, user: userId })
    await order.save()
    logger.info(`Order created: ${order.id}`)
    return order
  } catch (error) {
    logger.error(`Error creating order: ${error}`)
    throw error
  }
}

export const getOrders = async (userId) => {
  try {
    const orders = await Order.find({ user: userId }).populate("products.product")
    return orders
  } catch (error) {
    logger.error(`Error fetching orders: ${error}`)
    throw error
  }
}

export const updateOrderStatus = async (orderId, status) => {
  try {
    const order = await Order.findByIdAndUpdate(orderId, { status }, { new: true })
    if (!order) {
      throw new Error("Order not found")
    }
    logger.info(`Order status updated: ${orderId}`)
    return order
  } catch (error) {
    logger.error(`Error updating order status: ${error}`)
    throw error
  }
}

