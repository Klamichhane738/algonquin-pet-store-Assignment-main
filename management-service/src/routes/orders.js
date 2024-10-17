// src/routes/orders.js
const express = require('express');
const { fetchOrders } = require('../controllers/orderController');

const router = express.Router();

router.get('/orders', fetchOrders);

module.exports = router;
