// src/controllers/orderController.js
const { getOrders } = require('../services/rabbitMQService');

const fetchOrders = (req, res) => {
  const orders = getOrders();
  res.json(orders);
};

module.exports = {
  fetchOrders,
};
