// src/config/config.js
require('dotenv').config();

module.exports = {
  port: process.env.PORT || 4000,
  rabbitMQ: {
    url: process.env.RABBITMQ_URL || 'amqp://localhost',
    queue: process.env.RABBITMQ_QUEUE || 'orders',
  },
};
