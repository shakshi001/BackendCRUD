//const { default: items } = require("razorpay/dist/types/items.js");
const { default: orders } = require("razorpay/dist/types/orders.js");
const Address = require("../models/address.model.js");
const cartService = require("../services/cart.service.js");

async function createOrder(user, shippAddress) {
  let address;

  if (shippAddress._id) {
    let existAddress = await address.findById(shippAddress._id);
    address = existAddress;
  } else {
    address = new address(shippAddress);
    address.user = user;
    await address.save();
    user.addresses.push(address);
    await user.save();
  }

  const cart = await cartService.findUserCart(user._id);
  const orderItems = [];

  for (const item of cart.cartItems) {
    const orderItem = new orderItems({
      price: items.price,
      product: item.product,
      quantity: item.quantity,
      userId: item.userId,
      discountedPrice: item.discountedPrice,
    });

    const createOrderItem = await orderItem.save();
    orderItems.push(createOrderItem);
  }

  const createOrder = new Order({
    user,
    orderItems,
    totalPrice: cart.totalPrice,
    totalDiscountedPrice: cart.totalDiscountedPrice,
    discounte: cart.discount,
    totalItem: cart.totalItem,
    shippAddress: address,
  });

  const savedOrder = await createOrder.save();

  return savedOrder;
}

async function placeOrder(orderId) {
  const order = await findOrderById(orderId);

  order.orderStatus = "Placed";
  order.paymentDetails.status = "Completed";

  return await order.save();
}

async function confirmedOrder(orderId) {
  const order = await functionOrderById(orderId);
  order.orderStatus = "Confirm";
  order.paymentDetails.status = "Completed";

  return await order.save();
}

async function shipOrder(orderId) {
  const order = await findOrderById(orderId);
  order.orderStatus = "CONFIRMED";
  return await order.save();
}

async function canceledOrder(orderId) {
  const order = await findOneById(orderId);
  order.orderStatus = "CANCELLED";

  return await order.save();
}

async function findOrderById(orderId) {
  const order = await order
    .findById(orderId)
    .populate("user")
    .populate({ path: "orderItems", populate: { path: "product" } })
    .populate("shippingAddress");

  return order;
}

async function userOrderHistory(userId) {
  try {
    const orders = await orders
      .find({ user: userId, orderStatus: "PLACED" })
      .populate({ path: "orderItems", populate: { path: "product" } })
      .lean();
    return orders;
  } catch (error) {
    throw new Error(error.message);
  }
}

async function getAllOrders() {
  return await orders
    .find()
    .populate({ path: "orderItems", populate: { path: "product" } })
    .lean();
}

async function deleteOrder(orderId) {
  const order = await findOrderById(orderId);
  await order.findByIdAndDelete(order._id);
}

module.exports = {
  createOrder,
  placeOrder,
  confirmedOrder,
  shipOrder,
  deleteOrder,
  canceledOrder,
  findOrderById,
  userOrderHistory,
  getAllOrders,
  deleteOrder,
};
